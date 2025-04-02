import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { UserNickname } from "@/features/user-account/inner/user-nickname";
import { UserDescription } from "@/features/user-account/inner/user-description";
import { UserRegistration } from "@/features/user-account/inner/user-registration-date";
import { ExitFromAccount } from "@/features/user-account/inner/exit-from-account";
import { routes } from "@/shared/config/routes";
import { changeUserData } from "@/entities/user/account/thunks/changeUserData.thunk";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { setDescription, setNickname } from "@/entities/user/model/userSlice";
import {
  getFinances,
  getGlobalsUserData,
  getIsAuthorized,
} from "@/entities/user/model/selectors";
import styles from "./AccountPage.module.scss";
import { UserRewards } from "@/features/user-account/inner/user-rewards";

export const AccountPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getGlobalsUserData);
  const userFinances = useAppSelector(getFinances);
  const canChangeNickname = useAppSelector(
    (state) => state.user.globals.canChangeNickname
  );
  const changeNicknamePrice = useAppSelector(
    (state) => state.user.account.nicknamePrice
  );

  if (isAuthorized === false) {
    navigate(routes.base);
  } else if (isAuthorized === null) {
    // Добавить загрузчик
    return null;
  }

  const sendRequestToChangeAccountData = async (
    nickname: string,
    description: string,
    successMessage: string,
    errorMessage?: string
  ) => {
    try {
      dispatch(
        changeUserData({
          name: nickname,
          about_me: description,
          nickname_price: changeNicknamePrice,
        })
      );
      dispatch(setNickname(nickname));
      dispatch(setDescription(description));
      notificationManager(dispatch, successMessage, "success");
    } catch (error) {
      console.log(error);
      notificationManager(
        dispatch,
        errorMessage || "Во время сохранения никнейма произошла ошибка",
        "error"
      );
    }
  };

  const saveNewUserData = (key: "name" | "description", value: string) => {
    if (key === "description") {
      sendRequestToChangeAccountData(
        userData.nickname,
        value,
        "Описание успешно изменено"
      );
    } else {
      if (
        canChangeNickname ||
        userFinances.coins >= changeNicknamePrice.coins
      ) {
        sendRequestToChangeAccountData(
          value,
          userData.description,
          "Никнейм успешно изменён"
        );
      } else {
        notificationManager(dispatch, "У вас недостаточно ресурсов", "warning");
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
        <UserRewards />
        <ExitFromAccount />
      </div>
      <UserRegistration />
    </section>
  );
};
