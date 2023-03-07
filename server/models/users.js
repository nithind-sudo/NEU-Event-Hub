const mongoose = require("../mongodb/db");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username : String,
  password : String,
  firstName : String,
  lastName : String,
  createdAt: Date,
  updatedAt: Date,
});

// generates a collection called users in DB
const User = model("User", userSchema);
module.exports = User;
