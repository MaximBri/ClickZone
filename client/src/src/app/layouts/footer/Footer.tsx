import { memo } from 'react';

import { UserFinanceInfo } from './model/UserFinanceInfo';
import styles from './Footer.module.scss';

export const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <UserFinanceInfo />
    </footer>
  );
});
