import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import { DOMAIN, routes } from "@/shared/config/routes";
import { navBarList } from "./model/navBarList";
import { setAuthWindow } from "@/widgets/pop-ups/model/popUpsSlice";
import { userInfoIsLoaded } from "@/entities/user/model/userSlice";
import { useAppDispatch } from "@/app/store/store";
import personSvg from "/images/Person.svg";
import lockSvg from "/images/services/lock.svg";
import styles from "./NavBar.module.scss";

export const NavBar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authorized = useSelector(userInfoIsLoaded);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const userButtonHandle = () => {
    if (authorized) {
      navigate(routes.pages.userPage);
    } else {
      dispatch(setAuthWindow(true));
    }
  };

  const checkDisabled = (needAuth: boolean): boolean => {
    return needAuth ? !authorized : false;
  };

  const buttonHandle = (link: string, needAuth: boolean) => {
    if (needAuth) {
      if (authorized) {
        navigate(link);
      }
    } else {
      navigate(link);
    }
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.navbar}>
        {navBarList.map((item, index) => {
          return (
            <Tippy
              key={index}
              content={item.title}
              placement="right"
              animation="scale"
              disabled={isMobile}
              arrow={true}
              duration={150}
              appendTo={document.body}
              interactive={true}
            >
              <button
                onClick={() => buttonHandle(item.pageName, item.needAuth)}
                className={`${styles.navbar__button} ${
                  location.pathname === item.pageName
                    ? styles["navbar__button--active"]
                    : ""
                }`}
                key={index}
                disabled={checkDisabled(item.needAuth)}
              >
                <img
                  className={styles["navbar__button-icon"]}
                  src={`/${DOMAIN}/images/services${item.iconLink}`}
                  alt="page"
                />
                {checkDisabled(item.needAuth) && (
                  <img
                    className={styles["navbar__button--disabled"]}
                    src={lockSvg}
                    alt="lock"
                  ></img>
                )}
              </button>
            </Tippy>
          );
        })}
      </nav>
      <Tippy
        content={authorized ? "Аккаунт" : "Войти"}
        placement="right"
        animation="scale"
        arrow={true}
        duration={150}
        disabled={isMobile}
        appendTo={document.body}
        interactive={true}
      >
        <button
          onClick={() => userButtonHandle()}
          className={styles["navbar__button-auth"]}
        >
          <img src={personSvg} alt="person" />
        </button>
      </Tippy>
    </aside>
  );
});
