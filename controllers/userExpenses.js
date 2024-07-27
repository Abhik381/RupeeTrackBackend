const { createDate } = require("../utils/createDate.js");
const expensesModel = require("../models/ExpensesModel.js");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usersModel.js");

module.exports.userExpenses = async (req, res) => {
  try {
    const { rupee, description, typeOfMoney } = req.body;

    const payload = {
      rupee,
      description,
      typeOfMoney,
      date: createDate(),
    };

    const expenses = await expensesModel.create(payload);


    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await userModel.findOne({email: decoded.email}).select ("-password");
    user.balance = Number(user.balance) - Number(rupee);
    await user.save();

    res.status(201).json({
      message: "Your money debited successfully",
      data: expenses,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};
