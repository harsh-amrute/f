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
    currentGridData:any

}
const GridView = ({category,currentTab,currentGridData}:GridViewProps) => {
    const renderGrid = ()=>{
        switch(category){
            case 'GITFromParent':
                return <MonitorGITParent data={currentGridData}/>
            case 'GITToChild':
                if(currentTab==='locationWise') return <MonitorGITChildLocationWiseGrid data={currentGridData ? currentGridData['locationWise'] : []}/>
                else return <MonitorGITChildTransporterWiseGrid data={currentGridData ? currentGridData['transporterWise'] : []}/>
            case 'ExpediteFromParent':
                return <ExpediteParentGrid data={currentGridData ? currentGridData : []}/>  
            case 'ExpediteToChild':
                return <ExpediteChildGrid data={currentGridData ? currentGridData : []}/>    
            case 'ExcessInventory':
                return <ExcessInventoryGrid data={currentGridData ? currentGridData : []}/>
            case 'OrderFulfillment':
                return <OrderFulfillmentGrid data={currentGridData ? currentGridData : []}/>
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