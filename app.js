const express = require("express");
const app = express();
const cookiParser = require("cookie-parser");
const userRouter = require("./routes/userRouter.js");
const mainRouter = require("./routes/mainRouter.js");
const mongoose_connection = require("./config/mongoose-connection.js");
require("dotenv").config();
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

app.use("/", mainRouter)
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
