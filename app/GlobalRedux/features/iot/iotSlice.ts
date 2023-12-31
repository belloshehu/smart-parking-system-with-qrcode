"use client";
import { createSlice } from "@reduxjs/toolkit";

const iotSlice = createSlice({
  name: "iot",
  initialState: {
    mqttClient: null,
  },
  reducers: {
    setMqttClient: (state, { payload }) => {
      state.mqttClient = payload;
    },
  },
});

export const { setMqttClient } = iotSlice.actions;
export default iotSlice.reducer;
