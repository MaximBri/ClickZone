import { userDataInterface } from "@/shared/types";

export const findAwardAndSetHasAchievement = (
  state: userDataInterface,
  id: number
) => {
  const award = state.globals.achievements.find((item) => item.id === id);
  if (award) {
    award.has_achievement = true;
  }
};
