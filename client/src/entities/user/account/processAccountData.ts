import { userDataInterface } from "@/shared/types";
import { achievementsImagesPaths } from "../model/achievementsImagesPaths";

// !!!!
const checkRegisterDate = (state: userDataInterface, text: string) => {
  const registerDate = new Date(text).getTime();
  const currentDate = new Date().getTime();
  const diffDays = (currentDate - registerDate) / (1000 * 60 * 60 * 24);
  if (diffDays >= 30) {
    // !!!!
    // useFindAwardAndSetHasAchievement(state, 4);
  }
};

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
  state.account.countNicknames = payloadData.changes_number;
  payloadData.achievements.forEach((item: any, index: number) => {
    state.globals.achievements.push({
      ...item,
      description: item.condition,
      id: index + 1,
      imagePath: achievementsImagesPaths[index],
    });
  });

  if (state.globals.id ?? 11 <= 9) {
    // !!!!
    // useFindAwardAndSetHasAchievement(state, 11);
  }
  // !!!!
  // checkCoinsCount(state, payloadData.resources.coins);
  checkRegisterDate(state, payloadData.timestamp);
};
