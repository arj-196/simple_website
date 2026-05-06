"use client";

import { useMemo, useState } from "react";

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
      return cells[a];
    }
  }

  return null;
}

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = useMemo(() => getWinner(cells), [cells]);
  const isDraw = !winner && cells.every((cell) => cell !== null);

  function handleMove(index) {
    if (cells[index] || winner) {
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
  }

  let status = `Turn: ${isXTurn ? "X" : "O"}`;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw game";
  }

  return (
    <article className="panel ttt-panel">
      <p className="panel-label">Tic-tac-toe</p>
      <h2>Quick game</h2>
      <p className="panel-copy ttt-status">{status}</p>

      <div className="ttt-board" role="grid" aria-label="Tic tac toe board">
        {cells.map((cell, index) => (
          <button
            key={index}
            type="button"
            className="ttt-cell"
            onClick={() => handleMove(index)}
            aria-label={`Cell ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button type="button" className="ttt-reset" onClick={resetGame}>
        Reset game
      </button>
    </article>
  );
}
