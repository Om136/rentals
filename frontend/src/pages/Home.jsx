import React from "react";
import { Categories } from "../components/Categories";
import { FeaturedRentals } from "../components/FeaturedRentals";
import { ItemsForSale } from "../components/ItemsForSale";
import { HomeFooter } from "../components/HomeFooter";
import LocationBasedSearch from "../components/LocationBasedSearch";

export const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-4 my-16">
        <h1 className="text-5xl font-bold text-center">
          Rent or Buy Anything You Need
        </h1>
        <h3 className="text-xl text-center text-gray-600 max-w-2xl">
          Save money and reduce waste by renting items or find great deals on
          things to own. Search by location to find items near you.
        </h3>
      </div>

      {/* Location-Based Search - Main Feature */}
      <div className="max-w-2xl mx-auto mb-16 px-4">
        <LocationBasedSearch />
      </div>

      {/* Browse Categories */}
      <div className="my-16">
        <Categories />
      </div>

      {/* Featured Content */}
      <div>
        <FeaturedRentals />
        <ItemsForSale />
      </div>

      {/* Footer */}
      <div>
        <HomeFooter />
      </div>
    </>
  );
};
