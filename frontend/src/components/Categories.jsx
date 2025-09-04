import React from "react";
import {
  AiOutlineHome,
  AiOutlineCar,
  AiOutlineLaptop,
  AiOutlineCamera,
} from "react-icons/ai";
import {
  FaTshirt,
  FaCouch,
  FaTools,
  FaBiking,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Categories = ({ setSelectedCategory }) => {
  const navigate = useNavigate();

  const categories = [
    {
      label: "Home",
      icon: <AiOutlineHome size={24} />,
      count: "25 items",
    },
    {
      label: "Vehicles",
      icon: <AiOutlineCar size={24} />,
      count: "18 items",
    },
    {
      label: "Electronics",
      icon: <AiOutlineLaptop size={24} />,
      count: "35 items",
    },
    {
      label: "Photography",
      icon: <AiOutlineCamera size={24} />,
      count: "12 items",
    },
    {
      label: "Clothing",
      icon: <FaTshirt size={24} />,
      count: "8 items",
    },
    {
      label: "Furniture",
      icon: <FaCouch size={24} />,
      count: "15 items",
    },
    {
      label: "Tools",
      icon: <FaTools size={24} />,
      count: "22 items",
    },
    {
      label: "Sports",
      icon: <FaBiking size={24} />,
      count: "16 items",
    },
  ];

  return (
    <section className="mx-auto px-4 py-16 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 px-4 lg:px-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Categories
          </h2>
          <p className="text-gray-600 mt-2">
            Browse by category to find what you need
          </p>
        </div>
        <button
          onClick={() => navigate("/browse")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View all
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 px-4 lg:px-20">
        {categories.map((category) => (
          <div
            key={category.label}
            onClick={() => {
              setSelectedCategory(category.label);
              navigate("/browse");
            }}
            className="group flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300"
          >
            <div className="mb-4 p-3 rounded-full bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
              {category.icon}
            </div>
            <span className="font-semibold text-gray-900 mb-1 text-center">
              {category.label}
            </span>
            <span className="text-xs text-gray-500">{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
