const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      res.status(400).json({ error: "Unauthenticated user" });
    } else {
      let decoded = await jwt.verify(token, process.env.JWTSECRET);
      let user = await User.findOne({ _id: decoded._id }).select(
        "-password -__v"
      );
      if (!user) {
        res.status(400).json({ error: "Unauthenticated user" });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
