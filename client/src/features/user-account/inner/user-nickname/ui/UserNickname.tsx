import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getNickname } from "@/entities/user/model/userSlice";
import styles from "./UserNickname.module.scss";

export const UserNickname = () => {
  const userNickname = useSelector(getNickname) || "User";
  const [nickname, setNickname] = useState<string>(userNickname || "User");
  const [saveButtonIsActive, setSaveButtonIsActive] = useState<boolean>(false);

  useEffect(() => {
    userNickname !== nickname
      ? setSaveButtonIsActive(true)
      : setSaveButtonIsActive(false);
  }, [nickname]);

  return (
    <label className={styles.setting}>
      Ваш никнейм:
      <input
        className={styles.setting__input}
        type="text"
        placeholder="Никнейм"
        onChange={(e) => setNickname(e.target.value)}
        value={nickname}
        // disabled
      />
      <button
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
