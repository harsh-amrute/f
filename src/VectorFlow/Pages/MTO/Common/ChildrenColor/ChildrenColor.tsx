import { ICellRendererParams } from "ag-grid-enterprise";
import { ProcPlanningChildrenColor, ChildrenColorCellRenderer } from "./styles";

const ChildrenColor = (props: ICellRendererParams) => {
    return (
        <ProcPlanningChildrenColor data-testid="children-cell-renderer">
            <ChildrenColorCellRenderer value={props.data.clr} />
        </ProcPlanningChildrenColor>
    );
};

export default ChildrenColor;



