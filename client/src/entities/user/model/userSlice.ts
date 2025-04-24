import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UpgradeInterface, userDataInterface } from "@/shared/types";
import { processUserData } from "./thunks/shared/processData";
import { fetchClickerData, loginUser, logoutUser } from "./thunks";
import { fetchAccountData } from "../account/thunks";
import { processAccountData } from "../account/processAccountData";
import { checkCoinsCount } from "../account/checkCoinsCount";
import { changeUserData } from "../account/thunks/changeUserData.thunk";
import { buyMiglioramenti } from "../miglioramenti/thunks/buyMiglioramenti.thunk";
import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiSlice";
import { getCurrentRewardThunk } from "../daily-rewards/thunks/getCurrentReward.thunk";

const initialState: userDataInterface = {
  isAuthorized: null,
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
    achievements: [],
    canChangeNickname: false,
  },
  clicker: {
    upgrades: [],
  },
  account: {
    nicknamePrice: {
      coins: 0,
      diamonds: 0,
    },
  },
  flags: {
    clickerData: null,
    accountData: null,
  },
  dailyRewards: [],
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
      state.flags.clickerData = action.payload;
    },
    setId(state, action: PayloadAction<number>) {
      state.globals.id = action.payload;
    },
    // Wallet
    setCoins(state, action: PayloadAction<number>) {
      state.finances.coins = action.payload;
      checkCoinsCount(state, state.finances.coins);
    },
    addCoin(state) {
      state.finances.coins += state.coinsOnClick;
      checkCoinsCount(state, state.finances.coins);
    },
    setCoinsOnClick(state, action: PayloadAction<number>) {
      state.coinsOnClick = action.payload;
      state.coinsPerMinute = action.payload * 60;
    },
    addCoinsOnClick(state, action: PayloadAction<number>) {
      state.coinsPerMinute = (state.coinsOnClick + action.payload) * 60;
      state.coinsOnClick += action.payload;
    },
    multiplyCoinsOnClick(state, action: PayloadAction<number>) {
      state.coinsPerMinute = state.coinsOnClick * action.payload * 60;
      state.coinsOnClick *= action.payload;
    },
    setDiamonds(state, action: PayloadAction<number>) {
      state.finances.diamonds = action.payload;
    },
    setCoinsPerMinute(state) {
      state.coinsPerMinute = state.coinsOnClick * 60;
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
      if (duplicate !== -1) {
        state.clicker.upgrades[duplicate].count++;
      } else {
        state.clicker.upgrades.push({ ...action.payload, count: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    // Получение данных о кликере
    builder
      .addCase(fetchClickerData.pending, (state) => {
        state.flags.clickerData = false;
      })
      .addCase(fetchClickerData.fulfilled, (state, action) => {
        processUserData(state, action.payload);
      })
      .addCase(fetchClickerData.rejected, (state) => {
        state.flags.clickerData = false;
      });
    // Вход пользователя
    builder
      .addCase(loginUser.pending, (state) => {
        state.flags.clickerData = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        processUserData(state, action.payload);
      })
      .addCase(loginUser.rejected, (state) => {
        state.flags.clickerData = false;
        state.isAuthorized = false;
      });
    // Выход пользователя
    builder.addCase(logoutUser.fulfilled, () => {
      return {
        ...initialState,
        flags: {
          ...initialState.flags,
          clickerData: false,
          accountData: false,
        },
        isAuthorized: false,
      };
    });
    // Получение данных о юзере
    builder
      .addCase(fetchAccountData.fulfilled, (state, action) => {
        processAccountData(state, action.payload);
      })
      .addCase(fetchAccountData.rejected, (state) => {
        state.flags.accountData = false;
      });
    // Изменение данных о юзере
    builder.addCase(changeUserData.fulfilled, (state, action) => {
      state.globals.canChangeNickname = false;
      state.finances.coins = action.payload.resources.coins;
      state.finances.diamonds = action.payload.resources.diamonds;
      state.account.nicknamePrice = action.payload.nickname_price;
    });
    // Покупка улучшения
    builder.addCase(buyMiglioramenti.fulfilled, (state, action) => {
      state.finances.coins = action.payload.user_coins;
    });
    // Обновление ресурсов после получения ежедневной награды
    builder.addCase(getCurrentRewardThunk.fulfilled, (state, action) => {
      state.finances = action.payload.user_resources;
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
  addCoinsOnClick,
  setCoinsOnClick,
  multiplyCoinsOnClick,
  setNickname,
  setId,
  addOneUpgrade,
  setUpgrades,
} = UserSlice.actions;

export default UserSlice.reducer;
