"use client";
import { useState, useEffect } from "react";

import elementsData from '../public/elements.json';

interface RecipeTree {
  name: string;
  children?: Pair_recipe[];
}

interface Pair_recipe {
  First: RecipeTree;
  Second: RecipeTree;
}

interface ElementData {
  name: string;
  image_url: string;
}

export default function EnhancedTreeRenderer() {
  const [data, setData] = useState<RecipeTree | RecipeTree[] | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});
  const [elements, setElements] = useState<Record<string, ElementData>>({});

  useEffect(() => {
    // mapping of element names to their img
    const elementMap: Record<string, ElementData> = {};
    elementsData.forEach(element => {
      elementMap[element.name] = element;
    });
    setElements(elementMap);
    
    console.log("Loaded elements:", elementMap);
  }, []);

  useEffect(() => {
    const handleSearchResults = (event: CustomEvent) => {
      const { tree, count, duration } = event.detail;
      if (!tree || typeof count !== "number") return;
      
      setData(tree);
      setCount(count);
      setDuration(duration);
    };

    window.addEventListener("search-results", handleSearchResults as EventListener);
    return () => window.removeEventListener("search-results", handleSearchResults as EventListener);
  }, []);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const getElementImage = (name: string) => {
    // cek apakah elemen ada dan punya image_url
    if (elements[name]?.image_url) {
      let url = elements[name].image_url;
      
      if (url.includes("wikia.nocookie.net") || url.includes("static.wikia")) {
        url = url.split(/\?|\/revision\/latest/)[0];
        
        if (!url.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
          url += ".png";
        }
      }
      
      return url;
    } 
    return "/api/placeholder/40/40";
  };

  const renderCenteredTree = (node: RecipeTree | undefined) => {
    if (!node) return null;
    
    const nodeId = `${node.name}`;
    const isExpanded = expandedNodes[nodeId] ?? true;
    const hasChildren = node.children && node.children.length > 0;
    const imageUrl = getElementImage(node.name);

    return (
      <div className="flex flex-col items-center">
        {/* node content */}
        <div 
          className={`px-4 py-3 rounded-lg border-2 border-blue-400 bg-blue-50 hover:bg-blue-100 
                    ${hasChildren ? 'cursor-pointer' : ''} mb-4 shadow-md`}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          <div className="flex items-center">
            {hasChildren && (
              <span className="mr-2 text-blue-600">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
            <div className="w-10 h-10 mr-2 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
              <img 
                src={imageUrl} 
                alt={node.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/40/40";
                }}
              />
            </div>
            <span className="font-bold text-blue-800">{node.name}</span>
          </div>
        </div>

        {/* vertical connector */}
        {isExpanded && hasChildren && (
          <div className="h-8 border-l-2 border-blue-300"></div>
        )}

        {/* children container */}
        {isExpanded && hasChildren && (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-8">
              {node.children?.map((pair, index) => (
                <div key={`${nodeId}-pair-${index}`} className="flex flex-col items-center">
                  <div className="flex justify-center gap-8">
                    <div className="flex flex-col items-center">
                      {pair.First && (
                        <div className="flex flex-col items-center">
                          <div className="h-6 border-l-2 border-blue-300"></div>
                          {renderChildNode(pair.First, `${nodeId}-first-${index}`)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      {pair.Second && (
                        <div className="flex flex-col items-center">
                          <div className="h-6 border-l-2 border-blue-300"></div>
                          {renderChildNode(pair.Second, `${nodeId}-second-${index}`)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderChildNode = (node: RecipeTree, keyPrefix: string) => {
    if (!node) return null;
    
    const nodeId = `${keyPrefix}-${node.name}`;
    const isExpanded = expandedNodes[nodeId] ?? true;
    const hasChildren = node.children && node.children.length > 0;
    const imageUrl = getElementImage(node.name);

    return (
      <div className="flex flex-col items-center">
        {/* node content */}
        <div 
          className={`px-3 py-2 rounded-lg border border-green-400 bg-green-50 hover:bg-green-100 
                    ${hasChildren ? 'cursor-pointer' : ''} shadow-sm`}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          <div className="flex items-center">
            {hasChildren && (
              <span className="mr-1 text-green-600">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
            <div className="w-8 h-8 mr-2 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
              <img 
                src={imageUrl} 
                alt={node.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/placeholder/40/40";
                }}
              />
            </div>
            <span className="font-medium text-green-800">{node.name}</span>
          </div>
        </div>

        {/* vertical connector */}
        {isExpanded && hasChildren && (
          <div className="h-6 border-l-2 border-green-300"></div>
        )}

        {/* children container */}
        {isExpanded && hasChildren && (
          <div className="flex justify-center gap-4">
            {node.children?.map((pair, index) => (
              <div key={`${nodeId}-pair-${index}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {pair.First && (
                    <div className="flex flex-col items-center">
                      <div className="h-4 border-l-2 border-green-300"></div>
                      {renderChildNode(pair.First, `${nodeId}-first-${index}`)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  {pair.Second && (
                    <div className="flex flex-col items-center">
                      <div className="h-4 border-l-2 border-green-300"></div>
                      {renderChildNode(pair.Second, `${nodeId}-second-${index}`)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const formatDuration = (s: number | null) => {
    if (s === null) return "N/A";
    return `${(s * 1000).toFixed(2)} ms`;
  };

  if (!data) return <div className="p-4 text-gray-500">No results available</div>;
  if (typeof data !== "object") return <div className="p-4 text-red-500">Invalid data format</div>;

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Recipe Tree</h2>
      
      {/* horizontal scroll */}
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg overflow-x-auto">
        <div className="flex justify-center min-w-max">
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <div key={`root-${index}`} className="mb-4">
                {renderCenteredTree(item)}
              </div>
            ))
          ) : (
            renderCenteredTree(data)
          )}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 text-center">
        {count !== null && <p>Total nodes: <span className="font-semibold">{count}</span></p>}
        <p>Duration: <span className="font-semibold">{formatDuration(duration)}</span></p>
      </div>
      
      {/*scroll instruction */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        <p>← Scroll horizontally if content is cut off →</p>
      </div>
    </div>
  );
}