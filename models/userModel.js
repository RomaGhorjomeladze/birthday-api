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
    type: String
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
    type: Number
  },
  unSuccessful: {
    type: Number
  }
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWTSECTET, {
    expiresIn: "24h"
  });
  return token
};

module.exports = mongoose.model('User', UserSchema)