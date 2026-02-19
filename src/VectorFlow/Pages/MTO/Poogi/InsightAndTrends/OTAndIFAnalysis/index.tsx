import { Allotment } from 'allotment'
import { useEffect, useRef, useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles.css'
import IFFaildGraph from './IFFailedGraph'
import OTFailedGraph from './OTFailedGraph'
import { useGetOTAndIFAnalysisData, useGetOTAndIFAnalysisDataExcelExport } from '../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTAndIFAnalysis'
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import TagCellToolTip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../../helpers/utils';
import { useUserData } from "../../../../../../context/index";
import { FilterPageName, pagination, UIGridCode } from "../../../Common/Enum";
import useFilter from '../../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import useColDef from '../../../../../../hooks/useColDef'
import BPPRenderer from '../../../Common/BPRRenderer/BPPRenderer'
import moment from 'moment'
import CommonGridview from '../../../../../../helpers/CommonGridview'
import { SCDynamicContainer } from './styles'

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
    const [currentGridRef, setCurrentGridRef] = useState<any>(null);
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
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { user } = useUserData();
    const { colDefMap , getColDef} = useColDef();
    const { mutateAsync: getOTAndIFAnalysisDataExcelExport } = useGetOTAndIFAnalysisDataExcelExport();
    // const [masterUIConfig, setMasterUIConfig] = useState([]);
    const [userConfigFetched, setUserConfigFetched] = useState(false);
    const [columnState, setColumnState] = useState<any>([]);
    const [userPageSize, setUserPageSize] = useState<number>();
    const themeUi = user?.user?.theme_ui;
    
    const getGraphData = async (params: any,pageSize?:any) => {

        if(params.isExcelExport){

            const gridAPi = currentGridRef?.current?.api;

            if (!gridAPi) {
                notifyError('Grid is not ready for Excel export!');
                return;
            }

            const isPivot = gridAPi.isPivotMode(); 
            const isValue = gridAPi.getValueColumns().length > 0;
            const isRowGroup = gridAPi.getRowGroupColumns().length > 0;

            if(isPivot || isValue || isRowGroup){
                const exportName = `${FilterPageName.Poogi_OTIF_And_Analysis}_${moment().format("DD-MM-YYYY")}`;
                
                gridAPi.exportDataAsExcel({
                    fileName: exportName,
                    sheetName: exportName
                })
                
            }
            else {
                const headersdata = currentGridRef?.current?.api.getColumnState();
                const formattedFilters = formatFilterJSON(appliedFilters);
                const body = getBodyForExcelExport({ headersdata, filterData: formattedFilters,colDefMap})
                const response = await getOTAndIFAnalysisDataExcelExport({body, isExcelExport : 1, graphflag : 0,report_name : FilterPageName.Poogi_OTIF_And_Analysis})
                if(response.status === 200){
                    DownloadExcel(response, FilterPageName.Poogi_OTIF_And_Analysis)
                }else{
                    notifyError('Failed to export Excel!');
                }
            }        
        }else{
                try {
                    const formattedFilters = formatFilterJSON(appliedFilters);
                    console.log('filterss', formattedFilters)
                    const response = await getOTAndIFAnalysisData({
                      ...params,
                      appliedFilters: formattedFilters,
                      page_size: pageSize ?? pagination.mtoPageSize,
                    });
                setGraphData(response.data.data);
            }
            catch (e) {
                console.log(e);
                notifyError('Failed to fetch Graph data!');
            }
        }
    }

    const colDefCustomizations = {
        Tags: {
            tooltipValueGetter: (params: any) => params.value,
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

    // const setColumnDef = async () => {
    //     try {
    //         const response = await getUIConfigData('OTandIFAnalysis');
    //         getColDef(response);
    //         // setHeaderData(response?.data?.data);
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    const getFilterData = async () => {
        try {
          const response = await getPageWiseFilterData({ page_name: FilterPageName.Poogi_OTIF_And_Analysis });
          setFilterData(response?.data.data);
        } catch (error) {
          console.error(error);
        }
    }


    useEffect(() => {
        if (!isGridView) {
          getGraphData({ graphflag: 1 }, userPageSize || pagination.mtoPageSize);
        }
      }, [appliedFilters, isGridView, userPageSize]);

    useEffect(() => {
        // setColumnDef();
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
            {
                (isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
            }

            {!isGridView && (
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
            )}
            {
                !isGridView ?
                    <>
                        <div className={HorizontalViewWrapper} style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                            <div className={BTRTableWrapper} style={{ flex: '1', margin: '0' }}>
                                <Allotment vertical={false} separator={false}   >
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <div className={BTRAllomentSection}>
                                            <OTFailedGraph OTFailedData={graphData?.ot} />
                                        </div>
                                    </Allotment.Pane>
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <div className={BTRAllomentSection}>
                                            <IFFaildGraph IFFailedData={graphData?.if} />
                                        </div>
                                    </Allotment.Pane>
                                </Allotment>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <CommonGridview
                            reportName="OTandIFAnalysis" //OTIFAnalysis
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
                            VFWrapper={SCDynamicContainer} 
                        />
                    </>
            }
        </>
    )
}

export default OTAndIFAnalysis