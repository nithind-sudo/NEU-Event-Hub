const {mongoose, mongooseConnection} = require("../mongodb/db");
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
    unique: true 
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
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  created_time: {
    type: Date,
    default: () => Date.now(),
  },
  updated_time: {
    type: Date,
    default: () => Date.now(),
  },
});

eventSchema.pre('save', async function(next) {
    console.log("***** Inside pre middleware event collections mongodb *****")
    if (!this.isNew) {
      return next();
    }
    const doc = this;
    const seq = await getNextSequenceValue('event_id');
    doc.event_id = seq;
    return next();
  });

const Event = model('Event', eventSchema);
module.exports = Event;