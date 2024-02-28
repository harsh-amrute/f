import MonitorGITChildLocationWise from "../MonitorGoodsInTransit/Child/LocationWise";
import MonitorGITChildCustom from "../MonitorGoodsInTransit/Child/Custom";
import MonitorGITChildTransporterWise from '../MonitorGoodsInTransit/Child/TransporterWise';

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
                if(currentTab === 'transporterWise'){
                    return (
                        <MonitorGITChildTransporterWise
                            data={currentGraphData ? currentGraphData['transporterWise']:[]}
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
                break;
            case 'ExpediteFromParent':
                return <></>    
            case 'ExcessInventory':
                return <></>
            case 'OrderFulfillment':
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