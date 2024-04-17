import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab';
import VFSelectedFilters from '../../../../../../components/VectorFLOW/commons/VFSelectedFilters';
import useBPRFilter from '../../../../../../hooks/useBPRFilter';
import {useState} from 'react';
import VFMultiFilter from "../../../../../../components/VectorFLOW/commons/VFMultiFilter";
import { useLocation} from "react-router-dom";
import { MultiFilterSupplyChainCheckboxList } from '../../../../../../helpers/BPRConstants'



import {
    SCTaskBarContainer, 
    SCGoBackContainer, 
    SCGoBackText, 
    SCViewContainer, 
    SCViewBackground, 
    SCVerticalDivider, 
    SCViewImage,
    SCCustomActionsContainer,
    SCViewContainerWithBg,
 
} from './styles';
import { useUserData } from '../../../../../../context/UserDataContext';


interface ActionToolBarProps {
    view:string,
    currentTab:string,
    setCurrentTab:any,
    currCategory?:any,
    tabsList:Array<{id:string,label:string,value:string}>,
    onFloatingTabChange:(tab:any)=>void,
    onGoBack:()=>void
    onViewChange:(view:string)=>void,
    disableChartAndGridViewToggle?:boolean,
    onApplyFilter?:(params:any)=>void
    
}



const ActionToolBar = ({view,currentTab,tabsList,onFloatingTabChange,onGoBack,onViewChange,currCategory,disableChartAndGridViewToggle,onApplyFilter}:ActionToolBarProps) => {
    const { user } = useUserData();
    const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
    const { pathname } = useLocation();

    const themeUi = user?.user?.theme_ui;
 const [isFilterOpen,toggleFilter] = useState<boolean>(false)

    const handleApplyFilter = (params:any)=>{
       if(onApplyFilter) onApplyFilter(params)
        toggleFilter(false)
    }


   const renderFilter = () => {
    switch(currCategory){
        case 'GITFromParent':
            return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList}/>;
        case 'GITToChild':
            return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
        case 'ExpediteFromParent':
            return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
        case 'ExpediteToChild':
            return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
        case 'ExcessInventory':
            return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
        case 'OrderFulfillment':
            return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} coverageFilterActive={true}  supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList}/>;
        case 'BPR':
            if(pathname==='/supply-chain-intelligence-hub/bpr'){
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />    
            }
            break;
        case 'RRR':
            if(pathname==='/supply-chain-intelligence-hub/rrr'){
                 return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            }
            break;
        case 'BOR':
            if(pathname==='/supply-chain-intelligence-hub/bor'){
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList}  />;
            }
            break;
        case 'BTR':
            if(pathname==='/insights-and-trends/buffer-trend-report'){
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} colorFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} horizonActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            }
            break;
        case 'BufferTrend':
            if(pathname==='/insights-and-trends/buffer-trends'){
                 return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m)=>['1','3','4'].includes(m.id))} />;
             }
            break;
         case 'ResearchInsight':
            if(pathname==='/insights-and-trends/research-insights'){
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList}  />;
            }
            break;
            case 'GuidedInsight':
                if(pathname==='/insights-and-trends/guided-insights'){
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true}  supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m)=>['1','3','4'].includes(m.id))} />;
                }
               break;
        case 'DBMNorm':
            if(pathname==='/dbm/dbm-norm-suggestions'){
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true}  supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m)=>['1','3','4'].includes(m.id))} />;
            }
            break;
        default:
            <></>

    }
    

   }
   
    


    const renderFloatingTab = () => {
   
        return(
                <VFFloatingTab
                    tabs={tabsList}
                    defaultTab={tabsList.findIndex(object=>{return object.value===currentTab;})==-1?0:tabsList.findIndex(object=>{return object.value===currentTab;})}
                    handleClick={onFloatingTabChange}
                />
        )
    }

    
    return (
        <>
            {
               (view === 'chart') && 
                    <SCTaskBarContainer>
                        <SCGoBackContainer onClick={onGoBack}>
                            <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                        {tabsList.length > 0 && renderFloatingTab()}

                        <SCCustomActionsContainer>
                            {
                                currentTab==='custom' &&
                                (
                                    <>
                                        <SCViewContainerWithBg>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" onClick={onGoBack} />
                                            <p>Save</p>
                                        </SCViewContainerWithBg>
                                        <SCViewContainerWithBg>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" onClick={onGoBack} />
                                            <p>Reset</p>
                                        </SCViewContainerWithBg>
                                        {!disableChartAndGridViewToggle && <SCVerticalDivider/> } 
                                    </>
                                )
                                
                            }
                             
                            {
                                !disableChartAndGridViewToggle &&
                                <SCViewBackground>
                                    <SCViewContainer>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-pink.svg"} alt="" />
                                        <p style={{color:'#bc3d81'}}>Chart View</p>
                                    </SCViewContainer>
                                    <div><SCVerticalDivider/></div>
                                    <SCViewContainer onClick={() => onViewChange('grid')}>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"} alt=""  />
                                        <p style={{color:'#b0acac'}}>Grid View</p>
                                    </SCViewContainer>
                                </SCViewBackground>
                            }
                        </SCCustomActionsContainer>
                    </SCTaskBarContainer>
            }
            {
               (view === 'grid') && 
                    <SCTaskBarContainer>
                        <SCGoBackContainer onClick={onGoBack}>
                            <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" onClick={onGoBack} />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                        {currCategory === 'GuidedInsight' ? null:
                        
                        <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters>

                        }
                        {tabsList.length > 0 && renderFloatingTab()}
                        <SCCustomActionsContainer>


                        <VFButton onClick={()=>toggleFilter(true)} themeUi={themeUi} disabled={false}>Edit Filter</VFButton>
                            {isFilterOpen && renderFilter()}
                         
                                {/* <VFButton themeUi={themeUi} onClick={()=>console.log("test")}>   Edit Filter</VFButton> */}
                                
                                {currCategory==='BufferTrend' ? null :
                                <>
                                <SCVerticalDivider/>
                                    <SCViewContainerWithBg>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" onClick={onGoBack} />
                                    <p>Excel Export</p>
                                </SCViewContainerWithBg>
                                <SCVerticalDivider/>  
                                <SCViewContainerWithBg>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" onClick={onGoBack} />
                                    <p>Save</p>
                                </SCViewContainerWithBg>
                                <SCViewContainerWithBg>
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" onClick={onGoBack} />
                                    <p>Reset</p>
                                
                                    </SCViewContainerWithBg>
                                    {!disableChartAndGridViewToggle && <SCVerticalDivider/> }
                                </>
                                }
                                
                                
                                   

                    
                            {
                                currCategory==='CustomScreens' || currCategory==='BufferTrend'? null : (
                                !disableChartAndGridViewToggle &&
                                <SCViewBackground>
                                    <SCViewContainer onClick={() => onViewChange('chart')}>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-grey.svg"} alt="" />
                                        <p style={{color:'#b0acac'}}>Chart View</p>
                            
                                    </SCViewContainer>
                                    <div><SCVerticalDivider/></div>
                                    <SCViewContainer>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-pink.svg"} alt="" onClick={onGoBack} />
                                        <p style={{color:'#bc3d81'}}>Grid View</p>
                                    </SCViewContainer>
                                </SCViewBackground>
                                )
                            }           
                        </SCCustomActionsContainer>
                    </SCTaskBarContainer>
            }
            
        </>
    )
}

export default ActionToolBar;