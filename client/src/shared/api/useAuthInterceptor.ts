import Cookies from "js-cookie";
import { useEffect } from "react";
import { api, CSRF_TOKEN } from "@/shared/api/base";
import { useAppDispatch } from "@/app/store/store";
import { setIsAuthorized } from "@/entities/user/model/userSlice";
import { setAuthWindow } from "@/widgets/pop-ups/model/popUpsSlice";
import { refreshAccessToten } from "@/entities/user/refreshAccessToken";

export const useAuthInterceptor = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = Cookies.get(CSRF_TOKEN);
      if (token) {
        config.headers["X-CSRF-TOKEN"] = token;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
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
