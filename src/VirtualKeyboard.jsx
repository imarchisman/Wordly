import React from 'react';

const VirtualKeyboard = ({ onKeyPress }) => {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const handleButtonClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              className="bg-gray-300 p-2 rounded-md text-xl"
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
      <div className="flex space-x-2">
        <button
          onClick={() => handleButtonClick('Enter')}
          className="bg-green-500 p-2 rounded-lg text-xl"
        >
          Enter
        </button>
        <button
          onClick={() => handleButtonClick('Backspace')}
          className="bg-red-500 p-2 rounded-lg text-xl"
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
