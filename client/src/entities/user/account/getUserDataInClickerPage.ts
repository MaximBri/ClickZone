import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import {
  setCoins,
  setCoinsOnClick,
  setCoinsPerMinute,
  setDataIsLoaded,
  setDescription,
  setDiamonds,
  setId,
  setNickname,
  setUpgrades,
} from "../model/userSlice";

export const getUserDataInClickerPage = async (
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    const response = await api.post(apiRoutes.getClickerInfo, {});
    const data = response.data;
    console.log(data);
    dispatch(setDataIsLoaded(true));
    dispatch(setDescription(data.about_me));
    dispatch(setNickname(data.nickname));
    dispatch(setId(data.id));
    dispatch(setCoins(data.resources.coins));
    dispatch(setDiamonds(data.resources.diamonds));
    dispatch(setCoinsOnClick(data.coins_per_click));
    dispatch(setCoinsPerMinute(data.coins_per_minute));
    dispatch(setUpgrades(data.upgrades));
  } catch (error) {
    dispatch(setDataIsLoaded(false));
    console.error(error);
  }
};
