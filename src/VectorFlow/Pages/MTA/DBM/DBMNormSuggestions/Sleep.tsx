import { DBMGraphCellRendererWrapper,DBMSleepCellRendererWrapper } from "./styles";
import {useGetDBMUpdateSleepTbl} from "../../../../Services/MTA/DBM"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import { useState } from "react";


 export const DBMGraphCellRenderer = (params:any)=>{

      const onChartClick = () => {
        params.onShowChart(params.data);
    }
    
    return(
        <DBMGraphCellRendererWrapper >
            <img src="/assets/img/VectorFLOW/NMS/seasonality-graph-icon.svg" height={28} width={28} onClick={onChartClick} data-testid="graph-icon"/>
        </DBMGraphCellRendererWrapper>
    )
}

export const DBMSleepCellRenderer = (params:any)=>{

    const {mutateAsync:getDBMUpdateSleepTbl,isLoading:isDBMUpdateSleepTbl} =useGetDBMUpdateSleepTbl();
    const [iconEnabled, setIconEnabled] = useState(true);
    // const gridRef = useRef<GridRef>();
    //const {mutateAsync:getDBMUpdateSleepTbl,isLoading:isDBMApplySelectedNorm} =useGetDBMUpdateSleepTbl();

    if(isDBMUpdateSleepTbl){
        return (
          <VFLoader/>
        )
      }

    const onSleepClick = async() => {
        if (!iconEnabled) return;
        const SKUCode = params.data.SKUCode;
        const WHCode = params.data.LocCode;
        const dataObject = { SKUCode, WHCode };
        //const jsonData = JSON.stringify(dataObject);
        //console.log(jsonData);
        setIconEnabled(false);

        await getDBMUpdateSleepTbl({
            data:dataObject,
        })
        params.callBack()
    }

    const enableIcon = () => {
        setIconEnabled(true);
    }
    
    
    return(
        <DBMSleepCellRendererWrapper >
            {/* <img src="/assets/img/VectorFLOW/NMS/search.svg" height={28} width={28} onClick={onSleepClick} data-testid="graph-icon"/> */}
            {/* <DBMSleepCellRendererWrapper> */}
            <img 
                src="/assets/img/SleepIconDBM.svg" 
                height={28} 
                width={28} 
                onClick={onSleepClick} 
                //data-testid="graph-icon"
                style={{ opacity: iconEnabled ? 1 : 0.3 }} 
                onAnimationEnd={enableIcon} 
            />
        {/* </DBMSleepCellRendererWrapper> */}
        </DBMSleepCellRendererWrapper>
    )
}




