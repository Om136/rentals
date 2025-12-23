// src/components/ManageItems.jsx
import { api } from "../lib/api";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaBoxOpen,
  FaPlus,
  FaEye,
  FaChartLine,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const pageSize = 6;

export const ManageItems = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sign-in");
          return;
        }

        const response = await api.get("/items/my/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedItems = response.data.map((item) => ({
          id: item.id,
          name: item.title,
          price: parseFloat(item.price),
          status: item.status,
          image: item.images?.[0] || "",
          rent_rate: item.rental_rate,
          is_rental: item.is_rental,
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error("Error fetching items:", error);

        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("token");
          navigate("/sign-in");
          return;
        }
      }
    };
    fetchItems();
  }, [navigate]);

  const filtered = items;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // Calculate stats
  const activeItems = items.filter((item) => item.status === "Active").length;
  const rentedItems = items.filter((item) => item.status === "Rented").length;
  const totalRevenue = items.reduce((sum, item) => {
    if (item.status === "Rented") {
      return sum + (item.is_rental ? item.rent_rate * 7 : item.price); // Estimate weekly rental
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Slate Theme */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-slate-900"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📦{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                  Manage
                </span>{" "}
                Your Items
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl">
                Keep track of your listings, monitor performance, and grow your
                rental business
              </p>
            </div>
            <button
              onClick={() => navigate("/list-item")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-lg"
            >
              <FaPlus className="w-5 h-5" />
              Add New Item
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Dashboard */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FaBoxOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {items.length}
                  </h3>
                  <p className="text-gray-600 text-sm">Total Items</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaEye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {activeItems}
                  </h3>
                  <p className="text-gray-600 text-sm">Active Listings</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaClock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {rentedItems}
                  </h3>
                  <p className="text-gray-600 text-sm">Currently Rented</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    ${totalRevenue}
                  </h3>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Items Section */}
        <div className="space-y-8">
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Listings
                </h2>
                <p className="text-gray-600">
                  Manage and track all your rental items
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Filter by status:
                </span>
                <div className="flex gap-2">
                  {[
                    { key: "All", label: "All", color: "indigo" },
                    { key: "Active", label: "Active", color: "green" },
                    { key: "Rented", label: "Rented", color: "blue" },
                    { key: "Pending", label: "Pending", color: "yellow" },
                  ].map((status) => (
                    <button
                      key={status.key}
                      onClick={() => {
                        setStatusFilter(status.key);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        statusFilter === status.key
                          ? `bg-gradient-to-r from-${status.color}-500 to-${status.color}-600 text-white shadow-lg`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {pageItems.length === 0 ? (
          // Enhanced Empty State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBoxOpen className="w-12 h-12 text-gray-400" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {statusFilter === "All"
                  ? "No items listed yet"
                  : `No ${statusFilter.toLowerCase()} items`}
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {statusFilter === "All"
                  ? "Start your rental business journey by listing your first item. It's quick and easy!"
                  : `No items found with "${statusFilter}" status. Try changing the filter or add new items.`}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => navigate("/list-item")}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaPlus className="mr-3 w-5 h-5" />
                  {statusFilter === "All"
                    ? "List Your First Item"
                    : "Add New Item"}
                </button>

                {statusFilter !== "All" && (
                  <button
                    onClick={() => {
                      setStatusFilter("All");
                      setCurrentPage(1);
                    }}
                    className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    View All Items
                  </button>
                )}
              </div>

              {/* Tips Section */}
              <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  💡 Tips for Success
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">📸</span>
                    <span>Take clear, well-lit photos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">💰</span>
                    <span>Set competitive prices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500">📝</span>
                    <span>Write detailed descriptions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500">📍</span>
                    <span>Enable location visibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Enhanced Items Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <FaBoxOpen className="w-12 h-12 mx-auto mb-2" />
                        <span className="text-sm">No Image</span>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        item.status === "Active"
                          ? "bg-green-500/90 text-white"
                          : item.status === "Rented"
                          ? "bg-blue-500/90 text-white"
                          : "bg-yellow-500/90 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-medium">
                      {item.is_rental ? "🏠 Rental" : "🛒 Sale"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-indigo-600">
                        ${item.is_rental ? item.rent_rate : item.price}
                        {item.is_rental && (
                          <span className="text-sm text-gray-500">/day</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: #{item.id}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/browse/${item.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaEye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/item/edit/${item.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{start + 1}</span> to{" "}
                <span className="font-semibold">
                  {Math.min(start + pageSize, filtered.length)}
                </span>{" "}
                of <span className="font-semibold">{filtered.length}</span>{" "}
                items
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed bg-gray-100"
                      : "text-indigo-600 hover:bg-indigo-50 bg-white border border-indigo-200"
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={page}
                          className="w-10 h-10 flex items-center justify-center text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed bg-gray-100"
                      : "text-indigo-600 hover:bg-indigo-50 bg-white border border-indigo-200"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
