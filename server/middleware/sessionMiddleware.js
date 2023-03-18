const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// const sessionStore = {
//   mongooseConnection : mongooseConnection,
//   collections : 'sessions'
// }

const sessionMiddleware = session({
    name: 'sid',
    genid: () => {
      return uuidv4(); // use UUIDs for session IDs
    },
    // store : sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Number(process.env.MAXAGE) || 86400000 },
  });
  
module.exports = sessionMiddleware;
  