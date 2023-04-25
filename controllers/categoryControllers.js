const asyncHandler = require("express-async-handler");
const CategoriesModel = require("../models/categoryModels");
const FoodsModel = require("../models/foodModels");

const getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await CategoriesModel.find({}).populate("foods");
  if (categories) {
    res
      .status(200)
      .json({ message: "Lấy category thành công", data: categories });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoriesModel.findById({ _id: id });

  if (category) {
    res.status(200).json({
      message: "Lấy category thành công",
      data: category,
      foods: foods,
    });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const createCategory = asyncHandler(async (req, res, next) => {
  const newCategory = await CategoriesModel.create(req.body);
  if (newCategory) {
    res
      .status(200)
      .json({ message: "tạo category thành công", data: newCategory });
  } else {
    res.status(400).json({ message: "Tạo thất bại" });
    throw new Error("Tạo thất bại");
  }
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const reCategory = await CategoriesModel.findByIdAndUpdate(id, req.body);
  if (reCategory) {
    res
      .status(200)
      .json({ message: "Update category thành công", data: reCategory });
  } else {
    res.status(400).json({ message: "Update thất bại" });
    throw new Error("Update thất bại");
  }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await FoodsModel.updateMany({ categoryID: id }, { categoryID: null });
  const removeCategory = await CategoriesModel.findByIdAndDelete(id);
  if (removeCategory) {
    res
      .status(200)
      .json({ message: "Xoá category thành công", data: removeCategory });
  } else {
    res.status(400).json({ message: "Xoá thất bại" });
    throw new Error("Xoá thất bại");
  }
});

module.exports = {
  getAllCategory,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
