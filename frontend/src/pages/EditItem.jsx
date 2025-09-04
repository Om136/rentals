import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    rental_rate: "", // daily rental rate
    price: "", // selling price
    deposit: "",
    service_fee: "",
    image: null,
    imageUrl: "",
    is_rental: true,
    lat: "",
    lng: "",
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

  // Fetch existing item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/sign-in");
          return;
        }

        const { data } = await axios.get(
          `http://localhost:5000/items/${Number(id)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFormData({
          title: data.title,
          category: data.category,
          description: data.description,
          rental_rate: data.rental_rate || "",
          price: data.price || "",
          deposit: data.deposit || "",
          service_fee: data.service_fee || "",
          image: null,
          imageUrl: data.imageUrl || "",
          is_rental: data.is_rental,
          lat: data.lat || "",
          lng: data.lng || "",
        });
      } catch (err) {
        console.error(err);

        // If it's an authentication error, redirect to sign-in
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/sign-in");
          return;
        }

        alert("Failed to load item.");
        navigate("/manage");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_rental" ? value === "true" : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const body = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      rental_rate: formData.rental_rate,
      price: formData.price,
      deposit: formData.deposit,
      service_fee: formData.service_fee,
      is_rental: formData.is_rental,
      lat: formData.lat,
      lng: formData.lng,
    };

    try {
      const token = localStorage.getItem("token");

      // If user selected a new image, send multipart/form-data
      if (formData.image) {
        const data = new FormData();
        Object.entries(body).forEach(([key, val]) => {
          if (val !== "" && val != null) data.append(key, val);
        });
        data.append("image", formData.image);

        await axios.put(`http://localhost:5000/items/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.put(`http://localhost:5000/items/${id}`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Item updated successfully!");
      navigate("/manage");
    } catch (err) {
      console.error(err);
      alert("Update failed. See console for details.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading item data…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            {[
              "Home",
              "Vehicles",
              "Electronics",
              "Photography",
              "Clothing",
              "Furniture",
              "Tools",
              "Sports",
              "Others",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
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
          />
        </div>

        {/* Location */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Latitude</label>
            <input
              type="number"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Longitude</label>
            <input
              type="number"
              name="lng"
              value={formData.lng}
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
                name="is_rental"
                value="true"
                checked={formData.is_rental === true}
                onChange={handleChange}
              />
              <span>Rent</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="is_rental"
                value="false"
                checked={formData.is_rental === false}
                onChange={handleChange}
              />
              <span>Buy</span>
            </label>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Daily Rental Rate ($)</label>
            <input
              type="number"
              name="rental_rate"
              value={formData.rental_rate}
              onChange={handleChange}
              required={formData.is_rental}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Selling Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required={!formData.is_rental}
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
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Service Fee ($)</label>
            <input
              type="number"
              name="service_fee"
              value={formData.service_fee}
              onChange={handleChange}
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
          {formData.imageUrl && !formData.image && (
            <img
              src={formData.imageUrl}
              alt="Current"
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="New"
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
