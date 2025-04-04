import { userDataInterface } from "@/shared/types";

export const processUserData = (state: userDataInterface, payloadData: any) => {
  state.isAuthorized = true;
  state.flags.clickerData = true;
  console.log(payloadData);

  state.globals.description = payloadData.about_me;
  state.globals.nickname = payloadData.nickname;
  state.globals.id = payloadData.id;

  state.finances.coins = payloadData.resources.coins;
  state.finances.diamonds = payloadData.resources.diamonds;

  state.coinsOnClick = payloadData.coins_per_click;
  state.coinsPerMinute = payloadData.coins_per_minute;

  const upgrades = payloadData.upgrades.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      cost: item.cost_coins,
      isInfinite: item.type === 'permanent',
      count: item.quantity,
      imagePath: item.image_path,
    };
  });
  console.log(payloadData.upgrades);
  console.log(payloadData.improvements);
  console.log(upgrades);
  state.clicker.upgrades = upgrades;
};
