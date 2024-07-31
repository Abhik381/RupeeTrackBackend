const createDate = require("../utils/createDate.js");
const expensesModel = require("../models/ExpensesModel.js");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usersModel.js");
const {expensesBalanceCalculate} = require("../utils/balanceCalculate.js");

const userExpenses = async (req, res) => {
  try {
    const { rupee, description, typeOfMoney,token } = req.body;

    const payload = {
      rupee,
      description,
      typeOfMoney,
      date: createDate(),
    };

    const expenses = await expensesModel.create(payload);

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
      expensesBalanceCalculate(user,expenses);
    user.balance = Number(user.balance) - Number(rupee);
    user.expenses.push(expenses._id.toString());
    expenses.user = user._id;
    await user.save();
    await expenses.save();

    res.status(201).json({
      message: "Your money debited successfully",
      data: expenses,
      user,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};

module.exports = userExpenses;
