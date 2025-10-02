"use client";

import { useMemo, useState } from "react";

type Player = "X" | "O";
type Cell = Player | null;

const INITIAL_BOARD: Cell[] = Array(9).fill(null);

function calculateWinner(cells: Cell[]) {
  // All win lines for 3x3 Tic Tac Toe
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ] as const;

  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a] as Player, line: [a, b, c] as [number, number, number] };
    }
  }
  return { winner: null as Player | null, line: null as [number, number, number] | null };
}

// PUBLIC_INTERFACE
export default function Home() {
  /** This is the main Tic Tac Toe page component. It renders the board, status, scores and reset control.
   * Local state only; no backend integration.
   */
  const [board, setBoard] = useState<Cell[]>(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [scores, setScores] = useState<{ X: number; O: number; draws: number }>({
    X: 0,
    O: 0,
    draws: 0,
  });

  const movesMade = useMemo(() => board.filter(Boolean).length, [board]);

  const { winner, line } = useMemo(() => calculateWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every((c) => c !== null), [board]);
  const isDraw = !winner && isBoardFull;

  const currentPlayer: Player = xIsNext ? "X" : "O";

  function handleCellClick(index: number) {
    // Ignore if occupied or game already ended
    if (board[index] || winner) return;

    setBoard((prev) => {
      const next = [...prev];
      next[index] = currentPlayer;
      return next;
    });
    setXIsNext((prev) => !prev);
  }

  function softReset() {
    // Reset the board but keep the scores.
    setBoard(INITIAL_BOARD);
    setXIsNext(true);
  }

  function hardReset() {
    // Reset everything including the scores.
    setBoard(INITIAL_BOARD);
    setXIsNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
  }

  // Update scores when game ends
  useMemo(() => {
    if (winner) {
      setScores((s) => ({ ...s, [winner]: s[winner] + 1 }));
    } else if (isDraw) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
    // We only want this to trigger when a terminal state is reached
  }, [winner, isDraw]);

  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw"
    : `Next player: ${currentPlayer}`;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full max-w-md"
        aria-label="Tic Tac Toe Game"
      >
        {/* Card Container */}
        <div className="rounded-2xl shadow-sm bg-white border border-black/5 overflow-hidden">
          {/* Header with gradient */}
          <header className="px-6 pt-6 pb-4 bg-gradient-to-b from-blue-500/10 to-gray-50">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111827]">
              Tic Tac Toe
            </h1>
            <p className="text-sm text-[#111827]/70 mt-1">
              Ocean Professional — minimalist browser game
            </p>

            {/* Status Row */}
            <div className="mt-4 flex items-center justify-between">
              <div
                className="inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-sm text-[#111827]"
                role="status"
                aria-live="polite"
              >
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full ${
                    winner
                      ? "bg-amber-500"
                      : isDraw
                      ? "bg-gray-400"
                      : currentPlayer === "X"
                      ? "bg-blue-600"
                      : "bg-amber-500"
                  }`}
                />
                <span className="font-medium">{statusText}</span>
              </div>

              <div className="text-xs text-[#111827]/60">
                Moves: <span className="font-semibold text-[#111827]">{movesMade}</span>/9
              </div>
            </div>
          </header>

          {/* Score Bar */}
          <section className="px-6 py-4 border-t border-black/5 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-blue-600/20 bg-blue-50/60 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wide text-blue-700/80">
                  X
                </div>
                <div className="text-lg font-semibold text-[#111827]">
                  {scores.X}
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-50/60 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wide text-amber-700/90">
                  O
                </div>
                <div className="text-lg font-semibold text-[#111827]">
                  {scores.O}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300/50 bg-gray-50 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wide text-gray-600">
                  Draws
                </div>
                <div className="text-lg font-semibold text-[#111827]">
                  {scores.draws}
                </div>
              </div>
            </div>
          </section>

          {/* Board */}
          <section className="px-6 pb-6 pt-2 bg-white">
            <div
              className="grid grid-cols-3 gap-3"
              role="grid"
              aria-label="Tic Tac Toe board"
            >
              {board.map((value, idx) => {
                const highlight = line?.includes(idx) ?? false;
                const isActive = value === null && !winner;
                return (
                  <button
                    key={idx}
                    role="gridcell"
                    aria-label={`Cell ${idx + 1}${value ? ` contains ${value}` : ""}`}
                    aria-disabled={!isActive}
                    onClick={() => handleCellClick(idx)}
                    className={[
                      "relative aspect-square rounded-xl border bg-white transition-all",
                      "flex items-center justify-center text-4xl sm:text-5xl font-semibold",
                      "shadow-[inset_0_1px_0_0_rgba(0,0,0,0.03)]",
                      isActive
                        ? "hover:shadow-md hover:-translate-y-0.5"
                        : "cursor-default",
                      highlight
                        ? "border-amber-400 ring-2 ring-amber-300/60"
                        : "border-black/10",
                    ].join(" ")}
                    style={{
                      color:
                        value === "X"
                          ? "#2563EB" // primary blue
                          : value === "O"
                          ? "#F59E0B" // amber
                          : "#111827",
                      background:
                        value && highlight
                          ? "linear-gradient(to bottom right, rgba(245,158,11,0.08), rgba(17,24,39,0.02))"
                          : "white",
                    }}
                  >
                    <span className="drop-shadow-sm">{value ?? ""}</span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={softReset}
                className="inline-flex items-center justify-center rounded-lg border border-blue-600/30 bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-600/15 active:bg-blue-600/20 transition-colors"
              >
                Reset Board
              </button>
              <button
                onClick={hardReset}
                className="inline-flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/15 active:bg-red-500/20 transition-colors"
              >
                Reset All
              </button>
              <div className="sm:ml-auto text-xs text-[#111827]/60">
                Tip: Click any empty cell to place{" "}
                <span
                  className={
                    currentPlayer === "X" ? "text-blue-700 font-semibold" : "text-amber-600 font-semibold"
                  }
                >
                  {currentPlayer}
                </span>
                .
              </div>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[#111827]/50 mt-4">
          Built with Next.js, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
