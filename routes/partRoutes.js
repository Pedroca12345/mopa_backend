const express = require("express");
const partController = require("../controllers/partController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/part", authMiddleware, partController);

module.exports = router;
