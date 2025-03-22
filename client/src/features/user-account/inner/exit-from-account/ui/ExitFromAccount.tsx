import styles from "./ExitFromAccount.module.scss";

export const ExitFromAccount = () => {
  const exitFromAccount = () => {};

  return (
    <label className={styles.exit}>
      Выйти из аккаунта
      <button className={styles.exit__button} onClick={() => exitFromAccount()}>
        Выйти
      </button>
    </label>
  );
};
