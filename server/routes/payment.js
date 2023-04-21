const express = require("express");
const router = express.Router();
require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);
var cors = require('cors');
const bodyParser = require('body-parser');

express().use(bodyParser.json());
express().use(bodyParser.urlencoded({extended: true}));
express().use(cors());

router.post("/payment", async(req, res, err)=>{
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;