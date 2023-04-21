const express = require("express");
const router = express.Router();
require("dotenv").config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
var cors = require("cors");
const bodyParser = require("body-parser");
const userController = require("../controllers/users");
const eventController = require("../controllers/events");

express().use(bodyParser.json());
express().use(bodyParser.urlencoded({ extended: true }));
express().use(cors());

router.post("/payment", async (req, res, err) => {
  console.log(req.body);
  res.send(req.body);
});

router.post(
  "/addEventToUser",
  userController.updateUserInfo
);

router.post("/decreaseEventCount", (req, res)=>{
  res.send(req.body);
})

module.exports = router;
