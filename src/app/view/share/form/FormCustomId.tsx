import React from "react";
import { Flex, FlexItem, Switch, TextInput } from "@patternfly/react-core";

import { FormGroup } from "./FormGroup";

export const FormCustomId: React.FC<{
  useCustomId: boolean;
  onChangeUse: React.ComponentProps<typeof Switch>["onChange"];
  onChangeId: React.ComponentProps<typeof TextInput>["onChange"];
  customId: React.ComponentProps<typeof TextInput>["value"];
  isValid?: boolean;
  showValidationErrors?: boolean;
}> = ({
  useCustomId,
  onChangeUse,
  onChangeId,
  customId,
  isValid = true,
  showValidationErrors = false,
}) => {
  const id = "use-custom-id";
  return (
    <FormGroup
      fieldId={id}
      label="Use custom id"
      helperTextInvalid={"Please provide a value of custom id"}
      isValid={isValid}
      showValidationErrors={showValidationErrors}
      popover={{
        header: "Custom id",
        body: (
          <>
            You can specify element id. Otherwise it will be generated
            automatically.
          </>
        ),
      }}
    >
      <Flex>
        <FlexItem className="pf-u-pt-sm">
          <Switch
            id={id}
            isChecked={useCustomId}
            onChange={onChangeUse}
            aria-label="use custom id"
          />
        </FlexItem>
        {useCustomId && (
          <FlexItem>
            <TextInput
              id={`${id}-id`}
              value={customId}
              type="text"
              onChange={onChangeId}
              validated={showValidationErrors && !isValid ? "error" : "default"}
            />
          </FlexItem>
        )}
      </Flex>
    </FormGroup>
  );
};
