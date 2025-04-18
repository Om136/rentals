import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    latitude: "", // Added latitude
    longitude: "", // Added longitude
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Store the file directly instead of creating an object URL immediately
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const response = await axios.post("http://localhost:5000/items", body, {
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">List Your Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name */}
        <div>
          <label className="block font-medium">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Home">Home</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Electronics">Electronics</option>
            <option value="Photography">Photography</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Tools">Tools</option>
            <option value="Sports">Sports</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* Location */}
        <div className="flex gap-10">
          <div>
            <label className="block font-medium">Latitude</label>
            <input
              type="number"
              name="latitude" // Corrected name attribute
              value={formData.latitude} // Corrected value binding
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Longitude</label>
            <input
              type="number"
              name="longitude" // Corrected name attribute
              value={formData.longitude} // Corrected value binding
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Listing Type */}
        <div>
          <label className="block font-medium">Listing Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="listingType"
                value="rent"
                checked={formData.listingType === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="listingType"
                value="buy"
                checked={formData.listingType === "buy"}
                onChange={handleChange}
              />
              <span>Buy</span>
            </label>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Daily Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Selling Price ($)</label>
            <input
              type="number"
              name="SellingPrice"
              value={formData.SellingPrice || ""}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Security Deposit ($)</label>
            <input
              type="number"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Service Fee ($)</label>
            <input
              type="number"
              name="serviceFee"
              value={formData.serviceFee}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Uploaded"
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
        >
          List Item
        </button>
      </form>
    </div>
  );
};
