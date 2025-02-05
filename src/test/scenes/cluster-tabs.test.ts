import * as responses from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, location, route } from "test/tools";

const currentTab = async () => {
  const currentTablist = await page.$$eval(dt("tabs cluster"), tabs =>
    tabs
      .map(e => e.querySelector(".pf-m-current")?.textContent ?? null)
      .filter(r => r !== null),
  );
  expect(currentTablist.length).toEqual(1);
  return currentTablist[0];
};

const checkClusterTab = async (
  clusterLocation: string,
  currentTabLabel: string,
  expectedAria: string,
) => {
  await page.goto(clusterLocation);
  await page.waitForSelector(dt(expectedAria));

  expect(await currentTab()).toEqual(currentTabLabel);
};

const clusterName = "ok";

describe("Cluster scene", () => {
  beforeEach(
    intercept.start([
      route.clusterStatus({ clusterStatus: responses.clusterStatus.ok }),
      route.resourceAgentListAgents("ok"),
      route.stonithAgentListAgents({ clusterName: "ok" }),
      route.getClusterPropertiesDefinition({ clusterName: "ok" }),
      route.getPermissions({ clusterName }),
    ]),
  );

  afterEach(intercept.stop);

  it("should show detail tab of cluster by default", async () => {
    await checkClusterTab(
      location.cluster({ clusterName: "ok" }),
      "Detail",
      "cluster-detail",
    );
  });

  it("should show nodes tab", async () => {
    await checkClusterTab(
      location.nodeList({ clusterName: "ok" }),
      "Nodes",
      "cluster-nodes",
    );
  });

  it("should show resources tab", async () => {
    await checkClusterTab(
      location.resourceList({ clusterName: "ok" }),
      "Resources",
      "cluster-resources",
    );
  });

  it("should show fence devices tab", async () => {
    await checkClusterTab(
      location.fenceDeviceList({ clusterName: "ok" }),
      "Fence Devices",
      "cluster-fence-devices",
    );
  });
});
