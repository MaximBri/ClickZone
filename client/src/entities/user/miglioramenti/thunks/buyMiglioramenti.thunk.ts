import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Функция на покупку улучшения. Отправляет на бэкенд запрос с параметрами id улучшения, которое хотим купить. И цену: монеты и алмазы. Цена алмазов ставится в 0, т.к. все улучшения покупаются исключительно за монеты
 * @type {*}
 */
export const buyMiglioramenti = createAsyncThunk(
  "user/buyMiglioramenti",
  async (credentials: { id: number; cost_coins: number }) => {
    const response = await api.post(apiRoutes.upgrades, {
      ...credentials,
      cost_diamonds: 0,
    });
    return response.data;
  }
);
