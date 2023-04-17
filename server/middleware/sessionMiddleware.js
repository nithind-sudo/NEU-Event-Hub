const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const uri = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:27017/${process.env.DB_NAME}`;
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

const sessionMiddleware = session({
  name: "sid",
  genid: () => {
    return uuidv4(); // use UUIDs for session IDs
  },
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: Number(process.env.MAXAGE) || 86400000 },
});

module.exports = sessionMiddleware;
