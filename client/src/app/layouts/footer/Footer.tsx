import { UserFinanceInfo } from './model/UserFinanceInfo';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <UserFinanceInfo />
    </footer>
  );
};
