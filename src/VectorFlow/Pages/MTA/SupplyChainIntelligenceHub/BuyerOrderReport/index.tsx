import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";

 import { BORLayout } from "./styles"
 import {useBOR} from "./useBOR"
 import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
 import ActionToolBar from "../Planning/ActionToolBar"
import { GridStateContext } from "../../../../../context/GridStateContext";

const BuyerOrderReport = ()=>{

    const {     
     isLoading,      
        BORColumns,
        agGridProps,
        rowData,       
        currentPage,
        recordCount,
        ref,
        columnState,
        isSavedDataLoading,
        handleChangePage,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack      
    } = useBOR()


    return(
     <GridStateContext.Provider
     value={{
        ref:ref,
        exportExcelColumns:exportExcelColumns,
        setExportExcelColumns:setExportExcelColumns,
        tempDownloadData:tempDownloadData,
        setTempDownloadData:setTempDownloadData,
        exportExcelRowData:exportExcelRowData,
        setExportExcelRowData:setExportExcelRowData

    }}
     >
        <ActionToolBar 
            view={'grid'} 
            setCurrentTab={''} 
            currCategory={'BOR'} 
            currentTab={''} 
            tabsList={[]} 
            onFloatingTabChange={()=>console.log('')} 
            onGoBack={()=>console.log('')} 
            onViewChange={()=>console.log('')}
            genericRecordCount={recordCount}
            onExportToExcelCallBack={onExportToExcelCallBack}
        />
        <BORLayout>
            {/* <BORTaskBar style={{width:'74%'}}>
                <VFButtonOutline
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Excel Export 
                </VFButtonOutline>
                <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Edit Filter
                </VFButton>
            </BORTaskBar> */}
            {(isLoading || isSavedDataLoading)?(
              <VFLoader/>
            ):
            (
              <div style={{height:'100vh'}}>
           
              <VFTable
               {...agGridProps}
                columnDefs={BORColumns}
                rowData={rowData}
                ref={ref}
                onGridReady={(params)=>{
                    if(columnState)params.columnApi.applyColumnState({state:columnState})
                }}
             />
              <VFPagination 
                selectedRows={0} 
                totalRows={recordCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')} 
                handleChangePage={(e)=>handleChangePage(e)} 
              />
              
             </div>
            )}
             <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    columnDefs={BORColumns}
                    rowData={exportExcelRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </BORLayout>
    </GridStateContext.Provider>
    )
}

export default BuyerOrderReport