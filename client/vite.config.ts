import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@redux": "/src/redux",
      "@utils": "/src/utils",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // ✅ 代理 API 请求到后端端口
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
