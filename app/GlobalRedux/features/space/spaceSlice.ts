"use client";
import { createSlice } from "@reduxjs/toolkit";

type Space = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type Reservation = {
  durationHour: number;
  durationMinutes: number;
  duration: number;
  checkInTime: string;
  checkInDate: string;
  cost: number;
  price: number;
  space: Space | null;
  status: string;
  vehicleNumber: string;
  paymentReference?: string;
};
type stateTypes = {
  selectedSpace: Space | null;
  spaces: Space[];
  isModalOpen: boolean;
  reservation: Reservation;
};

const spaceSlice = createSlice({
  name: "space",
  initialState: {
    selectedSpace: null,
    spaces: [],
    isModalOpen: false,
    reservation: {
      durationHour: 1,
      durationMinutes: 0,
      duration: 60, // 60 minutes
      checkInTime: "",
      checkInDate: "",
      cost: 0,
      price: 0,
      space: null,
      status: "valid",
      vehicleNumber: "",
    },
  },
  reducers: {
    setSpaces: (state: stateTypes, { payload }: { payload: Space[] }) => {
      state.spaces = payload;
    },
    clearSpaces: (state: stateTypes) => {
      state.spaces = [];
    },
    removeSpace: (state: stateTypes, { payload }: { payload: string }) => {
      state.spaces = state.spaces.filter((space) => space._id !== payload);
    },
    addSpace: (state: stateTypes, { payload }: { payload: Space }) => {
      state.spaces = [...state.spaces, payload];
    },
    updateSpace: (state: stateTypes, { payload }: { payload: Space }) => {
      state.spaces = state.spaces.map((space) => {
        if (space._id === payload._id) {
          return payload;
        }
        return space;
      });
    },
    setSelectedSpace: (state: stateTypes, { payload }: { payload: Space }) => {
      state.selectedSpace = payload;
    },
    clearSelectedSpace: (state: stateTypes) => {
      state.selectedSpace = null;
    },
    setReservation: (
      state: stateTypes,
      { payload }: { payload: Reservation }
    ) => {
      state.reservation = payload;
    },
    setDurationMinutes: (
      state: stateTypes,
      { payload }: { payload: number }
    ) => {
      state.reservation.durationMinutes = payload;
      setCost();
    },
    setDurationHours: (state: stateTypes, { payload }: { payload: number }) => {
      state.reservation.durationMinutes = payload;
      setCost();
    },
    setCost: (state: stateTypes) => {
      if (state.reservation.space) {
        state.reservation.cost =
          state.reservation.duration * state.reservation.space?.price;
      } else {
        state.reservation.cost = 0;
      }
    },
    setDuration: (state: stateTypes, { payload }: { payload: number }) => {
      state.reservation.duration = payload;
    },
    resetReservation: (state: stateTypes) => {
      state.reservation = {
        durationHour: 1,
        durationMinutes: 0,
        duration: 0,
        checkInTime: "",
        checkInDate: "",
        cost: 0,
        price: 0,
        space: state.selectedSpace,
        status: "valid",
        vehicleNumber: "",
      };
    },
    setIsModalOpen: (state: stateTypes, { payload }: { payload: boolean }) => {
      state.isModalOpen = payload;
    },
  },
});

export const {
  setSelectedSpace,
  clearSelectedSpace,
  setReservation,
  resetReservation,
  setDurationMinutes,
  setDurationHours,
  setDuration,
  setCost,
  setIsModalOpen,
  setSpaces,
  removeSpace,
  addSpace,
  updateSpace,
} = spaceSlice.actions;

export default spaceSlice.reducer;
