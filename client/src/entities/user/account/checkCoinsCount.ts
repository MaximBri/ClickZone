import { userDataInterface } from "@/shared/types";

export const checkCoinsCount = (state: userDataInterface, coins: number,) => {
  const findAwardAndSetHasAchievement = (id: number) => {
    const award = state.globals.achievements.find((item) => item.id === id);
    if (award) {
      award.has_achievement = true;
    }
  };
  const newbie = 1000;
  const millioner = 1_000_000;
  const billioner = 1_000_000_000;
  if (coins >= newbie) {
    findAwardAndSetHasAchievement(1);
  } else if (coins >= millioner) {
    findAwardAndSetHasAchievement(2);
  } else if (coins >= billioner) {
    findAwardAndSetHasAchievement(3);
  }
};
