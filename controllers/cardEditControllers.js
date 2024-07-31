const incomeModel = require("../models/IncomeModel");
const expensesModel = require("../models/ExpensesModel");
const userModel = require("../models/usersModel");

const cardEdit = async (req, res) => {
  try {
    let { modelType, updateData, id } = req.body;
    if(modelType === "income")
    var oldincome = await incomeModel.findById(id);
    let oldexpenses = await expensesModel.findById(id);
    if (modelType === "income") {
      await incomeModel.findOneAndUpdate({_id: id}, updateData);
      let updateincome = await incomeModel.findById(id)
      let user = await userModel.findOne({ _id: updateincome.user });

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
        message: "incomeCard edited successfull.",
        success: true,
        user
      });
    } else if (modelType === "expenses") {
      await expensesModel.findByIdAndUpdate(
        id,
        updateData
      );
      let upadateexpenses = await expensesModel.findById(id);
      const user = await userModel.findOne({ _id: oldexpenses.user });
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
        message: "expensesCard edited successfull.",
        success: true,
        user
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
