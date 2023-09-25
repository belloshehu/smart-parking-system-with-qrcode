"use client";

import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import formReducer from "./features/form/formSlice";
import authReducer from "./features/auth/authSlice";
import spaceReducer from "./features/space/spaceSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    auth: authReducer,
    space: spaceReducer,
  },
});
