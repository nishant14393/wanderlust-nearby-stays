
import React from 'react';
import { Search, Map, List } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleMap: () => void;
  showMap: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onToggleMap,
  showMap
}) => {
  return (
    <div className="mb-6">
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>
      
      <button
        onClick={onToggleMap}
        className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        {showMap ? (
          <>
            <List className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Show List</span>
          </>
        ) : (
          <>
            <Map className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Show Map</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
