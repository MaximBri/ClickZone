import { store, useAppDispatch, useAppSelector } from "@/app/store/store";
import {
  addOneUpgrade,
  getMiglioramenti,
  setCoins,
} from "@/entities/user/model/userSlice";
import {
  miglioramentiInterface,
  miglioramentiList,
} from "@/widgets/clicker-shop/model/miglioramentiList";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";

export const miglioramentiModel = (improvement: miglioramentiInterface) => {
  const dispatch = useAppDispatch();
  const userImprovements = useAppSelector(getMiglioramenti);
  const haveThisMiglioramenti =
    userImprovements.find((item) => item.id === improvement.id) &&
    improvement.isInfinite;

  const buyImprovement = (id: number) => {
    const improvement = miglioramentiList.find((item) => item.id === id);
    if (!improvement) {
      notificationManager(dispatch, "Ошибка при покупке", "error");
      return;
    }
    const coins = store.getState().user.finances.coins;
    if (coins >= improvement.cost) {
      dispatch(setCoins(coins - improvement.cost));
      dispatch(addOneUpgrade(improvement));
      notificationManager(
        dispatch,
        `Куплено улучшение: ${improvement.name}`,
        "success"
      );
    }
  };
  return { buyImprovement, haveThisMiglioramenti };
};
