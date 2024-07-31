const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    income: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income",
      },
    ],
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expenses",
      },
    ],
    balance: {
      type: Number,
      default: 0,
    },
    expensesBalance: {
      type: Number,
      default: 0,
    },
    incomeBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
