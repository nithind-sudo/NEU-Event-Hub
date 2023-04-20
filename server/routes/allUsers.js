const express = require("express");
const User = require("../models/users");
const router = express.Router();

let getAllUsers = async(req, res, err)=>{
    let allUsers = await User.find({"role": "user"}).exec();
    res.send(allUsers);
}

let deleteUser = async(req, res, err)=>{
    let deletedUser = await User.deleteOne({"user_id":req.params.user_id}).exec();
    res.send(deletedUser);
}

router.post("/", getAllUsers);
router.delete("/delete/:user_id", deleteUser);

module.exports = router;