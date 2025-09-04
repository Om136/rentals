import express from "express";
import {
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create payment intent
router.post("/create-payment-intent", authMiddleware, createPaymentIntent);

// Confirm payment
router.post("/confirm-payment", authMiddleware, confirmPayment);

// Get payment history
router.get("/history", authMiddleware, getPaymentHistory);

export default router;
