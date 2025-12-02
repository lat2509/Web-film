import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: localStorage.getItem("session_id"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.sessionId = action.payload;
      localStorage.setItem("session_id", action.payload);
    },
    logout: (state) => {
      state.sessionId = null;
      localStorage.removeItem("session_id");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
