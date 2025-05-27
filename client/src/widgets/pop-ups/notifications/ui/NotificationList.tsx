import { useSelector } from "react-redux";
import { Notifications } from "@/features/notifications";
import { getNotifications } from "../model/notificationSlice";
import styles from "./NotificationList.module.scss";

/**
 * Функция отвечает за отображение всего списка уведомлений в правом нижнем углу экрана
 */
export const NotificationList = () => {
  const notifications = useSelector(getNotifications);

  return (
    <ul className={styles.notif}>
      {notifications.map((item) => {
        return <Notifications key={item.id} data={item} />;
      })}
    </ul>
  );
};
