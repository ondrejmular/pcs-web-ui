import * as t from "./tools";
import { resourceTree } from "./resource-tree";
import { resourcesForTest } from "./resources-for-test";
import {
  actions,
  actionsAlternative,
  actionsNoGroup,
  actionsOneGroup,
} from "./actions";
import { noAuthNodes } from "./noAuthNodes";
import { ok as clusterOk } from "./buildClusterStatus";

export {
  resourceTree,
  resourcesForTest,
  actions,
  actionsAlternative,
  actionsNoGroup,
  actionsOneGroup,
  noAuthNodes,
};

export const ok = clusterOk("ok");
export const ok2 = clusterOk("ok2");

export const empty = t.cluster("empty", "error", { node_list: [t.node("1")] });
export const error = t.cluster("error", "error", {
  node_list: [
    t.node("1", { sbd_config: null }),
    t.node("2", { status: "offline", quorum: false }),
    t.node("3", { status: "offline", quorum: false }),
  ],
  resource_list: [
    t.primitive("R1", {
      status: "blocked",
      warning_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    t.primitive("R2", { status: "failed" }),
    t.stonith("F1"),
    t.stonith("F2", { status: "failed" }),
  ],
  warning_list: t.issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
  ]),
  error_list: t.issues(["Unable to connect to the cluster."]),
});

export const big = t.cluster("big", "error", {
  node_list: [
    t.node("1"),
    t.node("2", { status: "offline", quorum: false }),
    t.node("3", { status: "offline", quorum: false }),
    t.node("4"),
    t.node("5", { status: "offline", quorum: false }),
    t.node("6"),
    t.node("7", { status: "unknown" }),
    t.node("8", { status: "offline", quorum: false }),
    t.node("9", { status: "offline", quorum: false }),
  ],
  resource_list: [
    t.primitive("ip-addr", {
      status: "blocked",
      warning_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: t.issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    t.primitive("apache", { status: "failed" }),
    t.primitive("pgsql", { status: "failed" }),
    t.primitive("nagios"),
    t.primitive("postfix", { status: "blocked" }),
    t.stonith("F1"),
    t.stonith("F2", { status: "failed" }),
  ],
  warning_list: t.issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
    "Unreal warning 1",
    "Unreal warning 2",
    "Unreal warning 3",
    "Unreal warning 4",
  ]),
  error_list: t.issues([
    "Unable to connect to the cluster.",
    "Unreal error 1",
    "Unreal error 2",
    "Unreal error 3",
  ]),
});

export const sbd = t.cluster("sbd", "ok", {
  node_list: [
    t.node("1", {
      sbd_config: {
        SBD_DELAY_START: "no",
        SBD_OPTS: "a83-1",
        SBD_PACEMAKER: "yes",
        SBD_STARTMODE: "always",
        SBD_TIMEOUT_ACTION: "flush,reboot",
        SBD_WATCHDOG_DEV: "/dev/watchdog",
        SBD_WATCHDOG_TIMEOUT: "5",
        SBD_DEVICE: "/dev/sdb@node1;/dev/sda",
      },
    }),
    t.node("2", {
      services: {
        pacemaker: {
          installed: true,
          running: false,
          enabled: true,
        },
        pacemaker_remote: {
          installed: false,
          running: false,
          enabled: false,
        },
        corosync: {
          installed: true,
          running: true,
          enabled: true,
        },
        pcsd: {
          installed: true,
          running: true,
          enabled: false,
        },
        sbd: {
          installed: false,
          running: false,
          enabled: false,
        },
      },
    }),
  ],
});
