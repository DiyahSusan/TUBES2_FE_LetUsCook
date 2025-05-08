"use client";
import { useState, useEffect } from "react";

interface RecipeTree {
  name: string;
  children?: Pair_recipe[];
}

interface Pair_recipe {
  first: RecipeTree;
  second: RecipeTree;
}

export default function ResultRenderer() {
  const [data, setData] = useState<RecipeTree | RecipeTree[] | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const handleSearchResults = (event: CustomEvent) => {
      console.log("Received search results:", event.detail);
      setData(event.detail);
    };

    console.log("Adding event listener for search results");

    window.addEventListener(
      "search-results",
      handleSearchResults as EventListener
    );

    return () => {
      console.log("Cleaning up event listener for search results");
      window.removeEventListener(
        "search-results",
        handleSearchResults as EventListener
      );
    };
  }, []);

  console.log("Data di ResultRenderer:", data); // Tambahkan log ini

  if (!data) {
    return <div className="p-4 text-gray-500">No results available</div>;
  }

  if (typeof data !== "object" || (!Array.isArray(data) && !data.name)) {
    return <div className="p-4 text-red-500">Invalid data format received</div>;
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const renderNode = (node: RecipeTree | undefined, depth = 0) => {
    console.log("Rendering node:", node, "at depth:", depth); // Tambahkan log ini
    if (!node) {
      console.log("Invalid node encountered!"); // Pastikan log ini muncul saat error
      return <div className="p-4 text-red-500">Invalid node encountered</div>;
    }

    const nodeId = `${node.name || "unnamed"}-${depth}`;
    const isExpanded = expandedNodes[nodeId] || false;

    return (
      <div
        key={nodeId}
        className="recipe-node border-l-2 border-gray-300 pl-4 my-2"
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div
          className="node-header flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() =>
            node.children && node.children.length > 0 && toggleNode(nodeId)
          }
        >
          {node.children && node.children.length > 0 && (
            <span className="expand-icon mr-2">{isExpanded ? "▼" : "►"}</span>
          )}
          <span className="node-title font-medium">
            {node.name || "Unnamed Node"}
          </span>
        </div>

        {isExpanded && node.children && node.children.length > 0 && (
          <div className="children ml-4">
            {node.children.map((pair, index) => (
              <div key={`${nodeId}-pair-${index}`}>
                {renderPair(pair, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPair = (pair: Pair_recipe | undefined, depth: number) => {
    console.log("Rendering pair:", pair, "at depth:", depth); // Tambahkan log ini
    if (!pair) {
      console.log("Invalid pair encountered!"); // Tambahkan log ini
      return <div className="p-4 text-red-500">Invalid pair encountered</div>;
    }
    return (
      <>
        {renderNode(pair.first, depth)}
        {renderNode(pair.second, depth)}
      </>
    );
  };

  if (Array.isArray(data)) {
    return (
      <div className="results-tree p-4">
        <h2 className="text-xl text-gray-700 font-bold mb-4">Recipe Results</h2>
        {data.map((item) => renderNode(item))}
      </div>
    );
  } else {
    return (
      <div className="results-tree p-4">
        <h2 className="text-xl text-gray-700 font-bold mb-4">Recipe Result</h2>
        {renderNode(data)}
      </div>
    );
  }
}