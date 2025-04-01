import React, { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Professional DSLR Camera",
    price: "$35",
    location: "San Francisco",
    rating: 4.8,
    reviews: 42,
    type: "buy",
  },
  {
    id: 2,
    name: "Mountain Bike - Premium",
    price: "$25/day",
    location: "San Francisco",
    rating: 4.8,
    reviews: 42,
    type: "rent",
  },
  {
    id: 3,
    name: "Professional DSLR Camera",
    price: "$35/day",
    location: "San Francisco",
    rating: 4.8,
    reviews: 42,
    type: "rent",
  },
  {
    id: 4,
    name: "Smartphone Pro",
    price: "$20",
    location: "New York",
    rating: 4.5,
    reviews: 30,
    type: "buy",
  },
  {
    id: 5,
    name: "Gaming Laptop",
    price: "$50/day",
    location: "Los Angeles",
    rating: 4.7,
    reviews: 18,
    type: "rent",
  },
  {
    id: 6,
    name: "4K Drone",
    price: "$60",
    location: "Chicago",
    rating: 4.9,
    reviews: 55,
    type: "buy",
  },
  {
    id: 7,
    name: "Electric Scooter",
    price: "$15/day",
    location: "San Diego",
    rating: 4.6,
    reviews: 20,
    type: "rent",
  },
  {
    id: 8,
    name: "Professional DSLR Camera",
    price: "$35/day",
    location: "San Francisco",
    rating: 4.8,
    reviews: 42,
    type: "rent",
  },
  {
    id: 9,
    name: "VR Headset",
    price: "$40",
    location: "Miami",
    rating: 4.8,
    reviews: 22,
    type: "buy",
  },
  {
    id: 10,
    name: "Camping Tent",
    price: "$10/day",
    location: "Denver",
    rating: 4.3,
    reviews: 12,
    type: "rent",
  },
  {
    id: 11,
    name: "Smartwatch",
    price: "$15",
    location: "Seattle",
    rating: 4.5,
    reviews: 32,
    type: "buy",
  },
  {
    id: 12,
    name: "GoPro Camera",
    price: "$25/day",
    location: "Boston",
    rating: 4.7,
    reviews: 29,
    type: "rent",
  },
  {
    id: 13,
    name: "Bluetooth Speaker",
    price: "$12",
    location: "Dallas",
    rating: 4.6,
    reviews: 16,
    type: "buy",
  },
  {
    id: 14,
    name: "Projector",
    price: "$30/day",
    location: "Houston",
    rating: 4.8,
    reviews: 21,
    type: "rent",
  },
  {
    id: 15,
    name: "E-Book Reader",
    price: "$18",
    location: "Atlanta",
    rating: 4.4,
    reviews: 14,
    type: "buy",
  },
  {
    id: 16,
    name: "Fitness Tracker",
    price: "$10",
    location: "Phoenix",
    rating: 4.3,
    reviews: 11,
    type: "buy",
  },
];

const pageSize = 8; // Number of products per page

export const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / pageSize);

  // Get products for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const selectedProducts = products.slice(startIndex, startIndex + pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-sm p-4 relative"
          >
            {/* Favorite Icon */}
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <FaHeart />
            </button>

            {/* Image Placeholder */}
            <div className="h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
              <span className="text-gray-500">Image</span>
            </div>

            {/* Rating and Location */}
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <FaStar className="text-yellow-500 mr-1" /> {product.rating} (
                {product.reviews})
              </span>
              <span>{product.location}</span>
            </div>

            {/* Product Title */}
            <h3 className="text-lg font-semibold">{product.name}</h3>

            {/* Price and Type */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold">{product.price}</span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  product.type === "rent"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {product.type === "rent" ? "Rent" : "Buy"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
