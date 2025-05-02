import { AppDispatch } from "@/app/store/store";
import { setHasAchievement } from "./thunks/setHasAchevement.thunk";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";

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
