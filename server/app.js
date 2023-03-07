const express = require('express')
const bodyParser = require('body-parser');
const {connectToDB, mongoose} = require('./mongodb/db');

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const index_routes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use('/', index_routes);
app.use('/v1/user', userRoutes)

module.exports = app;