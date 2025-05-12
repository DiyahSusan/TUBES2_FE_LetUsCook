"use client"
import { useState } from 'react';
import { useSearch } from './SearchContext'; 

interface SearchComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResultsReceived?: (results: any) => void;
}

export default function SearchComponent({ onResultsReceived }: SearchComponentProps) {
  const { mode, algorithm, searchQuery, recipeCount , setSearchQuery, setMode, setAlgorithm} = useSearch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!searchQuery) {
      setError("Please enter a search query");
      return;
    }

    if (!mode) {
      setError("Please select a mode (single or multiple)");
      return;
    }

    if (!algorithm) {
      setError("Please select an algorithm (BFS or DFS)");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Sending request:", { query: searchQuery, mode, algorithm, recipeCount});
      
      const response = await fetch('https://tubes2beletuscook-production.up.railway.app/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          mode: mode,
          algorithm: algorithm,
          recipeCount: recipeCount
        }),
      });

      console.log("Raw response:", response);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch results');
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      // Set local results state
      setResults(data.data);
      
      // Also pass results to parent component if callback provided
      if (onResultsReceived) {
        onResultsReceived(data.data);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : 'An error occurred during search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
          className="search-input"
        />
        
        <div className="mode-selector">
          <button 
            type="button"
            className={`mode-btn ${mode === 'single' ? 'active' : ''}`}
            onClick={() => setMode('single')}
          >
            Single Recipe
          </button>
          <button 
            type="button"
            className={`mode-btn ${mode === 'multiple' ? 'active' : ''}`}
            onClick={() => setMode('multiple')}
          >
            Multiple Recipes
          </button>
        </div>
        
        <div className="algorithm-selector">
          <button 
            type="button"
            className={`algo-btn ${algorithm === 'bfs' ? 'active' : ''}`}
            onClick={() => setAlgorithm('bfs')}
          >
            BFS
          </button>
          <button 
            type="button"
            className={`algo-btn ${algorithm === 'dfs' ? 'active' : ''}`}
            onClick={() => setAlgorithm('dfs')}
          >
            DFS
          </button>
          {/* <button 
            type="button"
            className={`algo-btn ${algorithm === 'bidirectional' ? 'active' : ''}`}
            onClick={() => setAlgorithm('bidirectional')}
          >
            Bidirectional
          </button> */}
        </div>
        
        <button 
          type="submit" 
          className="search-btn"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="loading">
          Loading results...
        </div>
      )}
      
      {/* You can choose to show results here or rely on the parent component */}
      {results && !loading && !onResultsReceived && (
        <div className="results-container">
          <h2>Search Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}