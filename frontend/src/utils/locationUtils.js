// Location utility functions

/**
 * Get user's current location using browser geolocation API
 * @returns {Promise<{lat: number, lng: number, address: string}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Get address from coordinates using reverse geocoding
          const address = await reverseGeocode(lat, lng);
          resolve({ lat, lng, address });
        } catch (error) {
          // If reverse geocoding fails, still return coordinates
          resolve({
            lat,
            lng,
            address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          });
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10 minutes
      }
    );
  });
};

/**
 * Convert address to coordinates using geocoding
 * @param {string} address
 * @returns {Promise<{lat: number, lng: number, formattedAddress: string}>}
 */
export const geocodeAddress = async (address) => {
  try {
    // Using a free geocoding service (you can replace with Google Maps API if you have a key)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1`
    );

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        formattedAddress: result.display_name,
      };
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    throw new Error("Failed to geocode address: " + error.message);
  }
};

/**
 * Convert coordinates to address using reverse geocoding
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<string>}
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    } else {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  } catch (error) {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};

/**
 * Calculate distance between two points in kilometers
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

/**
 * Format coordinates for display
 * @param {number} lat
 * @param {number} lng
 * @returns {string}
 */
export const formatCoordinates = (lat, lng) => {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};
