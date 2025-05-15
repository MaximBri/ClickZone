import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type tutorialsType = keyof typeof initialState.tutorials;

/**
 * Начальное состояние объекта, отвечающего за переключение флагов для всплывающих окон
 * inProcess - был переход с окна регистрации на окно регистрации (нужен для согласования анимации)
 * register - флаг, показывающий, открыто ли окно регистрации
 * auth - флаг, показывающий, открыто ли окно авторизации
 * improvements - флаг, показывающий, открыто ли окно с улучшениям
 * dailyReward - флаг, показывающий, открыто ли окно с получением ежедневных наград
 * miglioramentiClick - флаг, показывающий, открыто ли окно с активацией улучшений
 * tutorials - объект с тремя флагами, показывающими, открыто ли info-окно для разных режимов
 */
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
    /**
     * Метод, который устанавливает флаг для окна регистрации
     */
    setRegisterWindow(state, action: PayloadAction<boolean>) {
      state.register = action.payload;
    },
    /**
     * Метод, который устанавливает флаг для окна авторизации
     */
    setAuthWindow(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    /**
     * Метод, который устанавливает флаг перехода с окна авторизации на регистрацию (для согласования анимации)
     */
    setInProcess(state, action: PayloadAction<boolean>) {
      state.inProcess = action.payload;
    },
    /**
     * Метод, который устанавливает флаги для info-окон
     * @param {{key: tutorialsType, value: boolean}} key - ключ info-окна, value - значение, которое нужно установить
     */
    setTutorial(
      state,
      action: PayloadAction<{ key: tutorialsType; value: boolean }>
    ) {
      state.tutorials[action.payload.key] = action.payload.value;
    },
    /**
     * Метод, который устанавливает флаг открытия/закрытия окна с улучшениями
     */
    setImprovements(state, action: PayloadAction<boolean>) {
      state.improvements = action.payload;
    },
    /**
     * Метод, который устанавливает флаг открытия/закрытия окна с ежедневными наградами
     */
    setDailyReward(state, action: PayloadAction<boolean>) {
      state.dailyReward = action.payload;
    },
    /**
     * Метод, который устанавливает флаг открытия/закрытия окна с активацией мгновенных улучшений
     */
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
