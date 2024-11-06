import { Allotment } from 'allotment'
import { useEffect, useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles'
import IFFaildGraph from './IFFailedGraph'
import OTFailedGraph from './OTFailedGraph'
import { useGetOTAndIFAnalysisData, useGetOTAndIFAnalysisDataExcelExport } from '../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTAndIFAnalysis'
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import GridView from '../../../Common/GridView'
import TagCellToolTip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../../helpers/utils';
import { useUserData } from "../../../../../../context/index";
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import useFilter from '../../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import useColDef from '../../../../../../hooks/useColDef'

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
    const [columnState, setColumnState] = useState<any>([]);
    const [isReset, setIsReset] = useState(false);
    const [colDef, setColDef] = useState([{}]);
    const [HeaderData, setHeaderData] = useState([]);
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
        appliedFilters
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_OTIF_And_Analysis);
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { user } = useUserData();
    const { colDefMap , getColDef} = useColDef();
    const { mutateAsync : getOTAndIFAnalysisDataExcelExport} = useGetOTAndIFAnalysisDataExcelExport();

    const getGraphData = async (params: any) => {
        if(params.isExcelExport){
            const headersdata = currentGridRef?.current?.api.getColumnState();
            const formattedFilters = formatFilterJSON(appliedFilters);
            const body = getBodyForExcelExport({ headersdata, filterData: formattedFilters,colDefMap})
            const response = await getOTAndIFAnalysisDataExcelExport({body, isExcelExport : 1, graphflag : 0,report_name : FilterPageName.Poogi_OTIF_And_Analysis})
            if(response.status === 200){
                DownloadExcel(response, FilterPageName.Poogi_OTIF_And_Analysis)
            }else{
                notifyError('Failed to export Excel!');
            }
        }else{
            try {
                const response = await getOTAndIFAnalysisData(params);
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
            }
        },
        BPP: {
            cellRenderer: ColorCellRenderer,
        },
    }

    const getUserColumnConfig = async () => {
        try {
            const data = await getUserUIReportConfigData({
                un: user.user.name,
                rn_id: UIGridCode.PoogiOTAndIFAnalysis
            });

            const newConfig = data?.data?.data[0]?.columns_settings ? JSON.parse(data?.data?.data[0]?.columns_settings) : [];
            setColumnState(newConfig);

            if (!data) {
                console.error('Failed to apply column state');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData('OTIFAnalysis');
            getColDef(response);
            setHeaderData(response?.data?.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleSaveClick = async () => {
        try {
            if(currentGridRef?.current?.api){
                const config = currentGridRef.current.api.getColumnState();
    
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.PoogiOTAndIFAnalysis,
                    cs: JSON.stringify(config)
                }
    
                await updateUserUIReportConfigData([payload]);
                await getUserColumnConfig();
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleResetClick = () => {
        setIsReset(true);
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
        setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
    }, [HeaderData])

    useEffect(() => {
        getGraphData({ graphflag: 1 });
        getUserColumnConfig();
        setColumnDef();
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

    useEffect(() => {
        if (isReset) {
          setColumnState(colDef);
          setIsReset(false)
        }else{
          handleSaveClick();
        }
    }, [isReset]);

    const ExportExcelData = () =>{
        getGraphData({ isExcelExport: true });
    }
    return (
        <>
            {
                (isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
            }
            <MTOActionToolBar
                isAddFilterButton
                isChartGridToggle
                setIsGridView={setIsGridView}
                isExcelExport = {isGridView ? true : false}
                onExcelExportClick ={ExportExcelData}
                isGridView={isGridView}
                handleSaveClick={handleSaveClick}
                handleResetClick={handleResetClick}
                isFilterOpen={isFilterOpen}
                onAddFilter={onAddFilter}
                toggleFilter={toggleFilter}
                onApplyFilter={onApplyFilter}
                multiFilter={currFilter}
                setMultiFilter={setCurrFilter}
                onFilterRemove={onFilterRemove}
                isMfgSelected={isMfgSelected}
            />
            {
                !isGridView ?
                    <>
                        <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                            <BTRTableWrapper style={{ flex: '1', margin: '0' }}>
                                <Allotment vertical={false} separator={false}   >
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <OTFailedGraph  OTFailedData={graphData?.ot}/>
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <IFFaildGraph IFFailedData={graphData?.if}/>
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>
                            </BTRTableWrapper>
                        </HorizontalViewWrapper>
                    </>
                    :
                    <>
                        <GridView
                            getData={getOTAndIFAnalysisData}
                            colDef={colDef}
                            isLoading={isLoading}
                            isError={isError}
                            isSuccess={isSuccess}
                            setCurrentGridRef={setCurrentGridRef}
                            currentGridRef={currentGridRef}
                            columnState={columnState}
                            appliedFilters={appliedFilters}
                        />
                    </>
            }
        </>
    )
}

export default OTAndIFAnalysis