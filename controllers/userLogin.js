const userModel = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Something went wrong" || err,
        success: false,
      })

    bcrypt
      .compare(password, user.password, function(err,result){
        if(result === false) return res.status(400).json({
          message: "Something went wrong" || err,
          success: false,
        });

        const token = jwt.sign({
          id: user._id,
          email: user.email,
        },process.env.JWT_KEY);
        res.cookie("token", token);
        res.status(200).json({
          message: "User logged in successfully",
          token: token,
          data: user,
          success: true,
        });
      })
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
    });
  }
};
