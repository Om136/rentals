import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, MapPin, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const ProductDisplayEnhanced = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const itemsPerPage = 12;

  // Fetch products based on search parameters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        // Add all search parameters to the API call
        searchParams.forEach((value, key) => {
          if (value) params.append(key, value);
        });

        const response = await api.get(`/items?${params.toString()}`);
        setProducts(response.data);
        setCurrentPage(1); // Reset to first page on new search
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Toggle favorite
  const toggleFavorite = (e, productId) => {
    e.stopPropagation();
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

  // Format price
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

  // Format distance
  const formatDistance = (distance) => {
    if (!distance) return null;
    const km = Math.round((distance / 1000) * 10) / 10; // Round to 1 decimal
    return `${km} km away`;
  };

  // Get current page products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <div className="text-red-600 text-lg">{error}</div>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Results Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {products.length} {products.length === 1 ? "Result" : "Results"}
            </h2>
            <p className="text-gray-600 mt-1">
              {searchParams.get("search") &&
                `for "${searchParams.get("search")}"`}
              {searchParams.get("categories") &&
                ` in ${searchParams.get("categories")}`}
              {searchParams.get("lng") &&
                searchParams.get("lat") &&
                " near your location"}
            </p>
          </div>

          {/* Sort indicator */}
          {searchParams.get("sortBy") && (
            <div className="text-sm text-gray-500">
              Sorted by{" "}
              {searchParams.get("sortBy") === "created_at"
                ? "Date"
                : searchParams.get("sortBy") === "nearest"
                ? "Distance"
                : searchParams.get("sortBy")}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No items found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => {
              const priceInfo = formatPrice(product);
              const distanceText = formatDistance(product.distance);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/browse/${product.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <img
                      src={product.images?.[0] || "/placeholder-image.jpg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(product.id)
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </button>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.is_rental
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.is_rental ? "For Rent" : "For Sale"}
                      </span>
                    </div>

                    {/* Distance Badge */}
                    {distanceText && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {distanceText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Category */}
                    <div className="mb-3">
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">
                          {priceInfo.amount}
                        </span>
                        {priceInfo.period && (
                          <span className="text-sm text-gray-500">
                            {priceInfo.period}
                          </span>
                        )}
                      </div>

                      {/* Created date */}
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(product.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDisplayEnhanced;
