import useSupplierDispatchReport from "./useSupplierDispatchReport";
import { AgGridReactProps } from "ag-grid-react";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import { GridStateContext } from "../../../../../context/GridStateContext";
import { useRef, useEffect } from "react";
import { VDRLayout } from "./styles";
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import ActionToolBar from "../Planning/ActionToolBar";
import {useGetState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR/index'
import { notifyError } from "../../../../../helpers/notify";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";

const SupplierDispatchReport = () => {
  

  const {
    VDRColumns,
    RowData,
    SDRCount,
    currentPage,
    setExportExcelColumns,
    exportExcelColumns,
    tempDownloadData,
    setTempDownloadData,
    exportExcelRowData,
    setExportExcelRowData,
    isLoading,
    GetSDRData,
    tempRef,
    tempAgGridProps,
    customCellRenderers,
    currFilter,
    setCurrFilter,
    onDeleteFilter,
    onExportToExcelCallBack,
    onApplyFilter
  } = useSupplierDispatchReport();
  

  const ref = useRef<any>();
  const {mutateAsync:getState} = useGetState()
    useEffect(()=>{
        const getTableState = async()=>{
          if(ref && ref.current) {
            try{
              const data =  await getState(`SDR`)
              const {columns} = JSON.parse(data.data.data)
            
              ref.current.api.applyColumnState({state:columns})
            }catch(err:any){
              notifyError(err)
            }
          }
          
        }
       getTableState()
    },[ref])
  const agGridProps: AgGridReactProps = {
    paginationPageSize: parseInt(
      process.env.REACT_APP_GUIDEDINSIGHT_ROWS_PER_PAGE || "50"
    ),

    suppressRowTransform: true,
    tooltipShowDelay: 0.3,
    tooltipTrigger: "focus",
    tooltipInteraction: true,
    readOnlyEdit: true,
    
    gridOptions: {
      sideBar: defaultAgGridSideBarForBPR,
      rowHeight: 50,
      getRowStyle: (params: any) => {
        if (params.node.rowIndex % 2 === 0) {
          return { background: "#EBEBEB" };
        }
        return { background: "#F7F7F7" };
      },
    },
    enableRangeSelection: true,
    components:customCellRenderers,
    rowSelection: "multiple",
    statusBar: {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "left" },
        { statusPanel: "agFilteredRowCountComponent", align: "left" },
        { statusPanel: "agSelectedRowCountComponent", align: "left" },
        { statusPanel: "agAggregationComponent", align: "left" },
      ],
    },
    pagination: false,
    suppressRowClickSelection: true,

    defaultColDef: {
      floatingFilter: true,
      resizable: false,
      cellStyle: {
        flex: 1,
        "text-align": "center",
        height: "50px",
        "font-style": "normal",
        " font-variant": "normal",
        " font-weight": "300",
        " font-size": "20px",
        " font-family": "Roboto",
        display: "block",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
      },
    },
  };
  return (
    <GridStateContext.Provider
      value={{
        ref: ref,
        exportExcelColumns: exportExcelColumns,
        setExportExcelColumns: setExportExcelColumns,
        tempDownloadData: tempDownloadData,
        setTempDownloadData: setTempDownloadData,
        exportExcelRowData: exportExcelRowData,
        setExportExcelRowData: setExportExcelRowData,
      }}
    >
      <div style={{marginLeft:'10px'}}>
      <ActionToolBar 
        view={'grid'} 
        setCurrentTab={''} 
        currCategory={'SDR'} 
        currentTab={''} 
        tabsList={[]} 
        onApplyFilter={(e)=>onApplyFilter(e)}
        onFloatingTabChange={()=>console.log('')} 
        onGoBack={()=>console.log('')} 
        onViewChange={()=>console.log('')}
        genericRecordCount={SDRCount}
        onExportToExcelCallBack={onExportToExcelCallBack}
        multiFilter={currFilter}
        setMultiFilter={setCurrFilter}
        onDelete={onDeleteFilter}
      />
      </div>
      <VDRLayout>
      {(isLoading )?(
          <VFLoader/>
        ):
      (<div style={{height:'100vh'}}>
       <VFTable
                  ref={ref}
                  {...agGridProps}
                  columnDefs={VDRColumns}
                  rowData={RowData}
                  height={'90%'}
        />
        <VFPagination 
                selectedRows={0} 
                totalRows={SDRCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')}
                handleChangePage={(e)=>GetSDRData(e)} 
              />
        </div>
      )}
      <div style={{display:'none'}}>                
          <VFTable
            ref={tempRef}
            columnDefs={VDRColumns}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
          />
        </div>
      </VDRLayout>
    </GridStateContext.Provider>
  );
};

export default SupplierDispatchReport;
