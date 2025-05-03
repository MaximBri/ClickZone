import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/** 
 * Функция для синхронизации ресурсов фронтенда и бэкенда. В теле запроса отправляется количество монет и алмазов.
 * Возвращает ответ от бэкенда
 * @type {*}
 */
export const updateUserFinancesThunk = createAsyncThunk(
  "updateUserFinances",
  async (credentials: { coins: number; diamonds: number }) => {
    const responce = await api.post(apiRoutes.updateFinaces, credentials);
    return responce.data;
  }
);
