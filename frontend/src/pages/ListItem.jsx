import { api } from "../lib/api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";

export const ListItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    weeklyPrice: "",
    deposit: "",
    serviceFee: "",
    image: null,
    listingType: "rent",
    latitude: "",
    longitude: "",
    locationAddress: "", // New field for address
  });

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to sign-in page if no token found
      navigate("/sign-in");
      return;
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Store the file directly instead of creating an object URL immediately
    setFormData({ ...formData, image: file });
  };

  // Handle location selection from LocationPicker
  const handleLocationSelect = (lat, lng, address) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
      locationAddress: address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.latitude || !formData.longitude) {
      alert("Please select a location for your item.");
      return;
    }

    const data = new FormData();

    // Ensure all fields are appended correctly
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    // Log the FormData keys and values for debugging
    const jsonbody = {};
    for (let [key, value] of data.entries()) {
      jsonbody[key] = value;
    }
    console.log("FormData:", jsonbody);

    const body = {
      title: jsonbody.name,
      description: jsonbody.description,
      category: jsonbody.category,
      lng: jsonbody.longitude,
      lat: jsonbody.latitude,
      price: jsonbody.SellingPrice,
      rental_rate: jsonbody.price,
      is_rental: jsonbody.listingType === "rent",
      image: jsonbody.image,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      const response = await api.post("/items", body, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart/form-data is used
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response.data);
      alert("Item listed successfully!");
      navigate("/"); // Redirect to home page or another page after successful listing
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        console.error("Error:", error);
        alert("An error occurred. Please check the console for details.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
              List Your Item
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Turn your unused items into income. It's easy, secure, and
            profitable.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 lg:p-12">
              {/* Progress indicator */}
              <div className="mb-12">
                <div className="flex items-center justify-center space-x-4 text-sm font-medium">
                  <div className="flex items-center text-indigo-600">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-2">
                      1
                    </div>
                    Item Details
                  </div>
                  <div className="w-8 border-t border-gray-300"></div>
                  <div className="flex items-center text-indigo-600">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-2">
                      2
                    </div>
                    Pricing & Location
                  </div>
                  <div className="w-8 border-t border-gray-300"></div>
                  <div className="flex items-center text-gray-400">
                    <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center mr-2">
                      3
                    </div>
                    Publish
                  </div>
                </div>
              </div>

              {/* Item Details Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  Item Information
                </h2>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Professional DSLR Camera"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                    >
                      <option value="">Select Category</option>
                      <option value="Home">🏠 Home</option>
                      <option value="Vehicles">🚗 Vehicles</option>
                      <option value="Electronics">💻 Electronics</option>
                      <option value="Photography">📷 Photography</option>
                      <option value="Clothing">👕 Clothing</option>
                      <option value="Furniture">🪑 Furniture</option>
                      <option value="Tools">🔧 Tools</option>
                      <option value="Sports">⚽ Sports</option>
                      <option value="Others">📦 Others</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your item in detail. Include condition, features, and any important information..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Item Photo *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
                    {formData.image ? (
                      <div className="space-y-4">
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Uploaded"
                          className="w-32 h-32 object-cover rounded-xl mx-auto shadow-lg"
                        />
                        <p className="text-gray-600">
                          Photo uploaded successfully!
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, image: null })
                          }
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove Photo
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-gray-600 mb-4">
                          Click to upload a photo of your item
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
                        >
                          Choose Photo
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Listing Type & Pricing Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="text-3xl">💰</span>
                  Pricing & Availability
                </h2>

                {/* Listing Type */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    How do you want to list this item? *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label
                      className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.listingType === "rent"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="listingType"
                        value="rent"
                        checked={formData.listingType === "rent"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">🔄</div>
                        <div>
                          <div className="font-semibold text-lg">For Rent</div>
                          <div className="text-sm text-gray-600">
                            Lend your item and earn recurring income
                          </div>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.listingType === "buy"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="listingType"
                        value="buy"
                        checked={formData.listingType === "buy"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">💸</div>
                        <div>
                          <div className="font-semibold text-lg">For Sale</div>
                          <div className="text-sm text-gray-600">
                            Sell your item for a one-time payment
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Daily Rental Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="25"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Selling Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="SellingPrice"
                        value={formData.SellingPrice || ""}
                        onChange={handleChange}
                        required
                        placeholder="500"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Security Deposit (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="deposit"
                        value={formData.deposit}
                        onChange={handleChange}
                        required
                        placeholder="100"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Service Fee (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="serviceFee"
                        value={formData.serviceFee}
                        onChange={handleChange}
                        required
                        placeholder="10"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  Item Location
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    initialLat={
                      formData.latitude ? parseFloat(formData.latitude) : null
                    }
                    initialLng={
                      formData.longitude ? parseFloat(formData.longitude) : null
                    }
                  />
                  {formData.locationAddress && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-800">
                        <strong>Selected Location:</strong>{" "}
                        {formData.locationAddress}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-xl transform hover:scale-105"
                  >
                    🚀 List My Item
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
