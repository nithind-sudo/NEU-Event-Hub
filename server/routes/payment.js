const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");

router.get("/config", paymentController.getConfig);

router.post("/create-payment-intent", paymentController.createPaymentIntent);

router.post("/", paymentController.confirmPayment);

module.exports = router;
