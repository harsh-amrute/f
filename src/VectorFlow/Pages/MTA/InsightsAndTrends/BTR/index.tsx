import { BTRLayoutTabsWrapper, BTRLayoutWrapper, ToggleViewBtnWrapper } from "./styles";
import useBTR from "./useBTR";
import { SCViewBackground, SCViewContainer, SCViewImage, SCVerticalDivider } from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar/styles';
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader";
import { GridStateContext } from "../../../../../context/GridStateContext";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import ActionToolBar from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";

const BufferTrendReport = () => {

    const {
        currentTab,
        isLoading,
        techColDefs,
        techRef,
        techTotalRows,
        verticalView,
        toggleVerticalView,
        toggleCurrentTab,
        renderView,
        tempRef,
        onExportToExcelCallBack,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        currFilter,
        setCurrFilter,
        onDelete,
        onApplyFilter,
        themeUi
    } = useBTR()


    return (
        <GridStateContext.Provider
            value={{
                ref: techRef,
                exportExcelColumns: exportExcelColumns,
                setExportExcelColumns: setExportExcelColumns,
                tempDownloadData: tempDownloadData,
                setTempDownloadData: setTempDownloadData,
                exportExcelRowData: exportExcelRowData,
                setExportExcelRowData: setExportExcelRowData
            }}
        >
            <div style={{zoom:0.8,marginLeft:'10px'}}>
                <ActionToolBar 
                    view={'grid'} 
                    setCurrentTab={''} 
                    currCategory={'BTR'} 
                    currentTab={currentTab.value} 
                    tabsList={[]} 
                    onFloatingTabChange={()=>console.log('')} 
                    onGoBack={()=>console.log('')} 
                    onViewChange={()=>console.log('')} 
                    onExportToExcelCallBack={(pageNumber:number)=>{return onExportToExcelCallBack(pageNumber,currentTab.value)}}
                    genericRecordCount={parseInt(techTotalRows)}
                    multiFilter={currFilter}
                    setMultiFilter={setCurrFilter}
                    onDelete={onDelete}
                    onApplyFilter={onApplyFilter}
                />
            </div>
        <BTRLayoutWrapper>

        

            

                <BTRLayoutTabsWrapper>
                    <div style={{ zoom: 0.6, marginTop: '-92px'}}>
                        <VFFloatingTab
                            handleClick={(tab: any) => toggleCurrentTab(tab)}
                            tabs={[
                                {
                                    id: "1",
                                    value: 'both',
                                    label: "Both On-Hand & Pipeline View"
                                },
                                {
                                    id: "2",
                                    value: 'on-hand',
                                    label: "On-Hand Inv. View"
                                },
                                {
                                    id: "3",
                                    value: 'pipeline',
                                    label: "Pipeline Inv. View"
                                }
                            ]}
                        />
                    </div>
                    {currentTab?.id === '1' && (
                        <ToggleViewBtnWrapper>
                            <SCViewBackground>
                                <SCViewContainer onClick={() => toggleVerticalView(true)}>
                                    <SCViewImage src={verticalView?themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/grid-view-regal.svg":"/assets/img/VectorFLOW/BPR/grid-view-pink.svg":"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"} style={{ transform: 'rotate(90deg)' }} alt="" />
                                    <p style={{ color: verticalView?themeUi!=="REGALBLAZE"? '#bc3d81':'#FCA311':'gray' }}>Vertical View</p>
                                </SCViewContainer>
                                <div><SCVerticalDivider /></div>
                                <SCViewContainer onClick={() => toggleVerticalView(false)} >
                                    <SCViewImage src={!verticalView?themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/BPR/grid-view-regal.svg":"/assets/img/VectorFLOW/BPR/grid-view-pink.svg":"/assets/img/VectorFLOW/BPR/grid-view-grey.svg"} alt="" />
                                    <p style={{ color: !verticalView?themeUi!=="REGALBLAZE"? '#bc3d81':'#FCA311':'gray' }}>Horizontal View</p>
                                </SCViewContainer>
                            </SCViewBackground>
                        </ToggleViewBtnWrapper>
                    )}
                </BTRLayoutTabsWrapper>
                {isLoading && <VFLoader />}
                {!isLoading && renderView()}
                <div style={{ display: 'none' }}>
                    <VFTable
                        ref={tempRef}
                        columnDefs={techColDefs}
                        rowData={exportExcelRowData}
                        {...tempAgGridProps}
                    />
                </div>
            </BTRLayoutWrapper>
        </GridStateContext.Provider>
    );
};

export default BufferTrendReport;
