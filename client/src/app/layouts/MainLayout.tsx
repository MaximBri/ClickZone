import { useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { getUserDataByToken } from "@/entities/user/getUserDataByToken";
// import { refreshAccessToten } from '@/entities/user/refreshAccessToken';
import { getIsAuthorized } from "@/entities/user/model/userSlice";
import { AppPortals } from "./portal/AppPortal";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";
import { routes } from "@/shared/config/routes";
import { useCheckUserAuth } from "@/entities/user/useCheckUserAuth";
import { useAuthInterceptor } from "@/shared/api/useAuthInterceptor";
import styles from "./MainLayout.module.scss";

export const MainLayout = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = useSelector(getIsAuthorized);
  useAuthInterceptor();
  useEffect(() => {
    useCheckUserAuth();
    getUserDataByToken();
    // refreshAccessToten()
  }, []);

  useEffect(() => {
    console.log(location.pathname);
    if (!isAuthorized) {
      // if (isAuthorized === false) {
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
