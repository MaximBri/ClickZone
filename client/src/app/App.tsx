import { Provider } from 'react-redux';
import { AppRoutes } from './routes';
import { store } from './store/store';

/**
 * Функция, отрисовывающая приложение. Подключает хранилище и роутинг приложения
 */
function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
