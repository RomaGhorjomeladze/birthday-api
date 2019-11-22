const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
    console.log('body',req.body._parts[0][1])
    const user = {};
    req.body._parts.forEach((el, index) => {
        user[el[0]] = el[1];
    });
    console.log(user);
    res.status(200).json({})
//   try {
//     let user = await User.findOne({ username: req.body.user.username });
//     if (user) {
//       res.status(400).json({ error: "such username already exists" });
//     } else {
//       if (req.body.user.password.trim().length < 6) {
//         return res
//           .status(400)
//           .json({ error: "Password's length must be at least 6 characters" });
//       } else {
//         bcrypt.hash(req.body.user.password, 10, async (err, hash) => {
//           let user = new User({
//             ...req.body.user,
//             password: hash,
//             avatar: req.imageName
//           });
//           const newUser = await user.save();
//           return res.status(200).json(newUser);
//         });
//       }
//     }
//   } catch (error) {
//       res.status(400).json(error)
//   }
};
