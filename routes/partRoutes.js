const express = require("express");

const { registerPartController, getPartController, getPartsController, updatePartsController } = require("../controllers/partController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/part", authMiddleware, registerPartController);
router.get("/part", authMiddleware, getPartController);
router.get("/parts", authMiddleware, getPartsController);
router.put("/updatePart", authMiddleware, updatePartsController);

module.exports = router;
