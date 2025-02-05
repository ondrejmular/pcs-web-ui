import { endpoint } from "./endpoint";

export const resourceUnclone = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/resource_unclone`,
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
