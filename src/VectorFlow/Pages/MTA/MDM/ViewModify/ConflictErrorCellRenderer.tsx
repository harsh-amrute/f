
import { CSSProperties, useState } from "react"
import Portal from "../../../../../components/VectorFLOW/layouts/Portal"


import {ConflictErrorToolTipSection, ConflictErrorToolTipWrapper,ConflictErrorText, ToolTipTriangle} from './styles' 



const ConflictErrorCellRenderer = (params:any)=>{

    const [isToolTipOpen,setIsToolTipOpen] = useState(false)
    const [tooltipPosition,setToolTipPosition] = useState<CSSProperties>()
    const [isToolTipOverflowing,setIsToolTipOverflowing] = useState<boolean>(false)

    const currColumn = params.colDef?.colId || ''

    const getTextColor = () => {
        console.debug(params)
        let conflictFound = false;
        const currentColId = params.colDef?.colId;
        const currentRow = params.data;
    
        if (!currentRow.users) return 'black';
        currentRow.users.some((user: any) => {
            if (currentColId) {
                if (user.data[currentColId] !== currentRow[currentColId]) {
                    conflictFound = true;
                    return true; 
                }
            }
            return false;
        });
        if (conflictFound) {
            return "rgb(130, 15, 76)";
        }
        return 'black';
    }

    const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        
        const tooltipHeight = params.data.users.length * 40;
        const viewportHeight = window.innerHeight;
        console.debug(top)
        console.debug(viewportHeight)
    
    
        let tooltipTop = top * 0.75 * 0.75 + 35;
    
        if (tooltipTop + tooltipHeight > viewportHeight) {
            tooltipTop = top * 0.75 * 0.75 - tooltipHeight -10;
            setIsToolTipOverflowing(true)
        }
    
        setToolTipPosition({
            left: left * 0.75 * 0.75 - 25,
            top: tooltipTop
        });
        setIsToolTipOpen(true);
    }

    const onMouseOut = ()=>{
        setIsToolTipOpen(false)
    }
    return(
        <div style={{height:'100%',width:'100%'}}  onMouseEnter={onMouseIn} onMouseLeave={onMouseOut} >
            <p  style={{color:getTextColor(),zIndex:-10,textOverflow:'ellipsis',display:"block",overflow:"hidden"}}>
                {params.value}           
            </p>
           {params.data.users && isToolTipOpen && (
             <Portal wrapperId="conflict-tooltip">
                <ConflictErrorToolTipWrapper style={{...tooltipPosition}}>
                    {!isToolTipOverflowing && (
                        <div style={{position:'relative',width:'100%'}}>
                            <ToolTipTriangle style={{top:-18}}/>
                        </div>
                    )}
                    {params.data.users.map((user:any,index:number)=>{
                        return (
                            <ConflictErrorToolTipSection key={index} style={{borderBottom:index<params.data.users.length-1?'1px solid gray':'unset'}}>
                                <ConflictErrorText><b>User</b> : {user.user}</ConflictErrorText>
                                <ConflictErrorText><b>{params.colDef?.headerName}</b> : {!user.data[currColumn]?"NULL":user.data[currColumn]}</ConflictErrorText>
                            </ConflictErrorToolTipSection>
                        )
                    })}
                    {isToolTipOverflowing && (
                         <div style={{position:'relative',width:'100%'}}>
                            <ToolTipTriangle style={{top:'unset',bottom:-18,transform:'rotate(180deg)'}}/>
                        </div>
                    )}
                </ConflictErrorToolTipWrapper>
             </Portal>
           )}
        </div>
    )
}

export default ConflictErrorCellRenderer