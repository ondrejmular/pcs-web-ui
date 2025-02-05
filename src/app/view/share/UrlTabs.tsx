import { Tab, Tabs } from "@patternfly/react-core";

import { useLocation } from "app/view/share";

const toUrlDefault = (tabUrlParamName: string) => `/${tabUrlParamName}`;
const toLabelDefault = (tabUrlParamName: string) =>
  tabUrlParamName
    .replace("-", " ")
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export function UrlTabs<T extends string>({
  tabList,
  currentTab,
  "data-test": dataTest,
  toUrl,
  toLabel,
}: {
  tabList: ReadonlyArray<T>; // {tabLabel: urlParamName}
  currentTab: T;
  toUrl?: (_tab: string) => string;
  toLabel?: (_tab: string) => string;
  ["data-test"]?: string;
}) {
  const { navigate } = useLocation();
  const paramToUrl = toUrl ?? toUrlDefault;
  const paramToLabel = toLabel ?? toLabelDefault;
  return (
    <Tabs
      activeKey={currentTab as string}
      onSelect={(_e, tabIndex) => {
        if (tabIndex !== currentTab) {
          navigate(paramToUrl(tabIndex as T));
        }
      }}
      data-test={`tabs ${dataTest}`}
    >
      {tabList.map(tab => (
        <Tab
          key={tab}
          eventKey={tab}
          title={paramToLabel(tab)}
          data-test={tab}
        />
      ))}
    </Tabs>
  );
}
