"use client"
import ResultRenderer from '@/components/ResultRenderer';

export default function Home() {


  return (
    <main className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-700 font-bold mb-4">Recipe Search</h1>
        <p className="text-gray-600">
          Search for recipes and see the recipe tree using BFS, DFS, or bidirectional algorithms.
        </p>
    
      </div>
      
      {/* Result Renderer will listen for search results */}
      <ResultRenderer />
    </main>
  );
}