const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Generates log line in apache format
app.use(morgan('combined'));


const index_routes = require('./routes/index');


app.use('/', index_routes);


module.exports = app;