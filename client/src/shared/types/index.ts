export interface userDataForRegister {
  login: string;
  password: string;
}

export interface userDataInterface {
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
    upgrades: clickerUpgradeInterface[];
  };
}

export interface clickerUpgradeInterface {
  name: string;
  description: string;
  isInfinite: boolean;
}

export interface authErrorInterface {
  login?: string;
  pass?: string;
}
