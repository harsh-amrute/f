import { ReactElement } from "react";
import * as TabStyles from "./styles";

interface ITabSwitchProps {
  heading: string;
  tabs: string[];
  handleTabChange: (tab: number) => void;
  activeTab: number;
  tabUI: ReactElement<any, any>;
}

const TabSwitch = (props: ITabSwitchProps) => {
  const { heading, tabs, handleTabChange, tabUI, activeTab } = props;

  const handleTab = (tab: number) => () => {
    handleTabChange(tab);
  };

  const getBorders = (activeTab: number) => {
    if (tabs?.length === 1) {
      return "15px 15px";
    }

    if (tabs.length > 1) {
      if (activeTab === 0) {
        return "15px 0px 0px 15px";
      }

      if (activeTab === tabs.length - 1) {
        return "0px 15px 15px 0px";
      }
    }

    return "0px";
  };

  return (
    <>
      <TabStyles.TabSwitchContainer>
        <TabStyles.TabSwitchHeading>{heading}</TabStyles.TabSwitchHeading>
        <TabStyles.TabsWrapper>
          {tabs?.map((tab: string, index: number) => {
            if (index === activeTab) {
              return (
                <TabStyles.ActiveTab
                    key={index}
                    style={{ borderRadius: getBorders(index)}}
                    onClick={handleTab(index)}
                    className='active-tab'
                >
                  {tab}
                </TabStyles.ActiveTab>
              );
            }
            return (
              <TabStyles.Tab
                key={index}
                style={{ borderRadius: getBorders(index)}}
                onClick={handleTab(index)}
                className='tab'
              >
                {tab}
              </TabStyles.Tab>
            );
          })}
        </TabStyles.TabsWrapper>
      </TabStyles.TabSwitchContainer>
      {tabUI}
    </>
  );
};

export default TabSwitch;
