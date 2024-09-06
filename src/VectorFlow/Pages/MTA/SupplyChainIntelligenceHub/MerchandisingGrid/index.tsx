import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import RetailActionToolBar from "../../../../../components/layouts/RetailActionToolBar"
import { useUserData } from "../../../../../context"
import useApproval from "./useApproval";
import OptionSelection from "./optionSelection";
import "./styles.css";



const MerchandisingGrid = () =>{
    const {
        MCGridColumnDefs,
        McGridRowData,
    } = useApproval()

    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    return (
    <>
    <RetailActionToolBar 
        themeUi={themeUi} 
        view={'grid'} 
        currentStatus={'Edit'}
        handleGoButton={()=>console.log('')} 
        handleOnCancel={()=>console.log('')} 
        handleSelectChange={()=>console.log('')} 
        onViewChange={()=>console.log('')} 
        onCallBack={()=>console.log('')}
        />

 
   <div className="ag-theme-mcgrid">

   <VFTable
            columnDefs={MCGridColumnDefs}
            rowData={McGridRowData}
           components={{
            optionSelection:OptionSelection,
           }}
            enableRangeSelection={true} 
            pagination={true}
            rowSelection="multiple"
              statusBar = {{
                statusPanels: [
                { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                { statusPanel: 'agTotalRowCountComponent', align:'left' },
                { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                { statusPanel: 'agAggregationComponent', align:'left' },
                ],
              }} 
            height={'400px'}
            disableZoomScaling={true}
              />
   </div>
        
        
        
    </>
    )
}

export default MerchandisingGrid