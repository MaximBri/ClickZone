import { routes } from '@/shared/config/routes';

export interface navBarListInterface {
  iconLink: string;
  title: string;
  pageName: string;
}

export const navBarList: navBarListInterface[] = [
  { iconLink: '/clicker.svg', title: 'Кликер', pageName: routes.base },
  {
    iconLink: '/randomizer.svg',
    title: 'Рандомайзер',
    pageName: routes.pages.randomizer,
  },
  { iconLink: '/shop.svg', title: 'Рынок', pageName: routes.pages.shop },
  {
    iconLink: '/globalMap.svg',
    title: 'Глобальная карта',
    pageName: routes.pages.globalMap,
  },
  {
    iconLink: '/leaderboard.svg',
    title: 'Таблица лидеров',
    pageName: routes.pages.leaderboard,
  },
];
