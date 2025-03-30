import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiList";

export interface userDataForRegister {
  login: string;
  password: string;
}

export interface UpgradeInterface extends miglioramentiInterface {
  count: number;
}

export interface achievementInterface {
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
