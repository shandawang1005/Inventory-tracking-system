const express = require("express");
const { Inventory, User, Order } = require("../models");

const router = express.Router();

// 🔹 获取所有库存（GET /api/inventory）
router.get("/", async (req, res) => {
    try {
        const inventory = await Inventory.findAll({ include: [User, Order] });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
