const express = require("express");
const User = require("../models/users");
const router = express.Router();

let getAllUsers = async(req, res, err)=>{
    let allUsers = await User.find({}).exec();
    res.send(allUsers);
}

router.post("/", getAllUsers)

module.exports = router;