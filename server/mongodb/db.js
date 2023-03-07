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

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = {
    sequelize,
    DataTypes,
};
  