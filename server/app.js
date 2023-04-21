const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allUsers = require("../server/routes/allUsers");
const search = require("./routes/search");

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
const paymentRoute = require("./routes/payment");

app.use("/", index_routes);
app.use("/v1/session", sessionRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/event", eventRoute);
app.use("/v1/payment", paymentRoute);
app.use("/category", categoryRouter);
app.use("/getAllUsers", allUsers);
app.use("/search", search);

module.exports = app;
