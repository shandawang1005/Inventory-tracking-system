const express = require("express");
const { User, Inventory, Order } = require("../models");

const router = express.Router();

// 🔹 获取所有用户信息（GET /api/users）
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Inventory, include: [Order] }, Order],
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
