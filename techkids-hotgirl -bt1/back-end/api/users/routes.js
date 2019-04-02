const express = require("express");
const userModel = require("./models");

const userRouter = express();

userRouter.post("/", async (req, res) => {
  //create user
  try {
    //check email

    //save to db

    const existEmail = await userModel
      .findOne({ email: req.body.email })
      .exec();
    if (existEmail) {
      res.status(403).end("Email has been used");
    } else {
      const userInfo = req.body;
      const newUser = await userModel.create(userInfo);

      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).end(err.message);
  }
});

module.exports = userRouter;
