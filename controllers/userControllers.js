const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  res.json("regisster");
});

const loginUser = asyncHandler(async (req, res, next) => {
  res.json("login");
});

const currentUser = asyncHandler(async (req, res, next) => {
  res.json("curent");
});

module.exports = { registerUser, loginUser, currentUser };
