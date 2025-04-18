import React, { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaRegHeart, FaShareAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductDetails = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tab, setTab] = useState("description");

  // const product = {
  //   id: 1,
  //   name: "Professional DSLR Camera Kit with Lenses",
  //   price: 35,
  //   weeklyPrice: 210,
  //   monthlyPrice: 700,
  //   location: "San Francisco, CA",
  //   rating: 4.9,
  //   reviews: 128,
  //   deposit: 200,
  //   serviceFee: 15,
  //   image: "", // Add image URL or leave empty for a placeholder
  //   description:
  //     "A high-quality DSLR camera kit with multiple lenses for professional photography.",
  //   specifications: ["24MP Sensor", "4K Video Recording", "Wi-Fi & Bluetooth"],
  // };
  const [product, setProduct] = useState({ images: [] }); // Ensure images is initialized as an empty array

  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const calculateTotal = () => {

    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const total = days * product.rental_rate + 5 + 100; // Rental rate + service fee + deposit
    console.log("Total:", total);
    return total;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      {/* Left Side: Image & Info */}
      <div>
        {/* Product Image */}
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
          {product.images.length > 0 ? ( // Check if images array has elements
            <img
              src={product.images[0]}
              alt={product.title || "Product Image"} // Fallback for alt text
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-500">No Image Available</span>
          )}
        </div>

        {/* Product Info */}
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        {/* <div className="flex items-center text-gray-600 space-x-2 mt-2">
          <FaStar className="text-yellow-500" />
          <span>
            {product.rating} ({product.reviews} reviews)
          </span>
          <FaMapMarkerAlt />
          <span>{product.location}</span>
        </div> */}

        {/* Action Buttons */}
        {/* <div className="flex space-x-4 mt-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-black">
            <FaShareAlt /> <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-black">
            <FaRegHeart /> <span>Save</span>
          </button>
        </div> */}
      </div>

      {/* Right Side: Booking & Pricing */}
      <div className="bg-white shadow-md rounded-lg p-6 border">
        {/* Rent / Buy Toggle */}
        <div className="flex border-b pb-3 space-x-4">
          <button
            className={`text-lg font-semibold pb-1 ${
              product.is_rental ? "border-b-2 border-black" : "text-gray-400"
            }`}
          >
            Rent
          </button>
          <button
            className={`text-lg font-semibold pb-1 ${
              !product.is_rental ? "border-b-2 border-black" : "text-gray-400"
            }`}
          >
            Buy
          </button>
        </div>

        {/* Pricing */}
        <div className="text-3xl font-bold mt-4">
          {product.is_rental
            ? `${product.rental_rate}/day`
            : `$${product.price}`}
        </div>
        {/* <div className="text-gray-500 text-sm">
          Weekly: ${product.weeklyPrice} | Monthly: ${product.monthlyPrice}
        </div> */}

        {/* Date Picker */}
        {product.is_rental && (
          <div className="mt-4">
            <label className="block text-gray-600 font-medium mb-2">
              Select Dates
            </label>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="border p-2 rounded w-1/2"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="border p-2 rounded w-1/2"
              />
            </div>
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span>
              ${product.is_rental ? product.rental_rate : product.price}{" "}
              {product.is_rental && "x"} {product.is_rental && " "}
              {product.is_rental &&
                (startDate && endDate
                  ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
                  : 1)}{" "}
              {product.is_rental && "days"}
            </span>

            <span>
              $
              {!product.is_rental
                ? product.price
                : startDate && endDate
                ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) *
                  product.rental_rate
                : Math.ceil(1 / (1000 * 60 * 60 * 24)) * product.rental_rate}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>${10}</span>
          </div>
          {product.is_rental && (
            <div className="flex justify-between">
              <span>Security Deposit (Refundable)</span>
              <span>${100}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>
              $
              {product.is_rental
                ? !startDate || !endDate
                  ? `${Number(product.rental_rate) + 5 + 100}`
                  : calculateTotal()
                : (Number(product.price) + 10).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Reserve Button */}
        <button className="w-full bg-black text-white py-3 mt-4 rounded-md">
          Reserve Now
        </button>
      </div>

      {/* Tabs: Description, Specifications, Reviews */}
      <div className="col-span-2 mt-10">
        <div className="flex border-b">
          {["description", "specifications", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-lg font-medium ${
                tab === t ? "border-b-2 border-black" : "text-gray-400"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === "description" && <p>{product.description}</p>}
          {tab === "specifications" && (
            <ul className="list-disc pl-5 space-y-1">
              {product.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          )}
          {tab === "reviews" && (
            <div>
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b py-2">
                  <strong>{review.user}:</strong> {review.comment}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
