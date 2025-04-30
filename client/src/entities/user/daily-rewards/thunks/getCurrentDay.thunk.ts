import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentRewardsDayThunk = createAsyncThunk(
  "getCurrentRewardsDay",
  async () => {
    const responce = await api.get(apiRoutes.getDailyRewardsStatus);
    return responce.data;
  }
);
