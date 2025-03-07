const express = require("express");
const userCreate = require("../controllers/userCreateControllers.js");
const userLogin = require("../controllers/userLoginControllers.js");
const userLogout = require("../controllers/userLogoutControllers.js");
const userIncome = require("../controllers/userIncomeControllers.js");
const userExpenses = require("../controllers/userExpensesControllers.js");
const userIncomeData = require("../controllers/userIncomeDataControllers.js");
const userExpensesData = require("../controllers/userExpenseseDataControllers.js");
const userData = require("../controllers/userDataControllers.js");
const cardDelete = require("../controllers/cardDeleteControllers.js");
const cardEdit = require("../controllers/cardEditControllers.js");
const cardData = require("../controllers/cardDataControllers.js");

const router = express.Router();

router.post("/register", userCreate);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/income", userIncome);
router.post("/expenses", userExpenses);
router.post("/userincomedata", userIncomeData);
router.post("/userexpensesdata", userExpensesData);
router.post("/userdata", userData);
router.post("/carddelete", cardDelete);
router.post("/cardedit", cardEdit);
router.post("/cardData", cardData);

module.exports = router;
