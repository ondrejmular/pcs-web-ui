import React from "react";

const ResourceDetailCaption = ({ resourceId, badge, type = "" }: {
  resourceId: string;
  badge: JSX.Element;
  type?: string;
}) => (
  <>
    {badge}
    <strong>{` ${resourceId} `}</strong>
    {type && <span>{`(${type})`}</span>}
  </>
);

export default ResourceDetailCaption;
