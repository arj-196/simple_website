"use client";

import { useEffect, useMemo, useState } from "react";

const scoreStorageKey = "ttt-score";

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function getWinner(cells) {
  for (const [a, b, c] of winLines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { player: cells[a], line: [a, b, c] };
    }
  }

  return null;
}

function getKittyMove(cells) {
  const emptyCells = cells
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  if (emptyCells.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

export default function TicTacToe() {
  const emptyScore = { xWins: 0, oWins: 0, draws: 0 };
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState(emptyScore);
  const [resultRecorded, setResultRecorded] = useState(false);
  const [mode, setMode] = useState("human");

  const winner = useMemo(() => getWinner(cells), [cells]);
  const isDraw = !winner && cells.every((cell) => cell !== null);
  const isKittyMode = mode === "kitty";

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem(scoreStorageKey);

      if (savedScore) {
        const parsedScore = JSON.parse(savedScore);
        setScore({
          xWins: Number(parsedScore.xWins) || 0,
          oWins: Number(parsedScore.oWins) || 0,
          draws: Number(parsedScore.draws) || 0
        });
      }
    } catch {
      // Ignore storage errors and fall back to defaults.
    }
  }, []);

  useEffect(() => {
    if (resultRecorded) {
      return;
    }

    if (!winner && !isDraw) {
      return;
    }

    setScore((current) => {
      const nextScore = { ...current };

      if (winner?.player === "X") {
        nextScore.xWins += 1;
      } else if (winner?.player === "O") {
        nextScore.oWins += 1;
      } else {
        nextScore.draws += 1;
      }

      try {
        localStorage.setItem(scoreStorageKey, JSON.stringify(nextScore));
      } catch {
        // Ignore storage errors and still update in-memory score.
      }

      return nextScore;
    });

    setResultRecorded(true);
  }, [winner, isDraw, resultRecorded]);

  useEffect(() => {
    if (!isKittyMode || isXTurn || winner || isDraw) {
      return;
    }

    const timerId = setTimeout(() => {
      setCells((currentCells) => {
        const kittyMove = getKittyMove(currentCells);

        if (kittyMove === null) {
          return currentCells;
        }

        const nextCells = [...currentCells];
        nextCells[kittyMove] = "O";
        return nextCells;
      });

      setIsXTurn(true);
    }, 350);

    return () => clearTimeout(timerId);
  }, [isKittyMode, isXTurn, winner, isDraw]);

  function handleMove(index) {
    if (cells[index] || winner || isDraw || (isKittyMode && !isXTurn)) {
      return;
    }

    const nextCells = [...cells];
    nextCells[index] = isXTurn ? "X" : "O";
    setCells(nextCells);
    setIsXTurn((turn) => !turn);
  }

  function resetGame() {
    setCells(Array(9).fill(null));
    setIsXTurn(true);
    setResultRecorded(false);
  }

  function resetScoreboard() {
    setScore(emptyScore);

    try {
      localStorage.removeItem(scoreStorageKey);
    } catch {
      // Ignore storage errors and still reset in-memory score.
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    resetGame();
  }

  let status = `Turn: ${isXTurn ? "X" : isKittyMode ? "Kitty bot (O)" : "O"}`;

  if (winner) {
    if (winner.player === "O" && isKittyMode) {
      status = "Winner: Kitty bot";
    } else {
      status = `Winner: ${winner.player}`;
    }
  } else if (isDraw) {
    status = "Draw game";
  }

  return (
    <article className="panel ttt-panel">
      <p className="panel-label">Tic-tac-toe</p>
      <h2>Quick game</h2>

      <div className="ttt-mode" role="group" aria-label="Game mode">
        <button
          type="button"
          className={`ttt-mode-button${!isKittyMode ? " ttt-mode-button-active" : ""}`}
          onClick={() => changeMode("human")}
          aria-pressed={!isKittyMode}
        >
          2 players
        </button>
        <button
          type="button"
          className={`ttt-mode-button${isKittyMode ? " ttt-mode-button-active" : ""}`}
          onClick={() => changeMode("kitty")}
          aria-pressed={isKittyMode}
        >
          Play against kitty bot
        </button>
      </div>

      <p className="panel-copy ttt-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>

      <div className="ttt-board" role="grid" aria-label="Tic tac toe board">
        {cells.map((cell, index) => (
          <button
            key={index}
            type="button"
            className={`ttt-cell${winner?.line.includes(index) ? " ttt-cell-win" : ""}`}
            onClick={() => handleMove(index)}
            aria-label={`Cell ${index + 1}`}
            disabled={Boolean(cell || winner || isDraw || (isKittyMode && !isXTurn))}
          >
            {cell}
          </button>
        ))}
      </div>

      <dl className="ttt-scoreboard" aria-label="Score tracker">
        <div>
          <dt>{isKittyMode ? "You (X) wins" : "X wins"}</dt>
          <dd>{score.xWins}</dd>
        </div>
        <div>
          <dt>{isKittyMode ? "Kitty bot wins" : "O wins"}</dt>
          <dd>{score.oWins}</dd>
        </div>
        <div>
          <dt>Draws</dt>
          <dd>{score.draws}</dd>
        </div>
      </dl>

      <div className="ttt-actions">
        <button type="button" className="ttt-reset" onClick={resetGame}>
          Reset game
        </button>
        <button type="button" className="ttt-reset" onClick={resetScoreboard}>
          Reset scoreboard
        </button>
      </div>
    </article>
  );
}
