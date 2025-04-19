import { store, useAppDispatch, useAppSelector } from "@/app/store/store";

import { buyMiglioramenti } from "@/entities/user/miglioramenti/thunks/buyMiglioramenti.thunk";
import { getMiglioramenti } from "@/entities/user/model/selectors";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { addOneUpgrade } from "@/entities/user/model/userSlice";
import { updateUserFinancesThunk } from "@/entities/user/account/thunks/updateUserFinances.thunk";
import {
  getMiglioramentiList,
  miglioramentiInterface,
} from "@/widgets/clicker-shop/model/miglioramentiSlice";

export const miglioramentiModel = (improvement: miglioramentiInterface) => {
  const dispatch = useAppDispatch();
  const userImprovements = useAppSelector(getMiglioramenti);
  const miglioramentiList = useAppSelector(getMiglioramentiList);
  const haveThisMiglioramenti =
    userImprovements.find((item) => item.id === improvement.id) &&
    improvement.isInfinite;

  const buyImprovement = async (id: number) => {
    const improvement = miglioramentiList.find((item) => item.id === id);
    if (!improvement) {
      notificationManager(dispatch, "Ошибка при покупке", "error");
      return;
    }
    const coins = store.getState().user.finances.coins;
    if (coins >= improvement.cost) {
      try {
        const userFinances = store.getState().user.finances;
        await dispatch(updateUserFinancesThunk(userFinances));
        await dispatch(buyMiglioramenti({ id, cost_coins: improvement.cost }));
        dispatch(addOneUpgrade(improvement));
        notificationManager(
          dispatch,
          `Куплено улучшение: ${improvement.name}`,
          "success"
        );
      } catch (error) {
        console.error(error);
        notificationManager(
          dispatch,
          `Произошла ошибка при покупке улучшения`,
          "error"
        );
      }
    }
  };
  return { buyImprovement, haveThisMiglioramenti };
};
