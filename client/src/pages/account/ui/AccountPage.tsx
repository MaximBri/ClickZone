import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/store";
import { useDispatch } from "react-redux";

import { UserNickname } from "@/features/user-account/inner/user-nickname";
import { UserDescription } from "@/features/user-account/inner/user-description";
import { UserRegistration } from "@/features/user-account/inner/user-registration-date";
import { ExitFromAccount } from "@/features/user-account/inner/exit-from-account";
import {
  getGlobalsUserData,
  getIsAuthorized,
  setDescription,
  setNickname,
} from "@/entities/user/model/userSlice";
import { routes } from "@/shared/config/routes";
import { changeUserData } from "@/entities/user/account/changeUserData";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import styles from "./AccountPage.module.scss";

export const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getGlobalsUserData);
  if (isAuthorized === false) {
    navigate(routes.base);
  } else if (isAuthorized === null) {
    // Добавить загрузчик
    return null;
  }

  const saveNewUserData = (key: "name" | "description", value: string) => {
    if (key === "description") {
      try {
        changeUserData(userData.nickname, value);
        notificationManager(dispatch, "Описание успешно изменено", "success");
        dispatch(setDescription(value));
      } catch (error) {
        notificationManager(
          dispatch,
          "Во время сохранения описания произошла ошибка",
          "error"
        );
      }
    } else {
      try {
        changeUserData(value, userData.description);
        notificationManager(dispatch, "Никнейм успешно изменён", "success");
        dispatch(setNickname(value));
      } catch (error) {
        notificationManager(
          dispatch,
          "Во время сохранения никнейма произошла ошибка",
          "error"
        );
      }
    }
  };

  return (
    <section className={styles.account}>
      <div className={styles.account__wrapper}>
        <h2 className={styles.account__title}>Личный кабинет</h2>
        <div className={styles.account__main}>
          <UserNickname onUpdate={saveNewUserData} />
          <UserDescription onUpdate={saveNewUserData} />
        </div>
        <ExitFromAccount />
      </div>
      <UserRegistration />
    </section>
  );
};
