import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token && token !== "null" && token !== "undefined");
  }, []);

  // Listen for storage changes (login/logout from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(token && token !== "null" && token !== "undefined");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    navigate("/sign-in");
    setIsMobileMenuOpen(false);
  };

  const handleSignUp = () => {
    navigate("/sign-up");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigateTo("/")}
              className="flex items-center gap-2 text-gray-800 hover:text-indigo-600 transition-colors group"
            >
              {/* <span className="text-2xl">🏠</span> */}
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
                Rentals
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => navigateTo("/browse")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActivePath("/browse")
                  ? "bg-indigo-100 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              🔍 Browse
            </button>
            <button
              onClick={() => navigateTo("/working")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActivePath("/working")
                  ? "bg-indigo-100 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              ❓ How it works
            </button>
            {isAuthenticated && (
              <>
                <button
                  onClick={() => navigateTo("/list-item")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActivePath("/list-item")
                      ? "bg-green-100 text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  ➕ List Item
                </button>
                <button
                  onClick={() => navigateTo("/manage")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActivePath("/manage")
                      ? "bg-purple-100 text-purple-700 shadow-sm"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                >
                  📦 Manage
                </button>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                🚪 Log out
              </button>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 px-6 py-2 rounded-xl font-medium transition-all duration-300"
                >
                  Sign in
                </button>
                <button
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => navigateTo("/browse")}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActivePath("/browse")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                🔍 Browse
              </button>
              <button
                onClick={() => navigateTo("/working")}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActivePath("/working")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                ❓ How it works
              </button>
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => navigateTo("/list-item")}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActivePath("/list-item")
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    ➕ List Item
                  </button>
                  <button
                    onClick={() => navigateTo("/manage")}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActivePath("/manage")
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    📦 Manage
                  </button>
                </>
              )}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                  >
                    🚪 Log out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSignIn}
                      className="block w-full border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={handleSignUp}
                      className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
