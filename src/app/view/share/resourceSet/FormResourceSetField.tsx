import React from "react";
import { FormGroup } from "@patternfly/react-core";

import { Select } from "app/view/share/form";

export const FormResourceSetField: React.FC<{
  selectedResources: string[];
  offeredResources: string[];
  id: string;
  isOnlyOne: boolean;
  showValidationErrors: boolean;
  update: (_resources: string[]) => void;
}> = ({
  selectedResources,
  offeredResources: resourceOfferList,
  id,
  isOnlyOne,
  showValidationErrors,
  update,
}) => {
  const minimumResources = isOnlyOne ? 2 : 1;
  const resourcesValidated =
    showValidationErrors && selectedResources.length < minimumResources
      ? "error"
      : "default";
  return (
    <FormGroup
      label="resources"
      isRequired
      fieldId={id}
      helperTextInvalid={`Please provide at least ${
        isOnlyOne ? "2 resources" : "1 resource"
      }`}
      validated={resourcesValidated}
    >
      <Select
        id={id}
        variant="typeaheadmulti"
        selections={selectedResources}
        chipGroupProps={{ numChips: 10 }}
        optionsValues={resourceOfferList.filter(
          r => !selectedResources.includes(r),
        )}
        onSelect={value =>
          update([
            ...(selectedResources.includes(value)
              ? selectedResources.filter(r => r !== value)
              : [...selectedResources, value]),
          ])
        }
      />
    </FormGroup>
  );
};
