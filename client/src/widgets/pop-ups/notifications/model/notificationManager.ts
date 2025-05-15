import { notificationsErrorsTypes } from "@/shared/types";
import { addNotification, deleteLastNotification } from "./notificationSlice";
import { AppDispatch } from "@/app/store/store";

/**
 * Функция отвечает за добавление нового уведомления по входным параметрам и его автоматическое удаление через 3 секунды
 * @param dispatch - глобальная функция для управления хранилищем
 * @param message - сообщение, которое будет показано в уведомлении
 * @param type - тип сообщения: error, warning, success
 */
export const notificationManager = (
  dispatch: AppDispatch,
  message: string,
  type: notificationsErrorsTypes
) => {
  dispatch(
    addNotification({
      message,
      type,
      id: crypto.randomUUID(),
    })
  );
  setTimeout(() => {
    dispatch(deleteLastNotification());
  }, 3000);
};
