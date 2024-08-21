import { configureStore } from "@reduxjs/toolkit";
import conversationSlice from "./conversationSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
