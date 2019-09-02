import React from "react";
import { Stack, StackItem } from "@patternfly/react-core";

import { ISSUE, Issue } from "app/services/cluster/types";
import { InlineAlert } from "app/common/components";
import { StatusSeverity } from "app/common/types";


const mapSeverityToVariant = (severity: ISSUE) => (
  severity === "ERROR" ? "danger" : "warning"
);
const issueKey = (issue: Issue, index: any) => `${index}:${issue.message}`;

const DashboardIssueList = ({ issueList, summaryStatus }: {
  issueList: Issue[],
  summaryStatus: StatusSeverity,
}) => (
  <Stack
    gutter="sm"
    style={{ margin: "1rem" }}
    data-role="issues-status"
    data-role-value={summaryStatus}
  >
    {issueList.map((issue, i) => (
      <StackItem key={issueKey(issue, i)} isFilled aria-label="cluster issue">
        <InlineAlert
          variant={mapSeverityToVariant(issue.severity)}
          title={issue.message}
        />
      </StackItem>
    ))}
  </Stack>
);

export default DashboardIssueList;
