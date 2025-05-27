export const DOMAIN = import.meta.env.MODE === "production" ? "" : "/ClickZone";

export const routes = {
  base: "/",
  pages: {
    randomizer: "/randomizer",
    shop: "/shop",
    globalMap: "/globalMap",
    leaderboard: "/leaderboard",
    userPage: "/account",
    dailyRewards: "/dailyRewards",
    user: "/user/:id",
  },
};
