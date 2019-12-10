import React from "react";

import { types } from "app/store";
import { IssueList } from "app/view/common";

const GroupDetail = ({ group }: {
  group: types.cluster.Group,
}) => (
  <IssueList issueList={group.issueList} />
);

export default GroupDetail;
