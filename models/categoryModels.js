const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

CategoriesSchema.set("toObject", { virtuals: true });
CategoriesSchema.set("toJSON", { virtuals: true });
CategoriesSchema.virtual("foods", {
  ref: "foods",
  localField: "_id",
  foreignField: "categoryID",
});

const CategoriesModel = mongoose.model("categories", CategoriesSchema);

module.exports = CategoriesModel;
