const userModel = require("../models/usersModel.js");
const jwt = require("jsonwebtoken");

const userIncomeList = async (req, res) => {
  try {
    const tokenVerify = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: tokenVerify.email })
      .populate("income");
    res.send(user.income);
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = userIncomeList;
