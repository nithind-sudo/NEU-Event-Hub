const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allUsers = require("../server/routes/allUsers");

const { mongoose, mongooseConnection } = require("./mongodb/db");
const categoryRouter = require("./routes/category");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

const index_routes = require("./routes/index");
const userRoutes = require("./routes/users");
const sessionRoutes = require("./routes/sessions");
const eventRoute = require("./routes/events");

app.use("/", index_routes);
app.use("/v1/session", sessionRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/event", eventRoute);
app.use("/category", categoryRouter);
app.use("/getAllUsers", allUsers);

module.exports = app;
