import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { ProductGrid } from "../components/ProductDisplay";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import ListingTypeToggle from "@/components/TogglerRentBuy";
import { FaFilter, FaSearch, FaSlidersH } from "react-icons/fa";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Browse = ({
  selected,
  setSelected,
  searchValue,
  setSearchValue,
  selectedCategory,
  setSelectedCategory,
}) => {
  const location = useLocation();

  // Handle URL parameters for location-based search
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearch = searchParams.get("search");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (urlSearch && urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }

    // Store location data for ProductGrid to use
    if (lat && lng) {
      localStorage.setItem(
        "browseLocation",
        JSON.stringify({ lat: parseFloat(lat), lng: parseFloat(lng) })
      );
    }
  }, [location.search, searchValue, setSearchValue]);

  const categories = [
    { value: "all", label: "All Categories", count: "120+" },
    { value: "Home", label: "Home & Garden", count: "25" },
    { value: "Vehicles", label: "Vehicles", count: "18" },
    { value: "Electronics", label: "Electronics", count: "35" },
    { value: "Photography", label: "Photography", count: "12" },
    { value: "Clothing", label: "Clothing", count: "8" },
    { value: "Furniture", label: "Furniture", count: "15" },
    { value: "Tools", label: "Tools", count: "22" },
    { value: "Sports", label: "Sports & Recreation", count: "16" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-[90rem] mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Browse Listings
              </h1>
              <p className="text-gray-600 mt-1">
                Discover amazing items to rent or buy
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 lg:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Search for items..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              {/* Filter Button */}
              <Sheet>
                <SheetTrigger className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <FaSlidersH className="w-4 h-4" />
                  Filters
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-xl font-bold flex items-center gap-2">
                      <FaFilter className="w-5 h-5" />
                      Filter Options
                    </SheetTitle>
                    <SheetDescription>
                      Narrow down your search to find exactly what you need
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6">
                    {/* Categories Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        Categories
                      </h3>
                      <RadioGroup
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                        className="space-y-3"
                      >
                        {categories.map((category) => (
                          <div
                            key={category.value}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value={category.value}
                                id={category.value}
                              />
                              <Label
                                htmlFor={category.value}
                                className="font-medium cursor-pointer"
                              >
                                {category.label}
                              </Label>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {category.count}
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Listing Type Section */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        Listing Type
                      </h3>
                      <ListingTypeToggle
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </div>

                    {/* Clear Filters Button */}
                    <div className="border-t pt-6">
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setSelected("All");
                          setSearchValue("");
                        }}
                        className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== "all" || selected !== "All" || searchValue) && (
        <div className="max-w-[90rem] mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {categories.find((c) => c.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selected !== "All" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {selected}
                <button
                  onClick={() => setSelected("All")}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {searchValue && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                "{searchValue}"
                <button
                  onClick={() => setSearchValue("")}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="pb-8">
        <ProductGrid
          category={selectedCategory}
          searchValue={searchValue}
          selected={selected}
        />
      </div>
    </div>
  );
};
