import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { memo } from "react";

import { routes } from "@/shared/config/routes";
import { getNickname } from "@/entities/user/model/userSlice";
import styles from "./Header.module.scss";

export const Header = memo(() => {
  const nickname = useSelector(getNickname);
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
