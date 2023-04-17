const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const uri = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:27017/${process.env.DB_NAME}`;

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

const sessionChecker = (req, res, next) => {
  console.log("Inside Session Checker ");
  if (!req.session || !req.session.user_id || !res.cookies.sid) {
    console.log("Inside if block");
    res.json({ success: false });
  } else {
    store.get(req.cookies.sid, (err, session) => {
      console.log("Inside store getting session info  : ", session);
      if (err || !session) {
        res.json({ success: false });
      } else {
        next();
      }
    });
  }
};
module.exports = sessionChecker;
