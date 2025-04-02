import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const pageSize = 8; // Number of products per page

export const ProductGrid = ({ category, searchValue }) => {
  console.log("Selected Category:", category);
  console.log(searchValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]); // Store all fetched products

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        setAllProducts(response.data);
        console.log("Products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Use useMemo to calculate filtered products without setting state
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Check category match. If category is "all", allow all products.
      const categoryMatches =
        category === "all" || product.category === category;

      // Check search match. If searchValue is empty, allow all products.
      // Otherwise, filter based on product title (ignoring case).
      const searchMatches =
        searchValue.trim() === "" ||
        product.title.toLowerCase().includes(searchValue.toLowerCase());

      // Only include products that match both filters.
      return categoryMatches && searchMatches;
    });
  }, [category, allProducts, searchValue]);


  // Reset current page when filtered products change (optional)
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Get products for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-sm p-4 relative"
          >
            <div className="h-52 bg-gray-200 flex items-center justify-center rounded-md mb-4">
              <img src={product.images[0]} alt="Product" />
            </div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold">
                {product.is_rental
                  ? `${product.rental_rate}₹/day`
                  : product.price}
              </span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  product.is_rental
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {product.is_rental ? "Rent" : "Buy"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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
    </div>
  );
};
