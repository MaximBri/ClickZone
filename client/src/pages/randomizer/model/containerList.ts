import { ContainerInterface } from "@/shared/types";

export const containerList: ContainerInterface[] = [
  {
    name: "Простой",
    imagePath: "container-simple.png",
    price: {
      coins: 5,
      diamonds: 2,
      // coins: 500,
      // diamonds: 3,
    },
    rewards: [
      [
        {
          coins: 50,
        },
      ],
      [
        {
          coins: 100,
        },
      ],
      [
        {
          coins: 200,
        },
      ],
      [
        {
          coins: 300,
        },
      ],
      [
        {
          coins: 400,
        },
      ],
      [
        {
          coins: 500,
        },
      ],
      [
        {
          coins: 750,
        },
      ],
      [
        {
          coins: 1000,
        },
      ],
      [
        {
          coins: 1500,
        },
      ],
      [
        {
          coins: 3000,
        },
      ],
      [
        {
          coins: 5000,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "miglioramenti/treasureBag.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "miglioramenti/chest.svg",
          count: 1,
        },
      ],
      [
        {
          imagePath: "miglioramenti/luckyDay.svg",
          improvement_id: 1,
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "miglioramenti/magicStick.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "miglioramenti/bombClicks.svg",
          count: 1,
        },
      ],
      [
        {
          diamonds: 1,
        },
      ],
      [
        {
          diamonds: 3,
        },
      ],
      [
        {
          diamonds: 5,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-simple.png",
          count: 1,
        },
      ],
    ],
  },
  {
    name: "Редкий",
    imagePath: "container-rare.png",
    price: {
      coins: 5,
      diamonds: 2,
      // coins: 1500,
      // diamonds: 10,
    },
    rewards: [
      [
        {
          coins: 200,
        },
      ],
      [
        {
          coins: 400,
        },
      ],
      [
        {
          coins: 600,
        },
      ],
      [
        {
          coins: 800,
        },
      ],
      [
        {
          coins: 1000,
        },
      ],
      [
        {
          coins: 1500,
        },
      ],
      [
        {
          coins: 2000,
        },
      ],
      [
        {
          coins: 5000,
        },
      ],
      [
        {
          coins: 8000,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "treasureBag.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "happinesIcon.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "gold.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "magicStick.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "bombClicks.svg",
          count: 1,
        },
      ],
      [
        {
          diamonds: 3,
        },
      ],
      [
        {
          diamonds: 10,
        },
      ],
      [
        {
          diamonds: 15,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-simple.png",
          count: 1,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-simple.png",
          count: 2,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-rare.png",
          count: 1,
        },
      ],
    ],
  },
  {
    name: "Эпический",
    imagePath: "container-epic.png",
    price: {
      coins: 5,
      diamonds: 2,
      // coins: 5000,
      // diamonds: 30,
    },
    rewards: [
      [
        {
          coins: 500,
        },
      ],
      [
        {
          coins: 750,
        },
      ],
      [
        {
          coins: 1000,
        },
      ],
      [
        {
          coins: 1500,
        },
      ],
      [
        {
          coins: 4000,
        },
      ],
      [
        {
          coins: 6000,
        },
      ],
      [
        {
          coins: 10000,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "bombClicks.svg",
          count: 3,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "happinesIcon.svg",
          count: 4,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "treasureBag.svg",
          count: 5,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "gold.svg",
          count: 3,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "advancedCursor.svg",
          count: 1,
        },
      ],
      [
        {
          diamonds: 10,
        },
      ],
      [
        {
          diamonds: 20,
        },
      ],
      [
        {
          diamonds: 50,
        },
      ],
      [
        {
          diamonds: 80,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-simple.png",
          count: 3,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-simple.png",
          count: 4,
        },
      ],
      [
        {
          container_id: 1,
          count: 2,
          imagePath: "containers/container-rare.png",
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-epic.png",
          count: 1,
        },
      ],
    ],
  },
  {
    name: "Мифический",
    imagePath: "container-mythical.png",
    price: {
      coins: 5,
      diamonds: 2,
      // coins: 20000,
      // diamonds: 150,
    },
    rewards: [
      [
        {
          coins: 1000,
        },
      ],
      [
        {
          coins: 5000,
        },
      ],
      [
        {
          coins: 7500,
        },
      ],
      [
        {
          coins: 10000,
        },
      ],
      [
        {
          coins: 15000,
        },
      ],
      [
        {
          coins: 20000,
        },
      ],
      [
        {
          coins: 30000,
        },
      ],
      [
        {
          coins: 40000,
        },
      ],
      [
        {
          improvement_id: 1,
          count: 10,
          imagePath: "happinesIcon.svg",
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "treasureBag.svg",
          count: 15,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "magicCursor.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "advancedCursor.svg",
          count: 1,
        },
      ],
      [
        {
          diamonds: 30,
        },
      ],
      [
        {
          diamonds: 50,
        },
      ],
      [
        {
          diamonds: 80,
        },
      ],
      [
        {
          diamonds: 150,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-simple.png",
          count: 10,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-rare.png",
          count: 5,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-epic.png",
          count: 3,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-mythical.png",
          count: 1,
        },
      ],
    ],
  },
  {
    name: "Легендарный",
    imagePath: "container-legendary.png",
    price: {
      coins: 5,
      diamonds: 2,
      // coins: 80000,
      // diamonds: 600,
    },
    rewards: [
      [
        {
          coins: 10000,
        },
      ],
      [
        {
          coins: 30000,
        },
      ],
      [
        {
          coins: 50000,
        },
      ],
      [
        {
          coins: 70000,
        },
      ],
      [
        {
          coins: 100000,
        },
      ],
      [
        {
          coins: 150000,
        },
      ],
      [
        {
          coins: 200000,
        },
      ],
      [
        {
          coins: 0,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "autoClicker.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "x2.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "magicCursor.svg",
          count: 1,
        },
      ],
      [
        {
          improvement_id: 1,
          imagePath: "advancedCursor.svg",
          count: 1,
        },
      ],
      [
        {
          diamonds: 100,
        },
      ],
      [
        {
          diamonds: 300,
        },
      ],
      [
        {
          diamonds: 500,
        },
      ],
      [
        {
          diamonds: 600,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-rare.png",
          count: 10,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-epic.png",
          count: 5,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-mythical.png",
          count: 3,
        },
      ],
      [
        {
          container_id: 1,
          imagePath: "containers/container-legendary.png",
          count: 1,
        },
      ],
    ],
  },
];

export const key = {
  name: "Ключ",
  description:
    "Позволяет увеличить шанс выпадения редких предметов из контейнеров",
  price: 10,
  imagePath: "key.svg",
};
