import { useSelector } from "react-redux";

import { RootState } from "@/app/store/store";
import styles from "./UserRegistration.module.scss";

export const UserRegistration = () => {
  const formatDate = (date: string | null): string => {
    if (!date) return "Не определено";
    return date.slice(0, 10).split("-").reverse().join(".");
  };
  const userRegisterData = useSelector(
    (state: RootState) => state.user.globals.dateOfRegister
  );
  return (
    <h3 className={styles.date}>
      Дата регистрации: <strong>{formatDate(userRegisterData)}</strong>
    </h3>
  );
};
