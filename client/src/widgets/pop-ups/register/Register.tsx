import { registerModel } from "./model/registerModel";
import crossSvg from "@/shared/icons/cross.svg";
import styles from "../shared/Auth&Register.module.scss";

export const Register = () => {
  const data = registerModel();
  return (
    <>
      <div
        ref={data.refs.background}
        onClick={() => data.closeRegisterWindow()}
        className={`${styles.window__background}`}
      ></div>
      <section
        ref={data.refs.body}
        className={`${styles.window} ${styles["window--animated"]}`}
      >
        <h2 className={styles.window__title}>Регистрация</h2>
        <button
          onClick={() => data.closeRegisterWindow()}
          className={styles["window__close-button"]}
        >
          <img src={crossSvg} alt="close" />
        </button>
        <form className={styles.window__body} action={data.sendForm}>
          <h3
            className={`${styles["window__body-error"]} ${
              data.error.item ? styles["window__body-error--active"] : ""
            }`}
          >
            {data.error.item && data.error[data.error.item]}
          </h3>

          <label className={styles["window__body-item"]}>
            Ваш логин
            <input
              className={styles["window__body-input"]}
              value={data.formData.login}
              onChange={(e) => data.onChangeData("login", e.target.value)}
              type="text"
              placeholder="Логин, не менее 4 символов"
            />
          </label>
          <label className={styles["window__body-item"]}>
            Ваш пароль
            <input
              className={styles["window__body-input"]}
              value={data.formData.pass}
              onChange={(e) => data.onChangeData("pass", e.target.value)}
              type="password"
              placeholder="Пароль, не менее 4 символов"
            />
          </label>
          <label className={styles["window__body-item"]}>
            Повторите пароль
            <input
              className={styles["window__body-input"]}
              value={data.formData.repeatPass}
              onChange={(e) => data.onChangeData("repeatPass", e.target.value)}
              type="password"
              placeholder="Повторите пароль"
            />
          </label>
          <button className={styles["window__body-button"]} type="submit">
            {data.loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
        <button
          onClick={() => data.openAuthWindow()}
          className={styles["window__create-acc"]}
        >
          Есть аккаунт? <span>Войти</span>
        </button>
      </section>
    </>
  );
};
