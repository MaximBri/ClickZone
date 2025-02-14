import { HashRouter, Route, Routes } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import { MainLayout } from '../layouts/MainLayout';

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routes.base} element={<MainLayout />}></Route>
      </Routes>
    </HashRouter>
  );
};
