import React from "react";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view";
import { selectors } from "app/store";

import { ResourceDetailPage } from "./ResourceDetailPage";
import { ResourceTree } from "./tree/ResourceTree";
import { ResourceCreateToolbarItem } from "./wizard";

export const ResourcesPage = ({ urlPrefix }: { urlPrefix: string }) => {
  const [clusterStatus] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ResourceCreateToolbarItem />
      </ClusterSectionToolbar>
      <GroupDetailView
        urlPrefix={urlPrefix}
        groupCard={<ResourceTree resourceTree={clusterStatus.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
