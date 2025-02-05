import { AppReducer } from "app/store/reducers/appReducer";

const initialState: {
  authProcessId: number | null;
  open: boolean;
  fixing: boolean;
  authAttemptInProgress: boolean;
  errorMessage: string;
} = {
  authProcessId: null,
  open: false,
  fixing: false,
  authAttemptInProgress: false,
  errorMessage: "",
};

export const fixAuth: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.FIX_AUTH.AUTH_STARTED":
      return {
        ...state,
        authProcessId: action.payload.authProcessId,
        open: true,
      };

    case "CLUSTER.FIX_AUTH.OK":
      return {
        ...state,
        fixing: false,
        errorMessage: "",
      };

    case "CLUSTER.FIX_AUTH.FAIL":
      return {
        ...state,
        fixing: false,
        errorMessage: action.payload.message,
      };

    case "CLUSTER.FIX_AUTH.ERROR":
      return {
        ...state,
        fixing: false,
        errorMessage: action.payload.message,
      };

    case "CLUSTER.FIX_AUTH.CANCEL":
      return {
        ...state,
        authProcessId: null,
        fixing: true,
        open: false,
        errorMessage: "",
      };

    case "CLUSTER.FIX_AUTH.AUTH_DONE":
      return {
        ...state,
        authProcessId: null,
        fixing: true,
      };

    case "NODE.AUTH":
    case "NODE.AUTH.FAIL":
    case "NODE.AUTH.OK":
      return action.key.process === state.authProcessId
        ? { ...state, authAttemptInProgress: action.type === "NODE.AUTH" }
        : state;

    default:
      return state;
  }
};
