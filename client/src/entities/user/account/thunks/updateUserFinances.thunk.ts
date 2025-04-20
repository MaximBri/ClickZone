import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserFinancesThunk = createAsyncThunk(
  "updateUserFinances",
  async (credentials: { coins: number; diamonds: number }) => {
    const responce = await api.post(apiRoutes.updateFinaces, credentials);
    return responce.data;
  }
);
