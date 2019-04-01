export const actionTypes = {
  UPDATE_NODE_NAME: "/add-cluster/UPDATE_NODE_NAME",
  CHECK_AUTH: "/add-cluster/CHECK_AUTH",
  CHECK_AUTH_OK: "/add-cluster/CHECK_AUTH_OK",
  CHECK_AUTH_NO_AUTH: "/add-cluster/CHECK_AUTH_NO_AUTH",
  CHECK_AUTH_ERROR: "/add-cluster/CHECK_AUTH_ERROR",
  AUTHENTICATE_NODE: "/add-cluster/AUTHENTICATE_NODE",
  AUTHENTICATE_NODE_SUCCESS: "/add-cluster/AUTHENTICATE_NODE_SUCCESS",
  AUTHENTICATE_NODE_FAILED: "/add-cluster/AUTHENTICATE_NODE_FAILED",
  ADD_CLUSTER: "/add-cluster/ADD_CLUSTER",
  ADD_CLUSTER_SUCCESS: "/add-cluster/ADD_CLUSTER_SUCCESS",
  ADD_CLUSTER_ERROR: "/add-cluster/ADD_CLUSTER_ERROR",
  RELOAD_DASHBOARD: "/add-cluster/RELOAD_DASHBOARD",
};

export const stepAuthStates = {
  INITIAL: "INITIAL",
  CHECKING: "CHECKING",
  ALREADY_AUTHENTICATED: "ALREADY_AUTHENTICATED",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  ERROR: "ERROR",
  AUTHENTICATION_IN_PROGRESS: "AUTHENTICATION_IN_PROGRESS",
  AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED",
};

export const stepAddStates = {
  STARTED: "STARTED",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  DASHBOARD_RELOADING: "DASHBOARD_RELOADING",
};
