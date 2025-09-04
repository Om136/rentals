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
    <section className="mx-auto px-4">
      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {categories.map((category, index) => {
          const colors = [
            "bg-blue-500 hover:bg-blue-600",
            "bg-indigo-500 hover:bg-indigo-600",
            "bg-purple-500 hover:bg-purple-600",
            "bg-pink-500 hover:bg-pink-600",
            "bg-red-500 hover:bg-red-600",
            "bg-orange-500 hover:bg-orange-600",
            "bg-amber-500 hover:bg-amber-600",
            "bg-green-500 hover:bg-green-600",
          ];

          return (
            <div
              key={category.label}
              onClick={() => {
                setSelectedCategory(category.label);
                navigate("/browse");
              }}
              className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`mb-4 p-4 rounded-2xl text-white ${
                  colors[index % colors.length]
                } transition-all duration-300`}
              >
                {category.icon}
              </div>
              <span className="font-semibold text-gray-900 mb-1 text-center text-sm">
                {category.label}
              </span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
