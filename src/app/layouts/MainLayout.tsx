import { Outlet } from 'react-router-dom';

import { Header } from './header/Header';
import styles from './MainLayout.module.scss';
import { Footer } from './footer/Footer';

export const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
