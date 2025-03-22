import { memo } from 'react';

import { Animal } from '@/features/clicker/animal';
import styles from './HomePage.module.scss';
import { NavBar } from '@/features/clicker/navbar';

export const HomePage = memo(() => {
  return (
    <section className={styles.home}>
      <Animal />
      <NavBar />
    </section>
  );
});
