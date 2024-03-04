import MonitorGITChildLocationWiseCharts from "../MonitorGoodsInTransit/Child/Charts/LocationWise";
import MonitorGITChildCustomCharts from "../MonitorGoodsInTransit/Child/Charts/Custom";
import MonitorGITChildTransporterWiseCharts from '../MonitorGoodsInTransit/Child/Charts/TransporterWise';
import MonitorGITParent from "../MonitorGoodsInTransit/Parent";
import ExpediteDispatches from '../Expedite/Parent/Chart/ExpediteDispatches';

interface ChartViewProps {
    category:string,
    currentTab:string,
    currentGraphData:any

}
const ChartView = ({category,currentTab,currentGraphData}:ChartViewProps) => {
    const renderGraphs = ()=>{
        switch(category){
            case 'GITFromParent':
                return <MonitorGITParent data={currentGraphData?currentGraphData : []}/>
            case 'GITToChild':
                if(currentTab === 'locationWise'){
                    return (
                        <MonitorGITChildLocationWiseCharts
                            data={currentGraphData ? currentGraphData['locationWise']:[]}
                        />
                    )
                }
                if(currentTab === 'transporterWise'){
                    return (
                        <MonitorGITChildTransporterWiseCharts
                            data={currentGraphData ? currentGraphData['transporterWise']:[]}
                        />
                    )
                }
                if(currentTab === 'custom'){
                    return (
                        <MonitorGITChildCustomCharts/>
                    )
                }
                break;
            case 'ExpediteFromParent':
                if(currentTab === 'expediteDispatches'){
                    return (
                        <ExpediteDispatches
                            data={currentGraphData ? currentGraphData['expediteDispatches']:[]}
                        />
                    )
                }
                break;    
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