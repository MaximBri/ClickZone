import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiList";

export interface userDataForRegister {
  login: string;
  password: string;
}

export interface UpgradeInterface extends miglioramentiInterface {
  count: number;
}

export interface userDataInterface {
  isAuthorized: boolean | null;
  dataIsLoaded: boolean | null;
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
    dateOfRegister: Date | null;
  };
  clicker: {
    upgrades: UpgradeInterface[];
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
