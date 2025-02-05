import React from "react";

import { Action } from "app/store";
import {
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";
import { Node } from "app/view/cluster/types";

export const NodeDetailPageToolbar: React.FC<{
  node: Node;
}> = ({ node }) => {
  const clusterName = useSelectedClusterName();

  const standbyUnstandbyAction = (standby: boolean): Action => ({
    type: "LIB.CALL.CLUSTER",
    key: { clusterName },
    payload: {
      taskLabel: `standby node "${node.name}"`,
      call: {
        name: "node-standby-unstandby",
        payload: { standby, node_names: [node.name] },
      },
    },
  });
  const standby: DetailLayoutToolbarAction = {
    action: standbyUnstandbyAction(true),
    confirm: {
      title: "Standby node?",
      description: (
        <>
          Put the node into standby mode. The node will no longer be able to
          host resources
        </>
      ),
    },
  };

  const unstandby: DetailLayoutToolbarAction = {
    action: standbyUnstandbyAction(false),
    confirm: {
      title: "Untandby node?",
      description: (
        <>
          Remove the node from standby mode. The node specified will now be able
          to to host resources
        </>
      ),
    },
  };

  const maintenanceUnmanintenanceAction = (maintenance: boolean): Action => ({
    type: "LIB.CALL.CLUSTER",
    key: { clusterName },
    payload: {
      taskLabel: `maintenance node "${node.name}"`,
      call: {
        name: "node-maintenance-unmaintenance",
        payload: {
          maintenance,
          node_names: [node.name],
        },
      },
    },
  });

  const maintenance: DetailLayoutToolbarAction = {
    action: maintenanceUnmanintenanceAction(true),
    confirm: {
      title: "Maintenance node?",
      description: "Put the node into maintenance mode",
    },
  };

  const unmaintenance: DetailLayoutToolbarAction = {
    action: maintenanceUnmanintenanceAction(false),
    confirm: {
      title: "Unmaintenance node?",
      description: "Remove the node into maintenance mode",
    },
  };

  const start: DetailLayoutToolbarAction = {
    action: {
      type: "NODE.START",
      key: { clusterName },
      payload: { nodeName: node.name },
    },
    confirm: {
      title: "Start node?",
      description: "Start a cluster on the node",
    },
  };

  const stop: DetailLayoutToolbarAction = {
    action: {
      type: "NODE.STOP",
      key: { clusterName },
      payload: { nodeName: node.name },
    },
    confirm: {
      title: "Stop node?",
      description: "Stop a cluster on the node",
    },
  };

  const remove: DetailLayoutToolbarAction = {
    action: {
      type: "LIB.CALL.CLUSTER",
      key: { clusterName },
      payload: {
        taskLabel: `remove node "${node.name}"`,
        call: {
          name: "cluster-remove-nodes",
          payload: { node_list: [node.name] },
        },
      },
    },
    confirm: {
      title: "Remove node?",
      description: "Shutdown specified nodes and remove them from the cluster.",
    },
  };
  return (
    <DetailLayoutToolbar
      toolbarName="node"
      buttonActions={{
        start,
        stop,
      }}
      dropdownActions={{
        ...(node.inStandby ? { unstandby } : { standby }),
        ...(node.inMaintenance ? { unmaintenance } : { maintenance }),
        remove,
      }}
    />
  );
};
