import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { ProjectSlice } from "./projects/projectsSlice";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

// const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  
// };

export const store = configureStore({
  reducer: {
    projects: ProjectSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
