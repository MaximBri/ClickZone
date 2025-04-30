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
  hasAutoClicker: boolean;
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
    countNicknames: null | number;
  };
  flags: {
    clickerData: boolean | null;
    accountData: boolean | null;
  };
  dailyRewards: boolean[];
}

export interface authErrorInterface {
  login?: string;
  pass?: string;
}

export interface notificationDataInterface {
  message: string;
  type: notificationsErrorsTypes;
  id: string;
}

export type notificationsErrorsTypes = "success" | "error" | "warning";

// Containers
export interface ContainerSliceInterface extends ContainerInterface {
  count: number;
}
export interface ContainerInterface {
  id: number;
  name: string;
  imagePath: string;
  price: {
    coins: number;
    diamonds: number;
  };
  rewards: RewardInterface[];
}

export interface RewardInterface {
  coins?: number;
  count?: number;
  imagePath?: string;
  improvement_id?: number;
  diamonds?: number;
  container_id?: number;
}
