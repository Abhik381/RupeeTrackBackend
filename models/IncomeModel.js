const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    rupee: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    typeOfMoney: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const incomeModel = mongoose.model("Income", incomeSchema);
module.exports = incomeModel;
