import { memo, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useAuthInterceptor } from "@/shared/api/useAuthInterceptor";

import { AppPortals } from "./portal/AppPortal";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";
import { routes } from "@/shared/config/routes";
import { fetchClickerData } from "@/entities/user/model/thunks";
import {
  getIsAuthorized,
  userInfoIsLoaded,
} from "@/entities/user/model/selectors";
import styles from "./MainLayout.module.scss";

export const MainLayout = memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const isLoadedClickerData = useAppSelector(userInfoIsLoaded);

  useAuthInterceptor();
  useEffect(() => {
    dispatch(fetchClickerData());
  }, []);

  useEffect(() => {
    if (isAuthorized === false) {
      if (
        [
          routes.pages.globalMap,
          routes.pages.shop,
          routes.pages.userPage,
        ].includes(location.pathname)
      ) {
        navigate(routes.base);
      }
    }
  }, [location.pathname, isAuthorized]);

  useEffect(() => {
    if (
      !isLoadedClickerData &&
      isAuthorized &&
      location.pathname === routes.base
    ) {
      dispatch(fetchClickerData());
    }
  }, [isAuthorized, isLoadedClickerData, location.pathname]);

  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <NavBar />
          <Outlet />
        </main>
        <Footer />
      </div>
      <AppPortals />
    </>
  );
});
