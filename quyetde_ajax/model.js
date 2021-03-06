const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true //dinh nghia bat buoc
  },
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const questionModel = mongoose.model("Question", QuestionSchema);
module.exports = questionModel;
