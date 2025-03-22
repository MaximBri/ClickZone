import { notificationsErrorsTypes } from "@/shared/types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { addNotification, deleteLastNotification } from "./notificationSlice";

export const notificationManager = (
  dispatch: Dispatch<UnknownAction>,
  message: string,
  type: notificationsErrorsTypes
) => {
  dispatch(
    addNotification({
      message,
      type,
    })
  );
  setTimeout(() => {
    dispatch(deleteLastNotification());
  }, 3000);
};
