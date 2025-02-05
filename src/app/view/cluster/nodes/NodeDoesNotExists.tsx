import React from "react";
import { StackItem } from "@patternfly/react-core";

import { EmptyStateNoItem } from "app/view/share";
import { DetailLayout, useSelectedClusterName } from "app/view/share";

export const NodeDoesNotExists: React.FC<{
  nodeName: string;
}> = ({ nodeName }) => {
  const clusterName = useSelectedClusterName();
  return (
    <DetailLayout caption={<strong>{nodeName}</strong>}>
      <StackItem>
        <EmptyStateNoItem
          title={`Node "${nodeName}" does not exist.`}
          message={`Node "${nodeName}" is not a member of cluster ${clusterName}.`}
        />
      </StackItem>
    </DetailLayout>
  );
};
