"use client" 
import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation'; 

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }
    
    setIsLoading(true);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div>
      <div className='text-gray-500 text-center mt-5 text-3xl'>
        Find Your Recipe!
      </div>
      <div className="flex mt-5 items-center justify-center gap-4">
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search recipes..."
          className=" text-gray-800 w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg ${
            isLoading ? 'bg-gray-400' : 'bg-blue-300 hover:bg-blue-500'
          } text-black transition-colors`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;