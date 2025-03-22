import { RootState } from "@/app/store/store";
import { notificationDataInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  data: notificationDataInterface[];
} = {
  data: [],
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
    },
    deleteLastNotification: (state) => {
      state.data.pop();
    },
    deleteFirstNotification: (state) => {
      state.data = state.data.slice(1, state.data.length);
    },
  },
});

export const getNotifications = (state: RootState) => state.notifications.data;

export const {
  addNotification,
  deleteLastNotification,
  deleteFirstNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
