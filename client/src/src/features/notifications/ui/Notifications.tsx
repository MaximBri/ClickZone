import { FC, memo } from "react";
import { notificationDataInterface } from "@/shared/types";
import styles from "./Notifications.module.scss";

export const Notifications: FC<{
  data: notificationDataInterface;
}> = memo(({ data }) => {

  return (
    <div
      className={`${styles["alert-card"]} ${
        styles[`alert-card--${data.type}`]
      }`}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className={styles["alert-card__icon"]}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <p className={styles["alert-card__message"]}>{data.message}</p>
    </div>
  );
});
