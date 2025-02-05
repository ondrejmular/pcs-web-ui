import React from "react";
import { useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import { Page, PageSectionDataLoading, useDispatch } from "app/view/share";

import { DashboardClusterList } from "./clusterList";
import { DashboardToolbar } from "./DashboardToolbar";

const useDashboardSync = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: "DATA_READING.SET_UP",
      payload: [
        {
          specificator: "syncDashboard",
          start: { type: "CLUSTER.LIST.SYNC" },
          stop: { type: "CLUSTER.LIST.SYNC.STOP" },
        },
      ],
    });
  }, [dispatch]);
};

export const DashboardPage = () => {
  useDashboardSync();
  const dispatch = useDispatch();
  const importedClusterNameList = useSelector(selectors.getImportedClusterList);
  const dataLoaded = useSelector(selectors.dashboardAreDataLoaded);

  return (
    <Page>
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <Breadcrumb>
              <BreadcrumbItem
                isActive
                onClick={() => dispatch({ type: "CLUSTER.LIST.REFRESH" })}
              >
                Clusters
              </BreadcrumbItem>
            </Breadcrumb>
          </StackItem>
          <StackItem>
            <DashboardToolbar />
          </StackItem>
        </Stack>
      </PageSection>
      <PageSectionDataLoading done={dataLoaded}>
        <DashboardClusterList
          importedClusterNameList={importedClusterNameList}
        />
      </PageSectionDataLoading>
    </Page>
  );
};
