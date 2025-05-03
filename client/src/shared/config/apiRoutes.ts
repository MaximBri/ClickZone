export const TEMP_USER_DATA = "keys";

/**
 * Глобальный объект с путями к запросам на бэкенде. Создан для удобства и гибкости роутинга в случае, если пути на бэкенде изменятся.
 */
export const apiRoutes = {
  // Auth & Register
  registration: "auth/registration",
  checkAuthorization: "check-auth",
  authorization: "auth/login",
  logout: "auth/logout",
  refreshTokens: "refresh",
  // Profile
  editProfile: "profile/edit_profile",
  getAccountInfo: "profile/me",
  getOtherAccoutInfo: "get_player_info",
  setReward: "achievements",
  // Daily rewards
  getDailyRewards: "daily-rewards/",
  getDailyRewardsStatus: "daily-rewards/status",
  getDailyRewardsClaim: "daily-rewards/claim",
  // Upgrades
  upgrades: "upgrades/",
  // containers
  containers: "containers/",
  activateContainer: "containers/claim",
  // Globals
  updateFinaces: "resource-sync",
  // Miglioramenti
  activateMiglioramenti: "upgrades/activate-upgrade",
  deactivateMigliorament: "upgrades/deactivate-upgrade",
  buyKey: "keys",
  // Leaderboard
  leaderboard: "get-top-players",
};
