const {mongoose, mongooseConnection} = require("../mongodb/db");
const listingsCounter = require("./listingsCounter");
const { Schema, model } = mongoose;

async function getNextSequenceValue(sequenceName) {
    const counter = await listingsCounter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return counter.seq;
}

const listingSchema = new Schema({
  listing_id : {
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
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_time: {
    type: Date,
    default: () => Date.now(),
  },
  updated_time: {
    type: Date,
    default: () => Date.now(),
  },
});

listingSchema.pre('save', async function(next) {
    console.log("***** Inside pre middleware event collections mongodb *****")
    if (!this.isNew) {
      return next();
    }
    const doc = this;
    const seq = await getNextSequenceValue('listing_id');
    doc.listing_id = seq;
    return next();
  });


const Listing = model('Listing', listingSchema);
module.exports = Listing;
