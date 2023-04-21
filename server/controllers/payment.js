const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");
const EventService = require("../services/EventService");
const UserService = require("../services/UserService");

exports.getConfig = async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log();
    // Validate required parameters
    if (!amount) {
      return res
        .status(400)
        .json({ error: "Missing required parameter: amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const userService = new UserService();
    const eventService = new EventService();

    const { paymentIntentId, eventId, user_id } = req.body;

    // Retrieve event and user
    const eventPromise = eventService.getEventInfo(eventId);
    const userPromise = userService.getUserById(user_id);
    const [event, user] = await Promise.all([eventPromise, userPromise]);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Only save the payment record if the payment is successful
    if (paymentIntent.status === "succeeded") {
      const payment = new Payment({
        user: user._id,
        event: event._id,
        amount: paymentIntent.amount / 100,
        paymentDate: new Date(),
        paymentMethod: "Stripe",
        paymentId: paymentIntent.id,
      });

      await payment.save();

      res.status(200).json({
        paymentId: paymentIntent.id,
        eventId,
        user_id,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Payment failed",
        paymentIntentStatus: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
