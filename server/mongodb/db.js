const mongoose = require('mongoose');
const {
    dbName,
    hostUrl,
    userName,
    password,
    nodeEnv,
  } = require("./config");

const uri = `mongodb://${userName}:${password}@${hostUrl}:27017/${dbName}`
let mongooseConnection = ""
console.log("URI of mongodb to connect : ", uri);

async function connectToDB(){
  console.log(" ******** Inside Connect to DB function ******** ");
  try{
    mongooseConnection = await mongoose.connect(uri);
    console.log('Connected to DB successfully');
  }catch(error){
    console.error(error);
  }
}

connectToDB();

module.exports = {mongoose, mongooseConnection};