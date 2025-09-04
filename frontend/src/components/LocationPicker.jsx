import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaSpinner,
  FaCrosshairs,
} from "react-icons/fa";
import {
  getCurrentLocation,
  geocodeAddress,
  reverseGeocode,
} from "../utils/locationUtils";

const LocationPicker = ({ onLocationSelect, initialLat, initialLng }) => {
  const [location, setLocation] = useState({
    lat: initialLat || "",
    lng: initialLng || "",
    address: "",
  });
  const [addressInput, setAddressInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Initialize with coordinates if provided
  useEffect(() => {
    if (initialLat && initialLng) {
      setLocation({ lat: initialLat, lng: initialLng, address: "" });
      // Get address for initial coordinates
      reverseGeocode(initialLat, initialLng)
        .then((address) => {
          setLocation((prev) => ({ ...prev, address }));
          setAddressInput(address);
        })
        .catch(() => {
          setAddressInput(`${initialLat}, ${initialLng}`);
        });
    }
  }, [initialLat, initialLng]);

  // Get current location
  const handleGetCurrentLocation = async () => {
    setLoading(true);
    setError("");

    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      setAddressInput(currentLocation.address);
      onLocationSelect(
        currentLocation.lat,
        currentLocation.lng,
        currentLocation.address
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle address input change
  const handleAddressChange = async (value) => {
    setAddressInput(value);

    if (value.length > 3) {
      try {
        // Simple debouncing could be added here
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data || []);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle address selection
  const handleAddressSelect = async (selectedAddress) => {
    setLoading(true);
    setError("");

    try {
      const result = await geocodeAddress(selectedAddress);
      setLocation({
        lat: result.lat,
        lng: result.lng,
        address: result.formattedAddress,
      });
      setAddressInput(result.formattedAddress);
      setSuggestions([]);
      onLocationSelect(result.lat, result.lng, result.formattedAddress);
    } catch (err) {
      setError("Failed to get location coordinates");
    } finally {
      setLoading(false);
    }
  };

  // Handle manual coordinate input
  const handleCoordinateChange = (field, value) => {
    const newLocation = { ...location, [field]: value };
    setLocation(newLocation);

    if (newLocation.lat && newLocation.lng) {
      onLocationSelect(
        parseFloat(newLocation.lat),
        parseFloat(newLocation.lng),
        ""
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          <FaMapMarkerAlt className="inline mr-2" />
          Location
        </label>

        {/* Address Search */}
        <div className="relative mb-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for an address..."
              value={addressInput}
              onChange={(e) => handleAddressChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Address Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddressSelect(suggestion.display_name)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">
                    {suggestion.display_name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Location Button */}
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <FaSpinner className="animate-spin w-4 h-4" />
          ) : (
            <FaCrosshairs className="w-4 h-4" />
          )}
          {loading ? "Getting location..." : "Use Current Location"}
        </button>

        {/* Manual Coordinate Input */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 28.6139"
              value={location.lat}
              onChange={(e) => handleCoordinateChange("lat", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 77.2090"
              value={location.lng}
              onChange={(e) => handleCoordinateChange("lng", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Selected Location Display */}
        {location.lat && location.lng && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-green-600 mt-1" />
              <div>
                <div className="font-medium text-green-800">
                  Selected Location
                </div>
                {location.address && (
                  <div className="text-sm text-green-700 mt-1">
                    {location.address}
                  </div>
                )}
                <div className="text-xs text-green-600 mt-1">
                  Coordinates: {parseFloat(location.lat).toFixed(4)},{" "}
                  {parseFloat(location.lng).toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 text-sm">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
