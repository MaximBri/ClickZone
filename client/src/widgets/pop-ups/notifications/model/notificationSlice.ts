import { RootState } from "@/app/store/store";
import { notificationDataInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  data: notificationDataInterface[];
  messageIndex: number;
} = {
  data: [],
  messageIndex: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<notificationDataInterface>
    ) => {
      state.data.push(action.payload);
      state.messageIndex++;
    },
    deleteLastNotification: (state) => {
      state.data.pop();
    },
    deleteNotificationByIndex: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.index !== action.payload);
    },
  },
});

export const getNotifications = (state: RootState) => state.notifications.data;
export const getCurrentIndex = (state: RootState) =>
  state.notifications.messageIndex;

export const {
  addNotification,
  deleteLastNotification,
  deleteNotificationByIndex,
} = notificationSlice.actions;

export default notificationSlice.reducer;
