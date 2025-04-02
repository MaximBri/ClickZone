import { RootState } from "@/app/store/store";

export const getLevel = (state: RootState) => state.user.level;
export const getFinances = (state: RootState) => state.user.finances;
export const getCoinsOnClick = (state: RootState) => state.user.coinsOnClick;
export const getNickname = (state: RootState) => state.user.globals.nickname;
export const getDescription = (state: RootState) =>
  state.user.globals.description;
export const getGlobalsUserData = (state: RootState) => state.user.globals;
export const userInfoIsLoaded = (state: RootState) =>
  state.user.flags.clickerData;
export const getIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const getMiglioramenti = (state: RootState) =>
  state.user.clicker.upgrades;
export const getUserFlags = (state: RootState) => state.user.flags;
