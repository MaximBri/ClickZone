import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import windows from "@/widgets/pop-ups/model/popUpsSlice";
import user from "@/entities/user/model/userSlice";
import notifications from "@/widgets/pop-ups/notifications/model/notificationSlice";
import dialyRewards from "@/pages/dialy-rewards/model/dailyRewardsSlice";
import miglioramenti from "@/widgets/clicker-shop/model/miglioramentiSlice";
import containers from "@/pages/randomizer/model/containtersSlice";

export const store = configureStore({
  reducer: {
    windows,
    user,
    notifications,
    dialyRewards,
    miglioramenti,
    containers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
