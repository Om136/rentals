import { stripe } from "../config/stripe.js";

// Create payment intent for rental/purchase
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = "usd", itemId, rentalDays } = req.body;
    const userId = req.user.id;

    // Calculate total amount (convert to cents for Stripe)
    const totalAmount = Math.round(amount * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: currency,
      metadata: {
        userId: userId.toString(),
        itemId: itemId.toString(),
        rentalDays: rentalDays ? rentalDays.toString() : "0",
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};

// Confirm payment and update item status
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const userId = req.user.id;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Here you would update your database
      // For testing, we'll just return success
      
      const { itemId, rentalDays } = paymentIntent.metadata;
      
      // In a real app, you'd update the item status in database:
      // - Mark item as rented/sold
      // - Create booking/transaction record
      // - Send confirmation emails
      
      res.json({
        success: true,
        message: "Payment confirmed successfully",
        transactionDetails: {
          itemId,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          rentalDays: rentalDays || null,
        },
      });
    } else {
      res.status(400).json({ 
        error: "Payment not successful",
        status: paymentIntent.status 
      });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment" });
  }
};

// Get payment history for user
export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // In a real app, you'd fetch from your database
    // For testing, we'll return mock data
    res.json({
      payments: [
        {
          id: 1,
          itemName: "Sample Item",
          amount: 50.00,
          date: new Date().toISOString(),
          status: "completed",
          type: "rental"
        }
      ]
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
};
