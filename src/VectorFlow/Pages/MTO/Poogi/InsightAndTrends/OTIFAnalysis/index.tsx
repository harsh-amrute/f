import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import OTIFTrendsGraph from "./OTIFTrendsGraph";
import OTAndIFTrendsGraph from "./OTAndIFTrendsGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import TagCellToolTip from "./TagCellRenderer/TagCellRenderer";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetOTIFAnalysisData, useGetOTIFAnalysisDataExcelExport } from "../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTIFAnalysis";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../../helpers/utils';
import { FilterPageName, pagination, UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import useColDef from "../../../../../../hooks/useColDef";
import BPPRenderer from "../../../Common/BPRRenderer/BPPRenderer";
import moment from "moment";
import CommonGridview from "../../../../../../helpers/CommonGridview";
import { SCDynamicContainer } from './styles'


const APIFilterConfig = {
  filSecVisConfig: {
    "Poogi_OTIF_Analysis": {
      mjr: true,
      or: true,
      res: true,
      cus: true
    },
  }
};

const OTIFAnalysis = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { mutateAsync: getOTIFAnalysisData, isLoading, isError, isSuccess } = useGetOTIFAnalysisData()
  const [graphData, setGraphData] = useState<any>({});
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
  const [filterData, setFilterData] = useState({});
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);

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
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_OTIF_Analysis);

  const { user } = useUserData();
  const { mutateAsync: getOTIFAnalysisDataExcelExport } = useGetOTIFAnalysisDataExcelExport();
  const { colDefMap, getColDef } = useColDef();

  const themeUi = user?.user?.theme_ui;

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

  const getGraphData = async (params: any) => {
    if (params.isExcelExport) {

      const gridAPi = currentGridRef?.current?.api;

      if (!gridAPi) {
        notifyError('Grid is not ready for Excel export!');
        return;
      }

      const isPivot = gridAPi.getPivotMode();
      const isRowGroup = gridAPi.getRowGroupColumns().length > 0;
      const isValue = gridAPi.getValueColumns().length > 0;
      
      if (isPivot || isValue || isRowGroup) {                 
       const exportName = `${FilterPageName.Poogi_OTIF_Analysis}_${moment().format("DD-MM-YYYY")}`;
        gridAPi.exportDataAsExcel({
        fileName: exportName,
        sheetName: exportName
      })
    }
    else {
        const headersdata = currentGridRef?.current?.api.getColumnState();
        const formattedFilters = formatFilterJSON(appliedFilters);
        const body = getBodyForExcelExport({ headersdata, filterData: formattedFilters, colDefMap })
        const response = await getOTIFAnalysisDataExcelExport({ body, report_name: FilterPageName.Poogi_OTIF_Analysis, isExcelExport: 1, graphflag: 0 })
        if (response.status === 200) {
          DownloadExcel(response, FilterPageName.Poogi_OTIF_Analysis)
        } else {
          notifyError('Failed to export Excel file!');
        }
      }
    }
    else {

      try {
        const formattedFilters = formatFilterJSON(appliedFilters);

        const response = await getOTIFAnalysisData({
          appliedFilters: formattedFilters,
          graphflag: 1,
          ...params
        });
        
        console.log(response.data.data, 'graph ka data')
        setGraphData(response.data.data || {});
      }
      catch (e) {
        console.log(e);
        notifyError('Failed to fetch Graph data!');
      }
    }
  }

  const getFilterData = async () => {
    try {
      const response = await getPageWiseFilterData({ page_name: FilterPageName.Poogi_OTIF_Analysis });
      setFilterData(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilterData();
    getGraphData({ graphflag: 1 });
  }, [])
  
useEffect(() => {
  if (!isGridView) {
    getGraphData({ graphflag: 1 });
  }
}, [appliedFilters, isGridView]);



  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {
        (isLoading) && <OverlayLoader />
      }
      {!isGridView && (
        <MTOActionToolBar
          isGridView={isGridView}
          themeUi={themeUi}
          setIsGridView={setIsGridView}
          isChartGridToggle
          isAddFilterButton
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
      <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
          <BTRTableWrapper style={{ maxHeight: "95%", paddingLeft: "20px" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTIFTrendsGraph graphData={graphData?.otif} />
                </BTRAllomentSection>
              </Allotment.Pane>
            <Allotment.Pane preferredSize={"50%"}>
          <BTRAllomentSection>
          <OTAndIFTrendsGraph graphData={graphData?.ot_n_if} />
              </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
      </HorizontalViewWrapper>
    </>
      :
        <>
          <CommonGridview
            reportName="OTIFAnalysis" 
            columnDefinationProps={{
              customColDef: colDefCustomizations,
              }}
            getRowData={getOTIFAnalysisData}
            gridDataLoading={isLoading}
            reportNameId={UIGridCode.PoogiOTIFAnalysis}
            excelExportParams={{
              isExcelExportFromBackend: true,
              excelExportReportName: FilterPageName.Poogi_OTIF_Analysis,
              excelExportSheetName: FilterPageName.Poogi_OTIF_Analysis,
            }}
            getExcelExportData={getOTIFAnalysisDataExcelExport}
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
    </div>
  );
};
export default OTIFAnalysis;