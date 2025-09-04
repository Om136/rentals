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
    <div className="min-h-screen bg-gray-50">
      {/* Single Row: Search + Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Left: Location-Based Search - Takes most space */}
            <div className="flex-1 min-w-0">
              <LocationBasedSearch
                className="w-full"
                onSearch={handleLocationBasedSearch}
                initialQuery={searchTerm}
                initialLocation={userLocation}
              />
            </div>

            {/* Right: Quick Filters & Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Results Count */}
              {getActiveFiltersCount() > 0 && (
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded text-nowrap">
                  {getActiveFiltersCount()} filters
                </span>
              )}

              {/* Rent/Buy Toggle - Compact */}
              <TogglerRentBuyEnhanced
                activeTab={rentBuyToggle}
                setActiveTab={setRentBuyToggle}
              />

              {/* Advanced Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search with detailed filters
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* Categories */}
                    <div>
                      <Label className="text-base font-medium">
                        Categories
                      </Label>
                      <CategoriesEnhanced
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    </div>

                    {/* Rent/Buy Toggle */}
                    <div>
                      <Label className="text-base font-medium">Type</Label>
                      <TogglerRentBuyEnhanced
                        activeTab={rentBuyToggle}
                        setActiveTab={setRentBuyToggle}
                      />
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="text-base font-medium">
                        Price Range
                      </Label>
                      <div className="flex gap-2 mt-2">
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
                        />
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
                        />
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <Label className="text-base font-medium">Sort By</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="border rounded-md px-3 py-2"
                        >
                          <option value="created_at">Date Added</option>
                          <option value="price">Price</option>
                          <option value="title">Title</option>
                          {userLocation && (
                            <option value="nearest">Distance</option>
                          )}
                        </select>
                        <select
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                          className="border rounded-md px-3 py-2"
                          disabled={sortBy === "nearest"}
                        >
                          <option value="asc">Ascending</option>
                          <option value="desc">Descending</option>
                        </select>
                      </div>
                    </div>

                    {/* Distance Filter */}
                    {userLocation && (
                      <div>
                        <Label className="text-base font-medium">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Max Distance
                        </Label>
                        <select
                          value={maxDistance}
                          onChange={(e) => setMaxDistance(e.target.value)}
                          className="w-full border rounded-md px-3 py-2 mt-2"
                        >
                          <option value="1000">1 km</option>
                          <option value="5000">5 km</option>
                          <option value="10000">10 km</option>
                          <option value="25000">25 km</option>
                          <option value="50000">50 km</option>
                          <option value="100000">100 km</option>
                        </select>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSearch} className="flex-1">
                        Apply Filters
                      </Button>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear All
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Clear All Filters Button - Only show when filters are active */}
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters - Show below in same container when active */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Active:</span>

              {searchTerm && (
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  "{searchTerm}"
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-blue-900"
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
                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  {category}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-green-900"
                    onClick={() => {
                      const newCategories = selectedCategories.filter(
                        (c) => c !== category
                      );
                      setSelectedCategories(newCategories);
                      updateParams({ categories: newCategories.join(",") });
                    }}
                  />
                </div>
              ))}

              {rentBuyToggle !== "both" && (
                <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  {rentBuyToggle === "rent" ? "Rent" : "Buy"}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-purple-900"
                    onClick={() => {
                      setRentBuyToggle("both");
                      updateParams({ isRental: "" });
                    }}
                  />
                </div>
              )}

              {(priceRange.min || priceRange.max) && (
                <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  ${priceRange.min || "0"}-${priceRange.max || "∞"}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-orange-900"
                    onClick={() => {
                      setPriceRange({ min: "", max: "" });
                      updateParams({ minPrice: "", maxPrice: "" });
                    }}
                  />
                </div>
              )}

              {userLocation && (
                <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {maxDistance / 1000}km
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-900"
                    onClick={() => {
                      setUserLocation(null);
                      updateParams({ lng: "", lat: "", maxDistance: "" });
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProductDisplayEnhanced />
      </div>
    </div>
  );
};

export default BrowseEnhanced;
