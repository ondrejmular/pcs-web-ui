import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("nvpairEdit");
  const { dispatch, clusterName, state } = task;

  const key = { clusterName, task: task.name };
  const integerIsExpectedAsValue =
    state.owner.type === "node-utilization"
    || state.owner.type === "resource-utilization";
  return {
    ...task,
    integerIsExpectedAsValue,
    isValueValid: integerIsExpectedAsValue
      ? /^([1-9]\d*)$/.test(state.value)
      : state.value.length > 0,
    isNameValid: state.name.length > 0,
    isNameUsed: state.existingNameList.includes(state.name),

    open: (payload: ActionPayload["CLUSTER.NVPAIRS.EDIT"]) => {
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT",
        key,
        payload,
      });
      task.open();
    },

    updateState: (payload: ActionPayload["CLUSTER.NVPAIRS.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT.UPDATE",
        key,
        payload,
      }),

    attrSet: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.SAVE",
        key: { clusterName, task: task.name },
        payload: {
          owner: state.owner,
          name: state.name,
          value: state.value,
        },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.SAVE.ERROR.RECOVER",
        key,
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.NVPAIRS.EDIT.CLOSE",
        key,
      });
      task.close();
    },
  };
};
