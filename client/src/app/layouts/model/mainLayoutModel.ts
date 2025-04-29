import { AppDispatch, store, useAppSelector } from "@/app/store/store";
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
  getIsAuthorized,
  getUserFlags,
  userInfoIsLoaded,
} from "@/entities/user/model/selectors";
import { setHasAchievement } from "@/entities/user/account/thunks/setHasAchevement.thunk";

export const mainLayoutModel = (dispatch: AppDispatch) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const loadingFlags = useAppSelector(getUserFlags);
  const isLoadedClickerData = useAppSelector(userInfoIsLoaded);
  const dateOfRegister = useAppSelector(
    (state) => state.user.globals.dateOfRegister
  );
  const userCoins = useAppSelector((state) => state.user.finances.coins);
  const rewards = useAppSelector((state) => state.user.globals.achievements);
  // console.log(rewards);

  useSyncOnUnload();
  useAuthInterceptor();
  useEffect(() => {
    dispatch(fetchClickerData());

    let sync: any;

    if (isAuthorized) {
      dispatch(getDailyRewardsThunk());
      dispatch(getCurrentRewardsDayThunk());
      sync = setInterval(() => {
        const finances = store.getState().user.finances;
        dispatch(updateUserFinancesThunk(finances));
      }, 3000);
    }

    return () => {
      if (sync) {
        clearInterval(sync);
      }
    };
  }, [isAuthorized]);

  useEffect(() => {
    if (dateOfRegister) {
      const registerDate = new Date(dateOfRegister).getTime();
      const currentDate = new Date().getTime();
      const diffDays = (currentDate - registerDate) / (1000 * 60 * 60 * 24);
      if (diffDays >= 30) {
        dispatch(setHasAchievement(4));
      }
    }
  }, [dateOfRegister]);

  useEffect(() => {
    if (isAuthorized) {
      const newbie = 1000;
      const millioner = 1_000_000;
      const billioner = 1_000_000_000;

      const getRewardAndSetHasAchievement = (count: number, id: number) => {
        if (
          userCoins >= count &&
          rewards.find((item) => item.id === id)?.has_achievement === false
        ) {
          dispatch(setHasAchievement(id));
        }
      };

      getRewardAndSetHasAchievement(newbie, 1);
      getRewardAndSetHasAchievement(millioner, 2);
      getRewardAndSetHasAchievement(billioner, 3);
    }
  }, [userCoins, isAuthorized, rewards]);

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
