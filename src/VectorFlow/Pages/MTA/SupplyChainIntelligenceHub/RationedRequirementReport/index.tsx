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
  isLoading
  ,handleChangePage,
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
  onExportToExcelCallBack
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
    currCategory={'BPR'} 
    currentTab={''} 
    tabsList={[]} 
    onFloatingTabChange={()=>console.log('')} 
    onGoBack={()=>console.log('')} 
    onViewChange={()=>console.log('')}
    genericRecordCount={RRRDataCount}
    onExportToExcelCallBack={onExportToExcelCallBack}
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
          <div style={{height:'100vf'}}>

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
              />  
              <VFPagination 
                selectedRows={0} 
                totalRows={RRRDataCount} 
                currentPage={currentPage} 
                rowsPerPage={parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '200')}
                handleChangePage={(e)=>handleChangePage(e)} 
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