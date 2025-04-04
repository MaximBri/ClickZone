import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const buyMiglioramenti = createAsyncThunk(
  "user/buyMiglioramenti",
  async (credentials: { id: number; cost_coins: number }) => {
    const response = await api.post(apiRoutes.upgrades, {
      ...credentials,
      cost_diamonds: 0,
    });
    console.log(response.data);
    return response.data;
  }
);
