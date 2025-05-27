import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/** 
 * Функция для начисления награды. В теле запроса отправляется id награды, которую фронтенд пытается активировать
 * Возвращает ответ от бэкенда
 * @type {*}
 */
export const setHasAchievement = createAsyncThunk(
  "setHasAchievement",
  async (id: number) => {
    const response = await api.post(apiRoutes.setReward, { id });
    return response.data;
  }
);
