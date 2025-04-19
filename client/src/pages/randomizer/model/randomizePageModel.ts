import { AppDispatch, useAppSelector } from "@/app/store/store";
import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { useEffect } from "react";

export const randomizePageModel = (dispatch: AppDispatch) => {
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

  return { userKeys, userContainers, allContainers };
};
