const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter.js");
const mongoose_connection = require("./config/mongoose-connection.js");
require("dotenv").config();
const cors = require("cors");

// app config
const port = process.env.PORT || 4000;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// db connection
mongoose_connection();

// api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res)=>{
  res.send("Welcome to Home Page.")
}) 

// server connection
mongoose_connection()
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server runing at port no ${port}`);
    });
  })
  .catch((err) => {
    console.log("Server is not running for connection failed of database.");
  });
