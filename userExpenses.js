const { createDate } = require("../utils/createDate.js");
const expensesModel = require("../models/ExpensesModel.js");

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
