import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type tutorialsType = keyof typeof initialState.tutorials;

const initialState: {
  inProcess: boolean;
  register: boolean;
  auth: boolean;
  improvements: boolean;
  dailyReward: boolean;
  miglioramentiClick: number | null;
  tutorials: {
    clicker: boolean;
    rewards: boolean;
    randomizer: boolean;
  };
} = {
  inProcess: false,
  register: false,
  auth: false,
  improvements: false,
  dailyReward: false,
  miglioramentiClick: null,
  tutorials: {
    clicker: false,
    rewards: false,
    randomizer: false,
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
    setDailyReward(state, action: PayloadAction<boolean>) {
      state.dailyReward = action.payload;
    },
    setMigliomentiClick(state, action: PayloadAction<number | null>) {
      state.miglioramentiClick = action.payload;
    },
  },
});
export const getAuthWindow = (state: RootState) => state.windows.auth;
export const getRegisterWindow = (state: RootState) => state.windows.register;
export const getClickerTutorial = (state: RootState) =>
  state.windows.tutorials.clicker;
export const getImprovements = (state: RootState) => state.windows.improvements;
export const getInProcess = (state: RootState) => state.windows.inProcess;
export const getDailyRewardsPopUp = (state: RootState) =>
  state.windows.dailyReward;

export const {
  setAuthWindow,
  setRegisterWindow,
  setInProcess,
  setTutorial,
  setImprovements,
  setDailyReward,
  setMigliomentiClick,
} = WindowsSlice.actions;
export default WindowsSlice.reducer;
