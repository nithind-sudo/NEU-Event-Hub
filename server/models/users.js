const { mongoose, mongooseConnection } = require("../mongodb/db");
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
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
    // this field will not be returned when a document is retrieved from the database
    // select: false
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
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
  isActivated: {
    type: Boolean,
    default: true,
  },
  //NOTE: To check whether the user skipped the email-verification step or not. You can delete the unverified accounts day by day.
  isVerified: {
    type: Boolean,
    required: true,
  },
  //NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
  deletedAt: {
    type: Date,
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
  created_time: {
    type: Date,
    default: () => Date.now(),
    // immutable : true
  },
  updated_time: {
    type: Date,
    default: () => Date.now(),
    // immutable : true
  },
});

userSchema.pre("save", async function (next) {
  // console.log("***** Inside pre middleware mongodb *****");
  if (!this.isNew) {
    return next();
  }

  const doc = this;
  const seq = await getNextSequenceValue("user_id");

  doc.user_id = seq;

  return next();
});

const User = model("User", userSchema);
module.exports = User;
