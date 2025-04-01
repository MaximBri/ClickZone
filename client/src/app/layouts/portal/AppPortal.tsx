import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { Register } from "@/widgets/pop-ups/register/Register";
import { Portal } from "@/shared/portals/Portal";
import { Auth } from "@/widgets/pop-ups/auth/Auth";
import { getNotifications } from "@/widgets/pop-ups/notifications/model/notificationSlice";
import { NotificationList } from "@/widgets/pop-ups/notifications";
import { ClickerImprovements } from "@/widgets/pop-ups/clicker-improvements";
import { ClickerTutorial } from "@/widgets/pop-ups/clicker-tutorial";
import {
  getAuthWindow,
  getImprovements,
  getRegisterWindow,
  getClickerTutorial,
} from "@/widgets/pop-ups/model/popUpsSlice";
import { RewardsTutorial } from "@/widgets/pop-ups/rewards-tutorial";

export const AppPortals = memo(() => {
  const authWindow = useAppSelector(getAuthWindow);
  const registerWindow = useAppSelector(getRegisterWindow);
  const notifications = useAppSelector(getNotifications);
  const improvements = useAppSelector(getImprovements);
  const clickerTutorial = useAppSelector(getClickerTutorial);
  const rewardsTutorial = useAppSelector(
    (state) => state.windows.tutorials.rewards
  );

  return (
    <Portal>
      {authWindow && <Auth />}
      {registerWindow && <Register />}
      {notifications.length > 0 && <NotificationList />}
      {improvements && <ClickerImprovements />}
      {clickerTutorial && <ClickerTutorial />}
      {rewardsTutorial && <RewardsTutorial />}
    </Portal>
  );
});
