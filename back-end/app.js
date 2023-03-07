const express = require("express");
// const mongoose = require('mongoose');
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./server/database/connection");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use(
  cors({
    origin: "*",
  })
);
dotenv.config({ path: "config.env" });

// Log request
app.use(morgan("tiny"));

// MongoDB connect
connectDB();

app.use(express.json());

// app.use('/api/auth', userRoutes)
// app.use('', squadRoutes)
// app.use('', tournamentRoutes)

module.exports = app;
