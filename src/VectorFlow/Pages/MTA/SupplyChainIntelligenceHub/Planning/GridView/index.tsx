import { VFPaginationProps } from "../../../../../../components/VectorFLOW/commons/VFPagination";
import ExcessInventoryGrid from "../ExcessInventory/Grid";
import ExpediteChildGrid from "../Expedite/Child/Grid";
import ExpediteParentGrid from "../Expedite/Parent/Grid";
import MonitorGITChildLocationWiseGrid from "../MonitorGoodsInTransit/Child/Grid/LocationWise"
import MonitorGITChildTransporterWiseGrid from "../MonitorGoodsInTransit/Child/Grid/TransporterWise"
import MonitorGITParent from "../MonitorGoodsInTransit/Parent";
import OrderFulfillmentGrid from '../OrderFulfillment/Grid';


interface GridViewProps {
    category:string,
    currentTab:string,
    currentGridData:any,
    paginationProps:VFPaginationProps,
    onOpenDailyDataGraph:any

}
const GridView = ({category,currentTab,currentGridData,paginationProps,onOpenDailyDataGraph}:GridViewProps) => {
    const renderGrid = ()=>{
        switch(category){
            case 'GITFromParent':
                return <MonitorGITParent data={currentGridData} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>
            case 'GITToChild':
                if(currentTab==='locationWise') return <MonitorGITChildLocationWiseGrid data={currentGridData ? currentGridData['locationWise'] : []} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>
                else return <MonitorGITChildTransporterWiseGrid data={currentGridData ? currentGridData['transporterWise'] : []} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>
            case 'ExpediteFromParent':
                return <ExpediteParentGrid data={currentGridData ? currentGridData : []} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>  
            case 'ExpediteToChild':
                return <ExpediteChildGrid data={currentGridData ? currentGridData : []} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>    
            case 'ExcessInventory':
                return <ExcessInventoryGrid data={currentGridData ? currentGridData : []} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>
            case 'OrderFulfillment':
                return <OrderFulfillmentGrid data={currentGridData ? currentGridData : []} paginationProps={paginationProps} onOpenDailyDataGraph = {onOpenDailyDataGraph} currentCategory={category} currentTab={currentTab}/>
            default:
                return <></>
        }

    }
    
    return(
        <>
            {renderGrid()}
        </>
    )
    
}

export default GridView;