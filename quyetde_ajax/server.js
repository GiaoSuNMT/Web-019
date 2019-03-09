const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const questionModel = require("./model");

mongoose.connect("mongodb://localhost:27017/quyetde", err => {
  if (err) {
    throw err;
  }
  console.log("Connect to Mongodb success");

  const server = express();
  server.use(express.static("public"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/", (req, res) => {
    fs.readFile("./data.json", (err, data) => {
      if (err) {
        res.status(500).send("Internal server error");
      }
      res
        .status(200)
        .sendFile(path.resolve(__dirname + "/public/home-page.html"));
    });
  });

  server.get("/result/:questionId", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/public/vote-result.html"));
  });

  server.post("/yes-no", (req, res) => {
    const questionId = req.query.questionId;
    const value = req.query.value;
    if (err) throw err;
    if (value == "yes") {
      questionModel.updateOne({ id: questionId }, { $inc: { yes: 1 } }, (err,data) => {
        if(err) throw err;
      });
    }
    if (value == "no") {
      questionModel.updateOne({ id: questionId }, { $inc: { no: 1 } }, (err,data) => {
        if(err) throw err;
      });
    }
    if (value == "xemketqua") {
      res.status(201).json({ url: `/result/${questionId}` });
    }
    res.status(201).json({ url: `/result/${questionId}` });
  });

  server.get("/get-random-question", async (req, res) => {
    const questions = await questionModel.find();
    let randomId = Math.floor(Math.random() * questions.length);
    questionModel.findOne({ id: randomId }, (err, data) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  });

  server.get("/get-question-by-id", (req, res) => {
    const questionId = req.query.questionId;
    questionModel.findOne({ id: questionId }, (err, data) => {
      if (err) throw err;
      res.status(200).json(data);
    });
  });

  server.get("/data.json", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname + "/data.json"));
  });

  server.get("/create-question", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/public/create-question.html"));
  });

  server.post("/create-question", async (req, res) => {
    const questions = await questionModel.find();
    const newQuestion = {
      id: questions.length,
      content: req.body.content
    };

    const result = await questionModel.create(newQuestion);
    // res.status(201).json({
    //   id: result._id,
    // });
    res.status(201).json({ url: `/result/${result.id}` });
  });

  server.listen(3000, error => {
    if (error) {
      throw error;
    }
    console.log("Server listen on port 3000...");
  });
});

// server.post("/result/:id", (req, res) => {
//   let Id = parseInt(req.params.id);
//   console.log(Id);
//   let result_page = fs.readFileSync("./public/question.html", "utf8");
//   let matchedId;
//   let num;
//   let yesPercent = 0;
//   let noPercent = 0;
//   fs.readFile("./data.json", (err, data) => {
//     if (err) {
//       res.status(500).send("Internal server error");
//     }
//     let questions = JSON.parse(data);
//     questions.forEach(element => {
//       if (element.id == Id) {
//         matchedId = element;
//         num = element.id;
//       }
//     });
//     if (req.body["btn_yesno"] == "yes") {
//       questions[num].yes++;
//     }
//     if (req.body["btn_yesno"] == "no") {
//       questions[num].no++;
//     }
//     if (req.body["btn_yesno"] == "cauhoikhac") {
//       let randomQues = Math.floor(Math.random() * questions.length);
//       let homepage = fs.readFileSync("./public/home-page.html", "utf8");
//       homepage = homepage.replace(
//         "/result/",
//         "/result/" + randomQues.toString()
//       );
//       homepage = homepage.replace("My_Question", questions[randomQues].content);
//       res.status(201).send(homepage);
//     }
//     if (questions[num].yes == questions[num].no) {
//       yesPercent = "50%";
//       noPercent = "50%";
//     } else {
//       const tong = questions[num].yes + questions[num].no;
//       yesPercent = ((questions[num].yes / tong) * 100).toFixed(2) + "%";
//       noPercent = ((questions[num].no / tong) * 100).toFixed(2) + "%";
//     }
//     result_page = result_page.replace("my_ques", questions[num].content);
//     result_page = result_page.replace(
//       "my_vote",
//       questions[num].yes + questions[num].no
//     );
//     result_page = result_page.replace("my_yes", yesPercent);
//     result_page = result_page.replace("my_no", noPercent);
//     fs.writeFileSync("./data.json", JSON.stringify(questions));
//     res.status(201).send(result_page);
//   });
// });
