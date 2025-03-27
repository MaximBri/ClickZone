import { useDispatch } from "react-redux";
import { memo, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

import {
  getIsAuthorized,
  setIsAuthorized,
  userInfoIsLoaded,
} from "@/entities/user/model/userSlice";
import { AppPortals } from "./portal/AppPortal";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";
import { routes } from "@/shared/config/routes";
import { useCheckUserAuth } from "@/entities/user/useCheckUserAuth";
import { useAuthInterceptor } from "@/shared/api/useAuthInterceptor";
import { getUserDataInClickerPage } from "@/entities/user/account/getUserDataInClickerPage";
import styles from "./MainLayout.module.scss";

export const MainLayout = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const isLoadedClickerData = useAppSelector(userInfoIsLoaded);

  const checkAuth = async () => {
    try {
      await useCheckUserAuth();
      dispatch(setIsAuthorized(true));
    } catch (err) {
      console.error("Auth check failed:", err);
      dispatch(setIsAuthorized(false));
    }
  };

  useAuthInterceptor();
  useEffect(() => {
    checkAuth();
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
      getUserDataInClickerPage(dispatch);
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
