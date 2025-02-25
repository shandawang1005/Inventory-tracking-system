import { useState } from "react";
import AuthModal from "./AuthModal";
import "../index.css";
interface NavBarProps {
  user: { email: string } | null;
  onAuth: (user: { email: string } | null) => void;
}

const NavBar: React.FC<NavBarProps> = ({ user, onAuth }) => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup"); // 控制模式

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-md text-white p-4 flex items-center justify-between">
      {/* 左侧 Logo */}
      <span className="text-xl font-bold tracking-wide text-blue-400">
        MyApp
      </span>
      <span className="bg-red-500 text-white p-2">测试 Tailwind</span>

      {/* 右侧按钮区域 */}
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">{user.email}</span>
            <button
              onClick={() => onAuth(null)}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthOpen(true);
              }}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthMode("signup");
                setAuthOpen(true);
              }}
              className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* ✅ 复用 AuthModal 组件，并确保 `mode` 正确传递 */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        onAuth={onAuth} // 登录/注册后更新用户状态
        mode={authMode} // "login" or "signup"
        setMode={setAuthMode} // 让 Modal 也能切换模式
      />
    </nav>
  );
};

export default NavBar;
