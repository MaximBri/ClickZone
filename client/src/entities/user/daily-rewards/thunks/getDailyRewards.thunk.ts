import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Функция для получения данных о ежедневных наградах. Возвращает массив ежедневных наград
 * @type {*}
 */
export const getDailyRewardsThunk = createAsyncThunk(
  "getDailyRewards",
  async () => {
    const response = await api.get(apiRoutes.getDailyRewards);
    return response.data;
  }
);
