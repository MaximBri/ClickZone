import { useSelector } from "react-redux";

import { RootState } from "@/app/store/store";
import styles from "./UserRegistration.module.scss";

/**
 * Функция отвечает за отображение даты регистрации в личном кабинете.
 */
export const UserRegistration = () => {
  /**
   * Функция преобразует формат даты в такой: ДД.ММ.ГГГГ
   * @param {(string)} date - дата регистрации в международном формате
   * @return {string}  text - результат преобразования
   */
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
