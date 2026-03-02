import { ICellRendererParams } from "ag-grid-enterprise";
import { BTRCategoryMapper } from "../../../../../helpers/BPRConstants";

import {
  CategoryCellRendererWrapper,
  CategoryCellRendererChip,
} from "./styles.css";

const CategoryCellRenderer = (props: ICellRendererParams) => {
  if (!props.value || props.value.length === 0) {
    return <CategoryCellRendererWrapper></CategoryCellRendererWrapper>;
  }
  const categoryStringArray = props.value.split("|");
  return (
    <div className={CategoryCellRendererWrapper}>
      {categoryStringArray.map((c: string) => {
        const categoryData = BTRCategoryMapper[c];
        if (categoryData) {
          if (c === "BR") {
            return (
              <div
                className={CategoryCellRendererChip}
                style={{
                  background: categoryData.bgColor,
                  color: categoryData.color,
                }}
              >
                {categoryData.cellLabel}
              </div>
            );
          }
          return (
            <div
              className={CategoryCellRendererChip}
              style={{
                backgroundColor: categoryData.bgColor,
                color: categoryData.color,
              }}
            >
              {categoryData.cellLabel}
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategoryCellRenderer;
