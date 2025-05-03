import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Функция на получение текущего дня награды, а также время, через которое можно получить новую ежедневную награду
 * Возвращает результат с бэкенда
 * @type {*}
 */
export const getCurrentRewardsDayThunk = createAsyncThunk(
  "getCurrentRewardsDay",
  async () => {
    const responce = await api.get(apiRoutes.getDailyRewardsStatus);
    return responce.data;
  }
);
