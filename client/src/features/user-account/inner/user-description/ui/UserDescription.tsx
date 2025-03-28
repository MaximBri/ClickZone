import { useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";

import { getDescription } from "@/entities/user/model/selectors";
import styles from "./UserDescription.module.scss";

export const UserDescription: FC<{
  onUpdate: (key: "name" | "description", value: string) => void;
}> = ({ onUpdate }) => {
  const userDescription = useSelector(getDescription);
  const [description, setDescription] = useState<string>(userDescription || "");
  const [saveButtonIsActive, setSaveButtonIsActive] = useState<boolean>(false);

  useEffect(() => {
    description !== userDescription
      ? setSaveButtonIsActive(true)
      : setSaveButtonIsActive(false);
  }, [description, userDescription]);

  return (
    <label className={styles.setting}>
      Ваше описание
      <textarea
        className={styles.setting__input}
        value={description}
        placeholder="Напишите что-нибудь о себе"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
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
