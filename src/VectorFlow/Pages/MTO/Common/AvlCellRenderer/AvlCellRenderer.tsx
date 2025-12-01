import { ICellRendererParams } from "ag-grid-enterprise";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  availabiltyCellRendererWrapper,
  availabiltyCellRenderer,
  fillWidthVar,
  gradientVar,
} from "./styles.css";
import { useUserData } from "../../../../../context";
const AvlCellRenderer = (props: ICellRendererParams) => {
  const { user } = useUserData();

  const formatNumber = (num: any) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + "L";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num;
    }
  };
  const themeUi = user?.user?.theme_ui;

  // width percentage for the bar, clamped to [0, 100]
  const raw = Number(props?.data?.fkapr ?? 0);
  // const safeWidth = Math.max(0, Math.min(100, raw));

  const gradient =
    themeUi === "REGALBLAZE"
      ? "linear-gradient(90deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box"
      : "linear-gradient(90deg, #EB73B3 0%, #820F4C 100%) 0% 0% no-repeat padding-box";

  return (
    <div
      className={availabiltyCellRendererWrapper}
      data-testid="avl-cell-renderer"
    >
      <div>{formatNumber(props.data.fka)}</div>
      <div
        className={availabiltyCellRenderer}
        style={assignInlineVars({
          [fillWidthVar]: `${raw}%`,
          [gradientVar]: gradient,
        })}
      />
    </div>
  );
};

export default AvlCellRenderer;
