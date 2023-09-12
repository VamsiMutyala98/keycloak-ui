import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EBaseActions, IBaseState } from "../types/base.type";

export const baseInitialState: IBaseState = {
  login: {
    header: "This is Login Page Code Pipline Testing",
  },
  dashboard: {
    header: "This is Dashboard Page",
  },
};

const name = "BASE" as never;

const slice = createSlice({
  name,
  initialState: baseInitialState,
  reducers: {
    [EBaseActions.SET_LOGIN_DETAILS](state, action: PayloadAction<{ name: string }>) {
      state.login.header = action.payload.name;
    },
    [EBaseActions.SET_DASHBOARD_DETAILS](state, action: PayloadAction<{ name: string }>) {
      state.dashboard.header = action.payload.name;
    },
  },
});

export const {
  [EBaseActions.SET_LOGIN_DETAILS]: setLoginDetails,
  [EBaseActions.SET_DASHBOARD_DETAILS]: setDashboardDetails,
} = slice.actions;
export default slice.reducer;
