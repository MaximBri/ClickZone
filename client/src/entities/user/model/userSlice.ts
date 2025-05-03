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

/**
 * Начальное состояние пользователя.
 * Включает в себя финансы, глобальные данные, апгрейды, флаги загрузки и ежедневные награды.
 */
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

/**
 * Слайс user хранит и управляет всеми пользовательскими данными:
 * - авторизация
 * - финансы (монеты, алмазы)
 * - улучшения кликера
 * - данные аккаунта (ник, описание, достижения)
 * - флаги загрузки данных
 *
 * Используется для управления состоянием пользователя во всех разделах приложения.
 */

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Globals
    /**
     * Метод для установки флага авторизации
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<boolean>} action - параметр, который будет установлен в параметр авторизации
     */
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    // Wallet
    /**
     * Метод для установки количества монет у пользователя
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - количество монет, которое будет установлено
     */
    setCoins(state, action: PayloadAction<number>) {
      state.finances.coins = action.payload;
    },
    /**
     * Метод для добавления монет при клике на фигурку.
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     */
    addCoin(state) {
      state.finances.coins += state.coinsOnClick;
    },
    /**
     * Метод для добавления определённого количества монет к общим
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - количество монет, которое будет добавлено
     */
    addCountOfCoins(state, action: PayloadAction<number>) {
      state.finances.coins += action.payload;
    },
    /**
     * Метод, который добавляет определённое количество алмазов
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - количество алмазов, которое будет добавлено
     */
    addCountOfDiamonds(state, action: PayloadAction<number>) {
      state.finances.diamonds += action.payload;
    },
    /**
     * Метод для добавления монет каждую секунду.
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     */
    addCoinsInSecond(state) {
      state.finances.coins += state.coinsPerMinute / 60;
    },
    /**
     * Метод для добавления количества монет за клик. Проверяется, есть ли у пользователя улучшение "Автокликер". Если да, то обновляется ещё количество монет в минуту
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - количество монет, которое нужно добавить к монетам за 1 клик
     */
    addCoinsOnClick(state, action: PayloadAction<number>) {
      if (state.hasAutoClicker) {
        state.coinsPerMinute = (state.coinsOnClick + action.payload) * 60;
      }
      state.coinsOnClick += action.payload;
    },
    /**
     * Метод для умножения количества монет за клик (нужен для двух улучшений). Если у пользователя есть улучшение "Автокликер", то обновляется ещё и количество монет в минуту
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action
     */
    multiplyCoinsOnClick(state, action: PayloadAction<number>) {
      if (state.hasAutoClicker) {
        state.coinsPerMinute = state.coinsOnClick * action.payload * 60;
      }
      state.coinsOnClick *= action.payload;
    },
    /**
     * Метод для присваивания количества алмазов пользователя
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - количество алмазов, которое будет присвоено
     */
    setDiamonds(state, action: PayloadAction<number>) {
      state.finances.diamonds = action.payload;
    },
    /**
     * Метод для обновления количества монет в минуту. Основывается на количестве монет за 1 клик
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     */
    setCoinsPerMinute(state) {
      state.coinsPerMinute = state.coinsOnClick * 60;
    },
    // Account
    /**
     * Метод для обновления количества раз, когда никнейм был сменён.
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     */
    addCountNicknames(state) {
      state.account.countNicknames!++;
    },
    /**
     * Метод для обновления флага, который указывает на то, может ли пользователь бесплатно обновить никнейм
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<boolean>} action - флаг, который будет установлен
     */
    setCanChangeNickname(state, action: PayloadAction<boolean>) {
      state.globals.canChangeNickname = action.payload;
    },
    /**
     * Метод для обновления описания в личном кабинете пользователя
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<string>} action - новое описание
     */
    setDescription(state, action: PayloadAction<string>) {
      state.globals.description = action.payload;
    },
    /**
     * Метод для обновления никнейма
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<string>} action - новый никнейм
     */
    setNickname(state, action: PayloadAction<string>) {
      state.globals.nickname = action.payload;
    },
    /**
     * Метод для обновления цены на обновление никнейма
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<{coins:number, diamonds: number}>} action - объект с полями coins и diamonds
     */
    setNicknamePrice(state, action) {
      state.account.nicknamePrice = action.payload;
    },
    // Clicker
    /**
     * Метод для обновления уровня фигурки.
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - новый уровень
     */
    setLevel(state, action: PayloadAction<number>) {
      if (action.payload <= 10 && action.payload > 0) {
        state.level = action.payload;
      }
    },
    // Upgrades
    /**
     * Метод для добавления улучшения с параметром количества (данные с бэкенда). Если такое улучшение уже есть в хранилище, то к нему просто прибавляется количество улучшений, иначе в общий массив помещается входной объект
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<UpgradeInterface>} action - улучшение с параметром count
     */
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
    /**
     * Метод для добавления улучшения (при покупке). Для начала проверяется, есть ли такое улучшение уже в хранилище. Если да, то к нему добавляется в параметр count +1, иначе в общий массив добавляется это улучшение с параметром count = 1
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<miglioramentiInterface>} action - само улучшение
     */
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
    /**
     * Убирает одно улучшение (после активации и использования). Для начала проверяется параметр count у найденного улучшения. Если он равен 1, то массив с улучшениями фильтруется так, чтобы в нём не было улучшения с текущим id. В противном случае просто параметр count уменьшается на 1
     * @param {userDataInterface} state - глабольный объект с данными пользователя
     * @param {PayloadAction<number>} action - id улучшения, которое нужно списать
     */
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
  setCoins,
  addCoin,
  setCoinsPerMinute,
  setLevel,
  setDiamonds,
  setDescription,
  addCoinsOnClick,
  multiplyCoinsOnClick,
  setNickname,
  addOneUpgrade,
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
