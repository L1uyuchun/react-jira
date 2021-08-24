import { configureStore } from "@reduxjs/toolkit";
import projectListReducer from "@/screens/project-list/project-store-slice";

export const store = configureStore({
  reducer: {
    projectList: projectListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
