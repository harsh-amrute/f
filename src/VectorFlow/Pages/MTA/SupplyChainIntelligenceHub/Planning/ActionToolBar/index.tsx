import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab';
import VFSelectedFilters from '../../../../../../components/VectorFLOW/commons/VFSelectedFilters';
import { useState, useMemo, useContext } from 'react';
import VFMultiFilter from "../../../../../../components/VectorFLOW/commons/VFMultiFilter";
import { useLocation, Link } from "react-router-dom";
import { MultiFilterSupplyChainCheckboxList } from '../../../../../../helpers/BPRConstants'
import useSaveAllState from '../../../../../../hooks/useSaveAllState'



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
    SCTaskFilterContainer

} from './styles';
import { useUserData } from '../../../../../../context/UserDataContext';
import { DBMApplyNormChange } from '../../../DBM/DBMNormSuggestions/applyNormButton';
import { PlanningCounts } from '../../../../../../VectorFlow/types/MTA';
import VFButtonOutline from '../../../../../../components/VectorFLOW/commons/VFButtonOutline';
import { GridStateContext } from '../../../../../../context/GridStateContext';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PLANNING_DATA } from '../../../../../../redux/actions/MTA';
import { RootState } from '../../../../../../redux/store/store';


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
    showAllTick?:any,
    handleGoButton?:any
    onApplyFilter?:(params:any)=>void,
    planningCount?:PlanningCounts
    genericRecordCount:number
    onExportToExcelCallBack:any
    multiFilter:any
    setMultiFilter:any
    onDelete:any,
    onUpdateInsight?:()=>void
    hideUpdateInsightsBtn?:boolean
}



const ActionToolBar = ({view,currentTab,tabsList,onFloatingTabChange,onGoBack,onViewChange,currCategory,disableChartAndGridViewToggle,planningCount,showAllTick,handleGoButton,genericRecordCount,onExportToExcelCallBack,onApplyFilter,multiFilter,setMultiFilter,onDelete,onUpdateInsight,hideUpdateInsightsBtn}:ActionToolBarProps) => {
    const { user } = useUserData();
    const { ref } = useContext(GridStateContext)
    // const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
    const { onSaveState, onResetAllState, onExportToExcel } = useSaveAllState()
    const { currentCategory } = useSelector((state: RootState) => state.mta.planning)
    const { pathname } = useLocation();
    const dispatch = useDispatch()


    const themeUi = user?.user?.theme_ui;
    const [isFilterOpen, toggleFilter] = useState<boolean>(false)

    const handleApplyFilter = (params: any) => {
        if (onApplyFilter) onApplyFilter(params)
        toggleFilter(false)
    }

    const currentPageRecordCount = useMemo(() => {
        switch (currCategory) {
            case "GITFromParent":
                return planningCount?.parentMonitorCount
            case "GITToChild":
                return planningCount?.childMonitorCount
            case "ExpediteFromParent":
                return planningCount?.parentExpediteCount
            case "ExpediteToChild":
                return planningCount?.childExpediteCount
            case "ExcessInventory":
                return planningCount?.reviewExcessInventoryCount
            case "OrderFulfillment":
                return planningCount?.reviewOrderFulfillmentCount
            default:
                return genericRecordCount
        }
    }, [currCategory, currentTab, genericRecordCount])




    const handleExportToExcel = () => {
        if (pathname === '/supply-chain-intelligence-hub/open-expediting-requests') {
            return ref.current.api.exportDataAsExcel({ fileName: "OpenExpeditingRequests" })
        }

        onExportToExcel({ pagination: { recordCount: currentPageRecordCount || 0, chunkSize: 5000 }, callBack: onExportToExcelCallBack })
    }



    const renderFilter = () => {
        switch (currCategory) {
            case 'GITFromParent':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            case 'GITToChild':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            case 'ExpediteFromParent':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            case 'ExpediteToChild':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            case 'ExcessInventory':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            case 'OrderFulfillment':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} coverageFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
            case 'BPR':
                if (pathname === '/supply-chain-intelligence-hub/bpr') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />
                }
                break;
            case 'RRR':
                if (pathname === '/supply-chain-intelligence-hub/rrr') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
                }
                break;
            case 'BOR':
                if (pathname === '/supply-chain-intelligence-hub/bor') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
                }
                break;
            case 'BTR':
                if (pathname === '/insights-and-trends/buffer-trend-report') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} colorFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} horizonActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
                }
                break;
            case 'BufferTrend':
                if (pathname === '/insights-and-trends/buffer-trends') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m) => ['1', '3', '4'].includes(m.id))} />;
                }
                break;
            case 'ResearchInsight':
                if (pathname === '/insights-and-trends/research-insights') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} availabilityFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList} />;
                }
                break;
            case 'GuidedInsight':
                if (pathname === '/insights-and-trends/guided-insights') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m) => ['1', '3', '4'].includes(m.id))} />;
                }
                break;
            case 'DBMNorm':
                if (pathname === '/dbm/dbm-norm-suggestions') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m) => ['1', '3', '4'].includes(m.id))} />;
                }
                break;
            case 'OpenExpeditingRequests':
                if (pathname === '/supply-chain-intelligence-hub/open-expediting-requests') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m) => ['1', '3', '4'].includes(m.id))} />
                }
                break;
            case 'InTransitWhereabouts':
                if (pathname === '/logistics/intransit-whereabouts') {
                    return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m) => ['1', '3', '4'].includes(m.id))} />
                }
                break;
            case 'chronicunavailability':
                return <VFMultiFilter onApplyFilter={handleApplyFilter} onGoBack={() => toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} productFilterActive={true} supplyChainNodeFilterActive={true} locationFilterActive={true} supplyChainForLocationCheckBoxList={MultiFilterSupplyChainCheckboxList} supplyChainForChildrenOfCheckBoxList={MultiFilterSupplyChainCheckboxList.filter((m) => ['1', '3', '4'].includes(m.id))} />
            default:
                <></>

        }

    }


    const renderFloatingTab = () => {

        return (
            <VFFloatingTab
                tabs={tabsList}
                defaultTab={tabsList.findIndex(object => { return object.value === currentTab; }) == -1 ? 0 : tabsList.findIndex(object => { return object.value === currentTab; })}
                handleClick={onFloatingTabChange}
            />
        )
    }

    return (
        <>
            {
                (view === 'chart') &&
                <SCTaskBarContainer>
                    {currCategory === "GuidedInsight" ? null :
                        <SCGoBackContainer onClick={onGoBack}>
                            <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" />
                            <SCGoBackText><b>Go Back</b></SCGoBackText>
                        </SCGoBackContainer>
                    }

                    <SCTaskFilterContainer
                        style={{
                            maxWidth: currCategory === "GuidedInsight" ? '100%' : '50%',
                            width: currCategory === "GuidedInsight" ? '100%' : 'unset',
                            justifyContent: currCategory === "GuidedInsight" ? 'flex-start' : 'unset',
                            marginLeft: '10px'
                        }}
                    >


                        {tabsList.length > 0 && renderFloatingTab()}
                    </SCTaskFilterContainer>


                    <SCCustomActionsContainer>

                        {/* {!(currentTab === "chronicunavailability" || currentTab === "availabilitytrend"|| currentTab === "availabilityageingtrend" || currentTab === "excessinventorytrend" || currentTab==="dbmnormsuggestions") &&
                             <>
                                <VFButton onClick={() => toggleFilter(true)} themeUi={themeUi} disabled={false}>Edit Filter</VFButton>
                                {isFilterOpen && renderFilter()}
                                <SCVerticalDivider/>
 
                             </>
                        } */}
                        {currentTab === "dbmnormsuggestions" &&
                            <>
                                <Link to="/dbm/dbm-norm-suggestions" style={{ textDecoration: 'none' }}>
                                    <VFButtonOutline onClick={() => toggleFilter(true)} themeUi={themeUi} width={140} disabled={false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px', paddingLeft: '12px', paddingRight: '13px' }}>
                                        <img src="/assets/img/VectorFLOW/BPR/NormAction.svg"></img>
                                        Norm Action
                                    </VFButtonOutline>
                                </Link>
                                <SCVerticalDivider />

                            </>
                        }

                        {currentTab === 'custom' && (
                            <>
                                \                                    <SCViewContainerWithBg onClick={() => ref.current.api.exportDataAsExcel({ fileName: `${currentCategory}${currentTab}` })} >
                                    <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" />
                                    <p>Excel Export</p>
                                </SCViewContainerWithBg>
                                <SCVerticalDivider />
                            </>
                        )}
                        {
                            (currentTab === 'availabilitytrend' || currentTab === "availabilityageingtrend" || currentTab === "dbmnormsuggestions" || currentTab === "chronicunavailability" || currentTab === 'custom') &&

                            (
                                <>
                                    <Link to="/dbm/dbm-norm-suggestions" style={{textDecoration:'none'}}>
                                        <VFButtonOutline onClick={()=>toggleFilter(true)} themeUi={themeUi} width={140} disabled={false} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'5px', paddingLeft:'12px', paddingRight:'13px'}}>
                                            <img src="/assets/img/VectorFLOW/BPR/NormAction.svg"></img>
                                            Norm Action
                                        </VFButtonOutline>
                                    </Link>  
                                    <SCVerticalDivider/>
     
                                </>
                                }
                                
                                {currentTab==='custom' && (
                                    <>
                                    <SCViewContainerWithBg onClick={()=>ref.current.api.exportDataAsExcel({fileName:`${currentCategory}${currentTab}`})} >
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" />
                                        <p>Excel Export</p>
                                    </SCViewContainerWithBg>
                                    <SCViewContainerWithBg onClick={() => onResetAllState(`${currCategory}${currentTab}`)}>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" />
                                        <p>Reset</p>
                                    </SCViewContainerWithBg>
                                    {!disableChartAndGridViewToggle && <SCVerticalDivider />}
                                </>
                            )

                        }



                        {

                            !disableChartAndGridViewToggle &&
                            <>
                                {/* <SCVerticalDivider/> */}
                                <SCViewBackground>
                                    <SCViewContainer>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-pink.svg"} alt="" />
                                        <p style={{ color: '#bc3d81' }}>Chart View</p>
                                    </SCViewContainer>
                                    <div><SCVerticalDivider /></div>
                                    <SCViewContainer onClick={() => {
                                        onViewChange('grid')
                                        dispatch(UPDATE_PLANNING_DATA({
                                            currentTab: currentTab,
                                            currentCategory: currentCategory,
                                            currentView: 'grid'
                                        }))
                                    }}>
                                        <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"} alt="" />
                                        <p style={{ color: '#b0acac' }}>Grid View</p>
                                    </SCViewContainer>
                                </SCViewBackground>
                            </>

                        }

                    </SCCustomActionsContainer>
                </SCTaskBarContainer>
            }

            {
                (view === 'grid') &&
                <SCTaskBarContainer>
                    <SCTaskFilterContainer
                        style={{
                            maxWidth: currCategory === "GuidedInsight" ? '100%' : '50%',
                            width: currCategory === "GuidedInsight" ? '100%' : 'unset',
                            justifyContent: currCategory === "GuidedInsight" ? 'flex-start' : 'unset'
                        }}
                    >

                        {currCategory === "GITFromParent" || currCategory === "GITToChild" || currCategory === "ExpediteFromParent" || currCategory === "ExpediteToChild" || currCategory === "ExcessInventory" || currCategory === "OrderFulfillment" ?
                            <SCGoBackContainer onClick={onGoBack}>
                                <img src="/assets/img/VectorFLOW/BPR/goback.svg" alt="" onClick={onGoBack} />
                                <SCGoBackText><b>Go Back</b></SCGoBackText>
                            </SCGoBackContainer>
                            : null

                        }
                        {currCategory === 'DBMNorm' ? <DBMApplyNormChange onCheck={showAllTick} /> : null}
                        {currCategory === 'DBMNorm' ?
                            <img
                                style={{ cursor: 'pointer' }}
                                src="/assets/img/Group 627.svg"
                                height={50.02}
                                width={76.83}
                                onClick={handleGoButton}
                            /> : null}
                        {/* {(currCategory === 'GuidedInsight' && view!=='grid') ? null: */}
                        {/* <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters> */}
                        {/* } */}
                        {/* {tabsList.length > 0 && renderFloatingTab()} */}


                        {(tabsList.length > 0 && renderFloatingTab())}

                        {currCategory === 'GuidedInsight' && view === 'grid' ? (
                            <div style={{ marginRight: '60px', maxWidth: '400px' }}>
                                <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters>
                            )}
                            
                            {currCategory==='ResearchInsight' && !hideUpdateInsightsBtn && 
                            <>
                                <VFButtonOutline themeUi={themeUi} width={169} style={{fontSize:'20px', fontWeight:'500'}} onClick={()=>onUpdateInsight?onUpdateInsight(): {}}>Update Insight</VFButtonOutline> 
                                <VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete} style={{maxWidth:'700px'}}></VFSelectedFilters>
                                </>
                             }   
                                
                                
                        </SCTaskFilterContainer>
                        <SCCustomActionsContainer>


                    </SCTaskFilterContainer>
                    <SCCustomActionsContainer>


                        <VFButton onClick={() => toggleFilter(true)} themeUi={themeUi} disabled={false}>Edit Filter</VFButton>
                        {isFilterOpen && renderFilter()}

                        {/* <VFButton themeUi={themeUi} onClick={()=>console.log("test")}>   Edit Filter</VFButton> */}

                        {currCategory === 'BufferTrend' ? null :
                            <>
                                {(currCategory === "GuidedInsight" || (currCategory === "BTR" && currentTab === "both")) ? null :
                                    <>
                                        <SCVerticalDivider />
                                        <SCViewContainerWithBg onClick={handleExportToExcel} >
                                            <>
                                                <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" />
                                                <p>Excel Export</p>
                                            </>
                                            {/* <SCViewImage src={"/assets/img/VectorFLOW/BPR/excel.svg"} alt="" onClick={onGoBack} />
                                    <p>Excel Export</p> */}
                                        </SCViewContainerWithBg>
                                    </>
                                }
                                {((currCategory === "GuidedInsight" && currentTab === "chronicunavailability") || (currCategory === "BTR" && currentTab === "both")) ? null :
                                    <>

                                        <SCVerticalDivider />
                                        <SCViewContainerWithBg onClick={() => onSaveState(`${currCategory}${currentTab}`)}>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/diskette.svg"} alt="" />
                                            <p>Save</p>
                                        </SCViewContainerWithBg>
                                        <SCViewContainerWithBg onClick={() => onResetAllState(`${currCategory}${currentTab}`)}>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/refresh.svg"} alt="" />
                                            <p>Reset</p>

                                        </SCViewContainerWithBg>
                                        {/* {!disableChartAndGridViewToggle && <SCVerticalDivider/> } */}
                                        {
                                            !disableChartAndGridViewToggle && (
                                                (currCategory === 'ExcessInventory' || currCategory === "GITToChild" || currCategory === "OrderFulfillment" || currCategory === "ExpediteToChild" || currCategory === "ExpediteFromParent") ? <SCVerticalDivider /> : null
                                            )
                                        }
                                    </>
                                }
                            </>
                        }



                        {
                            (currCategory === 'CustomScreens' || currCategory === 'BufferTrend' || currCategory === "BPR" || currCategory === "RRR" || currCategory === "BOR" || currCategory === "BTR" || currCategory === "ResearchInsight" || currCategory === "DBMNorm" || (currCategory === "GuidedInsight" && currentTab !== "chronicunavailability") || currCategory === "OpenExpeditingRequests") || currCategory === "InTransitWhereabouts" ? null : (
                                !disableChartAndGridViewToggle &&
                                <>
                                    <SCViewBackground>
                                        <SCViewContainer onClick={() => {
                                            onViewChange('chart')
                                            dispatch(UPDATE_PLANNING_DATA({
                                                currentTab: currentTab,
                                                currentCategory: currentCategory,
                                                currentView: 'grid'
                                            }))
                                        }}>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/chart-view-grey.svg"} alt="" />
                                            <p style={{ color: '#b0acac' }}>Chart View</p>
                                        </SCViewContainer>
                                        <div><SCVerticalDivider /></div>

                                        <SCViewContainer>
                                            <SCViewImage src={"/assets/img/VectorFLOW/BPR/grid-view-pink.svg"} alt="" onClick={onGoBack} />
                                            <p style={{ color: '#bc3d81' }}>Grid View</p>
                                        </SCViewContainer>
                                    </SCViewBackground>
                                </>
                            )

                        }
                    </SCCustomActionsContainer>
                </SCTaskBarContainer>
            }

        </>




    )
}

export default ActionToolBar;
