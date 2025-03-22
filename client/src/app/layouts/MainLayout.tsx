import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// import { getUserDataByToken } from "@/entities/user/getUserDataByToken";
// import { refreshAccessToten } from '@/entities/user/refreshAccessToken';
import {
  getIsAuthorized,
  setIsAuthorized,
} from "@/entities/user/model/userSlice";
import { AppPortals } from "./portal/AppPortal";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";
import { routes } from "@/shared/config/routes";
import { useCheckUserAuth } from "@/entities/user/useCheckUserAuth";
import { useAuthInterceptor } from "@/shared/api/useAuthInterceptor";
import styles from "./MainLayout.module.scss";

export const MainLayout = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = useSelector(getIsAuthorized);

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
    // getUserDataByToken();
    // refreshAccessToten()
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
