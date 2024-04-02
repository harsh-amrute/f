import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';
import useGuidedInsights from './useGuidedInsights';
import ChronicUnavailability from './ChronicUnavailibility';
import AvailabilityTrend from './AvailabilityTrend';
import AvailabilityAgeingTrend from './AvailabilityAgeingTrend';
import DBMNormSuggestions from './DBMNormSuggestions';
import ExcessInventoryTrend from './ExcessInventoryTrend';
import CustomScreens from './CustomScreens';
import ChronicGridView from './ChronicGridView';
const GuidedInsight=()=>{
  
    const {onFloatingTabChange,onGoBack, onViewChange,currentView, currentTab, setCurrentTab, getFloatingTabsList,
    ChronicUnavailabilityGridViewData}=useGuidedInsights();

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
    
    return(<><ActionToolBar  data-testid="chronicgridview"
                        view={currentView} 
                        onFloatingTabChange={onFloatingTabChange}
                        onGoBack={onGoBack}
                        onViewChange={onViewChange}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        tabsList={getFloatingTabsList()}
                       disableChartAndGridViewToggle={currentTab==='chronicunavailability'|| currentView==='grid'?false:true}

                        />
                          {renderView()}
                        </>)
}
export default GuidedInsight;