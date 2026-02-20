import { useState } from "react";
import { tabs, tab, tabActive } from "./styles.css";
import * as globalStyles from "../../../styles/global";
import { useUserData } from "../../../context";

interface TabProps {
  listTabs: any;
  onClick: (index: number) => void;
  activeTab?: number;
  setActiveTab?: (index: number) => void;
}

const NavigationTab = ({
  listTabs,
  onClick,
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab,
}: TabProps) => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const [localActiveTab, localSetActiveTab] = useState(0);
  const activeTab = propActiveTab ?? localActiveTab;
  const setActiveTab = propSetActiveTab ?? localSetActiveTab;

  const onClickTabItem = (index: number) => {
    setActiveTab(index);
    onClick(index);
  };

  const activeColor =
    (themeUi && globalStyles.chooseThemeColor[themeUi]?.color5) ||
    globalStyles.secondaryColor;

  return (
    <div className={tabs}>
      {listTabs.map((item: string, index: number) => {
        const isActive = activeTab === index;
        const className = isActive ? `${tab} ${tabActive}` : tab;
        const style = isActive
          ? ({ color: activeColor } as React.CSSProperties)
          : undefined;

        return (
          <span
            key={index}
            className={className}
            style={style}
            onClick={() => onClickTabItem(index)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default NavigationTab;
