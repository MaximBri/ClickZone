import { RootState } from '@/app/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  dataIsLoaded: boolean;
  level: number;
  coinsPerMinute: number;
  coinsOnClick: number;
  finances: {
    coins: number;
    diamonds: number;
  };
  globals: {
    id: number | null;
    nickname: string;
    description: string;
    dateOfRegister: Date | null;
  };
} = {
  dataIsLoaded: false,
  level: 1,
  coinsPerMinute: 0,
  coinsOnClick: 1,
  finances: {
    coins: 0,
    diamonds: 0,
  },
  globals: {
    id: null,
    nickname: 'User',
    description: '',
    dateOfRegister: null,
  },
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCoins(state) {
      state.finances.coins += state.coinsOnClick;
    },
    setCoinsPerMinute(state, action: PayloadAction<number>) {
      state.coinsPerMinute = action.payload;
    },
    setLevel(state, action: PayloadAction<number>) {
      if (action.payload <= 10 && action.payload > 0) {
        state.level = action.payload;
      }
    },
  },
});

export const getLevel = (state: RootState) => state.user.level;
export const getFinances = (state: RootState) => state.user.finances;
export const getCoinsOnClick = (state: RootState) => state.user.coinsOnClick;

export const { setCoins, setCoinsPerMinute, setLevel } = UserSlice.actions;

export default UserSlice.reducer;
