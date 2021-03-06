import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.sendKnownHosts;

export const sendKnownHosts = async (
  clusterName: string,
  nodeList: string[],
): api.CallResult => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.post(url({ clusterName }), {
    // smth like: [["node_names[]", "node-1"], ["node_names[]", "node-2"]]
    params: uniqueNodeList.map(node => ["node_names[]", node]),
  });
};
