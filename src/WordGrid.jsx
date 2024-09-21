import React from 'react';

const countLetters = (word) => {
  const counts = {};
  for (const char of word) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
};

const WordGrid = ({ guesses, currentGuess, word }) => {
  return (
    <div className="grid grid-rows-6 gap-4">
      {guesses.map((guess, rowIndex) => {
        const correctLetterCount = countLetters(word); // Count letters in the main word

        return (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const char = guess[colIndex] || (rowIndex === guesses.indexOf('') ? currentGuess[colIndex] : '');
              let correct = false;
              let isPresent = false;

              // Show only after guess is fully submitted
              if (guess.length === 5) {
                if (char === word[colIndex]) {
                  correct = true;
                  correctLetterCount[char]--; // Decrement count of correct matches
                } else if (!correct && word.includes(char) && correctLetterCount[char] > 0) {
                  isPresent = true;
                  correctLetterCount[char]--; // Decrement count for letters in the wrong position
                }
              }

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 flex items-center justify-center text-2xl font-bold ${
                    correct ? 'bg-green-500' : isPresent ? 'bg-yellow-500' : 'bg-gray-200'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordGrid;
