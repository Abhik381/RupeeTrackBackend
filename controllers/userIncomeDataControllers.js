const userModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const userData = async (req,res)=>{
    try {
        const {token} = req.body;
        const user = jwt.verify(token,process.env.JWT_KEY);
        const userData = await userModel.findOne({email: user.email}).select("-password").populate("income");
        res.status(201).json({
            message: "User Find Succesfully.",
            data: userData,
            success: true
        })
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = userData;