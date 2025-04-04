import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface dailyRewardInterface {
  id: number;
  rewards: {
    coins?: number;
    diamonds?: number;
    custom?: string;
  };
}

const initialState: { data: dailyRewardInterface[] } = {
  data: [],
};

const dailyRewardsSlice = createSlice({
  name: "dialyRewards",
  initialState,
  reducers: {
    setDailyRewards: (state, action: PayloadAction<dailyRewardInterface[]>) => {
      state.data = action.payload;
    },
  },
});

export const getDailyRewards = (state: RootState) => state.dialyRewards.data;

export const { setDailyRewards } = dailyRewardsSlice.actions;

export default dailyRewardsSlice.reducer;
