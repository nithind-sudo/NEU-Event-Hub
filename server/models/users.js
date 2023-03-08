const mongoose = require("../mongodb/db");
const { Schema, model } = mongoose;
// const AutoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = new Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  first_name : {
    type : String,
    required : true,
  },
  last_name : {
    type : String,
    required : true,
  },
  created_time : {
    type : Date,
    default : () => Date.now(),
    immutable : true
  },
  updated_time : {
    type : Date,
    default : () => Date.now(),
    immutable : true
  },
});

// userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// generates a collection called users in DB
const User = model("User", userSchema);
module.exports = User;
