export const TEMP_USER_DATA = "keys";

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
  // Clicker
  getClickerInfo: "me",
  // Daily rewards
  getDailyRewards: "daily-rewards",
  // Upgrades
  upgrades: "upgrades",
};
