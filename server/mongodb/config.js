require('dotenv').config();

module.exports = {
    dialect : process.env.DIALECT || mongodb,
    dbName : process.env.DB_NAME,
    hostUrl : process.env.HOST || localhost,
    userName : process.env.USERNAME,
    password : process.env.PASSWORD,
    nodeEnv : process.env.NODE_ENV || development
}