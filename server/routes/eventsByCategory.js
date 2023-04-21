const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.get("/:CategoryName", eventController.getAllEventsByCategory);

router.delete("/eventID/:event_id", eventController.deleteEvent);

module.exports = router;