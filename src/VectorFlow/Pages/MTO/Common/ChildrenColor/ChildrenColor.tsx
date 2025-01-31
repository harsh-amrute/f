import { ICellRendererParams } from "ag-grid-enterprise";
import Tooltip from "../Tooltip";
import { ProcPlanningChildrenColor, ChildrenColorCellRenderer, Tooltipcontainer } from "./styles";

const ChildrenColor = (props: ICellRendererParams) => {
    let str = ''
    if (props.data.clr === 'Purple') {
        str = "Full Kit"
    }
    else if (props.data.clr === 'Orange') {
        str = "Partial Kit"
    }
    return (
        str !== ""?
        <Tooltip  tooltipZoom='1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} content={<><Tooltipcontainer>{str}</Tooltipcontainer></>}>
            <ProcPlanningChildrenColor data-testid="children-cell-renderer">
                <ChildrenColorCellRenderer value={props.data.clr} 
            
                />
            </ProcPlanningChildrenColor>
        </Tooltip>
        : <ProcPlanningChildrenColor data-testid="children-cell-renderer">
                <ChildrenColorCellRenderer value={props.data.clr} />
        </ProcPlanningChildrenColor>
        
    );
};

export default ChildrenColor;



