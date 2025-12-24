import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { X, Search, Filter, SlidersHorizontal, MapPin } from "lucide-react";
import ProductDisplayEnhanced from "../components/ProductDisplayEnhanced";
import SearchSuggestions from "../components/SearchSuggestions";
import CategoriesEnhanced from "../components/CategoriesEnhanced";
import TogglerRentBuyEnhanced from "../components/TogglerRentBuyEnhanced";
import LocationBasedSearch from "../components/LocationBasedSearch";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

const BrowseEnhanced = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for filters
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("categories")?.split(",") || []
  );
  const [rentBuyToggle, setRentBuyToggle] = useState(
    searchParams.get("isRental") === "true"
      ? "rent"
      : searchParams.get("isRental") === "false"
      ? "buy"
      : "both"
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "created_at"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );
  const [maxDistance, setMaxDistance] = useState(
    searchParams.get("maxDistance") || "10000"
  );

  // Location state
  const [userLocation, setUserLocation] = useState(() => {
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");
    return lng && lat ? { lng: parseFloat(lng), lat: parseFloat(lat) } : null;
  });

  // Update filters when URL parameters change
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategories(searchParams.get("categories")?.split(",") || []);
    setRentBuyToggle(
      searchParams.get("isRental") === "true"
        ? "rent"
        : searchParams.get("isRental") === "false"
        ? "buy"
        : "both"
    );
    setPriceRange({
      min: searchParams.get("minPrice") || "",
      max: searchParams.get("maxPrice") || "",
    });
    setSortBy(searchParams.get("sortBy") || "created_at");
    setSortOrder(searchParams.get("sortOrder") || "desc");
    setMaxDistance(searchParams.get("maxDistance") || "10000");

    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");
    if (lng && lat) {
      setUserLocation({ lng: parseFloat(lng), lat: parseFloat(lat) });
    }
  }, [searchParams]);

  // Update URL parameters
  const updateParams = (newParams) => {
    console.log("updateParams called with:", newParams);
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "" && value !== "both") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    console.log("Setting search params to:", params.toString());
    setSearchParams(params);
  };

  // Handle search
  const handleSearch = () => {
    const params = {
      search: searchTerm,
      categories:
        selectedCategories.length > 0 ? selectedCategories.join(",") : "",
      isRental:
        rentBuyToggle === "rent"
          ? "true"
          : rentBuyToggle === "buy"
          ? "false"
          : "",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sortBy,
      sortOrder,
      maxDistance: userLocation ? maxDistance : "",
      lng: userLocation?.lng || "",
      lat: userLocation?.lat || "",
    };

    updateParams(params);
  };

  // Handle search from LocationBasedSearch component
  const handleLocationBasedSearch = ({
    searchQuery,
    userLocation: searchLocation,
    address,
  }) => {
    console.log("handleLocationBasedSearch called with:", {
      searchQuery,
      userLocation: searchLocation,
      address,
    });

    const params = {
      search: searchQuery || "", // Allow empty search query
      lng: searchLocation?.lng || "",
      lat: searchLocation?.lat || "",
      maxDistance: searchLocation ? maxDistance : "",
      sortBy: searchLocation ? "nearest" : sortBy,
      sortOrder,
    };

    console.log("Updating params with:", params);

    // Update local state
    setSearchTerm(searchQuery || ""); // Allow empty search term
    setSearchTerm(searchQuery);
    if (searchLocation) {
      setUserLocation(searchLocation);
    }

    updateParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setRentBuyToggle("both");
    setPriceRange({ min: "", max: "" });
    setSortBy("created_at");
    setSortOrder("desc");
    setMaxDistance("10000");
    setSearchParams(new URLSearchParams());
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategories.length > 0) count++;
    if (rentBuyToggle !== "both") count++;
    if (priceRange.min || priceRange.max) count++;
    if (userLocation) count++;
    return count;
  };

  // Handle location from URL parameters on mount
  useEffect(() => {
    if (location.state?.userLocation) {
      setUserLocation(location.state.userLocation);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Hero Section - ListItem Theme */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
              Discover Amazing Items
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Find exactly what you need from thousands of verified listings in
            your area
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search & Filter Card - Compact Version */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            <div className="p-4">
              {/* Section Header */}
              <div className="mb-4 text-center">
                <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Search & Filters
                </h2>
                <p className="text-gray-600 text-sm">
                  Find exactly what you're looking for
                </p>
              </div>

              {/* Organized Search & Filter Section */}
              <div className="space-y-4">
                {/* Main Search Bar */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex flex-col space-y-3">
                    {/* Search Title */}
                    <div className="text-center">
                      <h3 className="text-base font-semibold text-gray-800 mb-1">
                        Start Your Search
                      </h3>
                      <p className="text-xs text-gray-600">
                        Find items near you or search globally
                      </p>
                    </div>

                    {/* Location Search */}
                    <LocationBasedSearch
                      className="w-full"
                      onSearch={handleLocationBasedSearch}
                      initialQuery={searchTerm}
                      initialLocation={userLocation}
                    />
                  </div>
                </div>

                {/* Quick Filters Row */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Left Side - Quick Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-white/90 hidden lg:block">
                        Quick Filters:
                      </span>

                      {/* Rent/Buy Toggle */}
                      <div className="bg-white/15 rounded-xl p-1 backdrop-blur-sm">
                        <TogglerRentBuyEnhanced
                          activeTab={rentBuyToggle}
                          setActiveTab={setRentBuyToggle}
                        />
                      </div>

                      {/* Active Filters Indicator */}
                      {getActiveFiltersCount() > 0 && (
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-green-400/30">
                          ✅ {getActiveFiltersCount()} filters active
                        </div>
                      )}
                    </div>

                    {/* Right Side - Advanced Controls */}
                    <div className="flex items-center gap-3">
                      {/* Advanced Filters Button */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="default"
                            className="relative bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-white/30 text-white hover:from-indigo-500/40 hover:to-purple-500/40 backdrop-blur-sm transition-all duration-300 shadow-lg"
                          >
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            Advanced Filters
                            {getActiveFiltersCount() > 0 && (
                              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                                {getActiveFiltersCount()}
                              </span>
                            )}
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] bg-white">
                          <SheetHeader className="border-b pb-4 mb-6">
                            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                              🎯 Advanced Filters
                            </SheetTitle>
                            <SheetDescription className="text-gray-600">
                              Refine your search with detailed filters to find
                              exactly what you're looking for
                            </SheetDescription>
                          </SheetHeader>

                          <div className="space-y-4">
                            {/* Categories */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                              <Label className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-3">
                                📂 Categories
                              </Label>
                              <CategoriesEnhanced
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                              />
                            </div>

                            {/* Rent/Buy Toggle */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                              <Label className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-3">
                                🏷️ Listing Type
                              </Label>
                              <TogglerRentBuyEnhanced
                                activeTab={rentBuyToggle}
                                setActiveTab={setRentBuyToggle}
                              />
                            </div>

                            {/* Price Range */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                              <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                💰 Price Range
                              </Label>
                              <div className="flex gap-3">
                                <div className="flex-1">
                                  <Input
                                    type="number"
                                    placeholder="Min price"
                                    value={priceRange.min}
                                    onChange={(e) =>
                                      setPriceRange((prev) => ({
                                        ...prev,
                                        min: e.target.value,
                                      }))
                                    }
                                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                  />
                                </div>
                                <div className="flex items-center text-gray-500 font-medium">
                                  to
                                </div>
                                <div className="flex-1">
                                  <Input
                                    type="number"
                                    placeholder="Max price"
                                    value={priceRange.max}
                                    onChange={(e) =>
                                      setPriceRange((prev) => ({
                                        ...prev,
                                        max: e.target.value,
                                      }))
                                    }
                                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Sort Options */}
                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                              <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                🔄 Sort Options
                              </Label>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Sort By
                                  </label>
                                  <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500 focus:ring-orange-500 bg-white"
                                  >
                                    <option value="created_at">
                                      📅 Date Added
                                    </option>
                                    <option value="price">💵 Price</option>
                                    <option value="title">🔤 Title</option>
                                    {userLocation && (
                                      <option value="nearest">
                                        📍 Distance
                                      </option>
                                    )}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Order
                                  </label>
                                  <select
                                    value={sortOrder}
                                    onChange={(e) =>
                                      setSortOrder(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-orange-500 focus:ring-orange-500 bg-white"
                                    disabled={sortBy === "nearest"}
                                  >
                                    <option value="asc">⬆️ Ascending</option>
                                    <option value="desc">⬇️ Descending</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Distance Filter */}
                            {userLocation && (
                              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                                <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                  <MapPin className="w-5 h-5" />
                                  📏 Max Distance
                                </Label>
                                <select
                                  value={maxDistance}
                                  onChange={(e) =>
                                    setMaxDistance(e.target.value)
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-red-500 focus:ring-red-500 bg-white"
                                >
                                  <option value="1000">🚶‍♂️ 1 km</option>
                                  <option value="5000">🚴‍♂️ 5 km</option>
                                  <option value="10000">🚗 10 km</option>
                                  <option value="25000">🛣️ 25 km</option>
                                  <option value="50000">🌆 50 km</option>
                                  <option value="100000">🌍 100 km</option>
                                </select>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-6 border-t">
                              <Button
                                onClick={handleSearch}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                ✨ Apply Filters
                              </Button>
                              <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl"
                              >
                                🗑️ Clear All
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>

                      {/* Clear All Filters Button */}
                      {getActiveFiltersCount() > 0 && (
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={clearFilters}
                          className="text-white hover:bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30 transition-all duration-300"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Clear All
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Filters Display */}
                {getActiveFiltersCount() > 0 && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-white font-medium mb-2 w-full lg:w-auto lg:mb-0">
                        🏷️ Active Filters ({getActiveFiltersCount()}):
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {searchTerm && (
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                            🔍 "{searchTerm}"
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-blue-200 transition-colors"
                              onClick={() => {
                                setSearchTerm("");
                                updateParams({ search: "" });
                              }}
                            />
                          </div>
                        )}

                        {selectedCategories.map((category) => (
                          <div
                            key={category}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
                          >
                            📂 {category}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-green-200 transition-colors"
                              onClick={() => {
                                const newCategories = selectedCategories.filter(
                                  (c) => c !== category
                                );
                                setSelectedCategories(newCategories);
                                updateParams({
                                  categories: newCategories.join(","),
                                });
                              }}
                            />
                          </div>
                        ))}

                        {rentBuyToggle !== "both" && (
                          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                            🏷️{" "}
                            {rentBuyToggle === "rent" ? "For Rent" : "For Sale"}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-purple-200 transition-colors"
                              onClick={() => {
                                setRentBuyToggle("both");
                                updateParams({ isRental: "" });
                              }}
                            />
                          </div>
                        )}

                        {(priceRange.min || priceRange.max) && (
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                            💰 ₹{priceRange.min || "0"} - ₹
                            {priceRange.max || "∞"}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-orange-200 transition-colors"
                              onClick={() => {
                                setPriceRange({ min: "", max: "" });
                                updateParams({ minPrice: "", maxPrice: "" });
                              }}
                            />
                          </div>
                        )}

                        {userLocation && (
                          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                            <MapPin className="w-3 h-3" />
                            📍 {maxDistance / 1000}km radius
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-red-200 transition-colors"
                              onClick={() => {
                                setUserLocation(null);
                                updateParams({
                                  lng: "",
                                  lat: "",
                                  maxDistance: "",
                                });
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Thousands of Items
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Available for rent or purchase
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">✅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Verified Listings
                    </h3>
                    <p className="text-gray-600 text-sm">
                      All items are quality checked
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Instant Booking
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quick and secure transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Display */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <ProductDisplayEnhanced />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseEnhanced;
