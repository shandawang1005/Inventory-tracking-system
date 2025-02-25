import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (user: { email: string }) => void;
  mode: "signup" | "login"; // 外部传入的模式
  setMode: (mode: "signup" | "login") => void; // 让 NavBar 控制模式
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuth,
  mode,
  setMode,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null; // ❌ Modal 关闭时不渲染

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok)
        throw new Error(`${mode === "signup" ? "Signup" : "Login"} failed`);

      const data = await res.json();
      console.log(`✅ ${mode === "signup" ? "注册" : "登录"} 成功:`, data);

      onAuth(data.user); // ✅ 更新用户状态
      onClose(); // ✅ 关闭 Modal
    } catch (error) {
      console.error(
        `❌ ${mode === "signup" ? "Signup" : "Login"} error:`,
        error
      );
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose} // ✅ 点击背景关闭
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[70vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // ❌ 阻止点击 Modal 内部关闭
      >
        <h2 className="text-lg font-bold text-center">
          {mode === "signup" ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* ✅ 模式切换 */}
        <p className="mt-4 text-sm text-center">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-500"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-500"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
