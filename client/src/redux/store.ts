import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// ✅ 确保 `window.store` 正确绑定，并打印到 Console
if (typeof window !== "undefined") {
  (window as any).store = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
