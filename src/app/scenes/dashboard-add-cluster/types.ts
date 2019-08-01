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

export enum AUTH_STATE {
  INITIAL = "INITIAL",
  CHECKING = "CHECKING",
  ALREADY_AUTHENTICATED = "ALREADY_AUTHENTICATED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  ERROR = "ERROR",
  AUTHENTICATION_IN_PROGRESS = "AUTHENTICATION_IN_PROGRESS",
  AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
}

export enum ADD_STATE {
  STARTED = "STARTED",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  DASHBOARD_RELOADING = "DASHBOARD_RELOADING",
}

export interface UpdateNodeNameAction {
  type: typeof actionTypes.UPDATE_NODE_NAME,
  payload: string,
}

export interface CheckAuthAction {
  type: typeof actionTypes.CHECK_AUTH,
  payload: {
    nodeName: string
  },
}

export interface CheckAuthOkAction {
  type: typeof actionTypes.CHECK_AUTH_OK,
}

export interface CheckAuthNoAuthAction {
  type: typeof actionTypes.CHECK_AUTH_NO_AUTH,
}

export interface CheckAuthErrorAction {
  type: typeof actionTypes.CHECK_AUTH_ERROR,
  payload: {
    message: string,
  }
}

export interface ReloadDashboardAction {
  type: typeof actionTypes.RELOAD_DASHBOARD,
}

export interface AddClusterAction {
  type: typeof actionTypes.ADD_CLUSTER,
  payload: {
    nodeName: string,
  },
}

export interface AddClusterSuccessAction {
  type: typeof actionTypes.ADD_CLUSTER_SUCCESS,
  payload: {
    warningMessages: string[],
  },
}

export interface AddClusterErrorAction {
  type: typeof actionTypes.ADD_CLUSTER_ERROR,
  payload: {
    message: string,
  }
}

export interface AuthenticateNodeAction {
  type: typeof actionTypes.AUTHENTICATE_NODE,
  payload: {
    nodeName: string,
    password: string,
    address: string,
    // TODO make it number
    port: string,
  }
}

export interface AuthenticateNodeSuccessAction {
  type: typeof actionTypes.AUTHENTICATE_NODE_SUCCESS,
}

export interface AuthenticateNodeFailedAction {
  type: typeof actionTypes.AUTHENTICATE_NODE_FAILED,
  payload: {
    message: string,
  }
}

export type NodeName = string;
export type StateError = string;

export interface DashboardAddClusterPageState {
  nodeName: NodeName,
  stepAuthState: AUTH_STATE,
  stepAddState: ADD_STATE,
  stateError: StateError,
}
