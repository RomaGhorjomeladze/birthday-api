const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(400).json({ error: "such username already exists" });
    } else {
      if (req.body.password.trim().length < 6) {
        return res
          .status(400)
          .json({ error: "Password's length must be at least 6 characters" });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          let tempBuffer = req.file.buffer;
          try {
            let uploaded = await cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "image",
                  folder: "users",
                  width: 250,
                  height: 250,
                  crop: "fit"
                },
                async (error, result) => {
                  let user = new User({
                    ...req.body,
                    password: hash,
                    avatar: { imageid: result.public_id, imageurl: result.url }
                  });
                  const newUser = await user.save();
                  return res.status(200).json(newUser);
                }
              )
              .end(tempBuffer);
          } catch (error) {
            console.log(error);
            res.status(400).json(error);
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    let currentUser = await User.findOne({ username: req.body.username });
    if (!currentUser) {
      res.status(400).json({ error: "Such user doesn't exist" });
    } else {
      const isEqual = await bcrypt.compare(
        req.body.password,
        currentUser.password
      );
      if (isEqual) {
        let token = currentUser.generateAuthToken();
        res.status(200).json({ user: currentUser, token });
      } else {
        console.log("here");
        res.status(400).json({ error: "incorrect password" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.autoLogin = (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.getImage = async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  console.log(user);
  res.json(user);
};
