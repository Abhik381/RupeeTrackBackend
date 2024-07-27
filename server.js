const express = require("express");
const app = express();
const debuger = require("debug")("production:express");
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

app.listen(process.env.PORT, () => {
  debuger(`Server is running on port ${process.env.PORT}`);
});
