const express = require('express')
const router = express.Router()

const sessionController = require("../controllers/sessions");
const authMiddleWare = require('../middleware/authMiddleware');

router.get("/", sessionController.getSessionInfo);

router.post("/", [authMiddleWare],  sessionController.generateSession);

router.delete("/", sessionController.deleteSession);

module.exports = router;
