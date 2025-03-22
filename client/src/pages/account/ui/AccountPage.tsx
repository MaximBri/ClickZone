import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/store";

import { UserNickname } from "@/features/user-account/inner/user-nickname";
import { UserDescription } from "@/features/user-account/inner/user-description";
import { UserRegistration } from "@/features/user-account/inner/user-registration-date";
import { ExitFromAccount } from "@/features/user-account/inner/exit-from-account";
import {
  getGlobalsUserData,
  getIsAuthorized,
} from "@/entities/user/model/userSlice";
import { routes } from "@/shared/config/routes";
import styles from "./AccountPage.module.scss";
import { changeUserData } from "@/entities/user/account/changeUserData";

export const AccountPage = () => {
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
      changeUserData(userData.nickname, value);
    } else {
      changeUserData(value, userData.description);
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
