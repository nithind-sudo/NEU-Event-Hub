export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const ACTIONS = {
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  PENDING: "pending",
  GET_USER : "getUser",
  SET_VIEW_EVENT : "setEvent",
  DISPLAY_DASHBOARD: "displayDashboard",
  REPORT_ERROR: "reportError",
  CHECKOUT : "checkout"
};

export const COMPONENT = {
  DASHBOARD: "dashboard",
  PRODUCT_CATALOG: "productCatalog",
  CART: "cart",
  WISH_LIST: "wishList",
  PRODUCT_PAGE: "productPage",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  UNKNOWN_ACTION: "unknownAction",
};
