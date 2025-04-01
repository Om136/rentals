import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // optional icon

export const HomeFooter = () => {
  return (
    <>
      {/* "How RentBuy Works" Section */}
      <section className=" mx-auto px-4 py-16">
        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col md:flex-row gap-8 px-20">
          {/* Left: Steps */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              How RentBuy Works
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-black mt-1" />
                <div>
                  <h4 className="font-semibold">1. Find what you need</h4>
                  <p className="text-gray-600">
                    Browse thousands of items available for rent or purchase in
                    your area.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-black mt-1" />
                <div>
                  <h4 className="font-semibold">2. Book and pay securely</h4>
                  <p className="text-gray-600">
                    Reserve your rental period or purchase items with our secure
                    payment system.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-black mt-1" />
                <div>
                  <h4 className="font-semibold">
                    3. Pick up or get it delivered
                  </h4>
                  <p className="text-gray-600">
                    Arrange pickup or delivery based on what works for you and
                    the owner.
                  </p>
                </div>
              </li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-900">
              Learn more
            </button>
          </div>

          {/* Right: Placeholder (e.g., image or illustration) */}
          <div className="flex-1 flex items-center justify-center bg-white rounded-md border border-gray-200">
            <span className="text-gray-400">Image or illustration</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className=" px-20 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-semibold mb-2">RentBuy</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-semibold mb-2">Community</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>
                  <a href="#">Forum</a>
                </li>
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">Success stories</a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-semibold mb-2">Support</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>
                  <a href="#">Help center</a>
                </li>
                <li>
                  <a href="#">Safety center</a>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-semibold mb-2">Legal</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">Cookie policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-sm text-gray-500">
            © 2025 RentBuy. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};
