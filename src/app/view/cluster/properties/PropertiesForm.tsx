import React from "react";
import { ActionGroup, Button, Form } from "@patternfly/react-core";

import { useDispatch, useSelectedClusterName } from "app/view/share";

import { ClusterProperties } from "./useClusterProperties";
import { PropertyFormField } from "./PropertyFormField";

export const PropertiesForm: React.FC<{
  close: () => void;
  clusterPropertiesDefinition: ClusterProperties;
  currentClusterProperties: Record<string, string>;
}> = ({ close, clusterPropertiesDefinition, currentClusterProperties }) => {
  const [userProperties, setUserProperties] = React.useState<
    Record<string, string>
  >({});
  const clusterName = useSelectedClusterName();
  const dispatch = useDispatch();
  return (
    <Form isHorizontal style={{ maxWidth: "550px" }}>
      {clusterPropertiesDefinition.map(property => (
        <PropertyFormField
          key={property.name}
          property={property}
          userProperty={userProperties[property.name]}
          modifyProperty={(name, value) =>
            setUserProperties({ ...userProperties, [name]: value })
          }
          {...(property.name in currentClusterProperties
            ? { currentValue: currentClusterProperties[property.name] }
            : {})}
        />
      ))}
      <ActionGroup>
        <Button
          variant="primary"
          onClick={() => {
            dispatch({
              type: "CLUSTER.PROPERTIES.UPDATE",
              key: { clusterName },
              payload: { propertyMap: userProperties },
            });
            close();
          }}
        >
          Save properties
        </Button>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};
