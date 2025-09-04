import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";

// Initialize Stripe (replace with your actual test public key)
const stripePromise = loadStripe(
  "pk_test_YOUR_ACTUAL_STRIPE_PUBLISHABLE_KEY_HERE"
);

const CheckoutForm = ({
  amount,
  itemId,
  itemName,
  isRental,
  rentalDays,
  onSuccess,
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/payment/create-payment-intent",
          {
            amount,
            itemId,
            rentalDays: isRental ? rentalDays : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setPaymentError("Failed to initialize payment. Please try again.");
      }
    };

    createPaymentIntent();
  }, [amount, itemId, rentalDays, isRental]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setPaymentError(error.message);
        setIsProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        // Confirm payment on backend
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:5000/payment/confirm-payment",
          {
            paymentIntentId: paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsProcessing(false);
        onSuccess && onSuccess(paymentIntent);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Item:</span>
            <span className="font-medium">{itemName}</span>
          </div>
          {isRental && (
            <div className="flex justify-between">
              <span>Rental Period:</span>
              <span>{rentalDays} days</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold border-t pt-2">
            <span>Total:</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Card Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          <FaCreditCard className="inline mr-2" />
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center text-sm text-gray-600 bg-green-50 p-3 rounded-md">
        <FaLock className="mr-2 text-green-600" />
        Your payment information is secure and encrypted
      </div>

      {/* Error Message */}
      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700 text-sm">{paymentError}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
          className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </div>

      {/* Test Card Info */}
      <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
        <p className="font-semibold">Test Mode - Use these test cards:</p>
        <p>• 4242 4242 4242 4242 (Visa)</p>
        <p>• Any future expiry date, any CVC</p>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, item, isRental, rentalDays }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const amount = isRental
    ? item.rental_rate * rentalDays
    : parseFloat(item.price);

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onClose();
      setPaymentSuccess(false);
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-600 mb-4">
            Your {isRental ? "rental" : "purchase"} has been confirmed.
          </p>
          <p className="text-sm text-gray-500">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isRental ? "Complete Rental" : "Complete Purchase"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={amount}
            itemId={item.id}
            itemName={item.title}
            isRental={isRental}
            rentalDays={rentalDays}
            onSuccess={handlePaymentSuccess}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;
