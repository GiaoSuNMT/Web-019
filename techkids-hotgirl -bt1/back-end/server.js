const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const userRouter = require("./api/users/routes");
const postRouter = require("./api/posts/routes");
const authRouter = require("./api/auth/routes");
const expressSession = require("express-session");
mongoose.connect("mongodb://localhost:27017/techkids-hotgirl", err => {
  if (err) {
    throw error;
  }

  const app = express();

  //middlewares
  app.use(express.static(path.resolve(__dirname.substring(0, __dirname.length - 9)+"/front-end")));
  // console.log(path.resolve(__dirname.substring(0, __dirname.length - 9)+"/front-end"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    expressSession({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true
    })
  );

  //routes
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/auth", authRouter);

  //start server
  app.listen(3000, error => {
    if (error) {
      throw error;
    }
    console.log("Server listen on port 3000...");
  });
});
