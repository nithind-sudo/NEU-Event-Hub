const mongoose = require('mongoose');
const {
    dbName,
    hostUrl,
    userName,
    password,
    nodeEnv,
  } = require("./config");
  
// Sample URI : mongodb://myuser:mypassword@localhost:27017/mydb

// const uri = 'mongodb://localhost:27017/mydb';

const uri = `mongodb://${userName}:${password}@${hostUrl}:27017/${dbName}`

console.log("URI of mongodb to connect : ", uri);

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', (error) => {console.log(error)});
db.once('open', () => {console.log("Connected to DB")});

module.exports = db;