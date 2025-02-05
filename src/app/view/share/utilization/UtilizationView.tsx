import {
  Alert,
  TextContent,
} from "@patternfly/react-core";

import { ActionPayload } from "app/store";
import { NVPair } from "app/view/cluster/types";
import { NVPairListView } from "app/view/share/nvpair";

export const UtilizationView = ({
  utilizationAttrs,
  owner,
}: {
  utilizationAttrs: NVPair[];
  owner: ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
}) => {
  return (
    <NVPairListView
      nvPairList={utilizationAttrs}
      owner={owner}
      createLabel="Create Utilization Attribute"
      beforeList={
        <Alert isInline title="Utilization attributes" variant="info">
          <TextContent>
            To configure the capacity that a node provides or a resource
            requires, you can use utilization attributes in node and resource
            objects. A node is considered eligible for a resource if it has
            sufficient free capacity to satisfy the resource’s requirements
          </TextContent>
        </Alert>
      }
    />
  );
};
