import { store, useAppDispatch, useAppSelector } from "@/app/store/store";

import { buyMiglioramenti } from "@/entities/user/miglioramenti/thunks/buyMiglioramenti.thunk";
import { getMiglioramenti } from "@/entities/user/model/selectors";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { updateUserFinancesThunk } from "@/entities/user/account/thunks/updateUserFinances.thunk";
import { activateMiglioramentiThunk } from "@/entities/user/miglioramenti/thunks/activateMiglioramentiThunk";
import {
  addCoinsOnClick,
  addOneUpgrade,
  multiplyCoinsOnClick,
  setCoinsPerMinute,
} from "@/entities/user/model/userSlice";
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
        if (improvement.isInfinite) {
          dispatch(activateMiglioramentiThunk(id));
          if (improvement.id === 9) {
            dispatch(addCoinsOnClick(1));
          } else if (improvement.id === 10) {
            dispatch(addCoinsOnClick(2));
          } else if (improvement.id === 11) {
            dispatch(addCoinsOnClick(5));
          } else if (improvement.id === 12) {
            dispatch(addCoinsOnClick(10));
          } else if (improvement.id === 13) {
            dispatch(addCoinsOnClick(20));
          } else if (improvement.id === 14) {
            dispatch(setCoinsPerMinute());
          } else if (improvement.id === 15) {
            dispatch(multiplyCoinsOnClick(2));
          } else if (improvement.id === 16) {
            dispatch(multiplyCoinsOnClick(3));
          }
        }
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
