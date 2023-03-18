const {mongoose, mongooseConnection} = require("../mongodb/db");
const { Schema, model } = mongoose;

const counterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});
  
const listingsCounter = model('listingsCounter', counterSchema);
  
module.exports = listingsCounter;