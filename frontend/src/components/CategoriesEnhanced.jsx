import React from "react";
import {
  AiOutlineHome,
  AiOutlineCar,
  AiOutlineLaptop,
  AiOutlineCamera,
} from "react-icons/ai";
import { FaTshirt, FaCouch, FaTools, FaBiking } from "react-icons/fa";
import { Button } from "./ui/button";

const CategoriesEnhanced = ({ selectedCategories, setSelectedCategories }) => {
  const categories = [
    {
      label: "Home",
      icon: <AiOutlineHome size={20} />,
      value: "Home",
    },
    {
      label: "Vehicles",
      icon: <AiOutlineCar size={20} />,
      value: "Vehicles",
    },
    {
      label: "Electronics",
      icon: <AiOutlineLaptop size={20} />,
      value: "Electronics",
    },
    {
      label: "Photography",
      icon: <AiOutlineCamera size={20} />,
      value: "Photography",
    },
    {
      label: "Clothing",
      icon: <FaTshirt size={20} />,
      value: "Clothing",
    },
    {
      label: "Furniture",
      icon: <FaCouch size={20} />,
      value: "Furniture",
    },
    {
      label: "Tools",
      icon: <FaTools size={20} />,
      value: "Tools",
    },
    {
      label: "Sports",
      icon: <FaBiking size={20} />,
      value: "Sports",
    },
  ];

  const toggleCategory = (categoryValue) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryValue)) {
        return prev.filter((cat) => cat !== categoryValue);
      } else {
        return [...prev, categoryValue];
      }
    });
  };

  const clearAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {selectedCategories.length > 0 &&
            `${selectedCategories.length} selected`}
        </span>
        {selectedCategories.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.value);
          return (
            <button
              key={category.value}
              onClick={() => toggleCategory(category.value)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                isSelected
                  ? "bg-blue-50 border-blue-200 text-blue-800"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={isSelected ? "text-blue-600" : "text-gray-500"}
                >
                  {category.icon}
                </span>
                <span className="text-sm font-medium">{category.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesEnhanced;
