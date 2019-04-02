const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

//middlewares

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get("/register", (req, res) => {
  try {
    res.status(200).sendFile(path.resolve(__dirname + "/public/register.html"));
  } catch (error) {
    res.status(500).end(error.message);
  }
});

app.get("/posts", (req, res) => {
  try {
    res.status(200).sendFile(path.resolve(__dirname + "/public/main.html"));
  } catch (error) {
    res.status(500).end(error.message);
  }
});

app.get("/login", (req, res) => {
    try {
      res.status(200).sendFile(path.resolve(__dirname + "/public/login.html"));
    } catch (error) {
      res.status(500).end(error.message);
    }
  });



//start server
app.listen(3001, error => {
  if (error) {
    throw error;
  }
  console.log("Server listen on port 3001...");
});
