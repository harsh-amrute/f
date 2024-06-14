import {useRef,useState,useEffect} from 'react'

import {RRRLayout} from './styles'
import useRRR from './useRRR';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import ActionToolBar from "../Planning/ActionToolBar"
import { GridStateContext } from '../../../../../context/GridStateContext';
import {useSelector}  from 'react-redux';
import {useGetState} from '../../../../Services/MTA/SupplyChainIntelligenceHub/BPR'
import { RootState } from '../../../../../redux/store/store';



const RRR = () => {

 const { 
  RRRColumns,
  agGridProps,
  RRRRowData, 
  isLoading,
  RRRDataCount,
  currentPage,
  tempRef,
  tempDownloadData,
  setTempDownloadData,
  tempAgGridProps,
  exportExcelRowData,
  setExportExcelRowData,
  exportExcelColumns,
  setExportExcelColumns,
  onExportToExcelCallBack,
  getRRRRowData,
  onApplyFilter,
  currFilter,
  setCurrFilter,
  onDelete
} = useRRR();
 const ref = useRef()

 const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
    const [columnState,setColumnState] = useState<any>()
    const {currentGridState} = useSelector((state:RootState)=>state.mta)
    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("RRR")
            setColumnState(JSON.parse(data.data.data))
          }catch(err:any){
            setColumnState(RRRColumns)
          }
        }
        getTableState()
    },[currentGridState])
 
  return (
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
    currCategory={'RRR'} 
    currentTab={''} 
    tabsList={[]} 
    onApplyFilter={(e)=>onApplyFilter(e)}
    onFloatingTabChange={()=>console.log('')} 
    onGoBack={()=>console.log('')} 
    onViewChange={()=>console.log('')}
    genericRecordCount={RRRDataCount}
    onExportToExcelCallBack={onExportToExcelCallBack}
    multiFilter={currFilter}
    setMultiFilter={setCurrFilter}
    onDelete={onDelete}
  />
    <RRRLayout>
        {/* <RRRTaskBar style={{width:isSideBarOpen? '77%':'97%'}}>
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
            <VFButton
                    themeUi="NOIRFUSION"
                    onClick={()=>console.log('')}
                >
                    Reset Filter
            </VFButton>
        </RRRTaskBar> */}
        {(isLoading || isSavedDataLoading)?(
          <VFLoader/>
        ):
        (
          <div style={{height:'100vh'}}>

          <VFTable
                  ref={ref}
                  {...agGridProps}
                  columnDefs={RRRColumns}
                  rowData={RRRRowData}
                  onGridReady={(params)=>{
                    if(columnState){
                      params.columnApi.applyColumnState({state:columnState})
                    }
                  }}
                  enableRangeSelection={true} // Added property
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
                  height={"90%"}
              />  
              <VFPagination 
                selectedRows={0} 
                totalRows={RRRDataCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '200')}
                handleChangePage={(e)=>getRRRRowData(e)} 
              />  
        </div>
        )}
        <div style={{display:'none'}}>                
          <VFTable
            ref={tempRef}
            columnDefs={RRRColumns}
            rowData={exportExcelRowData}
            {...tempAgGridProps}
          />
        </div>
    </RRRLayout>
  </GridStateContext.Provider>
  )
}

export default RRR