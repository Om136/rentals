import React, { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";

const SearchSuggestions = ({
  searchTerm,
  onSelectSuggestion,
  onSearch,
  className = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches] = useState([
    "Camera",
    "Laptop",
    "Furniture",
    "Car",
    "Bike",
    "Tools",
    "Electronics",
    "Sports Equipment",
    "Musical Instruments",
  ]);
  const suggestionsRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(recent.slice(0, 5)); // Keep only 5 recent searches
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = popularSearches
        .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setIsVisible(true);
    } else {
      setSuggestions([]);
      setIsVisible(false);
    }
  }, [searchTerm, popularSearches]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Save search to recent searches
  const saveRecentSearch = (term) => {
    if (!term.trim()) return;

    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const filtered = recent.filter((item) => item !== term);
    const updated = [term, ...filtered].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentSearches(updated);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    saveRecentSearch(suggestion);
    onSelectSuggestion(suggestion);
    setIsVisible(false);
  };

  // Handle search
  const handleSearch = (term) => {
    saveRecentSearch(term);
    onSearch(term);
    setIsVisible(false);
  };

  if (!isVisible && searchTerm.length === 0) return null;

  return (
    <div
      ref={suggestionsRef}
      className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 ${className}`}
    >
      {/* Search term suggestions */}
      {suggestions.length > 0 && (
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">
            Suggestions
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-sm"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Recent searches */}
      {searchTerm.length === 0 && recentSearches.length > 0 && (
        <div className="p-2 border-t">
          <div className="text-xs font-medium text-gray-500 mb-2 px-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Recent Searches
          </div>
          {recentSearches.map((recent, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(recent)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-sm"
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{recent}</span>
            </button>
          ))}
        </div>
      )}

      {/* Popular searches */}
      {searchTerm.length === 0 && (
        <div className="p-2 border-t">
          <div className="text-xs font-medium text-gray-500 mb-2 px-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Popular Searches
          </div>
          {popularSearches.slice(0, 4).map((popular, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(popular)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center gap-2 text-sm"
            >
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span>{popular}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search current term */}
      {searchTerm.length > 0 && (
        <div className="p-2 border-t">
          <button
            onClick={() => handleSearch(searchTerm)}
            className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md flex items-center gap-2 text-sm font-medium text-blue-600"
          >
            <Search className="w-4 h-4" />
            <span>Search for "{searchTerm}"</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
