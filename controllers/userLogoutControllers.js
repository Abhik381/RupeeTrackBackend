
const userLogout = (req, res) => {
  try {
    res.cookie("token", "");
    res.status(201).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};

module.exports = userLogout;