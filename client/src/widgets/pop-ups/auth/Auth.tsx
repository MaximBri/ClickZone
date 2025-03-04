import { authModel } from './model/authModel';
import styles from '../shared/Auth&Register.module.scss';

export const Auth = () => {
  const data = authModel();
  return (
    <>
      <div
        ref={data.refs.background}
        onClick={() => data.closeAuthWindow()}
        className={`${styles.window__background} ${
          data.inProcess ? '' : styles['window__background--animated']
        }`}
      ></div>
      <section
        className={`${styles.window} ${
          data.inProcess ? '' : styles['window--animated']
        }`}
        ref={data.refs.body}
      >
        <h2 className={styles.window__title}>Авторизация</h2>
        <form className={styles.window__body} action={data.sendForm}>
          <h3
            className={`${styles['window__body-error']} ${
              data.error.login || data.error.pass
                ? styles['window__body-error--active']
                : ''
            }`}
          >
            {data.error.login || data.error.pass}
          </h3>
          <label className={styles['window__body-item']}>
            Ваш логин
            <input
              className={styles['window__body-input']}
              value={data.form.login}
              onChange={(e) => data.form.setLogin(e.target.value)}
              type="text"
              placeholder="Логин"
            />
          </label>
          <label className={styles['window__body-item']}>
            Ваш пароль
            <input
              className={styles['window__body-input']}
              value={data.form.pass}
              onChange={(e) => data.form.setPass(e.target.value)}
              type="password"
              placeholder="Пароль"
            />
          </label>
          <button
            className={styles['window__body-button']}
            type="submit"
            disabled={!data.canSend}
          >
            {data.isLoaded ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
        <button
          onClick={() => data.openRegisterWindow()}
          className={styles['window__create-acc']}
        >
          Ещё нет аккаунта? <span>Зарегистрируйтесь</span>
        </button>
      </section>
    </>
  );
};
