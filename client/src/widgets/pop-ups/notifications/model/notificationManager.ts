import { notificationsErrorsTypes } from "@/shared/types";
import { addNotification, deleteLastNotification } from "./notificationSlice";
import { AppDispatch } from "@/app/store/store";

export const notificationManager = (
  dispatch: AppDispatch,
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
