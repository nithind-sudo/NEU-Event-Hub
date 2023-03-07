const mongoose = require("../mongodb/db");
const { Schema, model } = mongoose;
// const AutoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = new Schema({
  username : String,
  password : String,
  firstName : String,
  lastName : String,
  createdAt: Date,
  updatedAt: Date,
});

// userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// generates a collection called users in DB
const User = model("User", userSchema);
module.exports = User;
