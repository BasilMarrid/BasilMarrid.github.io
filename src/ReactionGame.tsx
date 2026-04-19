import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "./firebase";
import {
  ref,
  set,
  onValue,
  update,
  remove,
  onDisconnect,
  serverTimestamp,
  get,
} from "firebase/database";

// ── Types ──────────────────────────────────────────────────────────
type Phase = "idle" | "countdown" | "wait" | "go" | "result";

interface RoomData {
  host: string;
  guest?: string;
  hostName: string;
  guestName?: string;
  phase: Phase;
  countdownValue?: string;
  goTimestamp?: number;
  clicks?: { [playerId: string]: number }; // timestamp of click
  foul?: string; // playerId who clicked early
  winner?: string;
  round: number;
  score: { host: number; guest: number };
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
        // room was deleted
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
    if (!name) {
      setError("Enter your name first");
      return;
    }
    const code = generateRoomCode();
    const roomRef = ref(db, `rooms/${code}`);
    const initial: RoomData = {
      host: playerId,
      hostName: name,
      phase: "idle",
      round: 0,
      score: { host: 0, guest: 0 },
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
    if (!name) {
      setError("Enter your name first");
      return;
    }
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

  // ── Host: run countdown sequence ──────────────────────────────
  const startRound = useCallback(async () => {
    if (!isHost || !roomCode) return;
    const roomRef = ref(db, `rooms/${roomCode}`);
    clearTimers();

    await update(roomRef, {
      phase: "countdown",
      countdownValue: "3",
      clicks: null,
      foul: null,
      winner: null,
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

    // Random delay 1-3s after countdown ends
    const randomDelay = 1000 + Math.random() * 2000;
    const t4 = setTimeout(async () => {
      // Check if someone fouled during wait
      const snap = await get(ref(db, `rooms/${roomCode}/foul`));
      if (snap.exists()) return; // already fouled, don't show GO
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
      // Foul — clicked too early
      const otherIsHost = isHost ? false : true;
      const winnerKey = isHost ? "guest" : "host";
      clearTimers();
      await update(ref(db, `rooms/${roomCode}`), {
        phase: "result",
        foul: playerId,
        winner: winnerKey,
        [`score/${winnerKey}`]: (room.score[winnerKey] || 0) + 1,
      });
    } else if (phase === "go") {
      // Valid click
      const clickTime = Date.now();
      const myKey = isHost ? "host" : "guest";
      const otherKey = isHost ? "guest" : "host";

      // Write my click
      await update(ref(db, `rooms/${roomCode}/clicks`), {
        [myKey]: clickTime,
      });

      // Re-read to see if other player already clicked
      const snap = await get(ref(db, `rooms/${roomCode}/clicks`));
      const clicks = snap.val() || {};

      if (clicks[otherKey]) {
        // Both clicked — determine winner
        const myTime = clicks[myKey];
        const otherTime = clicks[otherKey];
        const winnerKey = myTime <= otherTime ? myKey : otherKey;
        await update(ref(db, `rooms/${roomCode}`), {
          phase: "result",
          winner: winnerKey,
          [`score/${winnerKey}`]: (room.score[winnerKey] || 0) + 1,
        });
      }
    }
  }, [room, roomCode, isHost, playerId, clearTimers]);

  // ── Guest: watch for both clicks to resolve winner ────────────
  useEffect(() => {
    if (!room || room.phase !== "go" || !roomCode) return;
    const clicks = room.clicks;
    if (!clicks) return;
    if (clicks.host && clicks.guest && !room.winner) {
      // Both clicked, resolve
      const winnerKey = clicks.host <= clicks.guest ? "host" : "guest";
      update(ref(db, `rooms/${roomCode}`), {
        phase: "result",
        winner: winnerKey,
        [`score/${winnerKey}`]: (room.score[winnerKey] || 0) + 1,
      });
    }
  }, [room, roomCode]);

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
          Create a room and share the code with a friend. Who clicks first after GO?
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <input
            type="text"
            placeholder="Your name"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              setError("");
            }}
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

  const myName = isHost ? room?.hostName : room?.guestName;
  const opponentName = isHost ? room?.guestName : room?.hostName;
  const myLabel = `${myName || "You"} (You)`;
  const opponentLabel = opponentName || "Opponent";

  const getReactionTime = () => {
    if (!room?.clicks || !room.goTimestamp) return null;
    const myClick = room.clicks[myRole];
    if (!myClick) return null;
    return myClick - room.goTimestamp;
  };

  const getWinnerReactionTime = () => {
    if (!room?.clicks || !room.goTimestamp || !room.winner) return null;
    const winnerClick = room.clicks[room.winner];
    if (!winnerClick) return null;
    return winnerClick - room.goTimestamp;
  };

  const iWon = room?.winner === myRole;
  const iFouled = room?.foul === playerId;

  // Button styling
  const getBtnClass = () => {
    const base =
      "w-full flex-1 text-3xl sm:text-5xl font-black uppercase tracking-wider transition-all duration-150 select-none rounded-2xl";
    if (waitingForOpponent || phase === "idle")
      return `${base} bg-gray-800 text-gray-600 cursor-not-allowed`;
    if (phase === "result") {
      if (iWon) return `${base} bg-emerald-600 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] cursor-default`;
      if (iFouled) return `${base} bg-red-600 text-white animate-shake cursor-default`;
      return `${base} bg-gray-700 text-gray-400 cursor-default`;
    }
    if (phase === "countdown" || phase === "wait")
      return `${base} bg-yellow-600/80 hover:bg-yellow-500 text-white cursor-pointer active:scale-95`;
    // go
    return `${base} bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer active:scale-95 animate-pulse-glow`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 gap-3 select-none">
      {/* Top bar: room code + scores + leave */}
      <div className="flex items-center justify-between w-full max-w-4xl">
        <button
          onClick={leaveRoom}
          className="text-gray-500 hover:text-white text-sm transition-colors"
        >
          Leave
        </button>
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
        <div className="flex gap-3 text-lg font-bold items-center">
          <span className="text-blue-400">{room?.hostName} {room?.score.host || 0}</span>
          <span className="text-gray-600">-</span>
          <span className="text-rose-400">{room?.score.guest || 0} {room?.guestName}</span>
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
          {/* Center display */}
          <div className="flex items-center justify-center h-28 sm:h-36">
            {phase === "idle" && isHost && (
              <button
                onClick={startRound}
                className="px-10 py-5 bg-white text-gray-950 text-2xl sm:text-4xl font-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all animate-pulse-glow"
              >
                Start Round
              </button>
            )}

            {phase === "idle" && !isHost && (
              <div className="text-2xl sm:text-3xl text-gray-400 font-semibold">
                Waiting for {room?.hostName || "host"} to start...
              </div>
            )}

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

            {phase === "result" && (
              <div className="text-center animate-countdown-pop">
                {room?.foul ? (
                  <>
                    <div className="text-3xl sm:text-5xl font-black text-red-400 mb-2">
                      Too early!
                    </div>
                    <div className="text-lg sm:text-xl text-gray-400">
                      {iFouled ? "You jumped the gun!" : `${opponentLabel} jumped the gun!`}
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
                    {getWinnerReactionTime() !== null && (
                      <div className="text-lg sm:text-xl text-gray-400">
                        {getWinnerReactionTime()} ms
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Player button */}
          <div className="w-full max-w-md flex-1 max-h-64 sm:max-h-80 flex">
            <button
              className={getBtnClass()}
              onClick={handleClick}
              disabled={!canClick}
            >
              <span className="block text-base sm:text-lg font-semibold mb-1 opacity-70">
                {myLabel}
              </span>
              <span className="block">TAP!</span>
            </button>
          </div>

          {/* Opponent status */}
          <div className="text-sm text-gray-500">
            {phase === "go" && !room?.clicks?.[opponentRole] && (
              <span>{opponentLabel} hasn't clicked yet...</span>
            )}
            {phase === "go" && room?.clicks?.[opponentRole] && !room?.clicks?.[myRole] && (
              <span className="text-yellow-400">{opponentLabel} already clicked!</span>
            )}
          </div>

          {/* Play again (host only) */}
          {phase === "result" && isHost && (
            <button
              onClick={startRound}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white text-lg sm:text-xl font-bold rounded-xl transition-all active:scale-95"
            >
              Next Round
            </button>
          )}
          {phase === "result" && !isHost && (
            <div className="text-gray-500 text-sm">
              Waiting for {room?.hostName || "host"} to start next round...
            </div>
          )}
        </>
      )}
    </div>
  );
}
