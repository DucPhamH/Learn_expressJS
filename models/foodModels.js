const mongoose = require("mongoose");

const FoodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, require: true },
    rate: { type: Number, required: true },
    description: { type: String },
    image: {
      type: String,
      require: true,
      default:
        "https://i.pinimg.com/564x/dd/9d/c9/dd9dc9d83423bc037b511d73b29e6b80.jpg",
    },
    categoryID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "categories",
      default: null,
    },
  },

  {
    timestamps: true,
    collection: "foods",
  }
);

const FoodsModel = mongoose.model("foods", FoodsSchema);

module.exports = FoodsModel;
