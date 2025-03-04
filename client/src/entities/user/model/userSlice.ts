import { RootState } from '@/app/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataAfterRegisterInterface } from '../registration';
import { clickerUpgradeInterface, userDataInterface } from '@/shared/types';

const initialState: userDataInterface = {
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
    nickname: '',
    description: '',
    dateOfRegister: null,
  },
  clicker: {
    upgrades: [],
  },
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDataIsLoaded(state, action: PayloadAction<boolean>) {
      state.dataIsLoaded = action.payload;
    },
    setDataAfterRegister(
      state,
      action: PayloadAction<dataAfterRegisterInterface>
    ) {
      state.globals.id = action.payload.id;
      state.globals.nickname = action.payload.nickname;
    },
    setId(state, action: PayloadAction<number>) {
      state.globals.id = action.payload;
    },
    setCoins(state) {
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
    setDescription(state, action: PayloadAction<string>) {
      state.globals.description = action.payload;
    },
    setLevel(state, action: PayloadAction<number>) {
      if (action.payload <= 10 && action.payload > 0) {
        state.level = action.payload;
      }
    },
    setNickname(state, action: PayloadAction<string>) {
      state.globals.nickname = action.payload;
    },
    setUpgrades(state, action: PayloadAction<clickerUpgradeInterface[]>) {
      state.clicker.upgrades = action.payload;
    },
    addOneUpgrade(state, action: PayloadAction<clickerUpgradeInterface>) {
      state.clicker.upgrades.push(action.payload);
    },
  },
});

export const getLevel = (state: RootState) => state.user.level;
export const getFinances = (state: RootState) => state.user.finances;
export const getCoinsOnClick = (state: RootState) => state.user.coinsOnClick;
export const getNickname = (state: RootState) => state.user.globals.nickname;
export const userInfoIsLoaded = (state: RootState) => state.user.dataIsLoaded;

export const {
  setDataIsLoaded,
  setDataAfterRegister,
  setCoins,
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
