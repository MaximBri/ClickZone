import { RootState } from "@/app/store/store";
import { getCurrentRewardsDayThunk } from "@/entities/user/daily-rewards/thunks/getCurrentDay.thunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDailyRewardsThunk } from "../thunks/getDailyRewards.thunk";
import { getCurrentRewardThunk } from "../thunks/getCurrentReward.thunk";

export interface dailyRewardInterface {
  id: number;
  rewards: {
    coins?: number;
    diamonds?: number;
    custom?: string;
  };
}
/**
 * Начальное состояние. Включает в себя массив с ежедневными наградами, текущий день, общее количество дней с наградами, возможность получить награду, количество часов для получения новой ежедневной награды
 *  @type {*}
 */
const initialState: {
  data: dailyRewardInterface[];
  currentDay: number | null;
  allDays: number;
  canGetReward: boolean;
  hoursToNextReward: number;
} = {
  data: [],
  currentDay: null,
  allDays: 14,
  canGetReward: false,
  hoursToNextReward: 0,
};

const dailyRewardsSlice = createSlice({
  name: "dialyRewards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDailyRewardsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(
      getCurrentRewardsDayThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          available: boolean;
          current_day: number;
          time_to_next: {
            hours: number;
          };
        }>
      ) => {
        state.canGetReward = action.payload.available;
        state.currentDay = action.payload.current_day;
        state.hoursToNextReward = action.payload.time_to_next?.hours ?? 0;
      }
    );
    builder.addCase(getCurrentRewardThunk.fulfilled, (state) => {
      state.canGetReward = false;
      state.hoursToNextReward = 24;
      if (state.currentDay) state.currentDay++;
    });
    builder.addCase(getCurrentRewardThunk.rejected, (state) => {
      state.canGetReward = false;
      state.hoursToNextReward = 24;
    });
  },
});

export const getDailyRewards = (state: RootState) => state.dialyRewards.data;

export default dailyRewardsSlice.reducer;
