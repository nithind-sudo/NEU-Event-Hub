const {mongoose, mongooseConnection} = require("../mongodb/db");
const userCounter = require("./userCounter");
const { Schema, model } = mongoose;


async function getNextSequenceValue(sequenceName) {
  const counter = await userCounter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

const userSchema = new Schema({
  user_id: { 
    type: Number, 
    unique: true 
  },
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
  role: {
    type: String,
    enum: ["event-manager", "admin", "user", "performer"],
    default: "user",
  },
  phone_number: {
    type: String,
    required: true,
  },
  events_booked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  created_time : {
    type : Date,
    default : () => Date.now(),
    // immutable : true
  },
  updated_time : {
    type : Date,
    default : () => Date.now(),
    // immutable : true
  },
});


userSchema.pre('save', async function(next) {
  console.log("***** Inside pre middleware mongodb *****")
  if (!this.isNew) {
    return next();
  }

  const doc = this;
  const seq = await getNextSequenceValue('user_id');

  doc.user_id = seq;

  return next();
});

const User = model("User", userSchema);
module.exports = User;
