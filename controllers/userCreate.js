const userModel = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userCreate = async (req, res) => {
  try {
    const { email, contact, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    bcrypt.genSalt(10, function (err, salt) {
      if (err)
        return res.status(500).json({
          message: err.message || err,
        });
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err)
          return res.status(500).json({
            message: err.message || err,
          });
        const payload = {
          email,
          contact,
          password: hash,
        };

        const createUser = await userModel.create(payload);
        const token = jwt.sign(
          { id: createUser._id, email },
          process.env.JWT_KEY
        );
        res.cookie("token", token);

        res.status(201).json({
          message: "User created successfully",
          token: token,
          user: createUser,
          success: true,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};
