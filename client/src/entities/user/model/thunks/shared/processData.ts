import { userDataInterface } from "@/shared/types";

/**
 * Функция для установки данных в хранилище. Была вынесена отдельно, т.к. используется для нескольких запросов
 * @param {userDataInterface} state - глобальные данные из хранилища
 * @param {*} payloadData - данные, которые пришли с бэкенда
 */
export const processUserData = (state: userDataInterface, payloadData: any) => {
  state.isAuthorized = true;
  state.flags.clickerData = true;

  state.globals.description = payloadData.about_me;
  state.globals.nickname = payloadData.nickname;
  state.globals.id = payloadData.id;

  state.finances.coins = payloadData.resources.coins;
  state.finances.diamonds = payloadData.resources.diamonds;

  state.coinsOnClick = payloadData.coins_per_click;
  state.coinsPerMinute = payloadData.coins_per_minute;

  state.clicker.upgrades = payloadData.upgrades.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      cost: item.cost_coins,
      isInfinite: item.type === "permanent",
      count: item.quantity,
      imagePath: item.image_path,
    };
  });

  const autoClicker = payloadData.upgrades.find((item: any) => item.id === 14);
  if (autoClicker) {
    state.hasAutoClicker = true;
  }
};
