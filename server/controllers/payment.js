const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");
const EventService = require("../services/EventService");
const UserService = require("../services/UserService");

exports.createPayment = async (req, res) => {
  try {
    const userService = new UserService();
    const eventService = new EventService();

    const { amount, eventId, user_id } = req.body;
    const event = await eventService.getEventInfo(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const user = await userService.getUserById(user_id);
    if(!event){
        return res.status(404).json({ error : "User Not found"});
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: `${event.title} - ${event.location}`,
      payment_method_types: ["card"],
      confirm: true,
    });

    const payment = new Payment({
      user: user._id,
      event: event._id,
      amount: paymentIntent.amount / 100,
      paymentDate: new Date(),
      paymentMethod: "Stripe",
      paymentId : paymentIntent.id
    });

    await payment.save();

    res
      .status(200)
      .json({
        paymentId : paymentIntent.id,
        amount, eventId, user_id, success : true
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
