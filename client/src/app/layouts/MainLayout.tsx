import { Outlet } from 'react-router-dom';

import { AppPortals } from './portal/AppPortal';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <Outlet />
        <Footer />
      </div>
      <AppPortals />
    </>
  );
};
