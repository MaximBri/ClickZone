import { UserFinanceInfo } from './model/UserFinanceInfo';
import { footerModel } from './model/footerModel';
import personSvg from '/images/Person.svg';
import styles from './Footer.module.scss';

export const Footer = () => {
  const data = footerModel();
  return (
    <footer className={styles.footer}>
      <nav className={styles.footer__nav}></nav>
      <UserFinanceInfo />
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
