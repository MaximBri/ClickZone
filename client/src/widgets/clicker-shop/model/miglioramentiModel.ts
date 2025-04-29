import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getFinances, getIsAuthorized } from "@/entities/user/model/selectors";
import { getMiglioramentiList } from "./miglioramentiSlice";
import { useEffect } from "react";
import { getMiglioramenti } from "@/entities/user/miglioramenti/thunks/getMiglioramenti.thunk";

export const miglioramentiModel = () => {
  const dispatch = useAppDispatch();
  const userCoins = useAppSelector(getFinances);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const miglioramenti = useAppSelector(getMiglioramentiList);

  useEffect(() => {
    if (!miglioramenti.length && isAuthorized) {
      dispatch(getMiglioramenti());
    }
  }, [miglioramenti, isAuthorized]);

  return { userCoins, isAuthorized, miglioramenti };
};
