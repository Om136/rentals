import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { FaStar, FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const pageSize = 8; // Number of products per page

export const ProductGrid = ({ category, searchValue, selected }) => {
  console.log("Selected Category:", category);
  console.log(searchValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]); // Store all fetched products
  const [favorites, setFavorites] = useState(new Set()); // Track favorite items
  const navigate = useNavigate();

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Format price for better display
  const formatPrice = (product) => {
    if (product.is_rental) {
      return {
        amount: `₹${product.rental_rate}`,
        period: "/day",
        type: "rental",
      };
    } else {
      return {
        amount: `₹${Number(product.price).toLocaleString()}`,
        period: "",
        type: "sale",
      };
    }
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Temporary fix: Always fetch all products without location filter
        console.log("Making API call to: http://localhost:5000/items");
        const response = await axios.get("http://localhost:5000/items");
        setAllProducts(response.data);
        console.log("Products received:", response.data);
        console.log("Number of products:", response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Use useMemo to calculate filtered products without setting state
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Check category match. If category is "all", allow all products.
      const categoryMatches =
        category === "all" || product.category === category;

      const selectedtype =
        selected === "All"
          ? true
          : selected === "Rent"
          ? product.is_rental
          : !product.is_rental;

      // Ensure searchValue is a string and check search match.
      const searchMatches =
        (searchValue || "").trim() === "" ||
        product.title.toLowerCase().includes((searchValue || "").toLowerCase());

      // Only include products that match both filters.
      return categoryMatches && searchMatches && selectedtype;
    });
  }, [category, allProducts, searchValue, selected]);

  // Reset current page when filtered products change (optional)
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Get products for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Available Products
          </h2>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} items found
            {category !== "all" && ` in ${category}`}
            {searchValue && ` matching "${searchValue}"`}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FaClock className="text-gray-400" />
          <span>Updated recently</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => {
          const priceInfo = formatPrice(product);
          const isRental = product.is_rental;

          return (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/browse/${product.id}`)}
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <FaHeart
                    className={`w-4 h-4 ${
                      favorites.has(product.id)
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      isRental
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {isRental ? "For Rent" : "For Sale"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>

                {/* Location (if available) */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                  <span>Location available</span>
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">
                        {priceInfo.amount}
                      </span>
                      {priceInfo.period && (
                        <span className="text-sm text-gray-500 ml-1">
                          {priceInfo.period}
                        </span>
                      )}
                    </div>
                    {isRental && (
                      <span className="text-xs text-gray-500 mt-1">
                        Daily rental rate
                      </span>
                    )}
                  </div>

                  {/* Rating (placeholder - you can add real ratings later) */}
                  <div className="flex items-center">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">4.5</span>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed bg-gray-50"
                : "text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed bg-gray-50"
                : "text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            Next
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  );
};
