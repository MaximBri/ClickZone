import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentRewardThunk = createAsyncThunk(
  "getCurrentReward",
  async () => {
    const responce = await api.post(apiRoutes.getDailyRewardsClaim, {});
    console.log(responce);
    return responce.data;
  }
);
