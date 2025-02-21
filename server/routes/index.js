const express = require("express");

const router = express.Router();

// ✅ 统一管理 API 前缀 
router.use("/auth", require("./auth"));       // 认证 API
router.use("/users", require("./users"));     // 用户 API
router.use("/inventory", require("./inventory")); // 库存 API
router.use("/orders", require("./orders"));   // 订单 API

module.exports = router;
