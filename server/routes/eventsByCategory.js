const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.get("/:CategoryName", eventController.getAllEventsByCategory)

module.exports = router;