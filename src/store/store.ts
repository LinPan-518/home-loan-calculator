import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client";

const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
