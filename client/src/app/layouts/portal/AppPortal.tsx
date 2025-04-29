import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { Register } from "@/widgets/pop-ups/register/Register";
import { Portal } from "@/shared/portals/Portal";
import { Auth } from "@/widgets/pop-ups/auth/Auth";
import { getNotifications } from "@/widgets/pop-ups/notifications/model/notificationSlice";
import { NotificationList } from "@/widgets/pop-ups/notifications";
import { ClickerImprovements } from "@/widgets/pop-ups/clicker-improvements";
import { Tutorial } from "@/widgets/pop-ups/tutorial";
import { DailyReward } from "@/widgets/pop-ups/daily-reward";
import { clickerTutorialText } from "@/widgets/pop-ups/tutorial/model/clickerTutorialText";
import { rewardsTutorialText } from "@/widgets/pop-ups/tutorial/model/rewardsTutorialText";
import { randomizerTutorialText } from "@/widgets/pop-ups/tutorial/model/randomizerTutorialText";
import { MiglioramentiClick } from "@/widgets/pop-ups/miglioramenti-click";
import {
  getAuthWindow,
  getImprovements,
  getRegisterWindow,
  getClickerTutorial,
} from "@/widgets/pop-ups/model/popUpsSlice";
import { ContainerActivate } from "@/widgets/pop-ups/container-activate";

export const AppPortals = memo(() => {
  const authWindow = useAppSelector(getAuthWindow);
  const registerWindow = useAppSelector(getRegisterWindow);
  const notifications = useAppSelector(getNotifications);
  const improvements = useAppSelector(getImprovements);
  const clickerTutorial = useAppSelector(getClickerTutorial);
  const containerActivate = useAppSelector(
    (state) => state.containers.activeContainer
  );
  const MiglioramentiClickPopUp = useAppSelector(
    (state) => state.windows.miglioramentiClick
  );
  const rewardsTutorial = useAppSelector(
    (state) => state.windows.tutorials.rewards
  );
  const randomizerTutorial = useAppSelector(
    (state) => state.windows.tutorials.randomizer
  );
  const dailyReward = useAppSelector(
    (state) => state.dialyRewards.canGetReward
  );

  return (
    <Portal>
      {authWindow && <Auth />}
      {registerWindow && <Register />}
      {notifications.length > 0 && <NotificationList />}
      {improvements && <ClickerImprovements />}
      {dailyReward && <DailyReward />}
      {MiglioramentiClickPopUp !== null && <MiglioramentiClick />}
      {containerActivate && <ContainerActivate />}
      {clickerTutorial && (
        <Tutorial
          data={{
            title: "Обучение",
            tutorialName: "clicker",
            text: clickerTutorialText,
          }}
        />
      )}
      {rewardsTutorial && (
        <Tutorial
          data={{
            title: "О наградах:",
            tutorialName: "rewards",
            text: rewardsTutorialText,
          }}
        />
      )}
      {randomizerTutorial && (
        <Tutorial
          data={{
            title: "О контейнерах:",
            tutorialName: "randomizer",
            text: randomizerTutorialText,
          }}
        />
      )}
    </Portal>
  );
});
