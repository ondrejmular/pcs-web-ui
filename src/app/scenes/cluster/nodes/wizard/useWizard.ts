import React from "react";

import { actions, selectors } from "app/store";
import { useClusterWizard } from "app/view";

type ActionUpdate = actions.NodeActions["NodeAddUpdate"];

export const useWizard = () => {
  const clusterWizard = useClusterWizard(
    "node-add",
    selectors.getWizardNodeAddState,
  );
  const { clusterUrlName, state, dispatch } = clusterWizard;

  const checkCanAddNode = () =>
    dispatch({
      type: "NODE.ADD.CHECK_CAN_ADD",
      payload: {
        clusterUrlName,
        nodeName: state.nodeName,
      },
    });

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (state.nodeCheck === "not-started") {
        checkCanAddNode();
      }
    });
  };

  return {
    ...clusterWizard,

    isNameValid: state.nodeName.length > 0,

    isNodeCheckDoneValid: state.nodeCheck === "success",

    // actions
    updateState: (state: ActionUpdate["payload"]["state"]) =>
      dispatch({
        type: "NODE.ADD.UPDATE",
        payload: {
          clusterUrlName,
          state,
        },
      }),

    checkAuth: () =>
      dispatch({
        type: "NODE.ADD.CHECK_AUTH",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
        },
      }),

    nodeAdd: () =>
      dispatch({
        type: "NODE.ADD",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
        },
      }),

    nodeAuth: (password: string, address: string, port: string) =>
      dispatch({
        type: "NODE.ADD.AUTHENTICATE",
        payload: {
          clusterUrlName,
          nodeName: state.nodeName,
          password,
          address,
          port,
        },
      }),

    checkCanAddNode,

    useNodeCheck,
  };
};
