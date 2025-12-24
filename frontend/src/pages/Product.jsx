import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaRegHeart,
  FaShareAlt,
  FaCalendarAlt,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import PaymentModal from "../components/PaymentModal";

export const ProductDetails = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tab, setTab] = useState("description");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [product, setProduct] = useState({ images: [] });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const calculateTotal = () => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const total = days * product.rental_rate + 5 + 100;
    return total;
  };

  const formatINR = (value) => {
    const amount = Number(value);
    const safeAmount = Number.isFinite(amount) ? amount : 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(safeAmount);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section with Back Button - Slate Theme */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-slate-900"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Browse
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                🏷️{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                  Product Details
                </span>
              </h1>
              <p className="text-slate-300">
                Everything you need to know about this item
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2">
                <FaShareAlt className="w-4 h-4" />
                Share
              </button>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2">
                <FaRegHeart className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Images & Gallery */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {product.images.length > 0 ? (
                  <img
                    src={
                      product.images[selectedImageIndex] || product.images[0]
                    }
                    alt={product.title || "Product Image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">📷</div>
                    <span className="text-lg">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-indigo-500 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                      <span>
                        {product.location || "Location not specified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-500" />
                      <span>4.8 (24 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Category & Status */}
                <div className="flex gap-2">
                  <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    📂 {product.category || "General"}
                  </span>
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✅ Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking & Pricing */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">
                      {product.is_rental
                        ? formatINR(product.rental_rate)
                        : formatINR(product.price)}
                      {product.is_rental && (
                        <span className="text-lg font-normal">/day</span>
                      )}
                    </div>
                    {product.is_rental && (
                      <div className="text-indigo-100 text-sm mt-1">
                        💡 Great daily rates available
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {product.is_rental ? "🏠 For Rent" : "🛒 For Sale"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Content */}
              <div className="p-6 space-y-6">
                {/* Date Picker for Rentals */}
                {product.is_rental && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <FaCalendarAlt className="w-5 h-5 text-indigo-500" />
                      Select Rental Dates
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText="Choose start date"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          minDate={new Date()}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          placeholderText="Choose end date"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          minDate={startDate || new Date()}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    💰 Pricing Breakdown
                  </h4>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {product.is_rental ? "Rental Rate" : "Item Price"}
                        {product.is_rental && startDate && endDate && (
                          <span className="ml-1">
                            ×{" "}
                            {Math.ceil(
                              (endDate - startDate) / (1000 * 60 * 60 * 24)
                            )}{" "}
                            days
                          </span>
                        )}
                      </span>
                      <span className="font-medium">
                        {formatINR(
                          product.is_rental
                            ? startDate && endDate
                              ? Math.ceil(
                                  (endDate - startDate) /
                                    (1000 * 60 * 60 * 24)
                                ) * product.rental_rate
                              : product.rental_rate
                            : product.price
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">
                        {formatINR(product.is_rental ? 5 : 10)}
                      </span>
                    </div>

                    {product.is_rental && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 flex items-center gap-1">
                          <FaShieldAlt className="w-3 h-3 text-green-500" />
                          Security Deposit (Refundable)
                        </span>
                        <span className="font-medium">{formatINR(100)}</span>
                      </div>
                    )}

                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">
                        {formatINR(
                          product.is_rental
                            ? !startDate || !endDate
                              ? Number(product.rental_rate) + 5 + 100
                              : calculateTotal()
                            : Number(product.price) + 10
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      alert("Please sign in to continue with payment");
                      return;
                    }

                    if (product.is_rental && (!startDate || !endDate)) {
                      alert("Please select rental dates");
                      return;
                    }

                    setShowPaymentModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  {product.is_rental ? "🎯 Reserve Now" : "🛒 Buy Now"}
                </button>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
                  <div className="flex flex-col items-center gap-1">
                    <FaShieldAlt className="w-4 h-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-blue-500">🚚</span>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-purple-500">💬</span>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs Section */}
      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex">
              {[
                { id: "description", label: "📝 Description", icon: "📝" },
                {
                  id: "specifications",
                  label: "🔧 Specifications",
                  icon: "🔧",
                },
                { id: "reviews", label: "⭐ Reviews", icon: "⭐" },
              ].map((tabItem) => (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ${
                    tab === tabItem.id
                      ? "bg-white text-indigo-600 border-b-3 border-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-lg">{tabItem.icon}</span>
                    {tabItem.label.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tab === "description" && (
              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    📝 Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.description ||
                      "No description available for this item."}
                  </p>
                </div>
              </div>
            )}

            {tab === "specifications" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  🔧 Specifications
                </h3>
                {product.specifications && product.specifications.length > 0 ? (
                  <ul className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✅</span>
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">📋</span>
                    <p>No specifications available</p>
                  </div>
                )}
              </div>
            )}

            {tab === "reviews" && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  ⭐ Customer Reviews
                </h3>

                {/* Review Summary */}
                <div className="bg-white rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-gray-900">4.8</div>
                    <div>
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="w-5 h-5" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Based on 24 reviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      user: "Sarah M.",
                      comment:
                        "Great quality item, exactly as described. Fast delivery!",
                      rating: 5,
                    },
                    {
                      user: "John D.",
                      comment:
                        "Perfect for my project. Will definitely rent again.",
                      rating: 5,
                    },
                    {
                      user: "Emily R.",
                      comment: "Good condition and fair pricing. Recommended!",
                      rating: 4,
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-gray-900">
                          {review.user}
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        item={product}
        isRental={product.is_rental}
        rentalDays={
          product.is_rental && startDate && endDate
            ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
            : 1
        }
      />
    </div>
  );
};
