const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("home");
});

router.get("/product", (req, res) => {
  res.send("Product");
});

router.get("/cart", (req, res) => {
  res.send("cart");
});

router.get("/:id", (req, res) => {
  res.send("router" + req.params.id);
});

module.exports = router;
