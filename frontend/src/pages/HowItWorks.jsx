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
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section - Modern Design */}
      <section className="bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-slate-900"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-white">How It</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                Works
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Join thousands of people who are saving money and reducing waste
              by sharing items in their community. Here's how our
              <span className="text-yellow-400 font-semibold">
                {" "}
                location-based rental platform
              </span>{" "}
              works.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate("/browse")}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg text-lg"
              >
                🔍 Start Browsing
              </button>
              <button
                onClick={() => navigate("/list-item")}
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold rounded-xl transition-colors text-lg"
              >
                📝 List Your Items
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* For Renters Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-semibold mb-6">
              <span className="text-2xl">🛒</span>
              For Renters
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Find & Rent What You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfect for occasional use items. Why buy when you can rent?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forRenters.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-2xl mb-6 mx-auto group-hover:bg-indigo-200 transition-colors">
                  <div className="text-indigo-600 transform group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {step.title.replace(/^\d+\.\s/, "")}
                </h3>
                <p className="text-gray-600 text-center mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                    {step.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners Section - Enhanced */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold mb-6">
              <span className="text-2xl">💰</span>
              For Item Owners
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Turn Your Items Into Income
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Earn money from things you already own. It's passive income made
              simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forOwners.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                  <div className="text-green-600 transform group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {step.title.replace(/^\d+\.\s/, "")}
                </h3>
                <p className="text-gray-600 text-center mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                    {step.details}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Redesigned */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers unique advantages that make sharing and
              renting easy, safe, and beneficial for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const colors = [
                {
                  bg: "bg-blue-100",
                  text: "text-blue-600",
                  border: "border-blue-200",
                },
                {
                  bg: "bg-green-100",
                  text: "text-green-600",
                  border: "border-green-200",
                },
                {
                  bg: "bg-purple-100",
                  text: "text-purple-600",
                  border: "border-purple-200",
                },
                {
                  bg: "bg-orange-100",
                  text: "text-orange-600",
                  border: "border-orange-200",
                },
              ];
              const color = colors[index % colors.length];

              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl border-2 ${color.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`flex items-center justify-center w-20 h-20 ${color.bg} rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform`}
                  >
                    <div className={color.text}>{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location-Based Feature Highlight - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full font-semibold mb-6">
                  <span className="text-2xl">🎯</span>
                  Our Main Feature
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Location-Based Search
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our smart location search is what makes us special. Find items
                  near you, see exact distances, and connect with neighbors in
                  your community.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 w-5 h-5" />
                    </div>
                    <span className="text-lg text-gray-700">
                      See items within walking distance
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 w-5 h-5" />
                    </div>
                    <span className="text-lg text-gray-700">
                      Save on delivery costs
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 w-5 h-5" />
                    </div>
                    <span className="text-lg text-gray-700">
                      Build local community connections
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 w-5 h-5" />
                    </div>
                    <span className="text-lg text-gray-700">
                      Faster pickup and return
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white">
                  <FaMapMarkerAlt className="w-24 h-24 mx-auto mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">
                    Try Location Search
                  </h3>
                  <p className="text-indigo-100 mb-8 text-lg">
                    Experience our main feature and find items near you
                  </p>
                  <button
                    onClick={() => navigate("/browse")}
                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg"
                  >
                    🔍 Search by Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our platform
            </p>
          </div>

          <div className="space-y-6">
            <div className="group bg-slate-50 hover:bg-slate-100 rounded-2xl p-8 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-2xl">💳</span>
                How does payment work?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All payments are processed securely through our platform.
                Renters pay upfront, and owners receive payment after successful
                rental completion. We hold funds in escrow for protection.
              </p>
            </div>

            <div className="group bg-slate-50 hover:bg-slate-100 rounded-2xl p-8 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                What if an item gets damaged?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We encourage clear communication between renters and owners. Our
                platform includes dispute resolution, and we recommend taking
                photos before and after rentals. Some items may include damage
                protection.
              </p>
            </div>

            <div className="group bg-slate-50 hover:bg-slate-100 rounded-2xl p-8 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-2xl">📍</span>
                How far can I search for items?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You can search within 1km to 100km from your location. Our
                system shows exact distances and helps you find the most
                convenient options nearby.
              </p>
            </div>

            <div className="group bg-slate-50 hover:bg-slate-100 rounded-2xl p-8 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                Is there a fee to use the platform?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browsing and listing items is free. We charge a small service
                fee on successful transactions to maintain the platform and
                provide customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our community and start saving money while helping the
            environment. It's completely free to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/sign-up")}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg text-lg"
            >
              🚀 Sign Up Free
            </button>
            <button
              onClick={() => navigate("/browse")}
              className="px-10 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold rounded-xl transition-colors text-lg"
            >
              🔍 Browse Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
