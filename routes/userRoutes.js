const express = require("express");

const router = express.Router();
const userModel = require("../models/userModels");

router.post("/register", (req, res, next) => {
  res.json("regisster");
});
router.post("/login", (req, res, next) => {
  res.json("login");
});
router.get("/current", (req, res, next) => {
  res.json("curent");
});

module.exports = router;
