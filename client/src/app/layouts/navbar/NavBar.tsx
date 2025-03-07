import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";

import { DOMAIN, routes } from "@/shared/config/routes";
import { navBarList } from "./model/navBarList";
import { setAuthWindow } from "@/widgets/pop-ups/model/popUpsSlice";
import { userInfoIsLoaded } from "@/entities/user/model/userSlice";
import { useAppDispatch } from "@/app/store/store";
import personSvg from "/images/Person.svg";
import styles from "./NavBar.module.scss";

export const NavBar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authorized = useSelector(userInfoIsLoaded);

  const userButtonHandle = () => {
    if (authorized) {
      navigate(routes.pages.userPage);
    } else {
      dispatch(setAuthWindow(true));
    }
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.navbar}>
        {navBarList.map((item, index) => {
          return (
            <button
              onClick={() => navigate(item.pageName)}
              className={`${styles.navbar__button} ${
                location.pathname === item.pageName
                  ? styles["navbar__button--active"]
                  : ""
              }`}
              key={index}
            >
              <img
                src={`/${DOMAIN}/images/services${item.iconLink}`}
                alt="page"
              />
              <h4 className={styles["navbar__button-title"]}>{item.title}</h4>
            </button>
          );
        })}
      </nav>
      <button
        onClick={() => userButtonHandle()}
        className={styles["navbar__button-auth"]}
      >
        <img src={personSvg} alt="person" />
        <h4 className={styles["navbar__button-title"]}>
          {authorized ? "Аккаунт" : "Войти"}
        </h4>
      </button>
    </aside>
  );
});
