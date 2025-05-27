import { useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";

import { getDescription } from "@/entities/user/model/selectors";
import styles from "./UserDescription.module.scss";

/**
 * Функция отвечает за рендер блока с описанием в личном кабинете пользователя.
 * @param {*} { onUpdate } - функция для обновления строки описания в родительском компоненте
 */
export const UserDescription: FC<{
  onUpdate: (key: "name" | "description", value: string) => void;
}> = ({ onUpdate }) => {
  const userDescription = useSelector(getDescription);
  const [description, setDescription] = useState<string>(userDescription || "");
  const [saveButtonIsActive, setSaveButtonIsActive] = useState<boolean>(false);
  const maxLength = 256;

  useEffect(() => {
    description !== userDescription
      ? setSaveButtonIsActive(true)
      : setSaveButtonIsActive(false);
  }, [description, userDescription]);

  /**
   * Функция изменения описания пользователя. Проверяет на длину текст, прежде чем сохранить (связано с ограничениями на бэкенде)
   * @param {string} text - новый текст
   */
  const onDescriptionChange = (text: string) => {
    if (text.length > maxLength) text = text.slice(0, maxLength);
    setDescription(text);
  };

  return (
    <label className={styles.setting}>
      Ваше описание
      <textarea
        className={styles.setting__input}
        value={description}
        placeholder="Напишите что-нибудь о себе"
        onChange={(e) => onDescriptionChange(e.target.value)}
      ></textarea>
      <span
        className={`${styles["setting__input-length"]} ${
          maxLength > description.length
            ? ""
            : styles["setting__input-length--red"]
        }`}
      >
        {description.length}/{maxLength}
      </span>
      <button
        onClick={() => onUpdate("description", description)}
        className={`${styles.setting__button} ${
          saveButtonIsActive
            ? styles["setting__button--active"]
            : styles["setting__button--disabled"]
        }`}
      >
        Сохранить
      </button>
    </label>
  );
};
