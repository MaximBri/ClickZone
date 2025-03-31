import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeUserData = createAsyncThunk(
  "user/changeUserData",
  async (credentials: {
    name: string;
    about_me: string;
    nickname_price: { coins: number; diamonds: number };
  }) => {
    const response = await api.post(apiRoutes.editProfile, {
      ...credentials,
    });
    return response.data;
  }
);
