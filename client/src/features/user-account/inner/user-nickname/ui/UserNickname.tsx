import { useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";

import { getNickname } from "@/entities/user/model/selectors";
import styles from "./UserNickname.module.scss";

export const UserNickname: FC<{
  onUpdate: (key: "name" | "description", value: string) => void;
}> = ({ onUpdate }) => {
  const userNickname = useSelector(getNickname) || "User";
  const [nickname, setNickname] = useState<string>(userNickname || "User");
  const [saveButtonIsActive, setSaveButtonIsActive] = useState<boolean>(false);
  const maxLength = 64;

  const onNicknameChange = (text: string) => {
    if (text.length > 64) text = text.slice(0, maxLength);
    setNickname(text);
  };

  useEffect(() => {
    userNickname !== nickname
      ? setSaveButtonIsActive(true)
      : setSaveButtonIsActive(false);
  }, [nickname, userNickname]);

  return (
    <label className={styles.setting}>
      Ваш никнейм:
      <input
        className={styles.setting__input}
        type="text"
        placeholder="Никнейм"
        onChange={(e) => onNicknameChange(e.target.value)}
        value={nickname}
        // disabled
      />
      <span
        className={`${styles["setting__input-length"]} ${
          maxLength > nickname.length
            ? ""
            : styles["setting__input-length--red"]
        }`}
      >
        {nickname.length}/{maxLength}
      </span>
      <button
        onClick={() => onUpdate("name", nickname)}
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
