import { FC } from 'react';
import styles from './ClickerShop.module.scss';

export const ClickerShop: FC<{
  active: boolean;
  closeSection: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ active, closeSection }) => {
  return (
    <>
      <div className={`${styles.shop} ${active ? styles['shop--active'] : ''}`}>
        <div className={`${styles.shop__wrapper} ${!active ? styles['shop__wrapper--closed'] : styles['shop__wrapper--open']}`}>
          <h2 className={styles.shop__title}>Улучшения для кликера</h2>
        </div>
      </div>
      {active && (
        <div
          className={styles.shop__background}
          onClick={() => closeSection(false)}
        ></div>
      )}
    </>
  );
};
