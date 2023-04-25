const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
