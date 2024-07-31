const incomeModel = require("../models/IncomeModel");
const expensesModel = require("../models/ExpensesModel");

const cardData = async (req, res) => {
  try {
    let { id, moneyType } = req.body;
    if (moneyType === "income") {
      const income = await incomeModel.findById(id);
      res.status(201).json({
        message: "incomeCard find successfull.",
        data: income,
        success: true,
      });
    } else if (moneyType === "expenses") {
      const expenses = await expensesModel.findById(id);
      res.status(201).json({
        message: "incomeCard find successfull.",
        data: expenses,
        success: true,
      });
    }
  } catch (error) {
    cardData;
  }
};

module.exports = cardData;
