
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { BPRLayout } from "./styles"
import BPRViewTable from "./BPRViewTable"
import { Allotment } from "allotment"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import useBPR from "./useBPR"
import BPRSubmiRemarkToolTip from "./BPRSubmitRemarkToolTip"

import "allotment/dist/style.css";
import BPRRemarkHistoryToolTip from "./BPRRemarkHistoryToolTip"
import ActionToolBar from "../Planning/ActionToolBar"
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal"
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable"
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination"
import { GridStateContext } from "../../../../../context/GridStateContext"



const BPR = ()=>{



  const {
        // isSideBarOpen,
        isSubGridOpen,
        isLoading ,
        activeRow,
        BPRColumns,
        BPRRowData,
        agGridProps,
        submitRemarkToolTipPosition,
        isSubmitRemarkToolTipOpen,
        remark,
        isRemarkHistoryToolTipOpen,
        remarkHistoryToolipPosition,
        remarkHistory,
        updateRemark,
        onCloseSubmitRemark,
        onSubmitRemark,
        onCloseRemarkHistory,
        dailyData,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        handleOnPageChange,
        recordCount,
        currGridPage,
        rowsPerPage,
        ref,
        columnState,
        isSavedDataLoading,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack
    } = useBPR();



    
    if(isLoading || isSavedDataLoading){
      return (
        <VFLoader/>
      )
    }


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
            currCategory={'BPR'} 
            currentTab={''} 
            tabsList={[]} 
            onFloatingTabChange={()=>console.log('')} 
            onGoBack={()=>console.log('')} 
            onViewChange={()=>console.log('')} 
            genericRecordCount={recordCount}
            onExportToExcelCallBack={onExportToExcelCallBack}
        />
        {
            showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} />
        }
        {
            showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />
        }
        
        <BPRLayout>
            {/* <BPRTaskBar style={{width:isSideBarOpen?'77%':'97%'}}>
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
            </BPRTaskBar> */}
            <div style={{height:'100vh',marginLeft:'45px'}}>
            <Allotment vertical defaultSizes={[400,100]}>
              <Allotment.Pane >
              <VFTable
                ref={ref}
                {...agGridProps}
                columnDefs={BPRColumns}
                rowData={BPRRowData}
                onGridReady={(params)=>{
                   if(columnState){
                    params.columnApi.applyColumnState({state:columnState})
                   }
                }}
            />
                <VFPagination
                    selectedRows={0}
                    totalRows={recordCount}
                    currentPage={currGridPage}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleOnPageChange}
                />
              </Allotment.Pane>
              <Allotment.Pane maxSize={300}>
              {isSubGridOpen && (
                <BPRViewTable
                    tablePrefixSrc="/assets/img/VectorFLOW/BPR/stock.svg"
                    rowData={activeRow}
                    colDefs={[
                        {
                            headerName:"LR Code",
                            colId:'lc',
                            field:'lc'
                        },
                        {
                            headerName:"Creation Date",
                            colId:'cd',
                            field:'cd'
                        },
                        {
                            headerName:"Ageing",
                            colId:'ag',
                            field:'ag'
                        },
                        {
                            headerName:"ETA",
                            colId:'eta',
                            field:'eta'
                        },
                        {
                            headerName:"Current Location",
                            colId:'cl',
                            field:'cl'
                        },
                        {
                            headerName:"Quantity",
                            colId:'qty',
                            field:'qty'
                        },
                        {
                            headerName:"Execution Eco Color",
                            colId:'exeecocolor',
                            field:'exeecocolor'
                        },
                        {
                            headerName:"Remarks",
                            colId:'remarks',
                            field:'remarks'
                        }
                    ]}
                />
            )}
              </Allotment.Pane>
            </Allotment>
            </div>
            {isSubmitRemarkToolTipOpen && (
                <BPRSubmiRemarkToolTip
                    remark={remark}
                    setRemark={updateRemark}
                    style={submitRemarkToolTipPosition}
                    onSuccess={onSubmitRemark}
                    onClose={onCloseSubmitRemark}
                />
            )}

            {isRemarkHistoryToolTipOpen && (
                <BPRRemarkHistoryToolTip
                    remarkHistory={remarkHistory}
                    onClose={onCloseRemarkHistory}
                    style={remarkHistoryToolipPosition}
                />
            )}
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    columnDefs={BPRColumns}
                    rowData={exportExcelRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </BPRLayout>
        </GridStateContext.Provider>
    )
            }

export default BPR
