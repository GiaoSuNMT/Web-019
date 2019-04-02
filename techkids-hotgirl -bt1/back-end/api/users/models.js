//user models
//email (uniq)
//password
//fbId
//firstName
//lastName
//avatarUrl
//createdAt

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String
    // required: true,
    // unique: true
  },
  password: {
    type: String
    // required: true
  },
  fbId: {
    type: String
    // required: true,
    // unique: true
  },
  firstName: {
    type: String
    // required: true
  },
  lastName: {
    type: String
    // required: true
  },
  avatarUrl: {
    type: String
    // required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  permissions: {
    type: [String],
    default: ["POST.CREATE"]
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
