import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/store";

import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { routes } from "@/shared/config/routes";
import { logoutUser } from "@/entities/user/model/thunks";
import styles from "./ExitFromAccount.module.scss";

export const ExitFromAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const exitFromAccount = async () => {
    try {
      dispatch(logoutUser());
      notificationManager(dispatch, "Вы вышли из аккаунта", "success");
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
    <div className={styles.exit}>
      Выйти из аккаунта
      <button className={styles.exit__button} onClick={() => exitFromAccount()}>
        Выйти
      </button>
    </div>
  );
};
