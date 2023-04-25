const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRouter");
const foodRouter = require("./routes/foodRouter");
const port = 4000;
const db = require("./config/db");

db.connectDB();
app.use("/uploads/imageUsers", express.static("uploads/imageUsers"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/foods", foodRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
