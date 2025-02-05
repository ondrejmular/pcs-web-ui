import { Form } from "@patternfly/react-core";

import { FormRadios, FormSwitch, FormText } from "app/view/share";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    updateState,
    isNameValid,
    areCompetenciesValid,
    state: { name, type, showValidationErrors, read, write, grant, full },
  } = useTask();

  return (
    <>
      <Form data-test="permission-create">
        <FormText
          id="permission-name"
          label="Name"
          onChange={value => updateState({ name: value })}
          value={name}
          showValidationErrors={showValidationErrors}
          isValid={isNameValid}
          helperTextInvalid="Please enter a name"
          data-test="name"
        />
        <FormRadios
          label="Type"
          id="permission-user-group-type"
          options={["user", "group"]}
          selected={type}
          onChange={value =>
            updateState({
              type: value.toString() as typeof type,
            })
          }
          data-test="type"
        />
      </Form>
      <Form data-test="permission-create" isHorizontal className="pf-u-mt-md">
        <FormSwitch
          id="allow-read"
          label="Read"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={read}
          onChange={allow => updateState({ read: allow })}
          data-test="read"
          popover={{
            header: "Allows to view cluster settings",
            body: "",
          }}
        />
        <FormSwitch
          id="allow-write"
          label="Write"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={write}
          onChange={allow => updateState({ write: allow })}
          data-test="write"
          popover={{
            header:
              "Allows to modify cluster settings except permissions and ACLs",
            body: "",
          }}
        />
        <FormSwitch
          id="allow-grant"
          label="Grant"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={grant}
          onChange={allow => updateState({ grant: allow })}
          data-test="grant"
          popover={{
            header: "Allows to modify cluster permissions and ACLs",
            body: "",
          }}
        />
        <FormSwitch
          id="allow-full"
          label="Full"
          switchLabel="Allowed"
          switchLabelOff="Disallowed"
          isChecked={full}
          onChange={allow => updateState({ full: allow })}
          data-test="full"
          showValidationErrors={showValidationErrors}
          isValid={areCompetenciesValid}
          helperTextInvalid="Please select at least one permission"
          popover={{
            header:
              "Allows unrestricted access to a cluster including adding and removing"
              + " nodes and access to keys and certificates",
            body: "",
          }}
        />
      </Form>
    </>
  );
};
