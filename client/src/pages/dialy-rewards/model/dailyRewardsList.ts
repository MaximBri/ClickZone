export interface dailyRewardInterface {
  id: number;
  rewards: {
    coins: number;
    diamonds: number;
    containers: number;
    improvements: string;
  };
}

export const dailyRewardsList = [{}];
