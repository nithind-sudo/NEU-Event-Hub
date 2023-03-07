const express = require('express')
const router = express.Router()

const index_controller = require("../controllers/index");

router.get("/", index_controller.welcome);

router.get("/healthz", index_controller.healthz);

module.exports = router;
