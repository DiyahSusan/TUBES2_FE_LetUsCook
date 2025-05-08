"use client"
import { useSearch } from '@/components/SearchContext';

export default function Option() {
  const { mode, algorithm, setMode, setAlgorithm } = useSearch();

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
          </div>
        </div>
      </div>
      
      <div className="selections mt-3 text-sm text-gray-600">
        <p>
          {mode && `Mode: ${mode === 'single' ? 'Single Recipe' : 'Multiple Recipes'}`}
          {mode && algorithm && ' | '}
          {algorithm && `Algorithm: ${algorithm.toUpperCase()}`}
        </p>
      </div>
    </div>
  );
}