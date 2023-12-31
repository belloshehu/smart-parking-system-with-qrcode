"use client";

import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import formReducer from "./features/form/formSlice";
import authReducer from "./features/auth/authSlice";
import spaceReducer from "./features/space/spaceSlice";
import iotReducer from "./features/iot/iotSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    auth: authReducer,
    space: spaceReducer,
    iot: iotReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["TYPE"],
        ignoredActionPaths: ["property"],
        ignoredPaths: ["reducer.property"],
      },
    }),
});
