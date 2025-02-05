import React from "react";

import { FormRadios, FormSelect, FormText } from "app/view/share";

import { ClusterProperties } from "./useClusterProperties";

export const PropertyFormField: React.FC<{
  property: ClusterProperties[number];
  userProperty: string | undefined;
  modifyProperty: (_name: string, _value: string) => void;
  currentValue?: string | undefined;
}> = ({ property, userProperty, modifyProperty, currentValue = undefined }) => {
  const popover = {
    header: property.shortdesc,
    body: property.longdesc,
    defaultValue: property.default,
  };

  const modifyPropertyWithDefault = React.useCallback(
    (value: string) =>
      modifyProperty(property.name, value === "DEFAULT" ? "" : value),
    [modifyProperty, property],
  );

  const id = `cluster-property-${property.name}`;
  if ("enum" in property) {
    const value =
      userProperty !== undefined
        ? userProperty || "DEFAULT"
        : currentValue || "DEFAULT";
    if (property.enum.length < 4) {
      return (
        <FormRadios
          id={id}
          label={property.readable_name}
          options={["DEFAULT", ...property.enum]}
          selected={value}
          onChange={modifyPropertyWithDefault}
          popover={popover}
        />
      );
    }
    return (
      <FormSelect
        id={id}
        label={property.readable_name}
        onSelect={modifyPropertyWithDefault}
        selections={value}
        optionsValues={["DEFAULT", ...property.enum]}
      />
    );
  }

  if (property.type === "boolean") {
    let value: string;
    if (userProperty !== undefined) {
      value = userProperty === "" ? "DEFAULT" : userProperty;
    } else {
      value =
        currentValue === "true" || currentValue === "false"
          ? currentValue
          : "DEFAULT";
    }
    return (
      <FormRadios
        id={id}
        label={property.readable_name}
        options={["DEFAULT", "true", "false"]}
        selected={value}
        onChange={modifyPropertyWithDefault}
        popover={popover}
      />
    );
  }

  return (
    <FormText
      id={id}
      label={property.readable_name}
      popover={popover}
      onChange={value => modifyProperty(property.name, value)}
      value={userProperty ?? (currentValue || "")}
      placeholder={property.default as string}
    />
  );
};
