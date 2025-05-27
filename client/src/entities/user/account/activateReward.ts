import { AppDispatch } from "@/app/store/store";
import { setHasAchievement } from "./thunks/setHasAchevement.thunk";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";

/**
 * Функция на активацию наград. В случае, если награда активировась успешно, показывает уведомление
 * @param {AppDispatch} dispatch - глобальная функция для управления хранилищем
 * @param {number} id - id награды
 */
export const activateReward = async (dispatch: AppDispatch, id: number) => {
  const response = await dispatch(setHasAchievement(id));
  if (response.meta.requestStatus === "fulfilled") {
    notificationManager(
      dispatch,
      `Вы получили новую награду: ${response.payload.achievement}`,
      "success"
    );
  }
};
