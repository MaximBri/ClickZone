import { authApi } from "@/shared/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await authApi.logout();
});
