const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
