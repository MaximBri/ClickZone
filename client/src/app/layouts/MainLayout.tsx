import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getUserDataByToken } from '@/entities/user/getUserDataByToken';
// import { refreshAccessToten } from '@/entities/user/refreshAccessToken';
import { AppPortals } from './portal/AppPortal';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import { NavBar } from './navbar/NavBar';
import styles from './MainLayout.module.scss';

export const MainLayout = memo(() => {
  useEffect(() => {
    getUserDataByToken();
    // refreshAccessToten()
  }, []);
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
