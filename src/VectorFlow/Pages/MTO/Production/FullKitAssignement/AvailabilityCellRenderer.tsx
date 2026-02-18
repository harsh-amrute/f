import { ICellRendererParams } from "ag-grid-enterprise";
// import Tooltip from "../../../../../components/VectorFLOW/commons/MTO/Tooltip"
import {
  BTRAvailabiltyCellRenderer,
  progressVar,
} from "../../../MTA/InsightsAndTrends/BTR/styles.css";
import { BTRAvailabiltyCellRendererWrapper } from "./FullKitAssignment.css";
import { useUserData } from "../../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const AvailabilityCellRenderer = (props: ICellRendererParams) => {
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;
  return (
    <div
      className={BTRAvailabiltyCellRendererWrapper}
      data-testid="availability-cell-renderer"
    >
      {/* <Tooltip content={<div style={{padding:"1rem"}}>{props.data.fka}/{props.data.oq} kits can be manufactured</div>} zoom={1} style={{display:"flex", alignItems:"center", height:"100%"}}> */}
      <div
        className={BTRAvailabiltyCellRenderer}
        data-theme={themeUi}
        style={assignInlineVars({
          [progressVar]: `${props.value}%`,
        })}
      />
      {/* </Tooltip> */}
    </div>
  );
};

export default AvailabilityCellRenderer;
