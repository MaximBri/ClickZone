import { RootState } from "@/app/store/store";
import { setHasAchievement } from "@/entities/user/account/thunks/setHasAchevement.thunk";
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
      state.data.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setHasAchievement.fulfilled, (state, action) => {
      console.log(action.payload);
      // state.data.push(action.payload);
    });
  },
});

export const getNotifications = (state: RootState) => state.notifications.data;

export const { addNotification, deleteLastNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
