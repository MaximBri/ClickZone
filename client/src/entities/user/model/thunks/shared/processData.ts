import { userDataInterface } from "@/shared/types";

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

  state.clicker.upgrades = payloadData.upgrades;
};
