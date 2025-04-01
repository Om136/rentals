import React from "react";
import { AiFillStar } from "react-icons/ai";

// Example data for featured rentals
const featuredRentalsData = [
  {
    id: 1,
    name: "Professional DSLR Camera",
    city: "San Francisco",
    rating: 4.7,
    reviews: 64,
    price: 35,
    type: "Rent",
  },
  {
    id: 2,
    name: "Mountain Bike – Premium",
    city: "Denver",
    rating: 4.7,
    reviews: 84,
    price: 25,
    type: "Rent",
  },
  {
    id: 3,
    name: "Camping Gear Set",
    city: "Portland",
    rating: 4.6,
    reviews: 22,
    price: 45,
    type: "Rent",
  },
  {
    id: 4,
    name: "DJ Equipment",
    city: "Los Angeles",
    rating: 4.9,
    reviews: 18,
    price: 75,
    type: "Rent",
  },
];

export const FeaturedRentals = () => {
  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between px-20">
        <h2 className="text-2xl font-bold">Featured Rentals</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-600 hover:underline">
            <span>Filters</span>
            {/* Optional Filter Icon */}
            {/* <FaFilter /> */}
          </button>
          <a href="#" className="text-gray-600 hover:underline">
            View all
          </a>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-4 px-20">
        {featuredRentalsData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            {/* Image Placeholder */}
            <div className="h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              <AiFillStar />
              <span className="text-sm font-medium">{item.rating}</span>
              <span className="text-xs text-gray-400">({item.reviews})</span>
            </div>

            {/* Item Info */}
            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{item.city}</p>

            {/* Price & Rent Tag */}
            <div className="flex items-center justify-between">
              <span className="font-bold">${item.price}/day</span>
              <span className="text-blue-600 text-sm">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
