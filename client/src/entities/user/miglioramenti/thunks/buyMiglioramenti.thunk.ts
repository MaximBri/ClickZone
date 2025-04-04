import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const buyMiglioramenti = createAsyncThunk(
  "user/buyMiglioramenti",
  async () => {
    const response = await api.post(apiRoutes.upgrades, {});
    return response.data;
  }
);
