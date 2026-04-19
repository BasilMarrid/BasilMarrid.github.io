import { useState, useRef, useCallback, useEffect } from "react";

type GameState = "idle" | "countdown" | "waiting" | "result";

interface Score {
  p1: number;
  p2: number;
}

export default function ReactionGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [countdownValue, setCountdownValue] = useState<string>("");
  const [winner, setWinner] = useState<number | null>(null);
  const [foul, setFoul] = useState<number | null>(null);
  const [score, setScore] = useState<Score>({ p1: 0, p2: 0 });
  const [goTime, setGoTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const countdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (countdownTimer.current) clearTimeout(countdownTimer.current);
    if (goTimer.current) clearTimeout(goTimer.current);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const startGame = useCallback(() => {
    cleanup();
    setGameState("countdown");
    setWinner(null);
    setFoul(null);
    setReactionTime(null);

    const steps = ["3", "2", "1"];
    let i = 0;

    setCountdownValue(steps[0]);

    const tick = () => {
      i++;
      if (i < steps.length) {
        setCountdownValue(steps[i]);
        countdownTimer.current = setTimeout(tick, 1000);
      } else {
        // Random delay between 0.5s and 2.5s after "1" disappears
        const randomDelay = 500 + Math.random() * 2000;
        setCountdownValue("...");
        goTimer.current = setTimeout(() => {
          setCountdownValue("GO!");
          setGoTime(performance.now());
          setGameState("waiting");
        }, randomDelay);
      }
    };

    countdownTimer.current = setTimeout(tick, 1000);
  }, [cleanup]);

  const handlePlayerClick = useCallback(
    (player: number) => {
      if (gameState === "countdown") {
        // Clicked too early — foul
        cleanup();
        setFoul(player);
        setWinner(player === 1 ? 2 : 1);
        setScore((prev) => ({
          p1: player === 1 ? prev.p1 : prev.p1 + 1,
          p2: player === 2 ? prev.p2 : prev.p2 + 1,
        }));
        setGameState("result");
      } else if (gameState === "waiting") {
        // Valid click — first one wins
        cleanup();
        const rt = Math.round(performance.now() - goTime);
        setReactionTime(rt);
        setWinner(player);
        setScore((prev) => ({
          p1: player === 1 ? prev.p1 + 1 : prev.p1,
          p2: player === 2 ? prev.p2 + 1 : prev.p2,
        }));
        setGameState("result");
      }
    },
    [gameState, goTime, cleanup]
  );

  const playerBtnBase =
    "w-full h-full text-3xl sm:text-5xl font-black uppercase tracking-wider transition-all duration-150 select-none rounded-2xl";

  const getPlayerBtnClass = (player: number) => {
    if (gameState === "idle") return `${playerBtnBase} bg-gray-800 text-gray-600 cursor-not-allowed`;
    if (gameState === "result") {
      if (winner === player)
        return `${playerBtnBase} bg-emerald-600 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] cursor-default`;
      if (foul === player)
        return `${playerBtnBase} bg-red-600 text-white animate-shake cursor-default`;
      return `${playerBtnBase} bg-gray-700 text-gray-400 cursor-default`;
    }
    if (gameState === "countdown")
      return `${playerBtnBase} bg-yellow-600/80 hover:bg-yellow-500 text-white cursor-pointer active:scale-95`;
    // waiting (GO!)
    return `${playerBtnBase} bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer active:scale-95 animate-pulse-glow`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 gap-4 select-none">
      {/* Scoreboard */}
      <div className="flex items-center gap-6 text-lg sm:text-2xl font-bold">
        <span className="text-blue-400">P1: {score.p1}</span>
        <span className="text-gray-600">|</span>
        <span className="text-rose-400">P2: {score.p2}</span>
      </div>

      {/* Center display */}
      <div className="flex items-center justify-center h-32 sm:h-40">
        {gameState === "idle" && (
          <button
            onClick={startGame}
            className="px-10 py-5 bg-white text-gray-950 text-2xl sm:text-4xl font-black rounded-2xl hover:bg-gray-200 active:scale-95 transition-all animate-pulse-glow"
          >
            Start Game
          </button>
        )}

        {gameState === "countdown" && (
          <div
            key={countdownValue}
            className={`text-7xl sm:text-9xl font-black animate-countdown-pop ${
              countdownValue === "..." ? "text-gray-500" : "text-white"
            }`}
          >
            {countdownValue}
          </div>
        )}

        {gameState === "waiting" && (
          <div className="text-7xl sm:text-9xl font-black text-emerald-400 animate-countdown-pop">
            GO!
          </div>
        )}

        {gameState === "result" && (
          <div className="text-center animate-countdown-pop">
            {foul ? (
              <>
                <div className="text-3xl sm:text-5xl font-black text-red-400 mb-2">
                  Too early!
                </div>
                <div className="text-xl sm:text-2xl text-gray-400">
                  Player {foul} jumped the gun
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl sm:text-5xl font-black text-emerald-400 mb-2">
                  Player {winner} wins!
                </div>
                {reactionTime !== null && (
                  <div className="text-xl sm:text-2xl text-gray-400">
                    {reactionTime} ms reaction time
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Player buttons */}
      <div className="flex gap-4 w-full max-w-4xl flex-1 max-h-80 sm:max-h-96">
        <button
          className={getPlayerBtnClass(1)}
          onClick={() => handlePlayerClick(1)}
          disabled={gameState === "idle"}
        >
          <span className="text-blue-300 block text-base sm:text-lg font-semibold mb-1 opacity-70">
            Player 1
          </span>
          <span className="block">P1</span>
        </button>

        <button
          className={getPlayerBtnClass(2)}
          onClick={() => handlePlayerClick(2)}
          disabled={gameState === "idle"}
        >
          <span className="text-rose-300 block text-base sm:text-lg font-semibold mb-1 opacity-70">
            Player 2
          </span>
          <span className="block">P2</span>
        </button>
      </div>

      {/* Play again */}
      {gameState === "result" && (
        <button
          onClick={startGame}
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white text-lg sm:text-xl font-bold rounded-xl transition-all active:scale-95"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
