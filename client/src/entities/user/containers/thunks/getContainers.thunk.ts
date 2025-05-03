import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

/** 
 * Функция для получения массива с контейнерами
 * Возвращает ответ от бэкенда
 * @type {*}
 */
export const getContainers = createAsyncThunk(
  "containers/getContainers",
  async () => {
    const responce = await api.get(apiRoutes.containers);
    return responce.data;
  }
);
