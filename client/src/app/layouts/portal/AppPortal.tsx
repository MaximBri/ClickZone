import { memo } from "react";
import { useSelector } from "react-redux";

import { Register } from "@/widgets/pop-ups/register/Register";
import { Portal } from "@/shared/portals/Portal";
import { Auth } from "@/widgets/pop-ups/auth/Auth";
import { getNotifications } from "@/widgets/pop-ups/notifications/model/notificationSlice";
import { NotificationList } from "@/widgets/pop-ups/notifications";
import {
  getAuthWindow,
  getRegisterWindow,
} from "@/widgets/pop-ups/model/popUpsSlice";

export const AppPortals = memo(() => {
  const authWindow = useSelector(getAuthWindow);
  const registerWindow = useSelector(getRegisterWindow);
  const notifications = useSelector(getNotifications);
  return (
    <Portal>
      {authWindow && <Auth />}
      {registerWindow && <Register />}
      {notifications.length && <NotificationList />}
    </Portal>
  );
});
