import { ICellRendererParams } from "ag-grid-enterprise";
import Tooltip from "../../../../../components/VectorFLOW/commons/MTO/Tooltip";
import { ProcPlanningChildrenColor, ChildrenColorCellRenderer, Tooltipcontainer } from "./styles";

const ChildrenColor = (props: ICellRendererParams) => {
    console.log("color cell params", props);
    let str = ''

    if (props.data.rmall === 0) {
        str = 'No Kit'
    }
    else if (props.data.rmqty > props.data.rmall) {
        str = "Partial Kit"
    }
    else if (props.data.rmall >= props.data.rmqty) {
        str = "Full Kit"
    }
    return (
        // <Tooltip tooltipZoom={0.75} content={<><Tooltipcontainer>{str}</Tooltipcontainer></>}>
        <ProcPlanningChildrenColor data-testid="children-cell-renderer">
            <ChildrenColorCellRenderer value={props.data.clr} />
        </ProcPlanningChildrenColor>
        // </Tooltip>
    );
};

export default ChildrenColor;



