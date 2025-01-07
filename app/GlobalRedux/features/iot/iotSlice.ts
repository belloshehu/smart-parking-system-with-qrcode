"use client";
import { createSlice } from "@reduxjs/toolkit";
import { MqttClient } from "mqtt";

const iotSlice = createSlice({
  name: "iot",
  initialState: {
    mqttClient: MqttClient,
  },
  reducers: {
    setMqttClient: (state, { payload }) => {
      state.mqttClient = payload;
    },
  },
});

export const { setMqttClient } = iotSlice.actions;
export default iotSlice.reducer;
