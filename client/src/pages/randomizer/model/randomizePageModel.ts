import { AppDispatch, useAppSelector } from "@/app/store/store";
import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { getIsAuthorized } from "@/entities/user/model/selectors";
import { useEffect } from "react";

/**
 * Функция для управления данными о режиме "Рандомайзер". Если в хранилище нет контейнеров, то они будут запрошены
 * @param {AppDispatch} dispatch - глобальный объект для управления состоянием хранилища
 */
export const randomizePageModel = (dispatch: AppDispatch) => {
  const userAuth = useAppSelector(getIsAuthorized);
  const userContainers = useAppSelector((state) => state.containers.data);
  const userKeys = useAppSelector((state) => state.containers.keys);
  const allContainers = useAppSelector(
    (state) => state.containers.allContainers
  );

  useEffect(() => {
    if (!allContainers.length) {
      dispatch(getContainers());
    }
  }, [allContainers]);

  return { userKeys, userContainers, allContainers, userAuth };
};
