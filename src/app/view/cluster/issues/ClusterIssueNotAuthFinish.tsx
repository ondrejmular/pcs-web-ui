import { Alert } from "@patternfly/react-core";

import { EmptyStateSpinner } from "app/view/share";

import { useTask } from "./useTask";

export const ClusterIssueNotAuthFinish = () => {
  const { fixing, errorMessage } = useTask();

  if (fixing) {
    return <EmptyStateSpinner title="Distributing auth tokens to cluster" />;
  }

  if (errorMessage.length > 0) {
    return (
      <Alert
        isInline
        variant="danger"
        title="Distribution of auth tokens to cluster failed"
      >
        {errorMessage}
      </Alert>
    );
  }
  return (
    <Alert
      isInline
      variant="success"
      title="Authentication successfully fixed"
    />
  );
};
