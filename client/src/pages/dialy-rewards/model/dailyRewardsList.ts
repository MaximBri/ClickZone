export interface dailyRewardInterface {
  id: number;
  rewards: {
    coins?: number;
    diamonds?: number;
    custom?: string;
  };
}

export const dailyRewardsList: dailyRewardInterface[] = [
  { id: 1, rewards: { coins: 50 } },
  { id: 2, rewards: { diamonds: 1 } },
  { id: 3, rewards: { coins: 100 } },
  { id: 4, rewards: { diamonds: 5 } },
  { id: 5, rewards: { custom: "/miglioramenti/chest.svg" } },
  { id: 6, rewards: { coins: 200 } },
  { id: 7, rewards: { custom: "/miglioramenti/gold.svg" } },
  { id: 8, rewards: { diamonds: 10 } },
  { id: 9, rewards: { custom: "/miglioramenti/bombClicks.svg" } },
  { id: 10, rewards: { custom: "/containers/container.png" } },
  { id: 11, rewards: { custom: "/miglioramenti/happinesIcon.svg" } },
  { id: 12, rewards: { coins: 500 } },
  { id: 13, rewards: { custom: "/containers/containers.png" } },
  { id: 14, rewards: { diamonds: 20 } },
];
