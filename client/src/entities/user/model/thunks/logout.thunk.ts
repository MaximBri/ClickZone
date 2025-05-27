import { authApi } from "@/shared/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Функция для выхода пользователя. Бэкенд убирает все токены
 * @type {*} - возвращает результат от бэкенда
 */
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await authApi.logout();
});
