const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ 允许前端访问 API
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

// ✅ CSRF 保护
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// ✅ 让前端获取 CSRF Token
app.get("/api/csrf-token", (req, res) => {
    console.log("✅ 服务器返回 CSRF Token:", req.csrfToken()); // ✅ 先打印出来
    res.json({ csrfToken: req.csrfToken() });
});

// ✅ 加载你的 `routes/auth.js`
app.use("/api/auth", require("./routes/auth"));

// ✅ 其他 API
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/orders", require("./routes/orders"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
