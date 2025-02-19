import { HashRouter, Route, Routes } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '@/pages/home';

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routes.base} element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
