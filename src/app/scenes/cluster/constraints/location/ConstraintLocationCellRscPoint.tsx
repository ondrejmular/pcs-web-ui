import React from "react";

import { types, url } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { ConstraintCell } from "../common";

export const ConstraintLocationCellRscPoint = ({
  constraint,
}: {
  constraint:
    | types.cluster.ConstraintLocationNode
    | types.cluster.ConstraintLocationRule;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <>
      {"rsc" in constraint && (
        <ConstraintCell label="Resource">
          {constraint.rsc && (
            <Link to={url.cluster.resources(clusterName, constraint.rsc)} />
          )}
        </ConstraintCell>
      )}
      {"rsc-pattern" in constraint && (
        <ConstraintCell
          label="Resources pattern"
          value={constraint["rsc-pattern"]}
        />
      )}
    </>
  );
};
