import { AppDispatch, useAppSelector } from "@/app/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthInterceptor } from "@/shared/api/useAuthInterceptor";
import { useEffect } from "react";

import { fetchAccountData } from "@/entities/user/account/thunks";
import { fetchClickerData } from "@/entities/user/model/thunks";
import { routes } from "@/shared/config/routes";
import { getCurrentRewardsDayThunk } from "@/entities/user/daily-rewards/thunks/getCurrentDay.thunk";
import { getDailyRewardsThunk } from "@/entities/user/daily-rewards/thunks/getDailyRewards.thunk";
import { updateUserFinancesThunk } from "@/entities/user/account/thunks/updateUserFinances.thunk";
import { useSyncOnUnload } from "@/entities/user/useSyncOnUnload";
import {
  getFinances,
  getIsAuthorized,
  getUserFlags,
  userInfoIsLoaded,
} from "@/entities/user/model/selectors";

export const mainLayoutModel = (dispatch: AppDispatch) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const loadingFlags = useAppSelector(getUserFlags);
  const isLoadedClickerData = useAppSelector(userInfoIsLoaded);
  const userFinances = useAppSelector(getFinances);

  useSyncOnUnload()
  useAuthInterceptor();
  useEffect(() => {
    dispatch(fetchClickerData());
    dispatch(getDailyRewardsThunk());
    dispatch(getCurrentRewardsDayThunk());
    if(isAuthorized){
      setInterval(() => {
        if (isAuthorized) dispatch(updateUserFinancesThunk(userFinances));
      }, 3 * 1000);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized === false) {
      if (
        [
          routes.pages.globalMap,
          routes.pages.shop,
          routes.pages.userPage,
          routes.pages.randomizer,
        ].includes(location.pathname)
      ) {
        navigate(routes.base);
      }
    } else {
      if (
        location.pathname === routes.pages.userPage &&
        !loadingFlags.accountData &&
        isAuthorized
      ) {
        dispatch(fetchAccountData());
      }
    }
  }, [location.pathname, isAuthorized]);

  useEffect(() => {
    if (
      !isLoadedClickerData &&
      isAuthorized &&
      location.pathname === routes.base
    ) {
      dispatch(fetchClickerData());
    }
  }, [isAuthorized, isLoadedClickerData, location.pathname]);
  return { isLoadedClickerData };
};
