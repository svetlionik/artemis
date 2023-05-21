import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import store from "../../store/store";
import { RootState } from "../../store/store";

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
