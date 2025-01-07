"use client";
const { createSlice } = require("@reduxjs/toolkit");

type stateType = {
  user: {
    firstName: string;
    lastName?: string;
    email: string;
  } | null;
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      typeof window !== "undefined"
        ? localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")!)
          : null
        : null,
  },
  reducers: {
    setUser: (state: stateType, action: any) => {
      state.user = action.payload;
    },
    clearUser: (state: stateType) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
