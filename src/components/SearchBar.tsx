
import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, we would handle the search here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yc-orange focus:border-transparent"
          autoFocus
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close search"
        >
          <X size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
