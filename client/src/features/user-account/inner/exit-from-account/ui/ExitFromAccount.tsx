import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/store";

import { authApi } from "@/shared/api/auth";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { routes } from "@/shared/config/routes";
import { resetUserData } from "@/entities/user/model/userSlice";
import styles from "./ExitFromAccount.module.scss";

export const ExitFromAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const exitFromAccount = async () => {
    try {
      await authApi.logout();
      notificationManager(dispatch, "Вы вышли из аккаунта", "success");
      dispatch(resetUserData());
      navigate(routes.base);
    } catch (error) {
      notificationManager(
        dispatch,
        "Выход из аккаунта не был выполнен :(",
        "error"
      );
    }
  };

  return (
    <label className={styles.exit}>
      Выйти из аккаунта
      <button className={styles.exit__button} onClick={() => exitFromAccount()}>
        Выйти
      </button>
    </label>
  );
};
