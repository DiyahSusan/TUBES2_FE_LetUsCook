"use client"
import ResultRenderer from '@/components/ResultRenderer';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showTestButton, setShowTestButton] = useState(true);

  // Test connection to backend
  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/ping');
      const data = await response.json();
      console.log("Backend connection test:", data);
      alert(`Server connection successful! Response: ${JSON.stringify(data)}`);
    } catch (err) {
      console.error("Backend connection failed:", err);
      alert(`Server connection failed! Make sure your backend is running on port 8080.\nError: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-700 font-bold mb-4">Recipe Search</h1>
        <p className="text-gray-600">
          Search for recipes and see the recipe tree using BFS or DFS algorithms.
        </p>
        
        {showTestButton && (
          <div className="mt-4">
            <button 
              onClick={() => {
                testBackendConnection();
                setShowTestButton(false);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Test Backend Connection
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Click to verify connection to your Go backend server
            </p>
          </div>
        )}
      </div>
      
      {/* Result Renderer will listen for search results */}
      <ResultRenderer />
    </main>
  );
}