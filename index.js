const express = require("express");
const app = express();
const router = require("./apiRouter.js");
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/router", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
