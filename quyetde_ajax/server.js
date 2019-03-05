const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

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

// server.get("/random", (req, res) => {
//   fs.readFile("./data.json", (err, data) => {
//     if (err) {
//       res.status(500).send("Internal server error");
//     }
//     const questions = JSON.parse(data);
//     const num = questions.length;
//     res.status(200).send(num);
//   });
// });

server.post("/yes-no", (req, res) => {
  const questionId = Number(req.query.questionId);
  const value = req.query.value;
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    const questions = JSON.parse(data);
    let selectQuestion;
    for (let item of questions) {
      if (item.id === questionId) {
        selectQuestion = item;
        break;
      }
    }
    if (selectQuestion) {
      if (value == "yes") {
        questions[questionId].yes++;
      }
      if (value == "no") {
        questions[questionId].no++;
      }
      if (value == "xemketqua") {
        res.status(201).json({ url: `/result/${questionId}` });
      }
      fs.writeFile("./data.json", JSON.stringify(questions), err => {
        if (err) throw err;
      });
      res.status(201).json({ url: `/result/${questionId}` });
    } else {
      res.status(201).json({ message: "Question not found" });
    }
  });
});

server.get("/get-question-by-id", (req, res) => {
  const questionId = req.query.questionId;
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    
    const questions = JSON.parse(data);
    let selectQuestion;
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        selectQuestion = item;
        break;
      }
    }
    if (selectQuestion) {
      res.status(200).json(selectQuestion);
    } else {
      res.status(200).json({ message: "Question not found" });
    }
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

server.post("/create-question", (req, res) => {
  // let result;
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
    }

    const questions = JSON.parse(data);
    questions.push({
      id: questions.length,
      content: req.body.content,
      yes: 0,
      no: 0,
      createAt: new Date().toLocaleString()
    });
    // result = fs.readFileSync("./public/question.html", "utf8");
    // result = result.replace("my_ques", req.body.content);
    // result = result.replace("my_vote", 0);
    // result = result.replace("my_yes", "50%");
    // result = result.replace("my_no", "50%");
    // console.log(JSON.parse), JSON.stringify());
    fs.writeFile("./data.json", JSON.stringify(questions), err => {
      if (err) throw err;
    });

    res.status(201).json({ url: `/result/${questions.length-1}` });
  });
});

server.listen(3000, error => {
  if (error) {
    throw error;
  }
  console.log("Server listen on port 3000...");
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
