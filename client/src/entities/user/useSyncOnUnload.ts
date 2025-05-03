import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAppSelector } from "@/app/store/store";
import { getFinances } from "@/entities/user/model/selectors";
import { CSRF_TOKEN } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";

/**
 * Функция для отправки количества монет и алмазов на бэкенд перед закрытием вкладки с игрой. Нужна, чтобы поддерживать актуальность данных пользователя в любой момент
 */
export const useSyncOnUnload = () => {
  const userFinances = useAppSelector(getFinances);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const csrfToken = Cookies.get(CSRF_TOKEN);
      const payload = JSON.stringify({
        finances: userFinances,
        csrf_token: csrfToken,
      });
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(apiRoutes.updateFinaces, blob);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userFinances]);
};
