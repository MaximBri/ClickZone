import Cookies from "js-cookie";
import { useEffect } from "react";
import { api, CSRF_TOKEN } from "@/shared/api/base";
import { useAppDispatch } from "@/app/store/store";
import { setIsAuthorized } from "@/entities/user/model/userSlice";
import { setAuthWindow } from "@/widgets/pop-ups/model/popUpsSlice";
import { refreshAccessToten } from "@/entities/user/refreshAccessToken";
import { apiRoutes } from "../config/apiRoutes";


/**
 * Глобальная функция для дублирования запросов в случае, если они пришли с 401 ошибкой (ошибка авторизации, скорее всего была вызвана тем, что JWT access token истёк). Функция отслеживает запросы с 401 ошибками, отправляет запрос на обновление токена, и потом вновь дублирует запрос, который пришёл с 401 ошибкой. Распространяется на все запросы, кроме авторизации и регистрации (там не должно быть проверки access токена)
 */
export const useAuthInterceptor = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const isAuthRequest =
        config.url?.includes(apiRoutes.authorization) ||
        config.url?.includes(apiRoutes.registration);

      if (!isAuthRequest) {
        const token = Cookies.get(CSRF_TOKEN);
        if (token) {
          config.headers["X-CSRF-TOKEN"] = token;
        }
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        const isAuthRequest =
          originalRequest.url?.includes(apiRoutes.authorization) ||
          originalRequest.url?.includes(apiRoutes.registration);
        if (isAuthRequest) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          try {
            originalRequest._retry = true;
            await refreshAccessToten();
            return api(originalRequest);
          } catch (refreshError) {
            dispatch(setIsAuthorized(false));
            dispatch(setAuthWindow(true));
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);
};
