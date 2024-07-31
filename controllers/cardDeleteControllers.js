const incomeModel = require("../models/IncomeModel");
const expensesModel = require("../models/ExpensesModel");
const userModel = require("../models/usersModel");

const cardDelete = async (req, res) => {
  try {
    let { id, modelType } = req.body;
    if (modelType === "income") {
      let income = await incomeModel.findOneAndDelete({ _id: id });
      let user = await userModel.findOne({ _id: income.user });
      user.income.splice(user.income.indexOf(id), 1);
      user.balance = Number(user.balance) - Number(income.rupee);
      user.incomeBalance = Number(user.incomeBalance) - Number(income.rupee);
      await user.save();
      res.status(201).json({
        message: "incomecard delete successfull.",
        success: true,
      });
    } else if (modelType === "expenses") {
      let expenses = await expensesModel.findOneAndDelete({ _id: id });
      const user = await userModel.findOne({ _id: expenses.user });
      user.expenses.splice(user.expenses.indexOf(id), 1);
      user.balance = Number(user.balance) + Number(expenses.rupee);
      user.expensesBalance =
        Number(user.expensesBalance) - Number(expenses.rupee);
      await user.save();
      res.status(201).json({
        message: "expensescard delete successfull.",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = cardDelete;
