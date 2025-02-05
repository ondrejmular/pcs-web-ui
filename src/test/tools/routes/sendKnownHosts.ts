import { endpoints } from "app/backend/endpoints";

import { RouteResponse } from "test/tools/interception";
export const sendKnownHosts = (
  clusterName: string,
  nodeName: string,
  response: RouteResponse = { text: "success" },
) => ({
  url: endpoints.sendKnownHosts.url({ clusterName }),
  body: { "node_names[]": nodeName },
  ...response,
});
