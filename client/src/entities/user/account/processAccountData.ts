import { userDataInterface } from "@/shared/types";
import { achievementsImagesPaths } from "../model/achievementsImagesPaths";

export const processAccountData = (
  state: userDataInterface,
  payloadData: any
) => {
  console.log(payloadData.nickname);
  const data = payloadData.data;
  state.flags.accountData = true;
  state.globals.description = data.about_me;
  state.globals.canChangeNickname = data.can_change_name;
  state.globals.nickname = data.nickname;
  state.account.nicknamePrice = data.nickname_price;
  state.finances = data.resources;
  state.globals.dateOfRegister = data.timestamp;
  data.achievements.forEach((item: any, index: number) => {
    if (item.has_achievement) {
      state.globals.achievements.push({
        ...item,
        imagePath: achievementsImagesPaths[index],
      });
    }
  });
};
