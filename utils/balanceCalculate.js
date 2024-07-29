const incomeBalanceCalculate = (user, balance) => {
  user.incomeBalance = user.incomeBalance + balance.rupee;
};

const expensesBalanceCalculate = (user, balance) => {
  user.expensesBalance = user.expensesBalance + balance.rupee;
};

module.exports = { incomeBalanceCalculate, expensesBalanceCalculate };
