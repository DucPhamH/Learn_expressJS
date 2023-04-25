const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const router = express.Router();
const {
  getAllFood,
  createFood,
  getFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodControllers");

router.get("/", getAllFood);
router.get("/:id", getFood);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;
