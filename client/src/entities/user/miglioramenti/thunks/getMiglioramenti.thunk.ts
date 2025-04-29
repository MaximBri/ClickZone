import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMiglioramenti = createAsyncThunk(
  "getMiglioramenti",
  async () => {
    const response = await api.get(apiRoutes.upgrades);
    return response.data;
  }
);
