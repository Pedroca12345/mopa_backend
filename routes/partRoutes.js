const express = require("express");
const uploadPartController = require("../controllers/uploadPartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/part", authMiddleware, uploadPartController);

module.exports = router;
