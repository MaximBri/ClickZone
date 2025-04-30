import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UpgradeInterface, userDataInterface } from "@/shared/types";
import { processUserData } from "./thunks/shared/processData";
import { fetchClickerData, loginUser, logoutUser } from "./thunks";
import { fetchAccountData } from "../account/thunks";
import { processAccountData } from "../account/processAccountData";
import { changeUserData } from "../account/thunks/changeUserData.thunk";
import { buyMiglioramenti } from "../miglioramenti/thunks/buyMiglioramenti.thunk";
import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiSlice";
import { getCurrentRewardThunk } from "../daily-rewards/thunks/getCurrentReward.thunk";
import { activateMiglioramentiThunk } from "../miglioramenti/thunks/activateMiglioramentiThunk";
import { setHasAchievement } from "../account/thunks/setHasAchevement.thunk";

const initialState: userDataInterface = {
  isAuthorized: null,
  level: 1,
  coinsPerMinute: 0,
  coinsOnClick: 1,
  hasAutoClicker: false,
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
    countNicknames: null,
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
    },
    addCoin(state) {
      state.finances.coins += state.coinsOnClick;
    },
    addCountOfCoins(state, action: PayloadAction<number>) {
      state.finances.coins += action.payload;
    },
    addCountOfDiamonds(state, action: PayloadAction<number>) {
      state.finances.diamonds += action.payload;
    },
    addCoinsInSecond(state) {
      state.finances.coins += state.coinsPerMinute / 60;
    },
    setCoinsOnClick(state, action: PayloadAction<number>) {
      if (state.hasAutoClicker) {
        state.coinsPerMinute = action.payload * 60;
      }
      state.coinsOnClick = action.payload;
    },
    addCoinsOnClick(state, action: PayloadAction<number>) {
      if (state.hasAutoClicker) {
        state.coinsPerMinute = (state.coinsOnClick + action.payload) * 60;
      }
      state.coinsOnClick += action.payload;
    },
    multiplyCoinsOnClick(state, action: PayloadAction<number>) {
      if (state.hasAutoClicker) {
        state.coinsPerMinute = state.coinsOnClick * action.payload * 60;
      }
      state.coinsOnClick *= action.payload;
    },
    setDiamonds(state, action: PayloadAction<number>) {
      state.finances.diamonds = action.payload;
    },
    setCoinsPerMinute(state) {
      state.coinsPerMinute = state.coinsOnClick * 60;
    },
    // Account
    addCountNicknames(state) {
      state.account.countNicknames!++;
    },
    setCanChangeNickname(state, action: PayloadAction<boolean>) {
      state.globals.canChangeNickname = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.globals.description = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.globals.nickname = action.payload;
    },
    setNicknamePrice(state, action) {
      state.account.nicknamePrice = action.payload;
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
    addUpgradeWithCount(state, action: PayloadAction<UpgradeInterface>) {
      const miglioramenti = state.clicker.upgrades.find(
        (item) => item.id === action.payload.id
      );
      if (miglioramenti) {
        miglioramenti.count += action.payload.count;
      } else {
        state.clicker.upgrades.push(action.payload);
      }
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
      if (action.payload.id === 14) {
        state.hasAutoClicker = true;
      }
    },
    removeOneUpgrade(state, action: PayloadAction<number>) {
      const improvementId = state.clicker.upgrades.findIndex(
        (item) => item.id === action.payload
      );
      if (improvementId !== undefined) {
        const count = state.clicker.upgrades[improvementId].count;
        if (count === 1) {
          state.clicker.upgrades = state.clicker.upgrades.filter(
            (item) => item.id !== action.payload
          );
        } else {
          state.clicker.upgrades[improvementId].count--;
        }
      } else {
        console.error("Не найдено улучшения с id = ", action.payload);
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
    builder.addCase(setHasAchievement.fulfilled, (state, action) => {
      const rewardIndex = state.globals.achievements.findIndex(
        (item) => item.id === action.meta.arg
      );
      if (rewardIndex !== -1) {
        state.globals.achievements[rewardIndex].has_achievement = true;
      } else {
        console.error("Не найдена награда с id = ", action.meta.arg);
      }
    });
    // Покупка улучшения
    builder.addCase(buyMiglioramenti.fulfilled, (state, action) => {
      state.finances.coins = action.payload.user_coins;
    });
    // Обновление ресурсов после получения ежедневной награды
    builder.addCase(getCurrentRewardThunk.fulfilled, (state, action) => {
      state.finances = action.payload.user_resources;
    });
    builder.addCase(activateMiglioramentiThunk.fulfilled, (state, action) => {
      state.finances = {
        coins: action.payload.user_coins,
        diamonds: action.payload.user_diamonds,
      };
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
  removeOneUpgrade,
  setNicknamePrice,
  setCanChangeNickname,
  addCountNicknames,
  addCoinsInSecond,
  addCountOfCoins,
  addCountOfDiamonds,
  addUpgradeWithCount,
} = UserSlice.actions;

export default UserSlice.reducer;
