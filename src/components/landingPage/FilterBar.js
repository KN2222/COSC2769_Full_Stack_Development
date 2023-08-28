import React from "react";

export default function FilterBar({ onSelect }) {
  const letters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  return (
    <div className="mb-3">
      {letters.map((letter) => (
        <button
          key={letter}
          className="btn btn-secondary me-2"
          onClick={() => onSelect(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
