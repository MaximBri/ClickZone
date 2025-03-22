import { useState } from "react";

import { ClickerShop } from "@/widgets/clicker-shop";
import { useMediaQuery } from "react-responsive";
import infoSvg from "./icons/info.svg";
import shopSvg from "./icons/shop.svg";
import styles from "./NavBar.module.scss";
import Tippy from "@tippyjs/react";

export const NavBar = () => {
  const [shopIsActive, setShopIsActive] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <nav className={styles.nav}>
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
            className={styles.nav__button}
            onClick={() => setShopIsActive(true)}
          >
            <img
              src={shopSvg}
              alt="shop"
              className={styles["nav__button-icon"]}
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
          <button className={styles.nav__button}>
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
};
