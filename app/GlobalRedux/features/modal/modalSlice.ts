"use client";
const { createSlice } = require("@reduxjs/toolkit");

interface modalState {
  isOpened: boolean;
  dropDownOpen: boolean;
  prayerFormVisible: boolean;
  programFormVisible: boolean;
  mosqueFormVisible: boolean;
  confirmDelete: boolean;
  dialogOpen: boolean;
}
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpened: false,
    dropDownOpen: false,
    prayerFormVisible: false,
    programFormVisible: false,
    mosqueFormVisible: false,
    confirmDelete: false,
    dialogOpen: false,
  },
  reducers: {
    openModal: (state: modalState) => {
      state.isOpened = true;
    },
    closeModal: (state: modalState) => {
      state.isOpened = false;
    },
    toggleDropdown: (state: modalState) => {
      if (state.dropDownOpen) {
        state.dropDownOpen = false;
      } else {
        state.dropDownOpen = true;
      }
    },
    openDialog: (state: modalState) => {
      console.log("open dia");
      state.dialogOpen = true;
    },
    closeDialog: (state: modalState) => {
      state.dialogOpen = false;
    },
    toggleModal: (state: modalState) => {
      if (state.isOpened) {
        state.isOpened = false;
      } else {
        state.isOpened = true;
      }
    },
    showForm: (state: modalState, { payload }: { payload: string }) => {
      if (payload === "prayer") {
        state.prayerFormVisible = true;
      } else if (payload === "program") {
        state.programFormVisible = true;
      } else if (payload === "mosque") {
        state.mosqueFormVisible = true;
      }
    },
    hideForm: (state: modalState, { payload }: { payload: string }) => {
      if (payload === "prayer") {
        state.prayerFormVisible = false;
      } else if (payload === "program") {
        state.programFormVisible = false;
      } else if (payload === "mosque") {
        state.mosqueFormVisible = false;
      } else {
        state.prayerFormVisible = false;
        state.programFormVisible = false;
      }
    },
    showConfirmDelete: (state: modalState) => {
      state.confirmDelete = true;
    },
    hideConfirmDelete: (state: modalState) => {
      state.confirmDelete = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleDropdown,
  showForm,
  hideForm,
  showConfirmDelete,
  hideConfirmDelete,
  toggleModal,
  openDialog,
  closeDialog,
} = modalSlice.actions;
export default modalSlice.reducer;
