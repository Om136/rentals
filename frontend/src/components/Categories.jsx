import React from "react";
import {
  AiOutlineHome,
  AiOutlineCar,
  AiOutlineLaptop,
  AiOutlineCamera,
} from "react-icons/ai";
import { FaTshirt, FaCouch, FaTools, FaBiking } from "react-icons/fa";

export const Categories = () => {
  const categories = [
    { label: "Home", icon: <AiOutlineHome size={24} /> },
    { label: "Vehicles", icon: <AiOutlineCar size={24} /> },
    { label: "Electronics", icon: <AiOutlineLaptop size={24} /> },
    { label: "Photography", icon: <AiOutlineCamera size={24} /> },
    { label: "Clothing", icon: <FaTshirt size={24} /> },
    { label: "Furniture", icon: <FaCouch size={24} /> },
    { label: "Tools", icon: <FaTools size={24} /> },
    { label: "Sports", icon: <FaBiking size={24} /> },
  ];

  return (
    <section className=" mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-20">
        <h2 className="text-2xl font-bold">Popular Categories</h2>
        <a href="#" className="text-sm text-gray-600 hover:underline">
          View all
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 px-20">
        {categories.map((category) => (
          <div
            key={category.label}
            className="flex flex-col items-center p-4 border rounded-md hover:shadow-sm transition-shadow"
          >
            {category.icon}
            <span className="mt-2 font-medium">{category.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
