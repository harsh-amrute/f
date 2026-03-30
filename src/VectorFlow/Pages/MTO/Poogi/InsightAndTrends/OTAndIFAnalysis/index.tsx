import { Allotment } from 'allotment'
import { useEffect, useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles.css'
import IFFaildGraph from './IFFailedGraph'
import OTFailedGraph from './OTFailedGraph'
import { useGetOTAndIFAnalysisData, useGetOTAndIFAnalysisDataExcelExport } from '../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTAndIFAnalysis'
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import TagCellToolTip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import { formatFilterJSON } from '../../../../../../helpers/utils';
import { useUserData } from "../../../../../../context/index";
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import useFilter from '../../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import BPPRenderer from '../../../Common/BPRRenderer/BPPRenderer'
import CommonGridview from '../../../../../../helpers/CommonGridview'
import { SCDynamicContainer } from '../../../Common/GridView/styles.css'
import CustomTagTooltip from '../OTIFAnalysis/CustomTagTooltip'

const APIFilterConfig = {
    filSecVisConfig: {
        "Poogi_OTIF_And_Analysis" : {
            mjr : false,
            or: true,
            res: true,
            cus: true
        },
    }
};

const OTAndIFAnalysis = () => {

    const [isGridView, setIsGridView] = useState(false);
    const { mutateAsync: getOTAndIFAnalysisData, isLoading, isError, isSuccess } = useGetOTAndIFAnalysisData();
    const [graphData, setGraphData] = useState<any>({});
    const [filterData, setFilterData] = useState({});
    const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
    const { 
        state: currFilter, 
        setState: setCurrFilter, 
        onFilterRemove, 
        isFilterOpen, 
        isMfgSelected,
        onAddFilter, 
        onApplyFilter, 
        toggleFilter,
        appliedFilters,
        setAppliedFilters
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_OTIF_And_Analysis);
    const { user } = useUserData();
    const { mutateAsync: getOTAndIFAnalysisDataExcelExport } = useGetOTAndIFAnalysisDataExcelExport();
    const [userPageSize] = useState<number>();
    const themeUi = user?.user?.theme_ui;
    
    const getGraphData = async (params: any) => {

                try {
                    const formattedFilters = formatFilterJSON(appliedFilters);
                    const response = await getOTAndIFAnalysisData({
                      ...params,
                      appliedFilters: formattedFilters,
                    });
                setGraphData(response.data.data);
            }
            catch (e) {
                console.log(e);
                notifyError('Failed to fetch Graph data!');
            }
        }

    const colDefCustomizations = {
        Tags: {
            tooltipValueGetter: (params: any) => params.value,
            tooltipComponent: CustomTagTooltip,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            },
            minWidth:100,
        },
        BPP: {
            cellRenderer: BPPRenderer,
            minWidth:100,
        },
    }

    const getFilterData = async () => {
        try {
          const response = await getPageWiseFilterData({ page_name: FilterPageName.Poogi_OTIF_And_Analysis });
          setFilterData(response?.data.data);
        } catch (error) {
          console.error(error);
        }
    }


    useEffect(() => {
        if (!isGridView && Object.keys(appliedFilters).length!==0) {
          getGraphData({ graphflag: 1 });
        }
      }, [appliedFilters, isGridView, userPageSize]);

    useEffect(() => {
        getFilterData();

    }, [])

    useEffect(() => {
        if (isSuccess) {
          notifySuccess("Fetched Data successfully!")
        }
        if (isError) {
          notifyError("Failed to load data!")
        }
    }, [isSuccess, isError])

    return (
        <>
        {isLoading && <OverlayLoader />}
    
        {!isGridView ? (
            <>
                <MTOActionToolBar
                    comp={"BTRMTO"}
                    themeUi={themeUi}
                    isAddFilterButton
                    isChartGridToggle
                    setIsGridView={setIsGridView}
                    isGridView={isGridView}
                    isFilterOpen={isFilterOpen}
                    onAddFilter={onAddFilter}
                    toggleFilter={toggleFilter}
                    onApplyFilter={onApplyFilter}
                    multiFilter={currFilter}
                    setMultiFilter={setCurrFilter}
                    onFilterRemove={onFilterRemove}
                    isMfgSelected={isMfgSelected}
                />
    
                <div
                    className={HorizontalViewWrapper}
                    style={{ margin: "20px 14px", height: "85%", display: "flex" }}
                >
                    <div
                        className={BTRTableWrapper}
                        style={{ flex: "1", margin: "0" }}
                    >
                        <Allotment vertical={false} separator={false}>
                            <Allotment.Pane
                                minSize={400}
                                preferredSize={"50%"}
                                className="allotment-pane-custom"
                            >
                                <div className={BTRAllomentSection}>
                                    <OTFailedGraph OTFailedData={graphData?.ot} />
                                </div>
                            </Allotment.Pane>
    
                            <Allotment.Pane
                                minSize={400}
                                preferredSize={"50%"}
                                className="allotment-pane-custom"
                            >
                                <div className={BTRAllomentSection}>
                                    <IFFaildGraph IFFailedData={graphData?.if} />
                                </div>
                            </Allotment.Pane>
                        </Allotment>
                    </div>
                </div>
            </>
        ) : (
            <CommonGridview
                reportName="OTandIFAnalysis"
                columnDefinationProps={{
                    customColDef: colDefCustomizations,
                }}
                getRowData={getOTAndIFAnalysisData}
                gridDataLoading={isLoading}
                reportNameId={UIGridCode.PoogiOTAndIFAnalysis}
                excelExportParams={{
                    isExcelExportFromBackend: true,
                    excelExportReportName: FilterPageName.Poogi_OTIF_And_Analysis,
                    excelExportSheetName: FilterPageName.Poogi_OTIF_And_Analysis,
                }}
                getExcelExportData={getOTAndIFAnalysisDataExcelExport}
                setAppliedFilters={setAppliedFilters}
                setCurrentFilters={setCurrFilter}
                appliedFilters={appliedFilters}
                actionToolBarProps={{
                    comp: "OTIFAnalysis",
                    isAddFilterButton: true,
                    isChartGridToggle: true,
                    isGridView,
                    setIsGridView,
                    isFilterOpen,
                    onAddFilter,
                    toggleFilter,
                    onApplyFilter,
                    onFilterRemove,
                    multiFilter: currFilter,
                    setMultiFilter: setCurrFilter,
                    isMfgSelected,
                }}
                vfWrapperClassName={SCDynamicContainer}
            />
        )}
    </>
    )
}

export default OTAndIFAnalysis