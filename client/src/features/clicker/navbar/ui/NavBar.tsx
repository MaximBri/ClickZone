import { useState } from 'react';

import { ClickerShop } from '@/widgets/clicker-shop';
import infoSvg from './icons/info.svg';
import shopSvg from './icons/shop.svg';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  const [shopIsActive, setShopIsActive] = useState<boolean>(false);
  return (
    <>
      <nav className={styles.nav}>
        <button
          className={styles.nav__button}
          onClick={() => setShopIsActive(true)}
        >
          <img
            src={shopSvg}
            alt="shop"
            className={styles['nav__button-icon']}
          />
        </button>
        <button className={styles.nav__button}>
          <img
            className={styles['nav__button-icon']}
            src={infoSvg}
            alt="info"
          />
        </button>
      </nav>

      <ClickerShop active={shopIsActive} closeSection={setShopIsActive} />
    </>
  );
};
