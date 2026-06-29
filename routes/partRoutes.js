const express = require("express");

const { registerPartController, getPartController } = require("../controllers/partController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/part", authMiddleware, registerPartController);
router.get("/part", authMiddleware, getPartController)

module.exports = router;
