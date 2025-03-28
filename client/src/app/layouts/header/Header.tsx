import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/store/store";
import { memo } from "react";

import { routes } from "@/shared/config/routes";
import { getNickname } from "@/entities/user/model/selectors";
import styles from "./Header.module.scss";

export const Header = memo(() => {
  const nickname = useAppSelector(getNickname);
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to={routes.base}>
        ClickZone
      </Link>
      {nickname && (
        <Link className={styles.header__nickname} to={routes.pages.userPage}>
          {nickname}
        </Link>
      )}
    </header>
  );
});
