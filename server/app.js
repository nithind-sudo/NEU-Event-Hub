const express = require('express')
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const {mongoose, mongooseConnection} = require('./mongodb/db');

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
const sessionRoutes = require('./routes/sessions');

app.use('/', index_routes);
app.use('/v1/session', sessionRoutes);
app.use('/v1/user', userRoutes);

module.exports = app;