import { Animal } from '@/features/animal';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.home}>
      <Animal />
    </section>
  );
};
