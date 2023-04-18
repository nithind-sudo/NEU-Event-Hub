const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/sessions");
const authMiddleWare = require("../middleware/authMiddleware");
const sessionMiddleware = require("../middleware/sessionMiddleware");
const sessionChecker = require("../middleware/sessionChecker");

router.get("/", sessionController.getSessionInfo);

router.post(
  "/",
  [authMiddleWare, sessionMiddleware],
  sessionController.generateSession
);

router.delete("/", sessionController.deleteSession);

module.exports = router;
