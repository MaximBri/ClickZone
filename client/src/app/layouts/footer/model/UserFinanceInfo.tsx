import coinSvg from '/images/resourses/coin.svg';
import diamondSvg from '/images/resourses/diamond.svg';
import styles from '../Footer.module.scss';
import { useSelector } from 'react-redux';
import { getFinances } from '@/entities/user/model/userSlice';

export const UserFinanceInfo = () => {
  const finances = useSelector(getFinances);
  return (
    <span className={styles.footer__center}>
      <span className={styles['footer__center-item']}>
        <img src={coinSvg} alt="coins" /> {finances.coins}
      </span>
      <span className={styles['footer__center-item']}>
        <img src={diamondSvg} alt="diamonds" /> {finances.diamonds}
      </span>
    </span>
  );
};
