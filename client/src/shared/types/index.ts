import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiSlice";

export interface userDataForRegister {
  login: string;
  password: string;
}

export interface UpgradeInterface extends miglioramentiInterface {
  count: number;
}

export interface achievementInterface {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  has_achievement: boolean;
}

export interface userDataInterface {
  isAuthorized: boolean | null;
  level: number;
  coinsPerMinute: number;
  coinsOnClick: number;
  finances: {
    coins: number;
    diamonds: number;
  };
  globals: {
    id: number | null;
    nickname: string;
    description: string;
    dateOfRegister: string | null;
    achievements: achievementInterface[];
    canChangeNickname: boolean;
  };
  clicker: {
    upgrades: UpgradeInterface[];
  };
  account: {
    nicknamePrice: {
      coins: number;
      diamonds: number;
    };
  };
  flags: {
    clickerData: boolean | null;
    accountData: boolean | null;
  };
  dailyRewards: boolean[];
  containers: ContainerInterface[];
}

export interface authErrorInterface {
  login?: string;
  pass?: string;
}

export interface notificationDataInterface {
  message: string;
  type: notificationsErrorsTypes;
}

export type notificationsErrorsTypes = "success" | "error" | "warning";


// Containers

export interface ContainerInterface {
  name: string;
  imagePath: string;
  price: {
    coins: number;
    diamonds: number;
  };
  rewards: RewardTuple[];
}

export type RewardType =
  | { coins: number }
  | { diamonds: number }
  | { improvement_id: number; imagePath: string; count: number }
  | { container_id: number; imagePath: string; count: number };

export type RewardTuple =
  | [RewardType]
  | [RewardType, RewardType]
  | [RewardType, RewardType, RewardType];