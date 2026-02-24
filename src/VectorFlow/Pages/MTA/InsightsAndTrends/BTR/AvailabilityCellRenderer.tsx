import { ICellRendererParams } from "ag-grid-enterprise";

import {
  BTRAvailabiltyCellRenderer,
  BTRAvailabiltyCellRendererWrapper,
  progressVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { useUserData } from "../../../../../context";
const AvailabilityCellRenderer = (props: ICellRendererParams) => {
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <div
      className={BTRAvailabiltyCellRendererWrapper}
      data-testid="availability-cell-renderer"
    >
      <div
        className={BTRAvailabiltyCellRenderer}
        data-theme={themeUi}
        style={assignInlineVars({
          [progressVar]: `${props.value}%`,
        })}
      />
    </div>
  );
};

export default AvailabilityCellRenderer;
