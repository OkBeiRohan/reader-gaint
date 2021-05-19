const users = require("../models/users");
const bcrypt = require("bcryptjs");

const isAuthed = async (req, res) => {
  const user_id = req.user.user_id;
  const loggedUser = await users.findById(user_id);
  if (!loggedUser) {
    return res.json({
      status: false,
      auth_status: false,
      message: "User Doesnt Exists",
    });
  } else {
    if (!loggedUser.token)
      return res.json({
        status: false,
        auth_status: false,
        message: "Auth Failed",
      });
    else if (loggedUser.token !== req.token)
      return res.json({
        status: false,
        auth_status: false,
        message: "Auth Failed",
      });
    else
      return res.json({
        status: true,
        auth_status: true,
      });
  }
};
module.exports = isAuthed;
