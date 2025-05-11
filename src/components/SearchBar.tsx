"use client"
import { useState } from 'react';
import { useSearch } from '@/components/SearchContext';

export default function SearchBar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    mode, 
    algorithm,
    recipeCount 
  } = useSearch();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery) {
      setError("Please enter a search query");
      return;
    }

    if (!mode) {
      setError("Please select a mode");
      return;
    }

    if (!algorithm) {
      setError("Please select an algorithm");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Sending request:", { 
        query: searchQuery, 
        mode, 
        algorithm,
        recipeCount 
      });
      
      const response = await fetch('http://localhost:8080/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          mode: mode,
          algorithm: algorithm,
          countRicipe: recipeCount // Pastikan nama field sesuai dengan backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch results');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      window.dispatchEvent(new CustomEvent('search-results', { 
        detail: data.data 
      }));
      
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container justify-items-center">
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-2xl p-7">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter recipe"
          className="search-input flex-grow p-2 border rounded text-gray-700"
        />
        
        <button 
          type="submit" 
          className="search-btn bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && <div className="error-message text-red-500 mt-2">{error}</div>}
      {loading && <div className="loading text-gray-500 mt-2">Loading...</div>}
    </div>
  );
}