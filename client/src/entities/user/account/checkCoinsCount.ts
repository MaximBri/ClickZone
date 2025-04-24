import { userDataInterface } from "@/shared/types";
import { findAwardAndSetHasAchievement } from "./findAwardAndSetHasAchievement";

export const checkCoinsCount = (state: userDataInterface, coins: number) => {
  const newbie = 1000;
  const millioner = 1_000_000;
  const billioner = 1_000_000_000;
  if (coins >= billioner) {
    findAwardAndSetHasAchievement(state, 3);
  }
  if (coins >= millioner) {
    findAwardAndSetHasAchievement(state, 2);
  }
  if (coins >= newbie) {
    findAwardAndSetHasAchievement(state, 1);
  }
};
