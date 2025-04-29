import { useAppSelector } from "@/app/store/store";
import { FC, useEffect, useState } from "react";

import { getNickname } from "@/entities/user/model/selectors";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./UserNickname.module.scss";

export const UserNickname: FC<{
  onUpdate: (key: "name" | "description", value: string) => void;
}> = ({ onUpdate }) => {
  const userNickname = useAppSelector(getNickname) || "User";
  const [nickname, setNickname] = useState<string>(userNickname || "User");
  const [saveButtonIsActive, setSaveButtonIsActive] = useState<boolean>(false);
  const canChangeNickname = useAppSelector(
    (state) => state.user.globals.canChangeNickname
  );
  const changeNicknamePrice = useAppSelector(
    (state) => state.user.account.nicknamePrice
  );
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
        Сохранить{" "}
        {canChangeNickname ? (
          ""
        ) : (
          <>
            за {changeNicknamePrice.coins} <img src={coinSvg} alt="coin"></img>{" "}
            {changeNicknamePrice.diamonds ? (
              <>
                и {changeNicknamePrice.diamonds}
                <img src={diamondSvg} alt="diamond"></img>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </button>
    </label>
  );
};
