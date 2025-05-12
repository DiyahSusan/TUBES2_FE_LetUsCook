"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type RecipeMode = 'single' | 'multiple' | null;
type SearchAlgorithm = 'bfs' | 'dfs' |null;

interface SearchContextType {
  mode: RecipeMode;
  algorithm: SearchAlgorithm;
  searchQuery: string;
  recipeCount: number;
  setMode: (mode: RecipeMode) => void;
  setAlgorithm: (algorithm: SearchAlgorithm) => void;
  setSearchQuery: (query: string) => void;
  setRecipeCount: (query: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<RecipeMode>(null);
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipeCount, setRecipeCount] = useState(1);


  return (
    <SearchContext.Provider 
      value={{ 
        mode, 
        algorithm, 
        searchQuery, 
        recipeCount,
        setMode, 
        setAlgorithm, 
        setSearchQuery,
        setRecipeCount
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}