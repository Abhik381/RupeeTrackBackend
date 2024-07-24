const express = require("express");
const router = express.Router();
const { userCreate } = require("../controllers/userCreate.js");
const { userLogin } = require("../controllers/userLogin.js");
const { userLogout } = require("../controllers/userLogout.js");
const { userIncome } = require("../controllers/userIncome.js");
const { userExpenses } = require("../controllers/userExpenses.js");

router.post("/signUp", userCreate);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.post("/income", userIncome);
/*router.post("/expenses", userExpenses);*/

module.exports = router;
