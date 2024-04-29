import { AgeingCellRendererWrapper } from "./styles"
import {useState} from 'react';
export const AgeingCellRenderer = (params:any)=>{
    const [warningIcon,setWarningIcon] = useState('/assets/img/VectorFLOW/BPR/ageing-warning.svg');


    if(parseInt(params.data['AgeingOrder'],10) > 0){
        return(
            <AgeingCellRendererWrapper>
                <img src={warningIcon} height={28} width={28} data-testid="ageing-warning-icon" onMouseEnter={()=>setWarningIcon('/assets/img/VectorFLOW/BPR/ageing-warning-hover.svg')} onMouseLeave={()=>setWarningIcon('/assets/img/VectorFLOW/BPR/ageing-warning.svg')}/>
            </AgeingCellRendererWrapper>
        )
    }
    return <></>
    
}