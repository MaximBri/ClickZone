export interface miglioramentiInterface {
  name: string;
  description: string;
  cost: number;
  isInfinite: boolean;
  imagePath: string;
}

export const miglioramentiList: miglioramentiInterface[] = [
  {
    name: "Таинственный мешок",
    description: "Мгновенно получаете 500 монет с вероятностью 50%.",
    cost: 20,
    // cost: 280,
    isInfinite: false,
    imagePath: "treasureBag.svg",
  },
  {
    name: "Счастливый день",
    description: "Мгновенно получаете 1000 монет с вероятностью 25%",
    cost: 30,
    // cost: 300,
    isInfinite: false,
    imagePath: "luckyDay.svg",
  },
  {
    name: "Клик удачи",
    description: "Следующий клик имеет 10% шанс принести 50 алмазов.",
    cost: 60,
    // cost: 600,
    isInfinite: false,
    imagePath: "happinesIcon.svg",
  },
  {
    name: "Сундук сокровищ",
    description: "Мгновенно получаете от 300 до 1500 монет",
    cost: 100,
    // cost: 1000,
    isInfinite: false,
    imagePath: "chest.svg",
  },
  {
    name: "Золотая лихорадка",
    description: "Следующие 50 кликов приносят в 2 раза больше монет.",
    cost: 150,
    // cost: 1500,
    isInfinite: false,
    imagePath: "gold.svg",
  },
  {
    name: "Взрывные клики",
    description: "Следующие 5 кликов приносят 10x монет.",
    cost: 50,
    // cost: 500,
    isInfinite: false,
    imagePath: "bombClicks.svg",
  },
  {
    name: "Магический артефакт",
    description:
      "Следующие 30 секунд каждый клик приносит в 3 раза больше монет.",
    cost: 70,
    // cost: 700,
    isInfinite: false,
    imagePath: "magicStick.svg",
  },
  {
    name: "Улучшенный курсор",
    description: "Увеличивает доход с каждого клика на 1 монету.",
    cost: 50,
    // cost: 500,
    isInfinite: true,
    imagePath: "advancedCursor.svg",
  },
  {
    name: "Золотая перчатка",
    description: "Увеличивает доход с каждого клика на 2 монеты.",
    cost: 100,
    // cost: 1000,
    isInfinite: true,
    imagePath: "goldGlove.svg",
  },
  {
    name: "Магический курсор",
    description: "Увеличивает доход с каждого клика на 5 монет.",
    cost: 300,
    // cost: 3000,
    isInfinite: true,
    imagePath: "magicCursor.svg",
  },
  {
    name: "Золотая фигурка",
    description: "Увеличивает доход с каждого клика на 10 монет.",
    cost: 700,
    // cost: 7000,
    isInfinite: true,
    imagePath: "goldFigure.svg",
  },
  {
    name: "Легендарный курсор",
    description: "Увеличивает доход с каждого клика на 20 монет.",
    cost: 1500,
    // cost: 15000,
    isInfinite: true,
    imagePath: "legendCursor.svg",
  },
  {
    name: "Автокликер",
    description: "Добавляет 1 автоматический клик в секунду.",
    cost: 500,
    // cost: 5000,
    isInfinite: true,
    imagePath: "autoClicker.svg",
  },
  {
    name: "Удвоитель дохода",
    description: "Все клики приносят в 2 раза больше монет.",
    cost: 1000,
    // cost: 10000,
    isInfinite: true,
    imagePath: "x2.svg",
  },
  {
    name: "Множитель дохода",
    description: "Все доходы (клики и автоклики) умножаются на 3.",
    cost: 5000,
    // cost: 50000,
    isInfinite: true,
    imagePath: "x3.svg",
  },
];
