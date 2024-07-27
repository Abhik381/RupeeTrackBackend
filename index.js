const express = require("express");
const app = express();
const debuger = require("debug")("development:express");
const cookiParser = require("cookie-parser");
const userRouter = require("./routes/userRouter.js");
const mongoose_connection = require("./config/mongoose-connection.js");
require("dotenv").config();
const cors = require("cors");

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

app.use("/users", userRouter);

app.listen(3000, () => {
  debuger(`Server is running on port ${port}`);
});
