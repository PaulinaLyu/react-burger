export const RouterPaths = {
  MAIN: "/",
  LOGIN: "/login",
  REGISTRATION: "/register",
  PROFILE: "/profile",
  PROFILE_ORDERS: "orders",
  PROFILE_ORDER: "orders/:id",
  PROFILE_LOGOUT: "logout",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  INGREDIENTS: "/ingredients/:id",
  FEED: "/feed",
  FEED_ORDER: ":id",

  NOTFOUND: "*",
  ERROR: "/error",
} as const;
