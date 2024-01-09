import { ICellRendererParams } from "ag-grid-enterprise"
import { LinkWrapper } from "./styles"

interface TaskPendingLinkCellRendererProps extends ICellRendererParams{
    onClick:(taskDetail:any)=>void
}

const TaskPendingLinkCellRenderer = (params:TaskPendingLinkCellRendererProps)=>{
    return(
        <LinkWrapper onClick={()=>params.onClick(params.data)}>
            {params.data.TaskName}
        </LinkWrapper>
    )
}

export default TaskPendingLinkCellRenderer