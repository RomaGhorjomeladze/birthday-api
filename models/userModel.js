const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  avatar: {
    imageid: { type: String },
    imageurl: { type: String }
  },
  lastname: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  birthday: {
    type: Date,
    require: true
  },
  role: {
    type: String
  },
  status: {
    type: String
  },
  successful: {
    type: Number,
    default: 0
  },
  unSuccessful: {
    type: Number,
    default: 0
  }
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWTSECRET, {
    expiresIn: "24h"
  });
  return token;
};

module.exports = mongoose.model("User", UserSchema);
