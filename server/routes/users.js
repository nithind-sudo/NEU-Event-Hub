const express = require('express')
const router = express.Router()

const userController = require("../controllers/users");

const loggerMiddleware = require("../middleware/loggerMiddleware");

router.post("/", [loggerMiddleware], userController.createUser);


module.exports = router;

