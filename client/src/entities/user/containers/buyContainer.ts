import { AppDispatch } from "@/app/store/store";
import { addContainer } from "@/pages/randomizer/model/containtersSlice";
import { ContainerInterface } from "@/shared/types";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { setCoins, setDiamonds } from "../model/userSlice";

export const buyContainer = async (
  dispatch: AppDispatch,
  userFinances: {
    coins: number;
    diamonds: number;
  },
  data: ContainerInterface,
  moneys: boolean
) => {
  const sendRequestToBuyContainer = async (
    coins: number,
    diamonds: number,
    message: string
  ) => {
    try {
      const responce = await api.post(apiRoutes.containers, {
        id: data.id,
        price_coins: coins,
        price_diamonds: diamonds,
      });
      console.log(responce);
      dispatch(addContainer(data));
      dispatch(setCoins(responce.data.user_coins));
      dispatch(setDiamonds(responce.data.user_diamonds));
      notificationManager(dispatch, message, "success");
    } catch (error) {
      console.log(error);
      notificationManager(dispatch, `Произошла ошибка :(`, "error");
    }
  };

  if (moneys) {
    if (userFinances.coins >= data.price.coins) {
      sendRequestToBuyContainer(
        data.price.coins,
        0,
        `Вы купили контейнер: ${data.name}. Списано монет: ${data.price.coins}`
      );
    } else {
      notificationManager(dispatch, "У вас недостаточно ресурсов", "warning");
    }
  } else {
    if (userFinances.diamonds >= data.price.diamonds) {
      sendRequestToBuyContainer(
        0,
        data.price.diamonds,
        `Вы купили контейнер: ${data.name}. Списано алмазов: ${data.price.diamonds}`
      );
    } else {
      notificationManager(dispatch, "У вас недостаточно ресурсов", "warning");
    }
  }
};
