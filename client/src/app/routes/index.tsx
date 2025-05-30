import { HashRouter, Route, Routes } from "react-router-dom";

import { routes } from "@/shared/config/routes";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "@/pages/home";
import { RandomizePage } from "@/pages/randomizer";
import { LeaderBoardPage } from "@/pages/leaderbord";
import { AccountPage } from "@/pages/account";
import { DailyRewardsPage } from "@/pages/dialy-rewards";
import { ContainerPage } from "@/pages/container";
import { UserPage } from "@/pages/user";

/**
 * Функция роутинга для приложения. Содержит все страницы приложения: их ссылки и элементы, которые будут отрисовываться при переходе на соответствующую ссылку
 */
export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routes.base} element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path={routes.pages.userPage} element={<AccountPage />}></Route>
          <Route
            path={routes.pages.randomizer}
            element={<RandomizePage />}
          ></Route>
          <Route
            path={`${routes.pages.randomizer}/:type`}
            element={<ContainerPage />}
          />
          <Route
            path={routes.pages.leaderboard}
            element={<LeaderBoardPage />}
          ></Route>
          <Route
            path={routes.pages.dailyRewards}
            element={<DailyRewardsPage />}
          ></Route>
          <Route path={routes.pages.user} element={<UserPage />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
