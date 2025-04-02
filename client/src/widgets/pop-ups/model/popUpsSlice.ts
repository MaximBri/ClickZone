import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type tutorialsType = "clicker" | "rewards";

const initialState: {
  register: boolean;
  auth: boolean;
  improvements: boolean;
  inProcess: boolean;
  tutorials: {
    clicker: boolean;
    rewards: boolean;
  };
} = {
  register: false,
  auth: false,
  inProcess: false,
  improvements: false,
  tutorials: {
    clicker: false,
    rewards: false,
  },
};

const WindowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    setRegisterWindow(state, action: PayloadAction<boolean>) {
      state.register = action.payload;
    },
    setAuthWindow(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    setInProcess(state, action: PayloadAction<boolean>) {
      state.inProcess = action.payload;
    },
    setTutorial(
      state,
      action: PayloadAction<{ key: tutorialsType; value: boolean }>
    ) {
      state.tutorials[action.payload.key] = action.payload.value;
    },
    setImprovements(state, action: PayloadAction<boolean>) {
      state.improvements = action.payload;
    },
  },
});
export const getAuthWindow = (state: RootState) => state.windows.auth;
export const getRegisterWindow = (state: RootState) => state.windows.register;
export const getClickerTutorial = (state: RootState) =>
  state.windows.tutorials.clicker;
export const getImprovements = (state: RootState) => state.windows.improvements;
export const getInProcess = (state: RootState) => state.windows.inProcess;

export const {
  setAuthWindow,
  setRegisterWindow,
  setInProcess,
  setTutorial,
  setImprovements,
} = WindowsSlice.actions;
export default WindowsSlice.reducer;
