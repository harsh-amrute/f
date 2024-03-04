import MonitorGITChildLocationWiseGrid from "../MonitorGoodsInTransit/Child/Grid/LocationWise"
import MonitorGITChildTransporterWiseGrid from "../MonitorGoodsInTransit/Child/Grid/TransporterWise"
import MonitorGITParent from "../MonitorGoodsInTransit/Parent";


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
            {renderGrid()}
        </>
    )
    
}

export default GridView;