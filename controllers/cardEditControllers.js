const incomeModel = require("../models/IncomeModel");
const expensesModel = require("../models/ExpensesModel");
const userModel = require("../models/usersModel");

const cardEdit = async (req, res) => {
  try {
    let { modelType, updateData, id } = req.body;
    if (modelType === "income") {
      let oldincome = await incomeModel.findById(id);
      let updateincome = await incomeModel.findByIdAndUpdate(id, updateData);
      let user = await userModel.findOne({ _id: oldincome.user });
      user.balance =
        Number(user.balance) -
        Number(oldincome.rupee) +
        Number(updateincome.rupee);
      user.incomeBalance =
        Number(user.incomeBalance) -
        Number(oldincome.rupee) +
        Number(updateincome.rupee);
      user.income.splice(user.income.indexOf(id), 1);
      user.income.push(updateincome._id.toString());
      await user.save();
      res.status(201).json({
        message: "incomecard edited successfull.",
        success: true,
      });
    } else if (modelType === "expenses") {
      let oldexpenses = await expensesModel.findById(id);
      let upadateexpenses = await expensesModel.findByIdAndUpdate(
        id,
        updateData
      );
      const user = await userModel.findOne({ _id: oldexpenses.user });
      console.log(oldexpenses);
      user.balance =
        Number(user.balance) +
        Number(oldexpenses.rupee) -
        Number(upadateexpenses.rupee);
      user.expensesBalance =
        Number(user.expensesBalance) -
        Number(oldexpenses.rupee) +
        Number(upadateexpenses.rupee);
      user.expenses.splice(user.expenses.indexOf(id), 1);
      user.expenses.push(upadateexpenses._id.toString());
      await user.save();
      res.status(201).json({
        message: "expensescard edited successfull.",
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

module.exports = cardEdit;
