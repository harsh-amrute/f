import React, { useEffect } from "react";
import MonitorGITChildLocationWise from "../MonitorGoodsInTransit/Child/LocationWise";
import MonitorGITChildCustom from "../MonitorGoodsInTransit/Child/Custom";

interface ChartViewProps {
    category:string,
    currentTab:string,
    currentGraphData:any

}
const ChartView = ({category,currentTab,currentGraphData}:ChartViewProps) => {
    const renderGraphs = ()=>{
        switch(category){
            case 'GITFromParent':
                return <></>
            case 'GITToChild':
                if(currentTab === 'locationWise'){
                    return (
                        <MonitorGITChildLocationWise
                            data={currentGraphData ? currentGraphData['locationWise']:[]}
                        />
                    )
                }
                if(currentTab === 'custom'){
                    return (
                        <MonitorGITChildCustom
                            data={currentGraphData ? currentGraphData:[]}
                        />
                    )
                }
                return <></>
                
                
            default:
                return <></>
        }

    }
    
    return(
        <>
            {renderGraphs()}
        </>
    )
    
}

export default ChartView;