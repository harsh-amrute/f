import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { ColDef, GridOptions } from "ag-grid-enterprise";
import OTIFTrendsGraph from "./OTIFTrendsGraph";
import OTAndIFTrendsGraph from "./OTAndIFTrendsGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import CustomTagTooltip from "./CustomTagTooltip";
import TagCellToolTip from "./TagCellRenderer/TagCellRenderer";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetOTIFAnalysisData } from "../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTIFAnalysis";

const APIFilterConfig = {
  filSecVisConfig :  {
      "Poogi_OTIF_Analysis" : {
          mjr : true,
          or: true,
          res: true,
          cus: true
      },
  }
};

const OTIFAnalysis = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { screenHeight } = useViewPort();
  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { mutateAsync: getOTIFAnalysisData } = useGetOTIFAnalysisData()
  const { data: filterResponse, /*isLoading*/ } = useGetFilterData()
  const [colDef, setColDef] = useState([{}]);
  const [filterData, setFilterData] = useState({});
  const [gridData, setGridData] = useState([]);
  const [graphData, setGraphData] = useState<any>({});
  const reportName = "OTIFAnalysis";

  const gridRef = useRef();

  const toggleFilter = (state: boolean) => {
    setIsFilterOpen(state);
  }

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      suppressMenu: true,
      autoHeaderHeight: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      enableRowGroup: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      tooltipComponent: CustomTagTooltip,
    };
  }, []);

  const gridOptions: GridOptions = {
    groupDefaultExpanded: 0,
    detailRowHeight: 500,
    detailCellRendererParams: {
      innerHeight: 400,
    },
    rowGroupPanelShow: 'always'
  };

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

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const getGridData = async (isGraph: any) => {
    try {
      const response = await getOTIFAnalysisData(isGraph);
      setGridData(response.data.data.results);
    }
    catch (e) {
      console.log(e);
    }
  }
  
  const getGraphData = async (isGraph: any) => {
    try {
      const response = await getOTIFAnalysisData(isGraph);
      setGraphData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setColumnDef();
    getGridData(0);
    getGraphData(1);
  }, []);

  useEffect(() => {
    setFilterData(filterResponse?.data.data)
  }, [filterResponse]);


  useEffect(() => {
    setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
  }, [HeaderData])

  const onApplyFilter = (filter:any)=>{
    console.log(filter)
    setIsFilterOpen(false)
  }
  const onAddFilter = ()=>{
    setIsFilterOpen(true)
  }

  const {state:currFilter,setState:setCurrFilter} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_OTIF_Analysis);

  return (
    <div>
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
        isFilterOpen={isFilterOpen}
        onAddFilter={onAddFilter}
        toggleFilter={toggleFilter}
        onApplyFilter={onApplyFilter} 
        multiFilter={currFilter}
        setMultiFilter={setCurrFilter}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", marginLeft: '15px' }}>
        {isGridView ? (
          <div data-testid='grid-view' style={{ height: screenHeight - 50 }} >
            <VFTable
              {...gridOptions}
              sideBar={{
                toolPanels: ['columns'],
              }}
              defaultColDef={defaultColDef}
              columnDefs={colDef}
              rowData={gridData || []}
              tooltipHideDelay={100000}
              tooltipShowDelay={0}
              tooltipMouseTrack={true}
              height={"75%"}
              ref={gridRef}
              statusBar={{
                statusPanels: [
                  { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                ]
              }}
              pagination
            />
          </div>

        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 190, margin: "0" }}>
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
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default OTIFAnalysis;
