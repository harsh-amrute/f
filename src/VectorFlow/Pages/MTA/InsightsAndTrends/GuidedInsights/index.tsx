import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';
import useGuidedInsights from './useGuidedInsights';
import ChronicUnavailability from './ChronicUnavailibility';
import AvailabilityTrend from './AvailabilityTrend';
import AvailabilityAgeingTrend from './AvailabilityAgeingTrend';
import DBMNormSuggestions from './DBMNormSuggestions';
import ExcessInventoryTrend from './ExcessInventoryTrend';
import CustomScreens from './CustomScreens';
import ChronicGridView from './ChronicGridView';
import { GridStateContext } from '../../../../../context/GridStateContext';
const GuidedInsight=()=>{

    const {onFloatingTabChange,onGoBack, onViewChange,currentView, currentTab, setCurrentTab, getFloatingTabsList,
    ChronicUnavailabilityGridViewData,ref}=useGuidedInsights();

    const renderView = () => {

        if(currentView==='chart'){
        switch(currentTab){
            
            case 'availabilitytrend':
                return <AvailabilityTrend />
            case 'chronicunavailability':
                return <ChronicUnavailability />
             case 'availabilityageingtrend':
                return <AvailabilityAgeingTrend />
            case 'dbmnormsuggestions':
                return <DBMNormSuggestions />
            case 'excessinventorytrend':
                return <ExcessInventoryTrend />
            case 'customscreens':
                return <CustomScreens/>

            default:
                return <AvailabilityTrend />
            

        }}else{

 return <ChronicGridView currentGridData={ChronicUnavailabilityGridViewData}/>

        }

    }
    
    return(<GridStateContext.Provider value={{
        ref:ref,
        exportExcelColumns:[],
        setExportExcelColumns:()=>{return},
        tempDownloadData:false,
        setTempDownloadData:()=>{return},
        exportExcelRowData:[],
        setExportExcelRowData:()=>{return}

    }}>
        <div style={{zoom:0.8}}>
            <ActionToolBar  data-testid="chronicgridview"
                        view={currentView} 
                        onFloatingTabChange={onFloatingTabChange}
                        onGoBack={onGoBack}
                        onViewChange={onViewChange}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        tabsList={getFloatingTabsList()}
                        genericRecordCount={0}
                       disableChartAndGridViewToggle={currentTab==='chronicunavailability'|| currentView==='grid'?false:true}
                       onExportToExcelCallBack
                //   disableChartAndGridViewToggle={(currentTab==='chronicunavailability'|| currentTab==='customscreens' )|| (currentView==='grid'|| currentView==='chart') ?false:true}
                currCategory={'GuidedInsight' }
                        />
         </div>               
                      {renderView()} 
            </GridStateContext.Provider>) 
   



}
export default GuidedInsight;