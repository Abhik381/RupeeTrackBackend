const createDate = require("../utils/createDate.js");
const incomeModel = require("../models/IncomeModel.js");
const userModel = require("../models/usersModel.js");
const { incomeBalanceCalculate } = require("../utils/balanceCalculate.js");
const jwt = require("jsonwebtoken");

const userIncome = async (req, res) => {
  try {
    const { rupee, description, typeOfMoney, token } = req.body;

    const payload = {
      rupee,
      description,
      typeOfMoney,
      date: createDate(),
    };

    const income = await incomeModel.create(payload);

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password")
      .populate("income");
    incomeBalanceCalculate(user, income);
    user.balance = Number(user.balance) + Number(rupee);
    user.income.push(income._id.toString());
    income.user = user._id;
    await user.save();
    await income.save();

    res.status(201).json({
      message: "Your money credited successfully",
      data: income,
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

module.exports = userIncome;
