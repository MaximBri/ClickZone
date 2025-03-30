import { userDataInterface } from "@/shared/types";
import { achievementsImagesPaths } from "../model/achievementsImagesPaths";

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
    if (item.has_achievement) {
      state.globals.achievements.push({
        ...item,
        imagePath: achievementsImagesPaths[index],
      });
    }
  });
};
