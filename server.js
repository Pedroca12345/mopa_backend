const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const sheetjs = require("xlsx");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const URI = process.env.MONGO_URI;

mongoose.connect(URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

app.get("/home", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Passou no middleware",
    user: req.user
  }
  );
});

app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("app rodando na porta 3000");
});