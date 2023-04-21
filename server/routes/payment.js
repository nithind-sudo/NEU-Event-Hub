const express = require("express");
const router = express.Router();
require("dotenv").config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
var cors = require("cors");
const bodyParser = require("body-parser");
const userController = require("../controllers/users");
const eventController = require("../controllers/events");
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
    const eventInfo = await eventService.getEventInfo(event_id);
    const userInfo = await userService.getUserById(user_id);
    const event = eventInfo[0];
    const user = userInfo[0];
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Payment record being created : ", {
      user: user._id,
      event: event._id,
      quantity,
      amount: amount,
      paymentDate: paymentDate,
      paymentMethod: paymentMethod,
      paymentId: paymentId,
    });
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
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
    process.exit(1);
  }
});

router.post("/addEventToUser", userController.updateUserInfo);

router.post("/decreaseEventCount", eventController.updateEvent);

router.post("/getAllPaymentsInfo", async (req, res)=>{
  let response = await Payment.find({user: req.body.userID}).exec();
  res.send(response);
});

module.exports = router;
