import { ApiResource, ApiResourceBase } from "app/backend/types/clusterStatus";
import {
  ResourceStatus,
  ResourceStatusInfo,
  StatusSeverity,
} from "../../types";

import * as statusSeverity from "../statusSeverity";

export const isDisabled = (apiResource: ApiResourceBase): boolean =>
  apiResource.meta_attr.some(
    apiMetaAttribute =>
      apiMetaAttribute.name === "target-role"
      && apiMetaAttribute.value.toLowerCase() === "stopped",
  );

export function getMaxSeverity<T>(
  list: T[],
  getItemsSeverity: (item: T) => StatusSeverity,
) {
  return list.reduce<StatusSeverity>(
    (severity, item) => statusSeverity.max(severity, getItemsSeverity(item)),
    "OK",
  );
}

export const buildStatus = (
  statusInfoList: ResourceStatusInfo[],
): ResourceStatus => {
  return {
    infoList: statusInfoList.sort(
      (i1, i2) =>
        statusSeverity.compareStatusSeverity(i1.severity, i2.severity) * -1,
    ),
    maxSeverity: getMaxSeverity(statusInfoList, info => info.severity),
  };
};

export const statusToSeverity = (
  status: ApiResource["status"],
): StatusSeverity => {
  switch (status) {
    case "blocked":
      return "ERROR";
    case "failed":
      return "ERROR";
    case "disabled":
    case "partially running":
      return "WARNING";
    case "running":
    default:
      return "OK";
  }
};
