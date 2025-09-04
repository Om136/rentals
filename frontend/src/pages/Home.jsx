import React from "react";
import { Categories } from "../components/Categories";
import { FeaturedRentals } from "../components/FeaturedRentals";
import { ItemsForSale } from "../components/ItemsForSale";
import { HomeFooter } from "../components/HomeFooter";
import LocationBasedSearch from "../components/LocationBasedSearch";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Enhanced */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-slate-900"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Rent or Buy</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                  Anything You Need
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Join thousands of users saving money and reducing waste.
                <span className="text-yellow-400 font-semibold">
                  {" "}
                  Discover amazing items
                </span>{" "}
                near you.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-slate-400">Active Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-sm text-slate-400">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section - Redesigned */}
      <div className="relative bg-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100">
            <div className="p-8 lg:p-12">
              <LocationBasedSearch />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - New */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless rental and buying experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Safe
              </h3>
              <p className="text-gray-600">
                All transactions are protected with industry-leading security
                measures and verified user profiles.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">📍</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Location-Based
              </h3>
              <p className="text-gray-600">
                Find items near you with our smart location system. No more
                long-distance pickups!
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quick & Easy
              </h3>
              <p className="text-gray-600">
                List your items in minutes or find what you need with our
                intuitive search system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Categories */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From everyday essentials to specialized equipment - find exactly
              what you're looking for
            </p>
          </div>
          <Categories />
        </div>
      </div>

      {/* Featured Content - Enhanced */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <FeaturedRentals />
          <div className="mt-20">
            <ItemsForSale />
          </div>
        </div>
      </div>

      {/* CTA Section - New */}
      <div className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join our community today and discover the future of sharing economy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg">
              🔍 Start Browsing
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold rounded-xl transition-colors">
              📝 List Your Items
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900">
        <HomeFooter />
      </div>
    </div>
  );
};
