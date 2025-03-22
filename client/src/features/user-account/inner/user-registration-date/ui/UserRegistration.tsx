import { useSelector } from "react-redux";

import { RootState } from "@/app/store/store";
import styles from "./UserRegistration.module.scss";

export const UserRegistration = () => {
  const formatDate = (date: Date | null): string => {
    if (!date) return "Не определено";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };
  const userRegisterData = useSelector(
    (state: RootState) => state.user.globals.dateOfRegister
  );
  return (
    <h3 className={styles.date}>
      Дата вашей регистрации: <strong>{formatDate(userRegisterData)}</strong>
    </h3>
  );
};
