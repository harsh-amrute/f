import { ICellRendererParams } from "ag-grid-enterprise"

import { generateRandomId } from "../../../../../helpers/utils"

interface ConflictErrorCellRendererProps extends ICellRendererParams{
    onClick:(taskDetail:any)=>void
}

const ConflictErrorCellRenderer = (params:ConflictErrorCellRendererProps)=>{

    console.log(params)

    const toolTipId = generateRandomId()

    const getTextColor = ()=>{
        let conflictFound = false
        const currentColId = params.colDef?.colId
        const currentRow = params.data
        currentRow.users.map((user:any)=>{
           if(currentColId){
            if(user.data[currentColId]!==currentRow[currentColId]){
                conflictFound = true 
            }
           }
        })
        if(conflictFound){
          return "rgb(130, 15, 76)"
        }
        return 'black'

    }
    return(
        <div data-tooltip-id={toolTipId} style={{height:'100%',width:'100%',position:"relative"}}>
        <p  style={{color:getTextColor(),zIndex:100}}>
            {params.value}
            
        </p>
     </div>
    )
}

export default ConflictErrorCellRenderer