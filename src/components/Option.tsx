"use client"
import { useSearch } from '@/components/SearchContext';
import { useState, useEffect } from 'react';

export default function Option() {
  const { 
    mode, 
    algorithm, 
    recipeCount: contextCount, // Ambil dari context
    setMode, 
    setAlgorithm,
    setRecipeCount // Gunakan setter dari context
  } = useSearch();

  const [localCount, setLocalCount] = useState(contextCount);

  useEffect(() => {
    setRecipeCount(localCount);
  }, [localCount]);


  return (
    <div className="options-container p-4 bg-gray-50 rounded-md mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="mode-selector">
          <h3 className="text-sm font-medium mb-2 text-gray-600">Recipe Mode:</h3>
          <div className="flex gap-2">
            <button 
              type="button"
              className={`px-3 py-1 rounded border ${mode === 'single' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setMode('single')}
            >
              Single Recipe
            </button>
            <button 
              type="button"
              className={`px-3 py-1 rounded border ${mode === 'multiple' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setMode('multiple')}
            >
              Multiple Recipes
            </button>
          </div>
        </div>
        
        <div className="algorithm-selector">
          <h3 className="text-sm font-medium mb-2 text-gray-600">Algorithm:</h3>
          <div className="flex gap-2">
            <button 
              type="button"
              className={`px-3 py-1 rounded border ${algorithm === 'bfs' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setAlgorithm('bfs')}
            >
              BFS
            </button>
            <button 
              type="button"
              className={`px-3 py-1 rounded border ${algorithm === 'dfs' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setAlgorithm('dfs')}
            >
              DFS
            </button>
            <button 
              type="button"
              className={`px-3 py-1 rounded border ${algorithm === 'bidirectional' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setAlgorithm('bidirectional')}
            >
              Bidirectional
            </button>
          </div>
        </div>

        {/* Input box untuk jumlah resep (muncul hanya saat multiple) */}
        {mode === 'multiple' && (
          <div className="count-selector">
            <h3 className="text-sm font-medium mb-2 text-gray-600">Number of Recipes:</h3>
            <input
              type="number"
              min="1"
              max="20"
              value={contextCount}
              onChange={(e) => setRecipeCount(parseInt(e.target.value) || 1)}
              className="px-3 py-1 rounded border border-gray-300 w-20 text-gray-700"
            />
          </div>
        )}
      </div>
      
      <div className="selections mt-3 text-sm text-gray-700">
        <p>
          {mode && `Mode: ${mode === 'single' ? 'Single Recipe' : 'Multiple Recipes'}`}
          {mode === 'multiple' && ` (${contextCount} recipes)`}
          {mode && algorithm && ' | '}
          {algorithm && `Algorithm: ${algorithm.toUpperCase()}`}
        </p>
      </div>
    </div>
  );
}