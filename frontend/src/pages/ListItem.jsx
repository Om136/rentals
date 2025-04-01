import React, { useState } from "react";

export const ListItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    price: "",
    weeklyPrice: "",
    monthlyPrice: "",
    deposit: "",
    serviceFee: "",
    image: null,
    listingType: "rent",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Listing Data:", formData);
    alert("Item listed successfully!");
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
            <option value="Camera">Camera</option>
            <option value="Bicycle">Bicycle</option>
            <option value="Electronics">Electronics</option>
            <option value="Other">Other</option>
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
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
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
            <label className="block font-medium">Weekly Price ($)</label>
            <input
              type="number"
              name="weeklyPrice"
              value={formData.weeklyPrice}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Monthly Price ($)</label>
            <input
              type="number"
              name="monthlyPrice"
              value={formData.monthlyPrice}
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
              src={formData.image}
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
