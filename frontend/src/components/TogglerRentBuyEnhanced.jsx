import React from "react";

const TogglerRentBuyEnhanced = ({ activeTab, setActiveTab }) => {
  const options = [
    { value: "both", label: "All" },
    { value: "rent", label: "For Rent" },
    { value: "buy", label: "For Sale" },
  ];

  return (
    <div className="mt-2">
      <div className="inline-flex bg-gray-100 p-1 rounded-lg w-full">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveTab(option.value)}
            className={`flex-1 px-4 py-2 rounded-md transition-all text-sm font-medium ${
              activeTab === option.value
                ? "bg-white shadow-sm text-gray-900 font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TogglerRentBuyEnhanced;
