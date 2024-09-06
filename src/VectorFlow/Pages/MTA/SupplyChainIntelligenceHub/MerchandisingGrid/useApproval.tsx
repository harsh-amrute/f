import { ColDef, ColGroupDef } from "ag-grid-enterprise";
import OptionSelection from "./optionSelection";
import { useGetRemovalData } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/MerchandisingGrid";
import { useEffect, useMemo, useState } from "react";
import { notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { toast } from "react-toastify";
import { useUserData } from "../../../../../context"
import './styles.css'


const useApproval = () => {
  const [RemovalData, setRemovalData] = useState<any[]>([]);
  const { mutateAsync: getRemovalData } = useGetRemovalData();

  const {user} = useUserData()
  const themeUi = user.user.theme_ui

 
  const getRemovalRowData = async () => {
    notifyLoader("Loading grid data");
    const rowData = await getRemovalData({
      fulfillment: "incomplete",
      itr: "high",
    });
    toast.dismiss();
    notifySuccess("Data loaded successfully");
    setRemovalData(rowData?.data.data || []);
  };

  useEffect(() => {
    getRemovalRowData();
  }, []);
  
  const ActionIcon = (params:any) => {
    const [checkIcon, setCheckIcon] = useState('/assets/img/VectorFLOW/BPR/check-icon.svg')
    const [clockIcon, setClockIcon] = useState ('/assets/img/VectorFLOW/BPR/clock-icon.svg')

    const handleCheckIcon = () => {
      console.log('check clicked')
      setCheckIcon(themeUi === "REGALBLAZE" ? '/assets/img/VectorFLOW/BPR/check-icon-yellow.svg' : '/assets/img/VectorFLOW/BPR/check-icon-purple.svg')
    }

    const handleClockIcon = () => {
      console.log('clock clicked')
      setClockIcon(themeUi === "REGALBLAZE" ? '/assets/img/VectorFLOW/BPR/clock-icon-yellow.svg' : '/assets/img/VectorFLOW/BPR/clock-icon-purple.svg')
    }
    return (
      <div style={{justifyContent:'center', display:'flex',alignItems: 'center', height:'100%'}}>
        <img src={checkIcon} height ={20} width={20} style={{ marginRight: '30px', cursor:'pointer' }} onClick={handleCheckIcon}></img>
        <img src={clockIcon} height ={20} width={20} style={{ cursor:'pointer' }}  onClick={handleClockIcon}></img>
        {/* {params.value} */}
      </div>
    );
  };

  
  const MCGridColumnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
      {
          field: 'checkbox',
          colId: 'checkbox',
          headerName: '',
          floatingFilter: false,
          checkboxSelection: (params) => params.node.group === false,
          headerCheckboxSelectionCurrentPageOnly: true,
          width: 40,
          suppressColumnsToolPanel: true,
          filter: false,
          pinned: 'left', 
          
      },
      { field: 'group',colId:'group', headerName: 'group', rowGroup:true, hide:true },
      { field: 'gridId', colId:'gridId', headerName: 'Grid Id', },
      { field: 'attribute1', colId:'attribute1', headerName: 'Attribute 1', },
      { field: 'attribute2', colId:'attribute2', headerName: 'Attribute 2', },
      { field: 'attribute3', colId:'attribute3', headerName: 'Attribute 3', },
      { field: 'attribute4', colId:'attribute4', headerName: 'Attribute 4', },
      { field: 'min', colId:'min', headerName: 'Min', },
      { field: 'max', colId:'max', headerName: 'Max', },
      { field: 'totalOptions', colId:'totalOptions', headerName: 'Total Options', },
      { field: 'fullOptions', colId:'fulloptions', headerName: 'Full Options', },
      { field: 'totalOptionsAfterIstAndRep', colId:'totalOptionsAfterIstAndRep', headerName: 'Total Options', },
      { field: 'fullOptionsAfterIstAndRep', colId:'fullOptionsAfterIstAndRep', headerName: 'Full Options', },
      { field: 'gap', colId:'gap', headerName: 'Gap', },
      { field: 'warehouseAvailability', colId:'warehouseAvailability', headerName: 'Warehouse Availability', },
      // {
      //     field: 'Option Selection',
      //     headerName: 'Option Selection',
      //     cellEditor: 'agSelectCellEditor',
      //     editable: true,
      //     cellEditorParams: {
      //         values: ['Option 1', 'Option 2'],
      //         // valueListMaxHeight:60
      //     },
         
      // },
      {
        field: 'optionSelection',
        headerName: 'Option Selection',
        colId:'optionSelection',
        // cellRenderer:OptionSelection
        cellRenderer: (params:any) => {
          if (params.node.group === false) {
            return OptionSelection(params);
          }
          return null; 
        }   
      },
      { 
      field: 'Action', 
      headerName: 'Action',
      colId:'aption',
      cellRenderer: (params:any) => {
        if (params.node.group === false) {
          return ActionIcon(params);
        }
        return null; 
      }
    },
    
  ];
  

  const McGridRowData = RemovalData;
  console.log(RemovalData)
   





    return {
        MCGridColumnDefs,
        McGridRowData,
        // GridRef
        
    }
}
export default  useApproval
