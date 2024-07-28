const createDate = require("../utils/createDate.js");
const incomeModel = require("../models/IncomeModel.js");
const userModel = require("../models/usersModel.js");
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
      .select("-password");
    user.balance = Number(user.balance) + Number(rupee);
    console.log(income._id.toString());
    user.income.push(income._id.toString());
    await user.save();

    res.status(201).json({
      message: "Your money credited successfully",
      data: income,
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
