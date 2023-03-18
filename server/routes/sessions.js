const express = require('express')
const router = express.Router()

const sessionController = require("../controllers/sessions");
const authMiddleWare = require('../middleware/authMiddleware');
const sessionMiddleware = require("../middleware/sessionMiddleware");

router.get("/", sessionMiddleware, sessionController.getSessionInfo);

router.post("/", [authMiddleWare, sessionMiddleware],  sessionController.generateSession);

router.delete("/", [authMiddleWare, sessionMiddleware], sessionController.deleteSession);

module.exports = router;
