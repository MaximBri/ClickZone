// import { api } from "@/shared/api/base";
// import { apiRoutes } from "@/shared/config/apiRoutes";
// import { userDataInterface } from "@/shared/types";

// export const useFindAwardAndSetHasAchievement = async (
//   state: userDataInterface,
//   id: number
// ) => {
//   const awardIndex = state.globals.achievements.findIndex((item) => item.id === id);
//   if (awardIndex !== -1) {
//     console.log(state.globals.achievements[awardIndex])
//     state.globals.achievements[awardIndex].has_achievement = true;
//     try {
//       const response = await api.post(apiRoutes.setReward, { id });
//       console.log(response);
//     } catch (error: any) {
//       console.error(error);
//     }
//   } else {
//     console.error("Награда с id = ", id, " не найдена!");
//   }
// };
