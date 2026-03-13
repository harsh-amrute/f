import { SearchInputMultiple } from "../../index";
import {
  SCSwapPermission,
  SCtitle,
  SCSwapContent,
  SCSwapItem,
  SCFlexCenter,
  SCItemTitle,
  SCItemMulSelect,
  checkbox as checkboxCls,
  checkboxAccentVar,
} from "./styles.css";
import { useUserData } from "../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

const LocationPermission = ({ ...props }: any) => {
  const { prdPermissions, title, onSelectAll, isSelected } = props;

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const accentColor = globalStyles.chooseThemeColor[themeUi]?.color5 ?? "#000";

  return (
    <>
      <div className={SCSwapPermission}>
        <div className={SCtitle}>
          {title}
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="checkbox"
              checked={isSelected}
              onClick={onSelectAll}
              className={checkboxCls}
              style={assignInlineVars({
                [checkboxAccentVar]: accentColor,
              })}
            />
            <p style={{ fontSize: "14px" }}>Select All</p>
          </div>
        </div>

        <div className={`${SCSwapContent} scroll-style`}>
          {prdPermissions.map((item: any, index: number) => (
            <div className={SCSwapItem} key={index}>
              <div className={SCFlexCenter}>
                <span className={SCItemTitle}>{item.title}</span>
                <div className={SCItemMulSelect}>
                  <SearchInputMultiple
                    placeholder={item.placeholder}
                    options={item.options || []}
                    value={item.value}
                    setValue={item.setValue}
                    handleListChild={item.handleAction}
                    disabled={false}
                    key={index}
                    isCheckBoxRef={item.isCheckBoxRef}
                    from={item.from}
                    activeApplicationId={item.activeApplicationId}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LocationPermission;
