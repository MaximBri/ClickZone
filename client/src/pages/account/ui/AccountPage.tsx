import { useNavigate } from "react-router-dom";
import { store, useAppDispatch, useAppSelector } from "@/app/store/store";

import { UserNickname } from "@/features/user-account/user-nickname";
import { UserDescription } from "@/features/user-account/user-description";
import { UserRegistration } from "@/features/user-account/user-registration-date";
import { ExitFromAccount } from "@/features/user-account/exit-from-account";
import { routes } from "@/shared/config/routes";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { UserRewards } from "@/features/user-account/user-rewards";
import { updateUserFinancesThunk } from "@/entities/user/account/thunks/updateUserFinances.thunk";
import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { activateReward } from "@/entities/user/account/activateReward";
import {
  addCountNicknames,
  setCanChangeNickname,
  setDescription,
  setNickname,
  setNicknamePrice,
} from "@/entities/user/model/userSlice";
import {
  getFinances,
  getGlobalsUserData,
  getIsAuthorized,
} from "@/entities/user/model/selectors";
import styles from "./AccountPage.module.scss";

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
    changesNickname: boolean,
    errorMessage?: string
  ) => {
    try {
      const nicknamePrice = store.getState().user.account.nicknamePrice;
      await dispatch(updateUserFinancesThunk(userFinances));
      const response: any = await api.post(apiRoutes.editProfile, {
        name: nickname,
        about_me: description,
        nickname_price: nicknamePrice,
      });
      dispatch(setNickname(nickname));
      dispatch(setDescription(description));
      dispatch(setCanChangeNickname(false));
      dispatch(
        setNicknamePrice({
          coins: response.data.nickname_price.coins,
          diamonds: response.data.nickname_price.diamonds,
        })
      );
      if (changesNickname) {
        const userState = store.getState().user;
        if (userState.account.countNicknames ?? 0 > 2) {
          activateReward(dispatch, 8)
          // dispatch(setHasAchievement(8));
        }
        dispatch(addCountNicknames());
      }
      notificationManager(dispatch, successMessage, "success");
    } catch (error: any) {
      console.log(error);
      if (error.status === 412) {
        notificationManager(dispatch, "Данное имя уже занято", "error");
      } else {
        notificationManager(
          dispatch,
          errorMessage || "Во время сохранения никнейма произошла ошибка",
          "error"
        );
      }
    }
  };

  const saveNewUserData = (key: "name" | "description", value: string) => {
    if (key === "description") {
      sendRequestToChangeAccountData(
        userData.nickname,
        value,
        "Описание успешно изменено",
        false
      );
    } else {
      if (
        canChangeNickname ||
        userFinances.coins >= changeNicknamePrice.coins
      ) {
        sendRequestToChangeAccountData(
          value,
          userData.description,
          "Никнейм успешно изменён",
          true
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
