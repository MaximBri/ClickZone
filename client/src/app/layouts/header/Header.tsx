import { Link } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to={routes.base}>
        ClickZone
      </Link>
    </header>
  );
};
