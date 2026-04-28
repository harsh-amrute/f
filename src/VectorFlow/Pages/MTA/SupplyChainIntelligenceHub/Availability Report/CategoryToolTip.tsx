import { ITooltipParams } from "ag-grid-enterprise";

import {
  CategoryToolTipWrapper,
  CategoryToolTipSection,
  CategoryToolTipSectionHeader,
  CategoryToolTipSectionDescription,
} from "./styles.css";
import { BTRCategoryMapper } from "../../../../../helpers/BPRConstants";

const CategoryToolTip = (params: ITooltipParams) => {
  const categories = params.value.split("|");

  return (
    <div className={CategoryToolTipWrapper}>
      {categories.map((c: string) => {
        const categoryData = BTRCategoryMapper[c];
        if (categoryData) {
          if (c === "BR") {
            return (
              <div
                className={CategoryToolTipSection}
                style={{ background: "black", color: "white" }}
              >
                <p className={CategoryToolTipSectionHeader}>
                  {categoryData.toolTipHeader}
                </p>
                <div className={CategoryToolTipSectionDescription}>
                  {categoryData.toolTipDescription}
                </div>
              </div>
            );
          }
          return (
            <div
              className={CategoryToolTipSection}
              style={{
                backgroundColor: categoryData.bgColor,
                color: categoryData.color,
              }}
            >
              <p className={CategoryToolTipSectionHeader}>
                {categoryData.toolTipHeader}
              </p>
              <div className={CategoryToolTipSectionDescription}>
                {categoryData.toolTipDescription}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategoryToolTip;
