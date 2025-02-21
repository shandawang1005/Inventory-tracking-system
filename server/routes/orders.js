const express = require("express");
const { Order, User, Inventory } = require("../models");

const router = express.Router();

// 🔹 获取所有订单（GET /api/orders）
router.get("/", async (req, res) => {
    try {
        const orders = await Order.findAll({ include: [User, Inventory] });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
