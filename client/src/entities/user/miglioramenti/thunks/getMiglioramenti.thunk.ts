import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/** 
 * Функция для получения списка улучшений с бэкенда
 * Возвращает массив с улучшениями
 * @type {*} 
 */
export const getMiglioramenti = createAsyncThunk(
  "getMiglioramenti",
  async () => {
    const response = await api.get(apiRoutes.upgrades);
    return response.data;
  }
);
