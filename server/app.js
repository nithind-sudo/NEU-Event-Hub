const express = require('express')
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
require('dotenv').config();

const {mongoose, mongooseConnection} = require('./mongodb/db');

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const sessionStore = {
  mongooseConnection : mongooseConnection,
  collections : 'sessions'
}

app.use(session({
  name : 'sid',
  genid: () => {
    return uuidv4() // use UUIDs for session IDs
  },
  store : sessionStore,
  secret : process.env.SECRET,
  cookie: { maxAge: Number(process.env.MAXAGE) || 86400000 },
  saveUninitialized : true,
  resave: false, // do not save session if unmodified
}));


const index_routes = require('./routes/index');
const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');

app.use('/', index_routes);
app.use('/v1/session', sessionRoutes);
app.use('/v1/user', userRoutes);

module.exports = app;