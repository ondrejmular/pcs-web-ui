import { Caption } from "@patternfly/react-table";

import { selectors } from "app/store";
import { EmptyStateNoItem, Table, useClusterSelector } from "app/view/share";

import { SbdOnNodesWatchdog } from "./SbdOnNodesWatchdog";
import { SbdOnNodesDevices } from "./SbdOnNodesDevices";

export const SbdOnNodes = () => {
  const [{ nodeList }] = useClusterSelector(selectors.getCluster);

  if (nodeList.length === 0) {
    return <EmptyStateNoItem title="No sbd watchdogs." />;
  }

  return (
    <>
      <Table>
        <Caption>SBD per node </Caption>
        <thead>
          <tr>
            <th data-label="Node">Node</th>
            <th data-label="Watchdog">Watchdog</th>
            <th data-label="Devices">Devices</th>
          </tr>
        </thead>

        <Table.Body data-test="sbd-watchdog-list">
          {Object.values(nodeList).map(node => (
            <tr key={node.name} data-test={`row-${node.name}`}>
              <td data-label="Node" data-test="node">
                {node.name}
              </td>
              <td data-label="Watchdog" data-test="watchdog">
                <SbdOnNodesWatchdog node={node} />
              </td>
              <td data-label="Devices" data-test="devices">
                <SbdOnNodesDevices node={node} />
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
