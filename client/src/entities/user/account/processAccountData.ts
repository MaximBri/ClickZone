import { userDataInterface } from "@/shared/types";
import { achievementsImagesPaths } from "../model/achievementsImagesPaths";
import { checkCoinsCount } from "./checkCoinsCount";

export const processAccountData = (
  state: userDataInterface,
  payloadData: any
) => {
  state.flags.accountData = true;
  state.globals.description = payloadData.about_me;
  state.globals.canChangeNickname = payloadData.can_change_name;
  state.globals.nickname = payloadData.nickname;
  state.account.nicknamePrice = payloadData.nickname_price;
  state.finances = payloadData.resources;
  state.globals.dateOfRegister = payloadData.timestamp;
  payloadData.achievements.forEach((item: any, index: number) => {
    state.globals.achievements.push({
      ...item,
      description: item.condition,
      id: index + 1,
      imagePath: achievementsImagesPaths[index],
    });
  });
  checkCoinsCount(state, payloadData.resources.coins);
};
