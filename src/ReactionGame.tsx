import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "./firebase";
import {
  ref,
  set,
  onValue,
  update,
  remove,
  onDisconnect,
  get,
} from "firebase/database";

// ── Teams ─────────────────────────────────────────────────────────
const TEAMS = [
  "Manchester United", "Liverpool", "Arsenal", "Chelsea", "Manchester City",
  "Real Madrid", "Barcelona", "Atlético Madrid", "Sevilla", "Valencia",
  "Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen", "Eintracht Frankfurt",
  "Juventus", "AC Milan", "Inter Milan", "Napoli", "AS Roma",
  "Paris Saint-Germain", "Marseille", "Lyon", "Monaco", "Lille",
  "Ajax", "PSV Eindhoven", "Feyenoord", "AZ Alkmaar", "FC Utrecht",
  "Benfica", "Porto", "Sporting CP", "Braga", "Vitória Guimarães",
  "Galatasaray", "Fenerbahçe", "Beşiktaş", "Trabzonspor", "İstanbul Başakşehir",
  "Club Brugge", "Anderlecht", "Genk", "Standard Liège", "Gent",
  "Olympiacos", "Panathinaikos", "AEK Athens", "PAOK", "Aris Thessaloniki",
];

// ── Types ──────────────────────────────────────────────────────────
type Phase = "idle" | "picking" | "ready" | "countdown" | "wait" | "go" | "confirm" | "result" | "gameover";

const ROUNDS_TO_WIN = 3;

interface RoomData {
  host: string;
  guest?: string;
  hostName?: string;
  guestName?: string;
  phase: Phase;
  countdownValue?: string;
  goTimestamp?: number;
  clicks?: { [key: string]: number };
  foul?: string;
  winner?: string;
  confirmed?: boolean;
  confirmDeadline?: number;
  scoreConfirmed?: "pending" | "confirmed" | "denied";
  round: number;
  score: { host: number; guest: number };
  games: { host: number; guest: number };
  gameWinner?: string;
  picks?: { host?: string; guest?: string };
}

// ── Helpers ────────────────────────────────────────────────────────
function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generatePlayerId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ── Confirm Button with countdown ─────────────────────────────────
function ConfirmButton({ onDone, deadline }: { onDone: () => void; deadline: number }) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, Math.ceil((deadline - Date.now()) / 100) / 10));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, (deadline - Date.now()) / 1000);
      setTimeLeft(Math.ceil(remaining * 10) / 10);
      if (remaining <= 0) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-lg sm:text-xl text-gray-400">Click "Done" to win!</div>
      <button
        onClick={onDone}
        className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-white text-3xl sm:text-5xl font-black rounded-2xl transition-all active:scale-95 animate-pulse-glow"
      >
        Done!
      </button>
      <div className={`text-2xl font-bold font-mono ${timeLeft <= 0.5 ? "text-red-400" : "text-yellow-400"}`}>
        {timeLeft.toFixed(1)}s
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────
export default function ReactionGame() {
  const [screen, setScreen] = useState<"lobby" | "game">("lobby");
  const [roomCode, setRoomCode] = useState("");
  const [joinInput, setJoinInput] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerId] = useState(() => generatePlayerId());
  const [isHost, setIsHost] = useState(false);
  const [room, setRoom] = useState<RoomData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // ── Listen to room changes ────────────────────────────────────
  useEffect(() => {
    if (!roomCode) return;
    const roomRef = ref(db, `rooms/${roomCode}`);
    const unsub = onValue(roomRef, (snap) => {
      const data = snap.val() as RoomData | null;
      if (!data) {
        setScreen("lobby");
        setRoomCode("");
        setRoom(null);
        return;
      }
      setRoom(data);
    });
    return () => {
      unsub();
      clearTimers();
    };
  }, [roomCode, clearTimers]);

  // ── Cleanup on disconnect ─────────────────────────────────────
  useEffect(() => {
    if (!roomCode) return;
    const roomRef = ref(db, `rooms/${roomCode}`);
    onDisconnect(roomRef).remove();
  }, [roomCode]);

  // ── Create room ───────────────────────────────────────────────
  const createRoom = useCallback(async () => {
    const name = playerName.trim();
    if (!name) { setError("Enter your name first"); return; }
    const code = generateRoomCode();
    const roomRef = ref(db, `rooms/${code}`);
    const initial: RoomData = {
      host: playerId,
      hostName: name,
      phase: "idle",
      round: 0,
      score: { host: 0, guest: 0 },
      games: { host: 0, guest: 0 },
    };
    await set(roomRef, initial);
    setRoomCode(code);
    setIsHost(true);
    setScreen("game");
    setError("");
  }, [playerId, playerName]);

  // ── Join room ─────────────────────────────────────────────────
  const joinRoom = useCallback(async () => {
    const name = playerName.trim();
    if (!name) { setError("Enter your name first"); return; }
    const code = joinInput.toUpperCase().trim();
    if (code.length !== 4) {
      setError("Enter a 4-character room code");
      return;
    }
    const roomRef = ref(db, `rooms/${code}`);
    const snap = await get(roomRef);
    if (!snap.exists()) {
      setError("Room not found");
      return;
    }
    const data = snap.val() as RoomData;
    if (data.guest) {
      setError("Room is full");
      return;
    }
    await update(roomRef, { guest: playerId, guestName: name });
    setRoomCode(code);
    setIsHost(false);
    setScreen("game");
    setError("");
  }, [joinInput, playerId, playerName]);

  // ── Start picking phase ───────────────────────────────────────
  const startPicking = useCallback(async () => {
    if (!isHost || !roomCode) return;
    await update(ref(db, `rooms/${roomCode}`), {
      phase: "picking",
      picks: null,
      clicks: null,
      foul: null,
      winner: null,
      confirmed: null,
      confirmDeadline: null,
      scoreConfirmed: null,
    });
    setTeamSearch("");
  }, [isHost, roomCode]);

  // ── Pick a team ───────────────────────────────────────────────
  const pickTeam = useCallback(async (team: string) => {
    if (!roomCode) return;
    const myKey = isHost ? "host" : "guest";
    await update(ref(db, `rooms/${roomCode}/picks`), {
      [myKey]: team,
    });
    setTeamSearch("");
  }, [roomCode, isHost]);

  // ── Host: start round after both picked ───────────────────────
  const startRound = useCallback(async () => {
    if (!isHost || !roomCode) return;
    const roomRef = ref(db, `rooms/${roomCode}`);
    clearTimers();

    await update(roomRef, {
      phase: "countdown",
      countdownValue: "3",
    });

    const t1 = setTimeout(async () => {
      await update(roomRef, { countdownValue: "2" });
    }, 1000);

    const t2 = setTimeout(async () => {
      await update(roomRef, { countdownValue: "1" });
    }, 2000);

    const t3 = setTimeout(async () => {
      await update(roomRef, { phase: "wait", countdownValue: "..." });
    }, 3000);

    const randomDelay = 1000 + Math.random() * 2000;
    const t4 = setTimeout(async () => {
      const snap = await get(ref(db, `rooms/${roomCode}/foul`));
      if (snap.exists()) return;
      const now = Date.now();
      await update(roomRef, {
        phase: "go",
        countdownValue: "GO!",
        goTimestamp: now,
      });
    }, 3000 + randomDelay);

    timersRef.current = [t1, t2, t3, t4];
  }, [isHost, roomCode, clearTimers]);

  // ── Player click ──────────────────────────────────────────────
  const handleClick = useCallback(async () => {
    if (!room || !roomCode) return;
    const { phase } = room;

    if (phase === "countdown" || phase === "wait") {
      const winnerKey = isHost ? "guest" : "host";
      clearTimers();
      await update(ref(db, `rooms/${roomCode}`), {
        phase: "result",
        foul: playerId,
        winner: winnerKey,
        scoreConfirmed: "pending",
      });
    } else if (phase === "go") {
      const clickTime = Date.now();
      const myKey = isHost ? "host" : "guest";
      await update(ref(db, `rooms/${roomCode}`), {
        phase: "confirm",
        winner: myKey,
        [`clicks/${myKey}`]: clickTime,
        confirmDeadline: clickTime + 2000,
        confirmed: false,
      });
    }
  }, [room, roomCode, isHost, playerId, clearTimers]);

  // ── Winner clicks "Done" ────────────────────────────────────
  const handleDone = useCallback(async () => {
    if (!room || !roomCode || room.phase !== "confirm") return;
    const myKey = isHost ? "host" : "guest";
    if (room.winner !== myKey) return;
    await update(ref(db, `rooms/${roomCode}`), {
      phase: "result",
      confirmed: true,
      scoreConfirmed: "pending",
    });
  }, [room, roomCode, isHost]);

  // ── Host confirms or denies the point ─────────────────────
  const confirmPoint = useCallback(async () => {
    if (!isHost || !room || !roomCode || room.phase !== "result") return;
    const winnerKey = room.winner as "host" | "guest";
    if (!winnerKey) return;
    await update(ref(db, `rooms/${roomCode}`), {
      scoreConfirmed: "confirmed",
      [`score/${winnerKey}`]: (room.score[winnerKey] || 0) + 1,
    });
  }, [isHost, room, roomCode]);

  const denyPoint = useCallback(async () => {
    if (!isHost || !room || !roomCode || room.phase !== "result") return;
    await update(ref(db, `rooms/${roomCode}`), {
      scoreConfirmed: "denied",
    });
  }, [isHost, room, roomCode]);

  // ── 2-second confirm timeout ────────────────────────────────
  useEffect(() => {
    if (!room || room.phase !== "confirm" || !roomCode) return;
    const myKey = isHost ? "host" : "guest";
    const otherKey = isHost ? "guest" : "host";
    // Only the winner's client runs the timeout
    if (room.winner !== myKey) return;

    const remaining = (room.confirmDeadline || 0) - Date.now();
    const delay = Math.max(0, remaining);

    const t = setTimeout(async () => {
      // Check if already confirmed
      const snap = await get(ref(db, `rooms/${roomCode}/confirmed`));
      if (snap.val() === true) return;
      // Time's up — flip the winner
      await update(ref(db, `rooms/${roomCode}`), {
        phase: "result",
        winner: otherKey,
        confirmed: false,
        scoreConfirmed: "pending",
      });
    }, delay);

    return () => clearTimeout(t);
  }, [room?.phase, room?.confirmDeadline, roomCode, isHost]);

  // ── Check for game win (first to 3 rounds) ─────────────────
  useEffect(() => {
    if (!room || room.phase !== "result" || !roomCode) return;
    const hostScore = room.score.host || 0;
    const guestScore = room.score.guest || 0;
    if (hostScore < ROUNDS_TO_WIN && guestScore < ROUNDS_TO_WIN) return;
    // Only host triggers the gameover transition to avoid race
    if (!isHost) return;
    const gameWinner = hostScore >= ROUNDS_TO_WIN ? "host" : "guest";
    const timeout = setTimeout(async () => {
      await update(ref(db, `rooms/${roomCode}`), {
        phase: "gameover",
        gameWinner,
        [`games/${gameWinner}`]: ((room.games?.[gameWinner]) || 0) + 1,
      });
    }, 2000); // show round result for 2s before game over
    return () => clearTimeout(timeout);
  }, [room?.phase, room?.score, roomCode, isHost]);

  // ── Start new game (reset round score) ────────────────────
  const startNewGame = useCallback(async () => {
    if (!isHost || !roomCode) return;
    clearTimers();
    await update(ref(db, `rooms/${roomCode}`), {
      phase: "picking",
      score: { host: 0, guest: 0 },
      picks: null,
      clicks: null,
      foul: null,
      winner: null,
      gameWinner: null,
      confirmed: null,
      confirmDeadline: null,
      scoreConfirmed: null,
    });
    setTeamSearch("");
  }, [isHost, roomCode, clearTimers]);

  // ── Leave room ────────────────────────────────────────────────
  const leaveRoom = useCallback(async () => {
    clearTimers();
    if (roomCode) {
      await remove(ref(db, `rooms/${roomCode}`));
    }
    setRoomCode("");
    setRoom(null);
    setScreen("lobby");
  }, [roomCode, clearTimers]);

  // ── Copy room code ────────────────────────────────────────────
  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [roomCode]);

  // ════════════════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════════════════

  // ── Lobby ─────────────────────────────────────────────────────
  if (screen === "lobby") {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center p-6 gap-8">
        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">
          Reaction Duel
        </h1>
        <p className="text-gray-400 text-lg text-center max-w-md">
          Pick your team, then race to click first after GO!
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Your name"
            value={playerName}
            onChange={(e) => { setPlayerName(e.target.value); setError(""); }}
            maxLength={16}
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 text-white text-center text-xl rounded-xl focus:outline-none focus:border-emerald-500 placeholder:text-gray-600"
          />

          <button
            onClick={createRoom}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xl font-bold rounded-xl transition-all active:scale-95"
          >
            Create Room
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-sm">or join</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <input
            type="text"
            placeholder="Enter room code"
            value={joinInput}
            onChange={(e) => {
              setJoinInput(e.target.value.toUpperCase());
              setError("");
            }}
            maxLength={4}
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 text-white text-center text-2xl font-mono tracking-[0.3em] rounded-xl focus:outline-none focus:border-blue-500 uppercase placeholder:text-gray-600 placeholder:tracking-normal placeholder:text-base placeholder:font-sans"
          />

          <button
            onClick={joinRoom}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold rounded-xl transition-all active:scale-95"
          >
            Join Room
          </button>

          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}
        </div>
      </div>
    );
  }

  // ── Game ──────────────────────────────────────────────────────
  const myRole = isHost ? "host" : "guest";
  const opponentRole = isHost ? "guest" : "host";
  const waitingForOpponent = !room?.guest;
  const phase = room?.phase || "idle";
  const canClick = phase === "countdown" || phase === "wait" || phase === "go";

  const hostName = room?.hostName || "Player 1";
  const guestName = room?.guestName || "Player 2";
  const myName = isHost ? hostName : guestName;
  const opponentName = isHost ? guestName : hostName;

  const myPick = room?.picks?.[myRole];
  const opponentPick = room?.picks?.[opponentRole];
  const bothPicked = !!myPick && !!opponentPick;

  const getWinnerReactionTime = () => {
    if (!room?.clicks || !room.goTimestamp || !room.winner) return null;
    const winnerClick = room.clicks[room.winner];
    if (!winnerClick) return null;
    return winnerClick - room.goTimestamp;
  };

  const iWon = room?.winner === myRole;
  const iFouled = room?.foul === playerId;

  const winnerTeam = room?.winner ? room?.picks?.[room.winner] : null;

  // Filtered teams for search
  const filteredTeams = teamSearch
    ? TEAMS.filter((t) => t.toLowerCase().includes(teamSearch.toLowerCase()))
    : TEAMS;

  // Button styling
  const getBtnClass = () => {
    const base =
      "w-full flex-1 text-3xl sm:text-5xl font-black uppercase tracking-wider transition-all duration-150 select-none rounded-2xl";
    if (waitingForOpponent || phase === "idle" || phase === "picking" || phase === "ready" || phase === "confirm")
      return `${base} bg-gray-800 text-gray-600 cursor-not-allowed`;
    if (phase === "result") {
      if (iWon) return `${base} bg-emerald-600 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] cursor-default`;
      if (iFouled) return `${base} bg-red-600 text-white animate-shake cursor-default`;
      return `${base} bg-gray-700 text-gray-400 cursor-default`;
    }
    if (phase === "countdown" || phase === "wait")
      return `${base} bg-yellow-600/80 hover:bg-yellow-500 text-white cursor-pointer active:scale-95`;
    return `${base} bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer active:scale-95 animate-pulse-glow`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 gap-3 select-none overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between w-full max-w-4xl shrink-0">
        <div className="flex gap-3 items-center">
          <button
            onClick={leaveRoom}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            Leave
          </button>
          {isHost && !waitingForOpponent && (
            <button
              onClick={startNewGame}
              className="text-yellow-600 hover:text-yellow-400 text-sm transition-colors"
            >
              Reset
            </button>
          )}
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
          <span className="text-gray-400">Room:</span>
          <span className="font-mono font-bold text-white tracking-widest">
            {roomCode}
          </span>
          <span className="text-gray-500 text-xs">
            {copied ? "Copied!" : "Copy"}
          </span>
        </button>
        <div className="flex flex-col items-end gap-0 text-sm sm:text-base font-bold">
          <div className="flex gap-2 items-center">
            <span className="text-blue-400">{hostName}</span>
            <span className="text-yellow-400 text-xs sm:text-sm">{room?.games?.host || 0}</span>
            <span className="text-gray-600">G</span>
            <span className="text-gray-500">|</span>
            <span className="text-yellow-400 text-xs sm:text-sm">{room?.games?.guest || 0}</span>
            <span className="text-rose-400">{guestName}</span>
          </div>
          <div className="flex gap-2 items-center text-xs text-gray-500">
            <span>Round: {room?.score.host || 0}</span>
            <span>-</span>
            <span>{room?.score.guest || 0}</span>
          </div>
        </div>
      </div>

      {/* Waiting for opponent */}
      {waitingForOpponent && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="text-2xl sm:text-4xl font-bold text-white">
            Waiting for opponent...
          </div>
          <p className="text-gray-400 text-center">
            Share the room code with a friend
          </p>
          <button
            onClick={copyCode}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-3xl font-mono font-bold tracking-[0.4em] text-white transition-all active:scale-95"
          >
            {roomCode}
          </button>
          <span className="text-gray-500 text-sm">
            {copied ? "Copied to clipboard!" : "Tap to copy"}
          </span>
        </div>
      )}

      {/* Game active */}
      {!waitingForOpponent && (
        <>
          {/* ── IDLE: host starts picking ── */}
          {phase === "idle" && (
            <div className="flex-1 flex items-center justify-center">
              {isHost ? (
                <button
                  onClick={startPicking}
                  className="px-10 py-5 bg-white text-gray-950 text-2xl sm:text-4xl font-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all animate-pulse-glow"
                >
                  New Round
                </button>
              ) : (
                <div className="text-2xl sm:text-3xl text-gray-400 font-semibold">
                  Waiting for {hostName} to start...
                </div>
              )}
            </div>
          )}

          {/* ── PICKING: team selection ── */}
          {phase === "picking" && (
            <div className="flex-1 flex flex-col items-center gap-3 w-full max-w-lg min-h-0">
              {/* Pick status */}
              <div className="flex gap-4 text-sm shrink-0">
                <span className={myPick ? "text-emerald-400" : "text-yellow-400"}>
                  {myName}: {myPick || "picking..."}
                </span>
                <span className="text-gray-600">|</span>
                <span className={opponentPick ? "text-emerald-400" : "text-gray-500"}>
                  {opponentName}: {opponentPick ? "Ready" : "picking..."}
                </span>
              </div>

              {/* Already picked */}
              {myPick ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="text-xl text-white font-bold">Your pick:</div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {myPick}
                  </div>
                  {bothPicked && isHost && (
                    <button
                      onClick={startRound}
                      className="mt-4 px-10 py-4 bg-white text-gray-950 text-xl sm:text-2xl font-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all animate-pulse-glow"
                    >
                      Start Round
                    </button>
                  )}
                  {bothPicked && !isHost && (
                    <div className="mt-4 text-gray-500 text-sm">
                      Waiting for {hostName} to start...
                    </div>
                  )}
                  {!bothPicked && (
                    <div className="mt-4 text-gray-500 text-sm">
                      Waiting for {opponentName} to pick...
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search teams..."
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    className="w-full py-2 px-4 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-gray-600 shrink-0"
                  />

                  {/* Team grid */}
                  <div className="flex-1 overflow-y-auto w-full min-h-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-2">
                      {filteredTeams.map((team) => (
                        <button
                          key={team}
                          onClick={() => pickTeam(team)}
                          className="py-3 px-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-all active:scale-95 text-center border border-gray-700 hover:border-blue-500"
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── COUNTDOWN / WAIT / GO / CONFIRM / RESULT ── */}
          {(phase === "countdown" || phase === "wait" || phase === "go" || phase === "confirm" || phase === "result") && (
            <>
              {/* Team matchup banner */}
              <div className="flex items-center gap-3 sm:gap-6 shrink-0 w-full max-w-2xl justify-center">
                <div className={`text-center flex-1 ${phase === "result" && room?.winner === "host" ? "opacity-100" : phase === "result" ? "opacity-40" : ""}`}>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">{hostName}</div>
                  <div className="text-sm sm:text-xl font-bold text-blue-400 truncate">
                    {room?.picks?.host || "???"}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-gray-600">VS</div>
                <div className={`text-center flex-1 ${phase === "result" && room?.winner === "guest" ? "opacity-100" : phase === "result" ? "opacity-40" : ""}`}>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">{guestName}</div>
                  <div className="text-sm sm:text-xl font-bold text-rose-400 truncate">
                    {room?.picks?.guest || "???"}
                  </div>
                </div>
              </div>

              {/* Center display */}
              <div className="flex items-center justify-center h-28 sm:h-36 shrink-0">
                {(phase === "countdown" || phase === "wait") && (
                  <div
                    key={room?.countdownValue}
                    className={`text-7xl sm:text-9xl font-black animate-countdown-pop ${
                      room?.countdownValue === "..."
                        ? "text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {room?.countdownValue}
                  </div>
                )}

                {phase === "go" && (
                  <div className="text-7xl sm:text-9xl font-black text-emerald-400 animate-countdown-pop">
                    GO!
                  </div>
                )}

                {phase === "confirm" && (
                  <div className="text-center animate-countdown-pop">
                    {iWon ? (
                      <ConfirmButton onDone={handleDone} deadline={room?.confirmDeadline || 0} />
                    ) : (
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                        {opponentName} clicked first...
                      </div>
                    )}
                  </div>
                )}

                {phase === "result" && (
                  <div className="text-center animate-countdown-pop">
                    {room?.foul ? (
                      <>
                        <div className="text-3xl sm:text-5xl font-black text-red-400 mb-2">
                          Too early!
                        </div>
                        <div className="text-lg sm:text-xl text-gray-400">
                          {iFouled ? "You jumped the gun!" : `${opponentName} jumped the gun!`}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`text-3xl sm:text-5xl font-black mb-2 ${
                            iWon ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {iWon ? "You win!" : "You lose!"}
                        </div>
                        {!room?.confirmed && !room?.foul && (
                          <div className="text-base sm:text-lg text-yellow-400 mb-1">
                            Too slow on "Done"!
                          </div>
                        )}
                        {winnerTeam && (
                          <div className="text-lg sm:text-xl text-gray-300 font-semibold mb-1">
                            {winnerTeam}
                          </div>
                        )}
                        {room?.confirmed && getWinnerReactionTime() !== null && (
                          <div className="text-base sm:text-lg text-gray-500">
                            {getWinnerReactionTime()} ms
                          </div>
                        )}
                      </>
                    )}

                    {/* Host confirm/deny point */}
                    {room?.scoreConfirmed === "pending" && (
                      <div className="mt-4">
                        {isHost ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-sm text-gray-400">Confirm point for {room.winner === "host" ? hostName : guestName}?</div>
                            <div className="flex gap-3">
                              <button
                                onClick={confirmPoint}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-xl transition-all active:scale-95"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={denyPoint}
                                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-lg font-bold rounded-xl transition-all active:scale-95"
                              >
                                Deny
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Waiting for {hostName} to confirm point...
                          </div>
                        )}
                      </div>
                    )}

                    {room?.scoreConfirmed === "confirmed" && (
                      <div className="mt-3 text-sm text-emerald-400 font-semibold">
                        Point confirmed!
                      </div>
                    )}
                    {room?.scoreConfirmed === "denied" && (
                      <div className="mt-3 text-sm text-red-400 font-semibold">
                        Point denied!
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Player button */}
              <div className="w-full max-w-md flex-1 max-h-48 sm:max-h-64 flex shrink-0">
                <button
                  className={getBtnClass()}
                  onClick={handleClick}
                  disabled={!canClick}
                >
                  <span className="block text-base sm:text-lg font-semibold mb-1 opacity-70">
                    {myName} — {myPick || "TAP!"}
                  </span>
                  <span className="block">TAP!</span>
                </button>
              </div>

              {/* Next round (only after host confirmed/denied, and no one reached 3 yet) */}
              {phase === "result" && (room?.scoreConfirmed === "confirmed" || room?.scoreConfirmed === "denied") && (room?.score.host || 0) < ROUNDS_TO_WIN && (room?.score.guest || 0) < ROUNDS_TO_WIN && (
                <>
                  {isHost ? (
                    <button
                      onClick={startPicking}
                      className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white text-lg sm:text-xl font-bold rounded-xl transition-all active:scale-95 shrink-0"
                    >
                      Next Round
                    </button>
                  ) : (
                    <div className="text-gray-500 text-sm shrink-0">
                      Waiting for {hostName} to start next round...
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── GAME OVER ── */}
          {phase === "gameover" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-countdown-pop">
              <div className="text-5xl sm:text-7xl font-black text-yellow-400">
                GAME!
              </div>
              <div className={`text-3xl sm:text-4xl font-bold ${room?.gameWinner === myRole ? "text-emerald-400" : "text-red-400"}`}>
                {room?.gameWinner === myRole ? "You win the game!" : `${opponentName} wins the game!`}
              </div>
              <div className="text-lg text-gray-400">
                Games: {room?.games?.host || 0} - {room?.games?.guest || 0}
              </div>
              {isHost ? (
                <button
                  onClick={startNewGame}
                  className="mt-4 px-10 py-4 bg-white text-gray-950 text-xl sm:text-2xl font-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all animate-pulse-glow"
                >
                  New Game
                </button>
              ) : (
                <div className="text-gray-500 text-sm mt-4">
                  Waiting for {hostName} to start new game...
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
