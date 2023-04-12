const { mongoose, mongooseConnection } = require("../mongodb/db");
const eventCounter = require("./eventCounter");
const { Schema, model } = mongoose;

async function getNextSequenceValue(sequenceName) {
  const counter = await eventCounter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

const eventSchema = new Schema({
  event_id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  imageUrl: 
    {
      type: String,
      validate: {
        validator: function (url) {
          // Simple URL validation regex
          const urlRegex = /^https?:\/\/(?:[a-zA-Z0-9_-]{1,256}\.[a-zA-Z0-9_-]{1,6})?\S*$/;
          return urlRegex.test(url);
        },
        message: (props) => `${props.value} is not a valid URL.`,
      },
    },
  created_time: {
    type: Date,
    default: () => Date.now(),
  },
  updated_time: {
    type: Date,
    default: () => Date.now(),
  },
  category: {
    type: String,
    required: true,
  },
});

eventSchema.pre("save", async function (next) {
  console.log("***** Inside pre middleware event collections mongodb *****");
  if (!this.isNew) {
    return next();
  }
  const doc = this;
  const seq = await getNextSequenceValue("event_id");
  doc.event_id = seq;
  return next();
});

const Event = model("Event", eventSchema);
module.exports = Event;
