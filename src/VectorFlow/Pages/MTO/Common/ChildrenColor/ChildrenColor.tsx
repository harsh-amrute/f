import { ICellRendererParams } from "ag-grid-enterprise";
import Tooltip from "../Tooltip";
import {
  ProcPlanningChildrenColor,
  ChildrenColorCellRenderer,
  Tooltipcontainer,
  vDotColor,
} from "./styles.css";
import _ from "lodash";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const ChildrenColor = (props: ICellRendererParams) => {
  if (_.isEmpty(props.data)) {
    return <></>;
  }

  // same mapping you had in styled-components
  const determineColor = (value?: string) => {
    switch (value) {
      case "Red":
        return "Red";
      case "Yellow":
        return "Yellow";
      case "Black":
        return "Black";
      case "Green":
        return "Green";
      case "Orange":
        return "Orange";
      case "Blue":
        return "Blue";
      case "Purple":
        return "#BC3D81";
      case "White":
        return "#A8A8A8";
      default:
        return "#A8A8A8"; // sensible fallback
    }
  };

  let str = "";
  if (props.data.clr === "Purple") {
    str = "Full Kit";
  } else if (props.data.clr === "Orange") {
    str = "Partial Kit/No kit";
  }
  return str !== "" ? (
    <Tooltip
      disableStyleInjection="core"
      tooltipZoom="1"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      content={
        <>
          <div className={Tooltipcontainer}>{str}</div>
        </>
      }
    >
      <div
        className={ProcPlanningChildrenColor}
        data-testid="children-cell-renderer"
      >
        <div
          className={ChildrenColorCellRenderer}
          style={assignInlineVars({
            [vDotColor]: determineColor(props.data?.clr) ?? "transparent",
          })}
        />
      </div>
    </Tooltip>
  ) : (
    <div
      className={ProcPlanningChildrenColor}
      data-testid="children-cell-renderer"
    >
      <div
        className={ChildrenColorCellRenderer}
        style={assignInlineVars({
          [vDotColor]: determineColor(props.data?.clr) ?? "transparent",
        })}
      />
    </div>
  );
};

export default ChildrenColor;
