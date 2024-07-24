const { createDate } = require("../utils/createDate.js");
const incomeModel = require("../models/IncomeModel.js");

module.exports.userIncome = async (req, res) => {
  try {
    const { rupee, description, typeOfMoney } = req.body;

    const payload = {
      rupee,
      description,
      typeOfMoney,
      date: createDate(),
    };

    const income = await incomeModel.create(payload);
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
