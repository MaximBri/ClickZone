import { RootState } from "@/app/store/store";
import { notificationDataInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Начальное состояние глобального объекта, который содержит ключ data, в нём хранятся все уведомления, которые показываются пользователю
 */
const initialState: {
  data: notificationDataInterface[];
} = {
  data: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    /**
     * Метод для добавления нового уведомления. Принимает объект с полями message - сообщение уведомления и type - тип уведомления (error, warning, success)
     */
    addNotification: (
      state,
      action: PayloadAction<notificationDataInterface>
    ) => {
      state.data.push(action.payload);
    },
    /**
     * Метод для удаления первого уведомления из массива
     */
    deleteLastNotification: (state) => {
      state.data.shift();
    },
    /**
     * Метод для удаления уведомления по его id
     */
    deleteNotificationById: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const getNotifications = (state: RootState) => state.notifications.data;

export const {
  addNotification,
  deleteLastNotification,
  deleteNotificationById,
} = notificationSlice.actions;

export default notificationSlice.reducer;
