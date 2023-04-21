const express = require("express");
const router = express.Router();
require("dotenv").config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
var cors = require("cors");
const bodyParser = require("body-parser");
const userController = require("../controllers/users");
const Payment = require("../models/payment");
const EventService = require("../services/EventService");
const UserService = require("../services/UserService");

express().use(bodyParser.json());
express().use(bodyParser.urlencoded({ extended: true }));
express().use(cors());

router.post("/payment", async (req, res, err) => {
  console.log(req.body);
  res.send(req.body);
});

router.post("/paymentrecord", async (req, res, err) => {
  try {
    console.log("Inside paymentrecord API to store the info to DB ");
    const userService = new UserService();
    const eventService = new EventService();
    const {
      paymentId,
      paymentMethod,
      paymentDate,
      amount,
      quantity,
      event_id,
      user_id,
    } = req.body;
    const eventPromise = eventService.getEventInfo(event_id);
    const userPromise = userService.getUserById(user_id);
    const [event, user] = await Promise.all([eventPromise, userPromise]);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const payment = new Payment({
      user: user._id,
      event: event._id,
      quantity,
      amount: amount,
      paymentDate: paymentDate,
      paymentMethod: paymentMethod,
      paymentId: paymentId,
    });
    console.log("Hitting the DB to save record ");
    await payment.save();

    res.status(200).json({
      paymentId: paymentIntent.id,
      eventId,
      user_id,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/addEventToUser", userController.updateUserInfo);

module.exports = router;
