import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccountData = createAsyncThunk(
  "user/fetchAccountData",
  async () => {
    return await api.post(apiRoutes.getAccountInfo, {});
  }
);
