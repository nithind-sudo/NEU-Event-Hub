const express = require('express')
const router = express.Router()

const eventController = require("../controllers/events");

const loggerMiddleware = require("../middleware/loggerMiddleware");

router.get("/:event_id", [loggerMiddleware], eventController.getEventInfo);

router.post("/", [loggerMiddleware], eventController.createEvent);

router.delete("/:event_id", [loggerMiddleware], eventController.deleteEventInfo);

router.patch("/:event_id", [loggerMiddleware], eventController.patchEventInfo);

module.exports = router;
