import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Используется для получения данных из режима "Кликер"
 * @type {*} - возвращает данные, которые пришли с бэкенда
 */
export const fetchClickerData = createAsyncThunk(
  "user/fetchClickerData",
  async () => {
    const response = await api.post(apiRoutes.checkAuthorization, {});
    return response.data;
  }
);
