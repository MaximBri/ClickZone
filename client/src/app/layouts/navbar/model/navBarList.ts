import { routes } from "@/shared/config/routes";

export interface navBarListInterface {
  iconLink: string;
  title: string;
  pageName: string;
  needAuth: boolean;
}

export const navBarList: navBarListInterface[] = [
  {
    iconLink: "/clicker.svg",
    title: "Кликер",
    pageName: routes.base,
    needAuth: false,
  },
  {
    iconLink: "/randomizer.svg",
    title: "Рандомайзер",
    pageName: routes.pages.randomizer,
    needAuth: true,
  },
  // {
  //   iconLink: "/shop.svg",
  //   title: "Рынок",
  //   pageName: routes.pages.shop,
  //   needAuth: true,
  // },
  // {
  //   iconLink: "/globalMap.svg",
  //   title: "Глобальная карта",
  //   pageName: routes.pages.globalMap,
  //   needAuth: true,
  // },
  {
    iconLink: "/leaderboard.svg",
    title: "Таблица лидеров",
    pageName: routes.pages.leaderboard,
    needAuth: false,
  },
];
