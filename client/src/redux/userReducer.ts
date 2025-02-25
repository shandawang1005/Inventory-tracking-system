import { Dispatch } from "redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// ✅ 1️⃣ 定义初始状态
const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

// ✅ 2️⃣ 定义 Action Types
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

// ✅ 3️⃣ Action Creators
const loginSuccess = (token: string, user: any) => ({
  type: LOGIN_SUCCESS,
  payload: { token, user },
});

const logoutAction = () => ({
  type: LOGOUT,
});

// ✅ 4️⃣ Thunk Actions
export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      dispatch(loginSuccess(data.token, data.user));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutAction());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// ✅ 5️⃣ Reducer（`switch-case` 处理 `state`）
export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { token: null, user: null };

    default:
      return state;
  }
}
