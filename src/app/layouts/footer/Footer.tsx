import coinSvg from '/images/resourses/coin.svg';
import diamondSvg from '/images/resourses/diamond.svg';
import personSvg from '/images/Person.svg';
import styles from './Footer.module.scss';
import { footerModel } from './model/footerModel';

export const Footer = () => {
  const data = footerModel();
  return (
    <footer className={styles.footer}>
      <nav className={styles.footer__nav}></nav>
      <span className={styles.footer__center}>
        <span className={styles['footer__center-item']}>
          <img src={coinSvg} alt="coins" /> 0
        </span>
        <span className={styles['footer__center-item']}>
          <img src={diamondSvg} alt="diamonds" /> 0
        </span>
      </span>
      <nav className={styles.footer__nav}>
        <button
          onClick={() => data.openAuthWindow()}
          className={styles['footer__nav-item']}
        >
          <img src={personSvg} alt="person" />
        </button>
      </nav>
    </footer>
  );
};
