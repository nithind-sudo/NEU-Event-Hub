const { Sequelize } = require('sequelize');
const {
    dbName,
    hostUrl,
    userName,
    password,
    nodeEnv,
    dbPoolConfig,
  } = require("./config");
  
// Sample URI : mongodb://myuser:mypassword@localhost:27017/mydb

// const uri = 'mongodb://localhost:27017/mydb';
const uri = `mongodb://${userName}:${password}@${hostUrl}:27017/${dbName}`

const sequelize = new Sequelize(uri, {
  dialect: 'mongodb',
  dialectOptions: {
    ssl: false,
  },
});
