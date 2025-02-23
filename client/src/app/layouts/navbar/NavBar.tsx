import { useLocation, useNavigate } from 'react-router-dom';

import { DOMAIN } from '@/shared/config/routes';
import { navBarList } from './model/navBarList';
import personSvg from '/images/Person.svg';
import styles from './NavBar.module.scss';
import { useAppDispatch } from '@/app/store/store';
import { setAuthWindow } from '@/widgets/pop-ups/model/popUpsSlice';

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const openAuthWindow = () => {
    dispatch(setAuthWindow(true));
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.navbar}>
        {navBarList.map((item, index) => {
          return (
            <button
              onClick={() => navigate(item.pageName)}
              className={`${styles.navbar__button} ${
                location.pathname === item.pageName
                  ? styles['navbar__button--active']
                  : ''
              }`}
              key={index}
            >
              <img
                src={`/${DOMAIN}/images/services${item.iconLink}`}
                alt="page"
              />
              <h4 className={styles['navbar__button-title']}>{item.title}</h4>
            </button>
          );
        })}
      </nav>
      <button
        onClick={() => openAuthWindow()}
        className={styles['navbar__button-auth']}
      >
        <img src={personSvg} alt="person" />
        <h4 className={styles['navbar__button-title']}>Войти</h4>
      </button>
    </aside>
  );
};
