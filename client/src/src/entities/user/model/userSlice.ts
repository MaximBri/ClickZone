import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpgradeInterface, userDataInterface } from "@/shared/types";
import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiList";

const initialState: userDataInterface = {
  isAuthorized: null,
  dataIsLoaded: null,
  level: 1,
  coinsPerMinute: 0,
  coinsOnClick: 1,
  finances: {
    coins: 0,
    diamonds: 0,
  },
  globals: {
    id: null,
    nickname: "",
    description: "",
    dateOfRegister: null,
  },
  clicker: {
    upgrades: [],
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Globals
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    setDataIsLoaded(state, action: PayloadAction<boolean>) {
      state.dataIsLoaded = action.payload;
    },
    setId(state, action: PayloadAction<number>) {
      state.globals.id = action.payload;
    },
    // Wallet
    setCoins(state, action: PayloadAction<number>) {
      state.finances.coins = action.payload;
    },
    addCoin(state) {
      state.finances.coins += state.coinsOnClick;
    },
    setCoinsOnClick(state, action: PayloadAction<number>) {
      state.coinsOnClick = action.payload;
    },
    setDiamonds(state, action: PayloadAction<number>) {
      state.finances.diamonds = action.payload;
    },
    setCoinsPerMinute(state, action: PayloadAction<number>) {
      state.coinsPerMinute = action.payload;
    },
    // Account
    setDescription(state, action: PayloadAction<string>) {
      state.globals.description = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.globals.nickname = action.payload;
    },
    resetUserData: () => initialState,
    // Clicker
    setLevel(state, action: PayloadAction<number>) {
      if (action.payload <= 10 && action.payload > 0) {
        state.level = action.payload;
      }
    },
    // Upgrades
    setUpgrades(state, action: PayloadAction<UpgradeInterface[]>) {
      state.clicker.upgrades = action.payload;
    },
    addOneUpgrade(state, action: PayloadAction<miglioramentiInterface>) {
      const duplicate = state.clicker.upgrades.findIndex(
        (item) => (item.id === action.payload.id)
      );
      console.log(duplicate);
      if (duplicate !== -1) {
        state.clicker.upgrades[duplicate].count++;
      } else {
        console.log("Добавлен ", action.payload);
        state.clicker.upgrades.push({ ...action.payload, count: 1 });
      }
    },
  },
});

export const getLevel = (state: RootState) => state.user.level;
export const getFinances = (state: RootState) => state.user.finances;
export const getCoinsOnClick = (state: RootState) => state.user.coinsOnClick;
export const getNickname = (state: RootState) => state.user.globals.nickname;
export const getDescription = (state: RootState) =>
  state.user.globals.description;
export const getGlobalsUserData = (state: RootState) => state.user.globals;
export const userInfoIsLoaded = (state: RootState) => state.user.dataIsLoaded;
export const getIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const getMiglioramenti = (state: RootState) =>
  state.user.clicker.upgrades;

export const {
  setIsAuthorized,
  setDataIsLoaded,
  setCoins,
  addCoin,
  setCoinsPerMinute,
  setLevel,
  setDiamonds,
  setDescription,
  setCoinsOnClick,
  setNickname,
  setId,
  addOneUpgrade,
  setUpgrades,
  resetUserData,
} = UserSlice.actions;

export default UserSlice.reducer;
