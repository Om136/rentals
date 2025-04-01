import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Optional icons for location/calendar
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { Categories } from "@/components/Categories";
import { FeaturedRentals } from "@/components/FeaturedRentals";
import { ItemsForSale } from "@/components/ItemsForSale";
import { HomeFooter } from "@/components/HomeFooter";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("rent");

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-4 my-28">
        <h1 className="text-5xl font-bold">Rent or Buy Anything You Need</h1>
        <h3 className="text-xl">
          Save money and reduce waste by renting items or find great deals on
          things to own.
        </h3>
      </div>

      {/* Search Container */}
      <div className="flex justify-center w-full mb-20">
        {/* Outer Card */}
        <div className="bg-white shadow-md rounded-2xl p-4 w-[90%] max-w-4xl">
          {/* Tabs Section (Rent / Buy) */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("rent")}
              className={`flex-1 py-2 rounded-xl text-center font-semibold ${
                activeTab === "rent" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => setActiveTab("buy")}
              className={`flex-1 py-2 rounded-xl text-center font-semibold ${
                activeTab === "buy" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
            >
              Buy
            </button>
          </div>

          {/* Search Row */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Search Input */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex-1 min-w-[200px]">
              {/* Optional Search Icon */}
              {/* <FaSearch className="text-gray-400 mr-2" /> */}
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent w-full outline-none"
              />
            </div>

            {/* Location Popover */}
            <Popover>
              <PopoverTrigger>
                <button className="flex items-center border border-gray-200 bg-gray-50 rounded-md px-4 py-2">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  Location
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-3">
                <button className="mb-2 text-blue-600">
                  Use current location
                </button>
                <div className="flex flex-col space-y-2">
                  <div>
                    <label htmlFor="lat" className="mr-2 font-semibold">
                      Lat:
                    </label>
                    <input
                      id="lat"
                      type="text"
                      className="border rounded p-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="lng" className="mr-2 font-semibold">
                      Lng:
                    </label>
                    <input
                      id="lng"
                      type="text"
                      className="border rounded p-1"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Date Button (Optional) */}
            {/* <button className="flex items-center border border-gray-200 bg-gray-50 rounded-md px-4 py-2">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              Dates
            </button> */}

            {/* Search Button */}
            <button className="bg-black text-white rounded-md px-6 py-2">
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <Categories />

      </div>
      <div>
        <FeaturedRentals />
        <ItemsForSale />
      </div>
      <div>
        <HomeFooter />
      </div>
    </>
  );
};
