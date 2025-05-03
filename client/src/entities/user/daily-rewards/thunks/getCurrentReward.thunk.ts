import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/** 
 * Функция для получения текущей награды
 * Возвращает данные от бэкенда
 * @type {*}
 */
export const getCurrentRewardThunk = createAsyncThunk(
  "getCurrentReward",
  async () => {
    const responce = await api.post(apiRoutes.getDailyRewardsClaim, {});
    console.log(responce);
    return responce.data;
  }
);
