const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
  uploadImageUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandle");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/imageUsers");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/uploadImage", upload.single("imageUser"), uploadImageUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
