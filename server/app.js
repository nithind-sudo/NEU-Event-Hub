const express = require('express')
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
require('dotenv').config();

const {connectToDB, mongoose} = require('./mongodb/db');

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(session({
  name : 'sid',
  genid: () => {
    return uuidv4() // use UUIDs for session IDs
  },
  secret : process.env.SECRET,
  cookie: { maxAge: Number(process.env.MAXAGE) || 86400000 },
  saveUninitialized : true,
  resave: false, // do not save session if unmodified
}));
// app.use(cookieParser());


const index_routes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use('/', index_routes);
app.use('/v1/user', userRoutes)

module.exports = app;