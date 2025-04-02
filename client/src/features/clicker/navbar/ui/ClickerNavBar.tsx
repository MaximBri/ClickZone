import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import Tippy from "@tippyjs/react";

import { ClickerShop } from "@/widgets/clicker-shop";
import { useMediaQuery } from "react-responsive";
import {
  setImprovements,
  setTutorial,
} from "@/widgets/pop-ups/model/popUpsSlice";
import { getIsAuthorized } from "@/entities/user/model/selectors";
import infoSvg from "@/shared/icons/info.svg";
import shopSvg from "./icons/shop.svg";
import lockSvg from "/images/services/lock.svg";
import improvementsSvg from "/images/services/lollipop.svg";
import styles from "./ClickerNavBar.module.scss";

export const ClickerNavBar = memo(() => {
  const dispatch = useAppDispatch();
  const [shopIsActive, setShopIsActive] = useState<boolean>(false);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <nav className={styles.nav}>
        <Tippy
          content={"Магазин улучшений"}
          placement="left"
          animation="scale"
          disabled={isMobile}
          arrow={true}
          duration={150}
          appendTo={document.body}
          interactive={true}
        >
          <button
            className={styles.nav__button}
            disabled={!isAuthorized}
            onClick={() => setShopIsActive(true)}
          >
            {!isAuthorized && (
              <img
                className={styles["nav__button--closed"]}
                src={lockSvg}
                alt="lock"
              ></img>
            )}
            <img
              src={shopSvg}
              alt="shop"
              className={styles["nav__button-icon"]}
            />
          </button>
        </Tippy>
        <Tippy
          content={"Улучшения"}
          placement="left"
          animation="scale"
          disabled={isMobile}
          arrow={true}
          duration={150}
          appendTo={document.body}
          interactive={true}
        >
          <button
            onClick={() => dispatch(setImprovements(true))}
            className={styles.nav__button}
          >
            <img
              className={styles["nav__button-icon"]}
              src={improvementsSvg}
              alt="improvements"
            />
          </button>
        </Tippy>
        <Tippy
          content={"О кликере"}
          placement="left"
          animation="scale"
          disabled={isMobile}
          arrow={true}
          duration={150}
          appendTo={document.body}
          interactive={true}
        >
          <button
            className={styles.nav__button}
            onClick={() =>
              dispatch(setTutorial({ key: "clicker", value: true }))
            }
          >
            <img
              className={styles["nav__button-icon"]}
              src={infoSvg}
              alt="info"
            />
          </button>
        </Tippy>
      </nav>

      <ClickerShop active={shopIsActive} closeSection={setShopIsActive} />
    </>
  );
});
