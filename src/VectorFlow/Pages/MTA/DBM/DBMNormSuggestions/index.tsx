import {DBMLayout} from './styles'
import useDBM from './useDBM';
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import DailyDataGraphModal from '../../../../../components/VectorFLOW/commons/DailyDataGraphModal';
import NormChangeHistoryTable from '../../../../../components/VectorFLOW/commons/NormChangeHistoryTable';

const DBM = () => {

 const { 
  isLoading,
  DBMColumns,
  agGridProps,
  DBMRowData,
  handleChangePage,
  DBMDataCount,
  currentPage,
  gridRef,
  showAllCheckbox,
  handleGoButton,
  showDailyDataGraphModal,
  showNormChangeHistoryTable,
  dailyData
} = useDBM();

 if(isLoading){
  return (
    <VFLoader/>
  )
}

  return (
    <>
      <ActionToolBar view={'grid'} setCurrentTab={()=>{return}} currCategory={'DBMNorm'} currentTab={''} tabsList={[]} onFloatingTabChange={()=>console.log('')} onGoBack={()=>console.log('')} onViewChange={()=>console.log('')} showAllTick={showAllCheckbox} handleGoButton={handleGoButton} genericRecordCount={0} onExportToExcelCallBack={()=>console.log('')}/>
      <DBMLayout>
        <div style={{height:'100vf'}}>
            {
                showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} skuKey={'SKUCode'} whKey={'WHCode'} />
            }
            {
                showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />
            }

          <VFTable
                  {...agGridProps}
                  columnDefs={DBMColumns}
                  rowData={DBMRowData}
                  ref={gridRef}
                  height={800}
              /> 
          <VFPagination 
                selectedRows={0} 
                totalRows={DBMDataCount} 
                currentPage={currentPage} 
                rowsPerPage={50}
                handleChangePage={(e)=>handleChangePage(e)} 
              />  
        </div>
      </DBMLayout>
    </>
  )
}

export default DBM