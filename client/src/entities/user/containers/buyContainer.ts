import { AppDispatch } from "@/app/store/store";
import { addContainer } from "@/pages/randomizer/model/containtersSlice";
import { ContainerInterface } from "@/shared/types";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";

export const buyContainer = (
  dispatch: AppDispatch,
  userFinances: {
    coins: number;
    diamonds: number;
  },
  data: ContainerInterface,
  moneys: boolean
) => {
  if (moneys) {
    if (userFinances.coins >= data.price.coins) {
      dispatch(addContainer(data));
      notificationManager(
        dispatch,
        `Вы купили контейнер: ${data.name}. Списано монет: ${data.price.coins}`,
        "success"
      );
    } else {
      notificationManager(dispatch, "У вас недостаточно ресурсов", "warning");
    }
  } else {
    if (userFinances.coins >= data.price.diamonds) {
      dispatch(addContainer(data));
      notificationManager(
        dispatch,
        `Вы купили контейнер: ${data.name}. Списано алмазов: ${data.price.diamonds}`,
        "success"
      );
    } else {
      notificationManager(dispatch, "У вас недостаточно ресурсов", "warning");
    }
  }
};
