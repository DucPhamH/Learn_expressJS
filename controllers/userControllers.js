const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotennv = require("dotenv");
dotennv.config();

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //check không nhập
  if (!email || !password) {
    res.status(400).json({ message: "Bạn phải nhập đầy đủ" });
    throw new Error("Các trường không được để trống");
  }

  // check độ dài
  if (email.length <= 5 || email.length >= 160) {
    res.status(400).json({ message: "Bạn nhập sai độ dài email" });
    throw new Error("sai do dai");
  }
  if (password.length <= 5 || password.length >= 160) {
    res.status(400).json({ message: "Bạn nhập sai độ dài password" });
    throw new Error("sai do dai");
  }

  //check có trong db hay không
  const userAvailable = await UserModel.findOne({ email: email });
  if (userAvailable) {
    res.status(400).json({ message: "Bạn đã đăng kí tài khoản này rồi " });
    throw new Error("Bạn đã đăng kí tài khoản này rồi");
  }

  //hash pass
  const hashedPassword = await bcrypt.hash(password, 10);

  //tạo mới user
  const newUser = await UserModel.create({
    email: email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({ message: "Đăng kí thành công!", data: newUser });
  } else {
    res.status(400);
    throw new Error("Đăng kí thất bại");
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //check không nhập
  if (!email || !password) {
    res.status(400).json({ message: "Bạn phải nhập đầy đủ" });
    throw new Error("Các trường không được để trống");
  }

  // check độ dài
  if (email.length <= 5 || email.length >= 160) {
    res.status(400).json({ message: "Bạn nhập sai độ dài email" });
    throw new Error("sai do dai");
  }
  if (password.length <= 5 || password.length >= 160) {
    res.status(400).json({ message: "Bạn nhập sai độ dài password" });
    throw new Error("sai do dai");
  }

  //check trong db
  const user = await UserModel.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "5m" }
    );
    console.log(accessToken);
    res.status(200).json({
      message: "Đăng nhập thành công",
      data: { accessToken: "Bearer" + " " + accessToken, user: user },
    });
  } else {
    res.status(400).json({ message: "Bạn sai tài khoản hoặc mật khẩu" });
    throw new Error("Bạn sai tài khoản hoặc mật khẩu");
  }
});

const currentUser = asyncHandler(async (req, res, next) => {
  console.log(req.user);

  const _ID = req.user._id;
  const userLogin = await UserModel.findOne({ _id: _ID });
  if (userLogin) {
    res.status(200).json({ message: "Lấy thành công", data: userLogin });
  } else {
    res.status(400).json({ message: "Bạn không có quyền" });
    throw new Error("Bạn không có quyền");
  }

  res.json("curent");
});

const uploadImageUser = asyncHandler(async (req, res, next) => {
  console.log("localhost:4000/" + req.file.path.replace(/\\/g, "/"));
  res.json({ message: "Đăng xuất thành công" });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.json({ message: "Đăng xuất thành công" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
  uploadImageUser,
};
