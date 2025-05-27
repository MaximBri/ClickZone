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
import { useAppDispatch } from "@/app/store/store";
import { getIsAuthorized } from "@/entities/user/model/selectors";
import personSvg from "/images/Person.svg";
import lockSvg from "/images/services/lock.svg";
import styles from "./NavBar.module.scss";

/**
 * Функция на отрисовку бокового меню с навигацией между режимами
 * @type {*}
 */
export const NavBar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authorized = useSelector(getIsAuthorized);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  /**
   * Функция, которая срабатывает по нажатию на иконку пользователя. Если игрок авторизован, перенаправляет на страницу личного кабинета, иначе открывает окно с авторизацией
   */
  const userButtonHandle = () => {
    if (authorized) {
      navigate(routes.pages.userPage);
    } else {
      dispatch(setAuthWindow(true));
    }
  };

  /**
   * Функция на то, нужно ли блокировать кнопки в навбаре. Если пользователь не авторизирован, возвращает false, иначе true
   * @param {boolean} needAuth - пользователь авторизован или нет
   * @return {*}  {boolean}
   */
  const checkDisabled = (needAuth: boolean): boolean => {
    return needAuth ? !authorized : false;
  };

/**
 * Функция на навигацию пользователя по режимам. Если режим требует авторизации, то идёт проверка на статус пользователя. Если он авторизирован, то он перенаправляется на требуемую страницу. Если режим не требует авторизации, то пользователь перенаправляется на него без дополнительных проверок.
 * @param {string} link - ссылка на режим, куда будет перенаправлен пользователь
 * @param {boolean} needAuth - должен ли пользователь быть авторизированным
 */
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
                  src={`${DOMAIN}/images/services${item.iconLink}`}
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
