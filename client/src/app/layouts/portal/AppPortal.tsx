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
  getTutorial,
} from "@/widgets/pop-ups/model/popUpsSlice";

export const AppPortals = memo(() => {
  const authWindow = useAppSelector(getAuthWindow);
  const registerWindow = useAppSelector(getRegisterWindow);
  const notifications = useAppSelector(getNotifications);
  const improvements = useAppSelector(getImprovements);
  const tutorial = useAppSelector(getTutorial);

  return (
    <Portal>
      {authWindow && <Auth />}
      {registerWindow && <Register />}
      {notifications.length > 0 && <NotificationList />}
      {improvements && <ClickerImprovements />}
      {tutorial && <ClickerTutorial />}
    </Portal>
  );
});
