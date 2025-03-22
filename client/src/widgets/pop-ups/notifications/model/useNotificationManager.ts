import { useAppDispatch } from "@/app/store/store";
import { useSelector } from "react-redux";

import {
  addNotification,
  deleteNotificationByIndex,
  getCurrentIndex,
} from "./notificationSlice";
import { notificationsErrorsTypes } from "@/shared/types";

export const useNotificationManager = (
  message: string,
  type: notificationsErrorsTypes,
  time?: number
) => {
  const dispatch = useAppDispatch();
  const index = useSelector(getCurrentIndex);
  dispatch(addNotification({ message, type, index }));
  setTimeout(() => {
    dispatch(deleteNotificationByIndex(index));
  }, time ?? 3000);
};
