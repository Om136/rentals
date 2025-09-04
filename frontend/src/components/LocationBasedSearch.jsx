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
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          🎯 Find What You Need
        </h2>
        <p className="text-gray-600 text-lg">
          Search for items by location and discover what's available nearby
        </p>
      </div>

      {/* Main Search - Streamlined Design */}
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What are you looking for?
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cameras, bikes, tools, furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
              />
            </div>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Where are you looking?
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {userLocation && address ? (
                  <div className="w-full pl-12 pr-4 py-4 border-2 border-green-300 rounded-xl bg-green-50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium truncate">
                        📍 {address}
                      </span>
                      <button
                        onClick={() => {
                          setUserLocation(null);
                          setAddress("");
                          setLocationStatus("idle");
                        }}
                        className="text-sm text-red-600 hover:text-red-800 font-semibold"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your city or address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddressSearch(address)
                    }
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
                  />
                )}
              </div>

              {/* Location Button */}
              {!userLocation && (
                <button
                  onClick={handleGetCurrentLocation}
                  disabled={locationStatus === "loading"}
                  className="px-4 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 border-2 border-transparent shadow-lg"
                  title="Use current location"
                >
                  {locationStatus === "loading" ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <FaLocationArrow className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center">
          <button
            onClick={handleLocationSearch}
            disabled={!searchQuery.trim() && !userLocation && !address.trim()}
            className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xl shadow-xl transform hover:scale-105"
          >
            {searchQuery.trim()
              ? "🔍 Search Items"
              : userLocation || address.trim()
              ? "📍 Browse Nearby"
              : "🔍 Start Searching"}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {locationStatus === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm font-medium">
            ⚠️ Unable to get location. Please enter your location manually.
          </p>
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <FaClock className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Recent Searches
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(search);
                  handleLocationSearch();
                }}
                className="px-3 py-2 text-sm bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors border border-gray-200 hover:border-indigo-200"
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
