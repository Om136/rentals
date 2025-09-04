// src/components/ManageItems.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { set } from "react-datepicker/dist/date_utils";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaBoxOpen,
  FaPlus,
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
      // Redirect to sign-in page if no token found
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

        const response = await axios.get(
          "http://localhost:5000/items/my/items",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Map the response object to match the existing item structure
        const mappedItems = response.data.map((item) => ({
          id: item.id,
          name: item.title,
          price: parseFloat(item.price),
          status: item.status,
          image: item.images?.[0] || "", // Assuming images is an array
          rent_rate: item.rental_rate,
          is_rental: item.is_rental,
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error("Error fetching items:", error);

        // If it's an authentication error, redirect to sign-in
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("token"); // Clear invalid token
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Manage My Items</h1>
        <button
          onClick={() => navigate("/list-item")}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          + Add New Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">Filter by status:</span>
        {["All", "Active", "Rented", "Pending"].map((st) => (
          <button
            key={st}
            onClick={() => {
              setStatusFilter(st);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              statusFilter === st
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      {pageItems.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <FaBoxOpen className="mx-auto h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === "All"
                ? "You haven't listed any items yet. Start earning by listing your first item!"
                : `No items with "${statusFilter}" status found. Try changing the filter or add new items.`}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/list-item")}
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <FaPlus className="mr-2" />
                List Your First Item
              </button>
              {statusFilter !== "All" && (
                <button
                  onClick={() => {
                    setStatusFilter("All");
                    setCurrentPage(1);
                  }}
                  className="block w-full px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  View All Items
                </button>
              )}
            </div>
            <div className="mt-8 text-sm text-gray-500">
              <p>💡 Tips for getting started:</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>• Take clear, well-lit photos</li>
                <li>• Set competitive prices</li>
                <li>• Write detailed descriptions</li>
                <li>• Enable location visibility</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {item.is_rental ? `${item.rent_rate} Rs/day` : item.price}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rented"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                {/* <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-1" /> {item.bookings} bookings
                </div> */}
                <div className="flex space-x-3 mt-3">
                  <button
                    onClick={() => {
                      navigate(`/item/edit/${item.id}`);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <span>
            Page <strong>{currentPage}</strong> of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
