import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserNickname } from "@/features/user-account/inner/user-nickname";
import { UserDescription } from "@/features/user-account/inner/user-description";
import { UserRegistration } from "@/features/user-account/inner/user-registration-date";
import { ExitFromAccount } from "@/features/user-account/inner/exit-from-account";
import { userInfoIsLoaded } from "@/entities/user/model/userSlice";
import { routes } from "@/shared/config/routes";
import styles from "./AccountPage.module.scss";

export const AccountPage = () => {
  const navigate = useNavigate();
  const isAuthorized = useSelector(userInfoIsLoaded);
  if (isAuthorized === false) {
    navigate(routes.base);
  } else if (isAuthorized === null) {
    return null;
  }
  return (
    <section className={styles.account}>
      <h2 className={styles.account__title}>Личный кабинет</h2>
      <UserNickname />
      <UserDescription />
      <ExitFromAccount />
      <UserRegistration />
    </section>
  );
};
