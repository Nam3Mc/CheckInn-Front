import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/usersSlice"; // Import the usersReducer

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

/* PRIORIDAD: CRUD DE reservation */
/* terminar crud de users y rooms */
