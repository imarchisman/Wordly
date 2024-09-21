import React, { useState, useEffect } from 'react';
import WordGrid from './WordGrid';
import { wordList } from './words';  // Import word list

// Function to get the word of the day
const getWordOfTheDay = () => {
  const today = new Date();
  const startDate = new Date('2024-01-01');
  const dayDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const wordIndex = dayDifference % wordList.length;
  return wordList[wordIndex];
};

// Function to validate word using API
const validateWord = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    return data.length > 0 && !data.title; // Word is valid if response contains entries
  } catch (error) {
    return false; // Invalid word
  }
};

function App() {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState(['', '', '', '', '', '']);
  const [currentGuess, setCurrentGuess] = useState('');
  const [revealedGuesses, setRevealedGuesses] = useState(['', '', '', '', '', '']); // Holds guesses that are revealed with colors
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setWord(getWordOfTheDay()); // Set word on initial load
  }, []);

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (gameOver) return;

      const { key } = event;
      if (key === 'Enter') {
        if (currentGuess.length === 5) {
          await handleGuess(); // Handle guess when Enter is pressed
        }
      } else if (key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1)); // Remove last character
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key.toLowerCase()); // Add new character
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentGuess, gameOver]);

  const handleGuess = async () => {
    if (currentGuess.length === 5 && guesses.includes('')) {
      const isValid = await validateWord(currentGuess);
      if (!isValid) {
        setError('Word doesn’t exist'); // Show error if word doesn't exist
        return;
      }

      const newGuesses = [...guesses];
      newGuesses[guesses.indexOf('')] = currentGuess;
      setGuesses(newGuesses);

      const newRevealedGuesses = [...revealedGuesses];
      newRevealedGuesses[guesses.indexOf('')] = currentGuess; // Reveal current guess when enter is hit
      setRevealedGuesses(newRevealedGuesses);

      if (currentGuess === word) {
        setGameOver(true);
        alert('Congratulations! You guessed the word.');
      } else if (!newGuesses.includes('')) {
        setGameOver(true);
        alert('Game Over! The word was ' + word);
      }

      setCurrentGuess('');
      setError(''); // Clear error after valid guess
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-5">Wordly Game</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error */}
      <WordGrid guesses={revealedGuesses} currentGuess={currentGuess} word={word} />
    </div>
  );
}

export default App;
