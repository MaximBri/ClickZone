import { memo } from 'react';

import { Animal } from '@/features/animal';
import styles from './HomePage.module.scss';

export const HomePage = memo(() => {
  return (
    <section className={styles.home}>
      <Animal />
    </section>
  );
});
