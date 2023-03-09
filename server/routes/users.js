const express = require('express')
const router = express.Router()

const userController = require("../controllers/users");

const loggerMiddleware = require("../middleware/loggerMiddleware");

router.get("/:user_id", [loggerMiddleware], userController.getUserInfo);

router.post("/", [loggerMiddleware], userController.createUser);

router.delete("/:user_id", [loggerMiddleware], userController.deleteUserInfo);

router.patch("/:user_id", [loggerMiddleware], userController.patchUserInfo);

module.exports = router;

