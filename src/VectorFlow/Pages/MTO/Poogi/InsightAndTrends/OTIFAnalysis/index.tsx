import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import OTIFTrendsGraph from "./OTIFTrendsGraph";
import OTAndIFTrendsGraph from "./OTAndIFTrendsGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
} from "./styles.css";
import TagCellToolTip from "./TagCellRenderer/TagCellRenderer";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetOTIFAnalysisData, useGetOTIFAnalysisDataExcelExport } from "../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTIFAnalysis";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { formatFilterJSON } from '../../../../../../helpers/utils';
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import BPPRenderer from "../../../Common/BPRRenderer/BPPRenderer";
import CommonGridview from "../../../../../../helpers/CommonGridview";
import { SCDynamicContainer } from "../../../Common/GridView/styles.css";
import CustomTagTooltip from "./CustomTagTooltip";


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

  const tolerances = graphData?.tolerances || {};
  const deliveryTol = tolerances?.delivery_tolerance || 3; 
  const mfgTol = tolerances?.mfg_tolerance || 5;

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

  const themeUi = user?.user?.theme_ui;

  const colDefCustomizations = {
    Tags: {
      tooltipValueGetter: (params: any) => params.value,
      tooltipComponent:CustomTagTooltip,
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
         try {
        const formattedFilters = formatFilterJSON(appliedFilters);

        const response = await getOTIFAnalysisData({
          appliedFilters: formattedFilters,
          graphflag: 1,
          ...params
        });
        
        setGraphData(response.data.data || {});
      }
      catch (e) {
        console.log(e);
        notifyError('Failed to fetch Graph data!');
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
    // getGraphData({ graphflag: 1 });
  }, [])
  
useEffect(() => {
  if (Object.keys(appliedFilters).length!==0 && !isGridView ) {
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
     {
  !isGridView ? (
    <>
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

      <div className={BTRTableWrapper} style={{ maxHeight: "95%", paddingLeft: "20px" }}>
        <Allotment vertical={false} separator={false}>
          <Allotment.Pane preferredSize={"50%"}>
            <div className={BTRAllomentSection}>
              <OTIFTrendsGraph graphData={graphData?.otif}
              deliveryTol={deliveryTol} 
                mfgTol={mfgTol} />
            </div>
          </Allotment.Pane>

          <Allotment.Pane preferredSize={"50%"}>
            <div className={BTRAllomentSection}>
              <OTAndIFTrendsGraph graphData={graphData?.ot_n_if} 
              deliveryTol={deliveryTol} 
                mfgTol={mfgTol}
              />
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </>
  ) : (
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
      vfWrapperClassName={SCDynamicContainer}
    />
  )
}
    </div>
  );
};
export default OTIFAnalysis;