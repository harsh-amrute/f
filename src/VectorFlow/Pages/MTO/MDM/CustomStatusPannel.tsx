// Assuming GridFilterWrapper and TextBtn are styled components, not types
import React from "react";
import { gridFilterWrapper, textBtn } from "../Common/VFPagination/styles.css";

interface ClearAllFiltersProps {
  isDisabled: boolean;
  clearGridFilter: () => void;
  themeUi: any;
}

export const CustomStatusPanel: React.FC<ClearAllFiltersProps> = ({
  isDisabled,
  clearGridFilter,
  themeUi,
}) => {
  const brand = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";

  return (
    <div
      className={gridFilterWrapper}
      style={{ marginTop: "15px", paddingTop: "3px" }}
    >
      <button
        className={textBtn[brand]}
        onClick={clearGridFilter}
        disabled={isDisabled}
      >
        Clear All Grid Filters
      </button>
    </div>
  );
};
