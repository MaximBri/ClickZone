import { useSelector } from "react-redux";
import { Notifications } from "@/features/notifications";
import { getNotifications } from "../model/notificationSlice";
import styles from "./NotificationList.module.scss";

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
