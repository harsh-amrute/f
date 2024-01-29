import { ICellRendererParams } from "ag-grid-enterprise"
import { useState } from "react"


import {ConflictErrorToolTipSection, ConflictErrorToolTipWrapper,ConflictErrorText} from './styles' 

interface ConflictErrorCellRendererProps extends ICellRendererParams{
    onClick:(taskDetail:any)=>void
}

const ConflictErrorCellRenderer = (params:ConflictErrorCellRendererProps)=>{
    
    const [isToolTipOpen,setIsToolTipOpen] = useState(false)

    const currColumn = params.colDef?.colId || ''

    const getTextColor = ()=>{
        let conflictFound = false
        const currentColId = params.colDef?.colId
        const currentRow = params.data
        if(!currentRow.users)return 
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
        <div style={{height:'100%',width:'100%'}}  onMouseEnter={()=>setIsToolTipOpen(true)} onMouseLeave={()=>setIsToolTipOpen(false)} >
            <p  style={{color:getTextColor(),zIndex:-10}}>
                {params.value}           
            </p>
           {params.data.users && isToolTipOpen && (
             <ConflictErrorToolTipWrapper>
                {params.data.users && params.data.users.map((user:any)=>{
                    return (
                        <ConflictErrorToolTipSection>
                            <ConflictErrorText><b>User</b> : {user.user}</ConflictErrorText>
                            <ConflictErrorText><b>{params.colDef?.headerName}</b> : {!user.data[currColumn]?"NULL":user.data[currColumn]}</ConflictErrorText>
                        </ConflictErrorToolTipSection>
                    )
                })}
            </ConflictErrorToolTipWrapper>
           )}
        </div>
    )
}

export default ConflictErrorCellRenderer