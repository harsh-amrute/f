import { ColDef, ColGroupDef,IRichCellEditorParams,ICellEditorParams,ValueFormatterParams} from "ag-grid-enterprise";
import { useGetRemovalData } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/MCGrid";
import { useEffect, useState, useMemo } from "react";
import { notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { toast } from "react-toastify";
import { useUserData } from "../../../../../context"
import './styles.css'
import {  } from "../../../../..";
import { AgGridReactProps } from "ag-grid-react";



const useApproval = () => {
  const [RemovalData, setRemovalData] = useState<any[]>([]);
  const { mutateAsync: getRemovalData } = useGetRemovalData();
  const [selected, setSelectedOption] = useState('');

  const [rowDataOptions,setRowDataOptions]:any = useState([]);

  const onSelectChange = (params: any) => {
    console.log('Selection changed:', params.value);
    setSelectedOption(params.value);

  };

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
    let data = rowData?.data.data || [];
    data = data.map((row:any)=>{
      return {
        ...row,
        action:''
      }
    })
    setRemovalData([...data]);
    const options = data.map((row:any) => {
      return {
        gridId:row.gridId,
        group:row.group,
        optionSelection:[...row.optionSelection]
      }
    })
    setRowDataOptions([...options]);
  };

  useEffect(() => {
    getRemovalRowData();
  }, []);
  
  const ActionIcon = (params: any) => {
    console.log(params);
    const handleIconClick = (action:string) => {
    
      const currentRow = RemovalData.find((item) => (item.gridId === params.data.gridId) && (item.group === params.data.group));

      if(currentRow){
        if(currentRow.action === action) currentRow.action = '';
        else currentRow.action = action;
      }
      setRemovalData([...RemovalData])
    };

    const getIconSrc = (icon: any,actionStatus:string,params:any) => {
      const currentAction = params.data.action;
      if(icon && actionStatus === currentAction) {
        return themeUi === "REGALBLAZE"
          ? `/assets/img/VectorFLOW/BPR/${icon}-icon-yellow.svg`
          : `/assets/img/VectorFLOW/BPR/${icon}-icon-purple.svg`;
      } else {
        return `/assets/img/VectorFLOW/BPR/${icon}-icon.svg`;
      }
    };
  
    return (
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center", height: "100%", }}>
        <img src={getIconSrc("check","accept",params)} height={20} width={20} style={{ marginRight: "30px", cursor: "pointer" }} onClick={() => handleIconClick("accept")}/>
        <img src={getIconSrc("clock","sleep",params)} height={20} width={20} style={{ cursor: "pointer" }} onClick={() => handleIconClick("sleep")}/>
      </div>
    );
  };
 
  const optionsCellRenderer = (props:any) => {
    return <div style={{}}>{props.value + ''}</div>
  }

  const getOptionsFromData = (params: ICellEditorParams)  => {
    const gridId = params.data.gridId;
    const group = params.data.group;
    const row ={...rowDataOptions.find((data:any)=>(data.gridId === gridId) && (data.group === group))};
    if(row) return row.optionSelection;
    return [];
  }

  const valueFormatter = (params: ValueFormatterParams) => {
    const { value } = params;
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  const VerticalTextCellRenderer = (params:any) => {
    if(params.node.rowIndex === 0){
      return (
        <div className="show-name"></div>
      );
    }
    else{
      return (
        <div className="show-name">Aka</div>
      );
    }
    return;
    
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
      { field: 'group',colId:'group', headerName: 'group', rowGroup:true, hide:true},

      { field: 'gridId', colId:'gridId', headerName: 'Grid Id', },
      { field: 'attribute1', colId:'attribute1', headerName: 'Attribute 1', },
      { field: 'attribute2', colId:'attribute2', headerName: 'Attribute 2', },
      { field: 'attribute3', colId:'attribute3', headerName: 'Attribute 3', },
      { field: 'attribute4', colId:'attribute4', headerName: 'Attribute 4', },
      { field: 'min', colId:'min', headerName: 'Min', },
      { field: 'max', colId:'max', headerName: 'Max', },
      { field: 'totalOptions', colId:'totalOptions', headerName: 'Total Options', },
      { field: 'fullOptions', colId:'fulloptions', headerName: 'Full Options', },
      { field: 'divider', colId:'divider', width: 40, resizable:false,cellDataType:false,
        rowSpan:()=>{return 5},        
      cellRenderer:VerticalTextCellRenderer,
      cellStyle:{
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
      },
      cellClassRules: {
        "show-cell":"value !== undefined"
      }
      },
      { field: 'totalOptionsAfterIstAndRep', colId:'totalOptionsAfterIstAndRep', headerName: 'Total Options',  },
      { field: 'fullOptionsAfterIstAndRep', colId:'fullOptionsAfterIstAndRep', headerName: 'Full Options', },
      { field: 'gap', colId:'gap', headerName: 'Gap', },
      { field: 'warehouseAvailability', colId:'warehouseAvailability', headerName: 'Warehouse Availability', },
      {
          field: 'optionSelection',
          headerName: 'Option Selection',
          cellEditor: 'agRichSelectCellEditor',
          editable: true,
          valueFormatter:valueFormatter,
          cellEditorParams: {
            values: getOptionsFromData,
            cellHeight:25,
            cellRenderer: optionsCellRenderer,
            multiSelect: true,
            valueListMaxHeight: 220,
            onChange:onSelectChange,
            suppressDeselectAll:true,
            suppressMultiSelectPillRenderer:true,
            valuePlaceholder:'Please Select Atleast One Option'
          } as IRichCellEditorParams  
      },
      { 
      field: 'action', 
      headerName: 'Action',
      colId:'action',
      cellRenderer: (params:any) => {
        if (params.node.group === false) {
          return ActionIcon(params);
        }
        return null; 
      }
    },  
  ];

  const gridOptions = {
    rowHeight: 35,
    columnDefs: MCGridColumnDefs,
    suppressRowClickSelection:true
  }
  
  const agGridProps: AgGridReactProps = useMemo(() => {
    return{
      groupDefaultExpanded:1,   
    }
  },[])

  const McGridRowData = [...RemovalData];
  // console.log(RemovalData)
   
    return {
        MCGridColumnDefs,
        McGridRowData,
        gridOptions,
        agGridProps  ,
        selected      
    }
}
export default  useApproval
