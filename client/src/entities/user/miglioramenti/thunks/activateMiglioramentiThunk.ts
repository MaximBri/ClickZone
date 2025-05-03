import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";
/** 
 * Функция отправляет запрос на бэкенд для активации улучшения с id, которое пришло в параметре.
 * @type {*} - возвращает данные с бэкенда
 */
export const activateMiglioramentiThunk = createAsyncThunk(
  "activateMiglioramenti",
  async (id: number) => {
    const response = await api.post(apiRoutes.activateMiglioramenti, { id });
    return response.data;
  }
);
