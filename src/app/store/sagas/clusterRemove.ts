import { removeCluster } from "app/backend";
import { ActionMap } from "app/store/actions";

import { api, processError, put, putNotification } from "./common";

export function* clusterRemove({
  payload,
}: ActionMap["DASHBOARD.CLUSTER.REMOVE"]) {
  const result: api.ResultOf<typeof removeCluster> = yield api.authSafe(
    removeCluster,
    payload.clusterName,
  );

  if (result.type !== "OK") {
    yield processError(result, payload.clusterName);
    return;
  }

  yield putNotification("SUCCESS", "Cluster removed");
  yield put({ type: "CLUSTER.LIST.REFRESH" });
}
