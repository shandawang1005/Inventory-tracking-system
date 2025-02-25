/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",        // ✅ 适用于 Vite 项目
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ 扫描所有 React 组件和 TS 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
