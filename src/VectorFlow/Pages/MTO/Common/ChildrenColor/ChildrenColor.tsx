import { ICellRendererParams } from "ag-grid-enterprise";
import Tooltip from "../../../../../components/VectorFLOW/commons/MTO/Tooltip";
import { ProcPlanningChildrenColor, ChildrenColorCellRenderer, Tooltipcontainer } from "./styles";

const ChildrenColor = (props: ICellRendererParams) => {
    return (
        <Tooltip tooltipZoom={0.75} content={<><Tooltipcontainer>Partial Kit</Tooltipcontainer></>}>
            <ProcPlanningChildrenColor data-testid="children-cell-renderer">
                <ChildrenColorCellRenderer value={props.data.clr} />
            </ProcPlanningChildrenColor>
        </Tooltip>
    );
};

export default ChildrenColor;



