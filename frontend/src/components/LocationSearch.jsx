import React, { useState } from "react";
import { FaMapMarkerAlt, FaSpinner, FaCrosshairs } from "react-icons/fa";
import { getCurrentLocation, geocodeAddress } from "../utils/locationUtils";

const LocationSearch = ({
  onLocationSelect,
  placeholder = "Enter location...",
}) => {
  const [locationInput, setLocationInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Handle location input change
  const handleLocationChange = async (value) => {
    setLocationInput(value);

    if (value.length > 3) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data || []);
      } catch (error) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle location selection
  const handleLocationSelect = async (address) => {
    setLoading(true);

    try {
      const result = await geocodeAddress(address);
      setSelectedLocation({
        lat: result.lat,
        lng: result.lng,
        address: result.formattedAddress,
      });
      setLocationInput(result.formattedAddress);
      setSuggestions([]);

      // Callback to parent component
      if (onLocationSelect) {
        onLocationSelect(result.lat, result.lng, result.formattedAddress);
      }
    } catch (error) {
      console.error("Failed to get location coordinates:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get current location
  const handleGetCurrentLocation = async () => {
    setLoading(true);

    try {
      const currentLocation = await getCurrentLocation();
      setSelectedLocation(currentLocation);
      setLocationInput(currentLocation.address);

      // Callback to parent component
      if (onLocationSelect) {
        onLocationSelect(
          currentLocation.lat,
          currentLocation.lng,
          currentLocation.address
        );
      }
    } catch (error) {
      console.error("Failed to get current location:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex-1 relative">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={locationInput}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={loading}
          className="px-3 py-2 text-blue-600 hover:text-blue-700 border-l border-gray-200 disabled:opacity-50"
          title="Use current location"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaCrosshairs />}
        </button>
      </div>

      {/* Location Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleLocationSelect(suggestion.display_name)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {suggestion.display_name.split(",")[0]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {suggestion.display_name}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-2 text-xs text-green-600">
          📍 {selectedLocation.address}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
