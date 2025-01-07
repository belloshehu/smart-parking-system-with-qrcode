"use client";
const { createSlice } = require("@reduxjs/toolkit");

interface formState {
  isSuccess: boolean;
}
const formSlice = createSlice({
  name: "form",
  initialState: {
    isSuccess: false,
  },
  reducers: {
    updateFormSuccess: (state: formState, action: any) => {
      state.isSuccess = action.payload;
    },
  },
});

export const { updateFormSuccess } = formSlice.actions;
export default formSlice.reducer;
