
import { useEffect } from 'react'
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from './useBufferTrends';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';

import ChartView from '../../InsightsAndTrends/BufferTrends/ChartView';
import BPRViewTable from '../../SupplyChainIntelligenceHub/BPR/BPRViewTable';
import { ColDef } from 'ag-grid-enterprise';
import { Allotment } from 'allotment';

const BufferTrends = () => {

   const {currentTab,onFloatingTabChange,currentView,currentGraphData,summaryData,availability,BufferTrendsDataLoad,isLoading,
    currentPageTab,onFloatingTabChangeOnPages,graphs,updateGraphState,setHorizondays,handleSubmitClick,horizonDays
    ,onGoBack,handleApplyFilter,multiFilterState,
    setMultiFilterState,
    onDeleteFilter,} =useBufferTrends();
   
    const summaryColumnDefs :ColDef[]= [
    { headerName: '', colId: 'category', width: 100 },
    { headerName: 'Black', colId: 'sumB', cellStyle: { color: 'black' }, width: 120 },
    { headerName: 'Red', colId: 'sumR', cellStyle: { color: 'red' }, width: 120 },
    { headerName: 'Yellow', colId: 'sumY', cellStyle: { color: 'gold' }, width: 120 },
    { headerName: 'Green', colId: 'sumG', cellStyle: { color: 'green' }, width: 120 },
    { headerName: 'Blue', colId: 'sumBU', cellStyle: { color: 'blue' }, width: 120 },
    { headerName: 'White', colId: 'sumW', cellStyle: { color: 'grey' }, width: 120 },
  ];
  const availColumnDefs :ColDef[]=[
     { headerName: '', colId: 'avail', width: 100 },
  ]
   const renderView=()=>{
    console.log(summaryData);
      
    switch(currentView){
        case 'chart':
            return <><ChartView currentTab={currentTab} 
                    currentGraphData={currentGraphData} 

                    currentPageTab={currentPageTab} 
                    onFloatingTabChangeOnPages={onFloatingTabChangeOnPages} 
                    isLoading={isLoading}
                    graphs={graphs}
                    updateGraphState={updateGraphState}
                    setHorizondays={setHorizondays}
                    handleSubmitClick={handleSubmitClick}
                    horizonDays={horizonDays}
                    />  
                    
<Allotment >
  <Allotment.Pane>
    <BPRViewTable
    tableHeader="Summary"
    tablePrefixSrc=""
        rowData={summaryData}

        colDefs={summaryColumnDefs}

      />
      </Allotment.Pane>
      <Allotment.Pane maxSize={500}>
       <BPRViewTable
    tableHeader="Availability"
    tablePrefixSrc="/assets/img/VectorFLOW/BTG/Availability-icon.svg"
        rowData={[{ "avail": availability+"%"}]}
        colDefs={availColumnDefs}      
      />
       
    </Allotment.Pane>
       </Allotment>             
               
      </> 
        }
   }

   
   
   useEffect(()=>{
    BufferTrendsDataLoad()
   },[currentTab])
   
  return (
    <>
     <ActionToolBar view={'grid'} setCurrentTab={currentTab} currCategory={'BufferTrend'} currentTab={''} tabsList={[]} onFloatingTabChange={onFloatingTabChange} onGoBack={onGoBack} onViewChange={()=>console.log('')} onApplyFilter={handleApplyFilter} onExportToExcelCallBack genericRecordCount={0} multiFilter={multiFilterState} setMultiFilter={setMultiFilterState} onDelete={onDeleteFilter}/>

    <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>
                        <div style={{zoom:0.7}}>
                        <VFFloatingTab
                            tabs={[
                                {
                                    id:'technical View',
                                    label:'On-Hand Inv. Availability Trend',
                                    value:'tech'
                                },
                                {
                                    id:'economicalView',
                                    label:'Pipeline Inv. Availability Trend',
                                    value:'eco'
                                }
                            ]}
                            handleClick={onFloatingTabChange}
                        
                        />
                        </div>
                    </div>
                    {isLoading?<VFLoader/>: renderView()}    
                          
    </>
    
  )
}

export default BufferTrends