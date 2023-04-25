const asyncHandler = require("express-async-handler");
const FoodsModel = require("../models/foodModels");
const APIFeatures = require("../middleware/apiFeatures");

const getAllFood = asyncHandler(async (req, res, next) => {
  //   let page = parseInt(req.query.page);
  //   let limit = parseInt(req.query.limit);
  //   if (!page) {
  //     page = 1;
  //   }
  //   if (!limit) {
  //     limit = 10;
  //   }
  //   const skip = (page - 1) * limit;
  const count = await FoodsModel.countDocuments();
  // console.log(count);

  const features = new APIFeatures(
    FoodsModel.find().populate("categoryID"),
    req.query
  )
    .paginate()
    .filter()
    .sort()
    .limitFields();

  // console.log(features.queryString);
  const Page_size = Math.ceil(count / parseInt(features.queryString.limit));
  // console.log(Page_size);
  const foods = await features.query;

  //   const foods = await FoodsModel.find({})
  //     .limit(limit)
  //     .skip(skip)
  //     .populate("categoryID");
  if (foods) {
    res.status(200).json({
      message: "Lấy category thành công",
      pagination: {
        page: parseInt(features.queryString.page),
        limit: parseInt(features.queryString.limit),
        page_size: Page_size,
      },
      data: foods,
    });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getFood = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const food = await FoodsModel.findById({ _id: id }).populate("categoryID");
  if (food) {
    res.status(200).json({ message: "Lấy food thành công", data: food });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const createFood = asyncHandler(async (req, res, next) => {
  const newFood = await FoodsModel.create(req.body);
  if (newFood) {
    res.status(200).json({ message: "tạo food thành công", data: newFood });
  } else {
    res.status(400).json({ message: "Tạo thất bại" });
    throw new Error("Tạo thất bại");
  }
});

const updateFood = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const reFood = await FoodsModel.findByIdAndUpdate(id, req.body);
  if (reFood) {
    res
      .status(200)
      .json({ message: "Update category thành công", data: reFood });
  } else {
    res.status(400).json({ message: "Update thất bại" });
    throw new Error("Update thất bại");
  }
});

const deleteFood = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const removeFood = await FoodsModel.findByIdAndDelete(id);
  if (removeFood) {
    res.status(200).json({ message: "Xoá food thành công", data: removeFood });
  } else {
    res.status(400).json({ message: "Xoá thất bại" });
    throw new Error("Xoá thất bại");
  }
});

module.exports = {
  getAllFood,
  createFood,
  getFood,
  updateFood,
  deleteFood,
};
