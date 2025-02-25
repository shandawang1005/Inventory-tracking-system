import { useDispatch, UseSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@redux/userReducer";
import * as React from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    fetch("/api/csrf-token", {
      credentials: "include", // ✅ 确保 Cookies 发送
    })
      .then(async (res) => {
        console.log("🔄 服务器返回 CSRF Token 响应:", res);
        const text = await res.text();
        console.log("🔄 CSRF Token 响应数据 (文本):", text);

        try {
          const data = JSON.parse(text);
          console.log("✅ 解析 CSRF Token:", data.csrfToken);
          setCsrfToken(data.csrfToken);
        } catch (error) {
          console.error("❌ CSRF Token 解析失败:", text);
        }
      })
      .catch(console.error);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password) as any);
      navigate("/");
    } catch (e) {
      console.error("Login Fail", e);
    }
  };

  const handleDemoLogin = async () => {
    if (!csrfToken) {
      console.error("❌ CSRF Token 未定义，无法进行登录！");
      return;
    }

    try {
      console.log("🔍 发送 CSRF Token:", csrfToken);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // ✅ 发送 CSRF Token
        },
        credentials: "include", // ✅ 确保 Cookies 被发送
        body: JSON.stringify({
          email: "john@example.com",
          password: "password123",
        }),
      });

      console.log("🔍 API 响应状态:", res.status);

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log("✅ 登录成功:", data);
      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <button onClick={handleDemoLogin} style={{ marginTop: "10px" }}>
        Demo User Login
      </button>
    </>
  );
}
