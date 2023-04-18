const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const uri = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:27017/${process.env.DB_NAME}`;

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});
const CircularJSON = require("circular-json");
const fs = require("fs");

const sessionChecker = (req, res, next) => {
  console.log("**** Inside Session Checker *** ");
  // console.log("Request Body : ", req);
  const json = CircularJSON.stringify(req, null, 2);
  fs.writeFileSync("req.json", json);

  const sid = req.sessionID;
  console.log("sid from session checker : ", sid);
  console.log(!req.session || !req.session.user_id || !req.sessionID);
  if (!req.session || !req.session.user_id || !req.cookies.sid) {
    console.log("Inside if block");
    res.json({ success: false });
  } else {
    store.get(req.sessionID, (err, session) => {
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
