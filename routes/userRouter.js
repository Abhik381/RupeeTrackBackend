const express = require("express");
const userCreate = require("../controllers/userCreateControllers.js");
const userLogin = require("../controllers/userLoginControllers.js");
const userLogout = require("../controllers/userLogoutControllers.js");
const userIncome = require("../controllers/userIncomeControllers.js");
const userExpenses = require("../controllers/userExpensesControllers.js");


const router = express.Router();

router.post("/register", userCreate);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/income", userIncome);
router.post("/expenses", userExpenses);

module.exports = router;