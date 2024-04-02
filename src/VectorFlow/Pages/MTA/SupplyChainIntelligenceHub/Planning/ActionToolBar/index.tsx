import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab';
import VFSelectedFilters from '../../../../../../components/VectorFLOW/commons/VFSelectedFilters';
import useBPRFilter from '../../../../../../hooks/useBPRFilter';
import {useState} from 'react';
import VFMultiFilter from "../../../../../../components/VectorFLOW/commons/VFMultiFilter";
import { useLocation} from "react-router-dom";


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
import { ModuleKind } from 'typescript';


interface ActionToolBarProps {
    view:string,
    currentTab:string,
    setCurrentTab:any,
    currCategory?:any,
    tabsList:Array<{id:string,label:string,value:string}>,
    onFloatingTabChange:(tab:any)=>void,
    onGoBack:()=>void
    onViewChange:(view:string)=>void,
    disableChartAndGridViewToggle?:boolean
}



const ActionToolBar = ({view,currentTab,tabsList,onFloatingTabChange,onGoBack,onViewChange,currCategory,disableChartAndGridViewToggle}:ActionToolBarProps) => {
    const { user } = useUserData();
    const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
    const { pathname } = useLocation();

    const themeUi = user?.user?.theme_ui;
 const [isFilterOpen,toggleFilter] = useState<boolean>(false)

 


   const renderFilter = () => {
    switch(currCategory){
        case 'GITFromParent':
            return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
        case 'GITToChild':
            return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
        case 'ExpediteFromParent':
            return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
        case 'ExpediteToChild':
            return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
        case 'ExcessInventory':
            return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
        case 'OrderFulfillment':
            return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} coverageFilterActive={true}  />;
        case 'BPR':
            if(pathname==='/supply-chain-intelligence-hub/bpr'){
                return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />    
            }
            break;
        case 'RRR':
            if(pathname==='/supply-chain-intelligence-hub/rrr'){
                 return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
            }
            break;
        case 'BOR':
            if(pathname==='/supply-chain-intelligence-hub/bor'){
                return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
            }
            break;
        case 'BTR':
            if(pathname==='/insights-and-trends/buffer-trend-report'){
                return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} colorFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
            }
            break;
        case 'BufferTrend':
            if(pathname==='/insights-and-trends/buffer-trends'){
                 return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} colorFilterActive={true} locationFilterActive={true} availabilityFilterActive={true}  />;
             }
            break;
         case 'ResearchInsight':
            if(pathname==='/insights-and-trends/research-insights'){
                return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} />;
            }
            break;
        case 'DBMNorm':
            if(pathname==='/dbm/dbm-norm-suggestions'){
                return <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} />;
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
                        <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters>
                        {tabsList.length > 0 && renderFloatingTab()}
                        <SCCustomActionsContainer>


                        <VFButton onClick={()=>toggleFilter(true)} themeUi={themeUi} disabled={false}>Edit Filter</VFButton>
                            {isFilterOpen && renderFilter()}
                         
                                {/* <VFButton themeUi={themeUi} onClick={()=>console.log("test")}>   Edit Filter</VFButton> */}
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

                        
                            {
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
                            }           
                        </SCCustomActionsContainer>
                    </SCTaskBarContainer>
            }
            
        </>
    )
}

export default ActionToolBar;