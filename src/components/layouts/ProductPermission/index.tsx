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
  itemMulWidthVar,
} from "./styles.css";
import { useUserData } from "../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

const ProductPermission = ({ ...props }: any) => {
  const { title, prdPermissions, onSelectAll, isSelected } = props;

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const accent =
  globalStyles.chooseThemeColor[themeUi]?.color5 ?? "#000";

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
                [checkboxAccentVar]: accent,
              })}
            />
            <p style={{ fontSize: "14px" }}>Select All</p>
          </div>
        </div>

        <div className={`${SCSwapContent} scroll-style`}>
          {prdPermissions.map((item: any, index: number) => {
            const width = item.width as string | undefined; // if you pass custom width
            return (
              <div className={SCSwapItem} key={index}>
                <div className={SCFlexCenter}>
                  <span className={SCItemTitle}>{item.title}</span>
                  <div
                    className={SCItemMulSelect}
                    style={
                      width
                        ? assignInlineVars({ [itemMulWidthVar]: width })
                        : undefined
                    }
                  >
                    <SearchInputMultiple
                      placeholder={item.placeholder}
                      options={item.options}
                      value={item.value}
                      setValue={item.setValue}
                      handleListChild={item.handleAction}
                      disabled={false}
                      key={index}
                      from={item.from}
                      isCheckBoxRef={item.isCheckBoxRef}
                      activeApplicationId={item.activeApplicationId}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductPermission;
