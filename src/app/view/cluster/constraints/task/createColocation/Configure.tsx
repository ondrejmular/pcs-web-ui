import { Form } from "@patternfly/react-core";

import { FormRadios, FormSelect, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    updateState,
    resourceIdList,
    isResourceValid,
    isWithResourceValid,
    isScoreValid,
    state: {
      resourceId,
      withResourceId,
      placement,
      score,
      showValidationErrors,
    },
  } = useTask();

  return (
    <Form data-test="create-location-constrait">
      <FormSelect
        id={"constraint-colocation-create-resource"}
        label="Resource"
        placeholderText="Select a resource"
        showValidationErrors={showValidationErrors}
        isValid={isResourceValid}
        helperTextInvalid="Please select a resource"
        isRequired
        onSelect={value => updateState({ resourceId: value.toString() })}
        selections={resourceId}
        optionsValues={resourceIdList.filter(r => r !== withResourceId)}
      />

      <FormSelect
        id={"constraint-colocation-create-resource"}
        label="With resource"
        placeholderText="Select a resource"
        showValidationErrors={showValidationErrors}
        isValid={isWithResourceValid}
        helperTextInvalid="Please select a resource"
        isRequired
        onSelect={value => updateState({ withResourceId: value.toString() })}
        selections={withResourceId}
        optionsValues={resourceIdList.filter(r => r !== resourceId)}
      />

      <FormRadios
        id="constraint-colocation-create-placement"
        label="Placement"
        options={["together", "apart"]}
        selected={placement}
        onChange={value => updateState({ placement: value })}
      />

      <FormText
        id="constraint-score"
        label="Score"
        onChange={value => updateState({ score: value })}
        value={score}
        showValidationErrors={showValidationErrors}
        isValid={isScoreValid}
        helperTextInvalid="Score must be integer or INFINITY"
        data-test="score"
      />
    </Form>
  );
};
