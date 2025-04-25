"use client"
import React, { useState } from 'react';

type ActiveButtonType = 'bfs' | 'dfs' | null;

const Option: React.FC = () => {
  const [activeButton, setActiveButton] = useState<ActiveButtonType>(null);

  const handleClick = (buttonType: 'bfs' | 'dfs') => {
    setActiveButton(buttonType === activeButton ? null : buttonType);
  };

  return (
    <div className='flex mt-3 text-blue-950 justify-center gap-8'>
      <button 
        className={`rounded-3xl px-3.5 py-2.5 transition-colors ${
          activeButton === 'bfs' 
            ? 'bg-blue-500 text-white' 
            : 'bg-blue-200 hover:bg-blue-400'
        }`}
        onClick={() => handleClick('bfs')}
      >
        Metode BFS
      </button>
      <button 
        className={`rounded-3xl px-3.5 py-2.5 transition-colors ${
          activeButton === 'dfs' 
            ? 'bg-blue-500 text-white' 
            : 'bg-blue-200 hover:bg-blue-400'
        }`}
        onClick={() => handleClick('dfs')}
      >
        Metode DFS
      </button>
    </div>
  );
};

export default Option;