const express = require("express");
const { getUsers, updateUser } = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const permissionMiddleware = require("../middlewares/permissionMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, permissionMiddleware, getUsers);
router.put("/updateUser", authMiddleware, permissionMiddleware, updateUser);

module.exports = router;