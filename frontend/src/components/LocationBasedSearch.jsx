import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaLocationArrow,
  FaClock,
} from "react-icons/fa";
import { getCurrentLocation, geocodeAddress } from "../utils/locationUtils";

const LocationBasedSearch = ({
  className = "",
  onSearch,
  initialQuery = "",
  initialLocation = null,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [userLocation, setUserLocation] = useState(initialLocation);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, loading, success, error
  const [address, setAddress] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  // Load recent searches and initialize values on mount
  useEffect(() => {
    const recent = JSON.parse(
      localStorage.getItem("recentLocationSearches") || "[]"
    );
    setRecentSearches(recent.slice(0, 3));

    // Set initial values if provided
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
    if (initialLocation) {
      setUserLocation(initialLocation);
      setLocationStatus("success");
      // You might want to reverse geocode to get address here
    }
  }, [initialQuery, initialLocation]);

  // Get current location
  const handleGetCurrentLocation = async () => {
    setLocationStatus("loading");
    try {
      const location = await getCurrentLocation();
      setUserLocation({ lat: location.lat, lng: location.lng });
      setAddress(location.address);
      setLocationStatus("success");
    } catch (error) {
      console.error("Location error:", error);
      setLocationStatus("error");
    }
  };

  // Handle search with location
  const handleLocationSearch = async () => {
    console.log("Search button clicked!"); // Debug log
    console.log("Search query:", searchQuery); // Debug log
    console.log("User location:", userLocation); // Debug log
    console.log("Address:", address); // Debug log
    console.log("onSearch callback:", onSearch); // Debug log

    // Allow search with just location (no search query required)
    if (!searchQuery.trim() && !userLocation && !address.trim()) {
      console.log("No search query or location provided");
      return;
    }

    // If user has entered an address but no location coordinates, geocode it first
    if (address && !userLocation) {
      try {
        setLocationStatus("loading");
        const coordinates = await geocodeAddress(address);
        setUserLocation({ lat: coordinates.lat, lng: coordinates.lng });
        setLocationStatus("success");
      } catch (error) {
        console.error("Geocoding error:", error);
        setLocationStatus("error");
        // Continue with search even if geocoding fails
      }
    }

    // Save to recent searches only if there's a search query
    if (searchQuery.trim()) {
      const recent = JSON.parse(
        localStorage.getItem("recentLocationSearches") || "[]"
      );
      const updated = [
        searchQuery,
        ...recent.filter((item) => item !== searchQuery),
      ].slice(0, 5);
      localStorage.setItem("recentLocationSearches", JSON.stringify(updated));
    }

    // If onSearch callback is provided (for browse page integration), use it
    if (onSearch) {
      console.log("Calling onSearch callback with:", {
        searchQuery: searchQuery || "", // Allow empty search for location-only browsing
        userLocation,
        address,
      });
      onSearch({
        searchQuery: searchQuery || "", // Allow empty search for location-only browsing
        userLocation,
        address,
      });
      return;
    }

    // Otherwise, navigate to browse page (for home page usage)
    console.log("Navigating to browse page");
    const params = new URLSearchParams();

    // Only add search query if it exists
    if (searchQuery.trim()) {
      params.set("search", searchQuery);
    }

    if (userLocation) {
      params.set("lat", userLocation.lat.toString());
      params.set("lng", userLocation.lng.toString());
      params.set("maxDistance", "10000"); // 10km default
      params.set("sortBy", "nearest");
    } else if (address && address.trim()) {
      // If we have an address but no coordinates, still pass the address
      params.set("address", address);
    }

    navigate(`/browse?${params.toString()}`);
  };

  // Handle address search
  const handleAddressSearch = async (addressQuery) => {
    if (!addressQuery.trim()) return;

    setLocationStatus("loading");
    try {
      const coordinates = await geocodeAddress(addressQuery);
      setUserLocation({ lat: coordinates.lat, lng: coordinates.lng });
      setAddress(addressQuery);
      setLocationStatus("success");
    } catch (error) {
      console.error("Geocoding error:", error);
      setLocationStatus("error");
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-xl p-4 w-full max-w-4xl mx-auto ${className}`}
    >
      {/* Header - Compact */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-xl px-3 py-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          🎯 Search by Location
        </h2>
      </div>

      {/* Main Search Row - Horizontal Layout */}
      <div className="flex flex-wrap items-end gap-3">
        {/* Search Input */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex-1 min-w-[200px]">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
            className="bg-transparent w-full outline-none"
          />
        </div>

        {/* Location Input/Display */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 min-w-[200px] flex-1">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          {userLocation && address ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-gray-700 truncate">{address}</span>
              <button
                onClick={() => setLocationStatus("idle")}
                className="text-xs text-gray-500 hover:text-gray-700 ml-2"
              >
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Enter location or use current"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleAddressSearch(address)
              }
              className="bg-transparent w-full outline-none"
            />
          )}
        </div>

        {/* Location Button */}
        {!userLocation && (
          <button
            onClick={handleGetCurrentLocation}
            disabled={locationStatus === "loading"}
            className="bg-gray-200 text-gray-700 rounded-md px-3 py-2 hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            {locationStatus === "loading" ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <FaLocationArrow className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleLocationSearch}
          disabled={!searchQuery.trim() && !userLocation && !address.trim()}
          className="bg-gray-900 text-white rounded-md px-6 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
        >
          {searchQuery.trim()
            ? "Search"
            : userLocation || address.trim()
            ? "Browse Nearby"
            : "Search"}
        </button>
      </div>

      {/* Status Messages - Compact */}
      {locationStatus === "error" && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">
            Unable to get location. Please enter manually.
          </p>
        </div>
      )}

      {/* Recent Searches - Horizontal Pills */}
      {recentSearches.length > 0 && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Recent:</span>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(search);
                  handleLocationSearch();
                }}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationBasedSearch;
