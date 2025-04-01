import React from "react";
import { AiFillStar } from "react-icons/ai";

// Example data for items for sale
const itemsForSaleData = [
  {
    id: 1,
    name: "Gaming Laptop",
    city: "Austin",
    rating: 4.8,
    reviews: 32,
    price: 1200,
    type: "Buy",
  },
  {
    id: 2,
    name: "Guitar – Acoustic",
    city: "Nashville",
    rating: 4.7,
    reviews: 56,
    price: 250,
    type: "Buy",
  },
  {
    id: 3,
    name: "Smart TV",
    city: "New York",
    rating: 4.5,
    reviews: 44,
    price: 550,
    type: "Buy",
  },
  {
    id: 4,
    name: "Electric Scooter",
    city: "Chicago",
    rating: 4.6,
    reviews: 12,
    price: 300,
    type: "Buy",
  },
];

export const ItemsForSale = () => {
  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between px-20">
        <h2 className="text-2xl font-bold">Items For Sale</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-600 hover:underline">
            <span>Filters</span>
          </button>
          <a href="#" className="text-gray-600 hover:underline">
            View all
          </a>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-4 px-20">
        {itemsForSaleData.map((item) => (
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

            {/* Price & Buy Tag */}
            <div className="flex items-center justify-between">
              <span className="font-bold">${item.price}</span>
              <span className="text-green-600 text-sm">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
