const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "thisissecret";

// ✅ 用户注册（受 CSRF 保护）
router.post("/signup", async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "Missing required field" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
    });

    res.status(200).json({
      message: "User Registered Successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// ✅ 用户登录（受 CSRF 保护）
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing Email or Password" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Password Incorrect" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// ✅ 退出登录（受 CSRF 保护）
router.post("/logout", (req, res) => {
  res.json({ message: "User logged out" });
});

module.exports = router;
