const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  rupee: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  typeOfMoney: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const expensesModel = mongoose.model("Expenses", expensesSchema);
module.exports = expensesModel;
