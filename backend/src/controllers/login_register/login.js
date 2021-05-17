const users = require("../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await users.findOne({ username: username });
    if (user == null) {
      return res.json({
        status: false,
        type: "username",
        message: "User Not Found",
      });
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.json({
        status: false,
        type: "password",
        message: "Wrong Password",
      });
    }
    const token = jwt.sign(
      {
        user_id: loadedUser._id.toString(),
        username: loadedUser.username.toString(),
        password: password.toString(),
      },
      "readergiant",
      { expiresIn: "7d" }
    );
    console.log("New Login: " + token);
    return res.status(200).json({ status: true, token: token });
  } catch (err) {
    res.json({ status: false, type: "err", error: err });
    next(err);
  }
};
module.exports = login;
