import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Функция, которая отправляет запрос на бэкенд для входа пользователя
 * @type {*} - возвращает данные, которые пришли с бэкенда
 */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { login: string; password: string }) => {
    const response = await api.post(apiRoutes.authorization, {
      ...credentials,
    });
    return response.data;
  }
);
