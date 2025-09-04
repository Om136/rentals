import React, { useState } from "react";
import { FaStar, FaHeart, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Example data for items for sale
const itemsForSaleData = [
  {
    id: 5,
    title: "Gaming Laptop",
    city: "Austin",
    rating: 4.8,
    reviews: 32,
    price: 1200,
    is_rental: false,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    ],
    status: "Available",
  },
  {
    id: 6,
    title: "Guitar – Acoustic",
    city: "Nashville",
    rating: 4.7,
    reviews: 56,
    price: 250,
    is_rental: false,
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
    ],
    status: "Available",
  },
  {
    id: 7,
    title: "Smart TV",
    city: "New York",
    rating: 4.5,
    reviews: 44,
    price: 550,
    is_rental: false,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    ],
    status: "Available",
  },
  {
    id: 8,
    title: "Electric Scooter",
    city: "Chicago",
    rating: 4.6,
    reviews: 12,
    price: 300,
    is_rental: false,
    images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400"],
    status: "Available",
  },
];

export const ItemsForSale = () => {
  const [favorites, setFavorites] = useState(new Set());
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
    return {
      amount: `₹${Number(product.price).toLocaleString()}`,
      period: "",
      type: "sale",
    };
  };

  return (
    <section className="my-16 px-4 lg:px-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Items For Sale</h2>
          <p className="text-gray-600 mt-2">Quality items ready to buy</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/browse")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View all
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemsForSaleData.map((product) => {
          const priceInfo = formatPrice(product);

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
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500 text-white">
                    For Sale
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                  <span>{product.city}</span>
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">
                        {priceInfo.amount}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      One-time purchase
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
