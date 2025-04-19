import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getFinances, getIsAuthorized } from "@/entities/user/model/selectors";
import {
  getMiglioramentiList,
  miglioramentiInterface,
  setMiglioramentiList,
} from "./miglioramentiSlice";
import { useEffect } from "react";
import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";

export const miglioramentiModel = () => {
  const dispatch = useAppDispatch();
  const userCoins = useAppSelector(getFinances);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const miglioramenti = useAppSelector(getMiglioramentiList);

  const getMiglioramentiFromApi = async () => {
    const response = await api.get(apiRoutes.upgrades);
    let result: miglioramentiInterface[] = response.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        imagePath: item.image_path,
        cost: item.cost_coins,
        isInfinite: item.upgrade_type === "permanent" ? true : false,
      };
    });
    dispatch(setMiglioramentiList(result));
  };

  useEffect(() => {
    if (!miglioramenti.length && isAuthorized) {
      getMiglioramentiFromApi();
    }
  }, [miglioramenti]);

  return { userCoins, isAuthorized, miglioramenti };
};
