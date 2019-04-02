const express = require("express");
const bcryptjs = require("bcryptjs");
const UserModel = require("../users/models");
const path = require("path");

const authRouter = express();
// authRouter.use(express.static(path.resolve(__dirname.substring(0, __dirname.length - 17)+"/front-end")));
// console.log(path.resolve(__dirname.substring(0, __dirname.length - 17)+"/front-end"));

authRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//register
authRouter.post("/register", async (req, res) => {
  try {
    const userInfo = req.body;
    //check email/password/firstName/lastName empty
    if (
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.firstName ||
      !userInfo.lastName
    ) {
      res
        .status(201)
        .json({ message: "Vui lòng điền đầy đủ thông tin!", success: false });
    } else {
      //check email regex
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(userInfo.email).toLowerCase())) {
        //check email exist
        const checkExist = await UserModel.findOne({
          email: userInfo.email
        }).exec();
        if (checkExist) {
          res
            .status(201)
            .json({ message: "Email đã tồn tại!", success: false });
        } else {
          //check password regex
          const pass = /^(?=.*[a-z])(?=.*\d).{6,10}$/;
          if (userInfo.password.match(pass)) {

            const hashPassword = await bcryptjs.hash(userInfo.password, 10);
            const newUser = await UserModel.create({
              ...userInfo,
              password: hashPassword
            });

            res.status(201).json({
              message: "Success",
              success: true
            });
          } else {

            res.status(201).json({
              message: "Password phải chứa 6-10 kí tự và bao gồm số!",
              success: false
            });
          }
        }
      } else {
        res.status(201).json({ message: "Email chưa hợp lệ!", success: false });
      }
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
});

//login
authRouter.post("/login", async (req, res) => {
  try {
    const loginInfo = req.body;
    //check email/password empty
    if (!loginInfo.email || !loginInfo.password) {
      res
        .status(200)
        .json({ message: "Hãy điền đầy đủ thông tin!", success: false });
    } else {
      const user = await UserModel.findOne({ email: loginInfo.email }).exec();

      if (!user) {
        res
          .status(200)
          .json({ message: "Tài khoản không tồn tại!", success: false });
      } else {
        const comparePassword = await bcryptjs.compare(
          loginInfo.password,
          user.password
        );
        if (comparePassword) {
          //success
          //save session storage
          req.session.user = {
            _id: user._id,
            email: user.email,
            permissions: user.permissions.length > 0 ? user.permissions : []
          };
          // console.log(req.session.user);
          req.session.save();
          res.status(200).json({
            message: "Login success!",
            success: true
          });
        } else {
          res.status(200).json({
            message: "Mật khẩu chưa chính xác!",
            success: false
          });
        }
      }

      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
});

authRouter.get("/test", (req, res) => {
  console.log(req.session.user);
  res.status(200).end();
});

//logout
authRouter.get("/logout", (req, res) => {
  try {
    // console.log(req.session.user);
    req.session.destroy();
    res.status(200).json({
      message: "Logout success",
      success: true
    });
  } catch (error) {
    res.status(500).end(error.message);
  }
});

module.exports = authRouter;
