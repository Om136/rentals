import React from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaHandshake,
  FaShieldAlt,
  FaCreditCard,
  FaTruck,
  FaUserFriends,
  FaRecycle,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const HowItWorks = () => {
  const navigate = useNavigate();

  const forRenters = [
    {
      icon: <FaSearch className="w-8 h-8 text-gray-700" />,
      title: "1. Search by Location",
      description:
        "Use our location-based search to find items near you. See distance, availability, and ratings.",
      details:
        "Browse thousands of items in your area with our smart location search",
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-gray-700" />,
      title: "2. Connect with Owner",
      description:
        "Message the owner directly, ask questions, and arrange pickup or delivery details.",
      details: "Built-in messaging system for easy communication",
    },
    {
      icon: <FaCreditCard className="w-8 h-8 text-gray-700" />,
      title: "3. Book & Pay Securely",
      description:
        "Reserve your rental period and pay securely through our platform. Your payment is protected.",
      details: "Secure payments with buyer protection included",
    },
    {
      icon: <FaTruck className="w-8 h-8 text-gray-700" />,
      title: "4. Get Your Item",
      description:
        "Pick up the item or arrange delivery. Use it for your rental period and return it in good condition.",
      details: "Flexible pickup and delivery options",
    },
  ];

  const forOwners = [
    {
      icon: <FaSearch className="w-8 h-8 text-gray-700" />,
      title: "1. List Your Items",
      description:
        "Take photos, set your price, and list items you want to rent out or sell.",
      details: "Easy listing process with photo upload and pricing tools",
    },
    {
      icon: <FaMapMarkerAlt className="w-8 h-8 text-gray-700" />,
      title: "2. Set Your Location",
      description:
        "Your items will be shown to people nearby, maximizing your rental opportunities.",
      details: "Location-based visibility increases your earning potential",
    },
    {
      icon: <FaUserFriends className="w-8 h-8 text-gray-700" />,
      title: "3. Connect with Renters",
      description:
        "Receive rental requests, communicate with potential renters, and approve bookings.",
      details: "Full control over who rents your items",
    },
    {
      icon: <FaCreditCard className="w-8 h-8 text-gray-700" />,
      title: "4. Earn Money",
      description:
        "Get paid securely when your items are rented. Build your rental business over time.",
      details: "Regular income from items you already own",
    },
  ];

  const benefits = [
    {
      icon: <FaRecycle className="w-12 h-12 text-gray-600" />,
      title: "Sustainable Living",
      description:
        "Reduce waste by sharing resources instead of everyone buying everything new.",
    },
    {
      icon: <FaShieldAlt className="w-12 h-12 text-gray-600" />,
      title: "Secure Platform",
      description:
        "Protected payments, verified users, and customer support for peace of mind.",
    },
    {
      icon: <FaMapMarkerAlt className="w-12 h-12 text-gray-600" />,
      title: "Local Community",
      description:
        "Connect with neighbors and build stronger local communities through sharing.",
    },
    {
      icon: <FaStar className="w-12 h-12 text-gray-600" />,
      title: "Quality Guaranteed",
      description:
        "Rating system ensures high-quality items and reliable users on both sides.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How RentBuy Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of people who are saving money and reducing waste
              by sharing items in their community. Here's how our location-based
              rental platform works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/browse")}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Start Browsing
              </button>
              <button
                onClick={() => navigate("/list-item")}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                List Your Items
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* For Renters Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              For Renters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find and rent items you need without the full cost of buying.
              Perfect for occasional use items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forRenters.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-gray-700 text-center font-medium">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              For Item Owners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Turn your unused items into income. Earn money from things you
              already own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forOwners.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-gray-700 text-center font-medium">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose RentBuy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique advantages that make sharing and
              renting easy, safe, and beneficial for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-Based Feature Highlight */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  🎯 Location-Based Search - Our Main Feature
                </h2>
                <p className="text-gray-600 mb-6">
                  Our smart location search is what makes RentBuy special. Find
                  items near you, see exact distances, and connect with
                  neighbors in your community.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-600" />
                    <span>See items within walking distance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-600" />
                    <span>Save on delivery costs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-600" />
                    <span>Build local community connections</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-600" />
                    <span>Faster pickup and return</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-8 text-center">
                <FaMapMarkerAlt className="w-20 h-20 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Try Location Search
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience our main feature and find items near you
                </p>
                <button
                  onClick={() => navigate("/browse")}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Search by Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does payment work?
              </h3>
              <p className="text-gray-600">
                All payments are processed securely through our platform.
                Renters pay upfront, and owners receive payment after successful
                rental completion. We hold funds in escrow for protection.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if an item gets damaged?
              </h3>
              <p className="text-gray-600">
                We encourage clear communication between renters and owners. Our
                platform includes dispute resolution, and we recommend taking
                photos before and after rentals. Some items may include damage
                protection.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How far can I search for items?
              </h3>
              <p className="text-gray-600">
                You can search within 1km to 100km from your location. Our
                system shows exact distances and helps you find the most
                convenient options nearby.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a fee to use RentBuy?
              </h3>
              <p className="text-gray-600">
                Browsing and listing items is free. We charge a small service
                fee on successful transactions to maintain the platform and
                provide customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community and start saving money while helping the
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/sign-up")}
              className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Sign Up Free
            </button>
            <button
              onClick={() => navigate("/browse")}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Browse Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
