"use client";
import { createSlice } from "@reduxjs/toolkit";

type space = {
  id: string | number;
  type: string;
  price: string;
};
type Reservation = {
  durationHour: number;
  durationMinutes: number;
  checkInTime: string;
  checkInDate: string;
  cost: number;
  price: number;
  space: space | null;
};
type stateTypes = {
  selectedSpace: space | null;
  reservation: Reservation;
};

const spaceSlice = createSlice({
  name: "space",
  initialState: {
    selectedSpace: null,
    reservation: {
      durationHour: 1,
      durationMinutes: 0,
      checkInTime: "",
      checkInDate: "",
      cost: 0,
      price: 0,
      space: null,
    },
  },
  reducers: {
    setSelectedSpace: (state: stateTypes, { payload }: { payload: space }) => {
      state.selectedSpace = payload;
    },
    clearSelectedState: (state: stateTypes) => {
      state.selectedSpace = null;
    },
    setReservation: (
      state: stateTypes,
      { payload }: { payload: Reservation }
    ) => {
      state.reservation = payload;
    },
    resetReservation: (state: stateTypes) => {
      state.reservation = {
        durationHour: 1,
        durationMinutes: 0,
        checkInTime: "",
        checkInDate: "",
        cost: 0,
        price: 0,
        space: state.selectedSpace,
      };
    },
  },
});

export const {
  setSelectedSpace,
  clearSelectedState,
  setReservation,
  resetReservation,
} = spaceSlice.actions;
export default spaceSlice.reducer;
