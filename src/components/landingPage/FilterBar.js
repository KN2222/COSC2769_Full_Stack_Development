import React, { useState } from "react";

export default function FilterBar({ onSelect }) {
  const [showLetters, setShowLetters] = useState(false);
  const letters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  return (
    <div className="mb-3">
      {showLetters ? (
        <div className="d-flex">
          {letters.map((letter) => (
            <button
              key={letter}
              className="btn btn-secondary me-2"
              onClick={() => {
                onSelect(letter);
              }}
            >
              {letter}
            </button>
          ))}
          <button
            className="btn btn-danger me-2"
            onClick={() => setShowLetters(false)}
          >
            Hide
          </button>
        </div>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => setShowLetters(true)}
        >
          Filter
        </button>
      )}
    </div>
  );
}
