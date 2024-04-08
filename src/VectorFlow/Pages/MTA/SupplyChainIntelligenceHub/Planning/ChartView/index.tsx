import MonitorGITChildLocationWiseCharts from "../MonitorGoodsInTransit/Child/Charts/LocationWise";
import MonitorGITChildCustomCharts from "../MonitorGoodsInTransit/Child/Charts/Custom";
import MonitorGITChildTransporterWiseCharts from '../MonitorGoodsInTransit/Child/Charts/TransporterWise';
import MonitorGITParent from "../MonitorGoodsInTransit/Parent";
import ExpediteDispatches from '../Expedite/Parent/Chart/ExpediteDispatches';
import ExpediteDispatchesChild from "../Expedite/Child/Chart/ExpediteDispatches";
import CreateAvailabilityAtParent from "../Expedite/Parent/Chart/CreateAvailabilityAtParent";
import ExpediteParentCustomCharts from "../Expedite/Parent/Chart/Custom";
import ExpediteChildCustomCharts from "../Expedite/Child/Chart/Custom";
import ExcessInventoryLocation from "../ExcessInventory/Chart/ExcessInventoryLocationWise";
import ExcessInventoryProduct from "../ExcessInventory/Chart/ExcessInventoryProductWise";
import ExcessInventoryCustomCharts from "../ExcessInventory/Chart/Custom";
import OrderFulfillmentLocation from '../OrderFulfillment/Chart/OrderFulfillmentLocationWise';
import OrderFulfillmentProduct from '../OrderFulfillment/Chart/OrderFulfillmentProductWise';
import OrderFulfillmentCustomCharts from '../OrderFulfillment/Chart/Custom';


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
                if(currentTab === 'createAvailabilityAtParent'){
                    return (
                        <CreateAvailabilityAtParent
                            data={currentGraphData ? currentGraphData['createAvailabilityAtParent']:[]}
                        />
                    )
                }
                if(currentTab === 'custom'){
                    return (
                        <ExpediteParentCustomCharts/>
                    )
                }
                break; 
            case 'ExpediteToChild':
                if(currentTab === 'expediteDispatches'){
                    return (
                        <ExpediteDispatchesChild
                            data={currentGraphData ? currentGraphData['expediteDispatches']:[]}
                        />
                    )
                }
                if(currentTab === 'custom'){
                    return (
                        <ExpediteChildCustomCharts/>
                    )
                }
                break;   
            case 'ExcessInventory':
                if(currentTab === 'excessInventoryLocation'){
                    return (
                        <ExcessInventoryLocation
                            data={currentGraphData ? currentGraphData:[]}
                        />
                    )
                }
                if(currentTab === 'excessInventoryProduct'){
                    return (
                        <ExcessInventoryProduct
                            data={currentGraphData ? currentGraphData:[]}
                        />
                    )
                }
                if(currentTab === 'custom'){
                    return(
                        <ExcessInventoryCustomCharts/>
                    )
                }
                break;
            case 'OrderFulfillment':
                if(currentTab === 'orderFulfillmentLocation'){
                    return (
                        <OrderFulfillmentLocation
                            data={currentGraphData ? currentGraphData:[]}
                        />
                    )
                }
                if(currentTab === 'orderFulfillmentProduct'){
                    return (
                        <OrderFulfillmentProduct
                            data={currentGraphData ? currentGraphData:[]}
                        />
                    )
                }
                if(currentTab === 'custom'){
                    return (
                        <OrderFulfillmentCustomCharts/>
                    )
                }
                break;
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