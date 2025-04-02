import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccountData = createAsyncThunk(
  "user/fetchAccountData",
  async () => {
    const response = await api.post(apiRoutes.getAccountInfo, {});
    return response.data;
  }
);
