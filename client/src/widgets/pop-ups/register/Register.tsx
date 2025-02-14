import { registerModel } from './model/registerModel';
import styles from '../shared/Auth&Register.module.scss';

export const Register = () => {
  const data = registerModel();
  return (
    <>
      <div
        onClick={() => data.closeRegisterWindow()}
        className={styles.window__background}
      ></div>
      <section className={styles.window}>
        <h2 className={styles.window__title}>Регистрация</h2>
        <form className={styles.window__body} action={data.sendForm}>
          <h3
            className={`${styles['window__body-error']} ${
              data.error.item ? styles['window__body-error--active'] : ''
            }`}
          >
            {data.error.item && data.error[data.error.item]}
          </h3>
          <label className={styles['window__body-item']}>
            Ваш логин
            <input
              className={styles['window__body-input']}
              value={data.formData.login}
              onChange={(e) => data.onChangeData('login', e.target.value)}
              type="text"
              placeholder="Логин, не менее 4 символов"
            />
          </label>
          <label className={styles['window__body-item']}>
            Ваш пароль
            <input
              className={styles['window__body-input']}
              value={data.formData.pass}
              onChange={(e) => data.onChangeData('pass', e.target.value)}
              type="password"
              placeholder="Пароль, не менее 4 символов"
            />
          </label>
          <label className={styles['window__body-item']}>
            Повторите пароль
            <input
              className={styles['window__body-input']}
              value={data.formData.repeatPass}
              onChange={(e) => data.onChangeData('repeatPass', e.target.value)}
              type="password"
              placeholder="Повторите пароль"
            />
          </label>
          <button
            className={styles['window__body-button']}
            type="submit"
          >
            Отправить
          </button>
        </form>
        <button
          onClick={() => data.openAuthWindow()}
          className={styles['window__create-acc']}
        >
          Есть аккаунт? <span>Войти</span>
        </button>
      </section>
    </>
  );
};
