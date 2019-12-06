import React from "react";
import {
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListCell,
} from "@patternfly/react-core";

import { StatusSign } from "app/common/components";
import { toLabel } from "app/common/utils";

import { Node } from "app/services/cluster/types";

const NodeListItem = ({ node }: { node: Node }) => (
  <DataListItem aria-labelledby={node.name}>
    <DataListItemRow>
      <DataListItemCells
        dataListCells={(
          <>
            <DataListCell>
              {node.name}
            </DataListCell>
            <DataListCell>
              {"Status "}
              <StatusSign
                status={node.statusSeverity}
                label={<strong>{toLabel(node.status)}</strong>}
                showOkIco
              />
            </DataListCell>
            <DataListCell>
              {"Quorum "}
              <StatusSign
                status={node.quorumSeverity}
                label={<strong>{toLabel(node.quorum)}</strong>}
                showOkIco
              />
            </DataListCell>
          </>
        )}
      />
    </DataListItemRow>
  </DataListItem>
);
export default NodeListItem;
