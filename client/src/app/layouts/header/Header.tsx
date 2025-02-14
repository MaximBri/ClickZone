import { Link } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import logo from '/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to={routes.base}>
        <img className={styles['header__link-image']} src={logo} alt="logo"></img>
      </Link>
      <nav></nav>
    </header>
  );
};
