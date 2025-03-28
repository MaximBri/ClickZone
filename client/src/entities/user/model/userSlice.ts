import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UpgradeInterface, userDataInterface } from "@/shared/types";
import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiList";
import { processUserData } from "./thunks/shared/processData";
import { fetchClickerData, loginUser, logoutUser } from "./thunks";

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
        (item) => item.id === action.payload.id
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchClickerData.pending, (state) => {
        state.dataIsLoaded = false;
      })
      .addCase(fetchClickerData.fulfilled, (state, action) => {
        processUserData(state, action.payload);
      })
      .addCase(fetchClickerData.rejected, (state) => {
        state.dataIsLoaded = false;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.dataIsLoaded = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        processUserData(state, action.payload);
      })
      .addCase(loginUser.rejected, (state) => {
        state.dataIsLoaded = false;
        state.isAuthorized = false;
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      Object.assign(state, initialState);
      state.dataIsLoaded = false;
      state.isAuthorized = false;
    });
  },
});

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
} = UserSlice.actions;

export default UserSlice.reducer;
