import { memo } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/store";

import { AppPortals } from "./portal/AppPortal";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";
import { mainLayoutModel } from "./model/mainLayoutModel";
import styles from "./MainLayout.module.scss";

/**
 * Функция, отрисовывающая основной шаблон приложения: шапку, нижнюю часть экрана (футер), боковое меню с навигацией
 * @type {*}
 */
export const MainLayout = memo(() => {
  const dispatch = useAppDispatch();
  const data = mainLayoutModel(dispatch);
  if (data.isLoadedClickerData === null)
    return <h1 className={styles.wrapper__loading}>Загрузка...</h1>;

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
