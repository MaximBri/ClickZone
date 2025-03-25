import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  register: boolean;
  auth: boolean;
  tutorial: boolean;
  improvements: boolean;
  inProcess: boolean;
} = {
  register: false,
  auth: false,
  inProcess: false,
  tutorial: false,
  improvements: false,
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
    setTutorial(state, action: PayloadAction<boolean>) {
      state.tutorial = action.payload;
    },
    setImprovements(state, action: PayloadAction<boolean>) {
      state.improvements = action.payload;
    },
  },
});
export const getAuthWindow = (state: RootState) => state.windows.auth;
export const getRegisterWindow = (state: RootState) => state.windows.register;
export const getTutorial = (state: RootState) => state.windows.tutorial;
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
