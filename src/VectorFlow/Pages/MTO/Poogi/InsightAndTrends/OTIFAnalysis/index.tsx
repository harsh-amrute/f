import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import OTIFTrendsGraph from "./OTIFTrendsGraph";
import OTAndIFTrendsGraph from "./OTAndIFTrendsGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import TagCellToolTip from "./TagCellRenderer/TagCellRenderer";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetOTIFAnalysisData } from "../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTIFAnalysis";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import GridView from "../../../Common/GridView";
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import { getColumnDefinations } from '../../../../../../helpers/utils';
import { ReportNameID } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { screenHeight } = useViewPort();
  const { mutateAsync: getOTIFAnalysisData, isLoading, isError, isSuccess } = useGetOTIFAnalysisData()
  const [graphData, setGraphData] = useState<any>({});
  const { data: filterResponse, /*isLoading*/ } = useGetFilterData()
  const [filterData, setFilterData] = useState({});
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState(false);
  const [colDef, setColDef] = useState([{}]);
  const [HeaderData, setHeaderData] = useState([]);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { user } = useUserData();
  const toggleFilter = (state: boolean) => {
    setIsFilterOpen(state);
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

  const getGraphData = async (params: any) => {
    try {
      const response = await getOTIFAnalysisData(params);
      setGraphData(response.data.data);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Graph data!');
    }
  }

  useEffect(() => {
    getGraphData({ graphflag: 1 });
  }, []);

  useEffect(() => {
    setFilterData(filterResponse?.data.data)
  }, [filterResponse]);

  const onApplyFilter = (filter: any) => {
    console.log(filter)
    setIsFilterOpen(false)
  }
  const onAddFilter = () => {
    setIsFilterOpen(true)
  }

  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: ReportNameID.OTIFAnalysis
      });

      const newConfig = JSON.parse(data?.data?.data[0]?.columns_settings) || [];
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
      setHeaderData(response?.data?.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleSaveClick = async () => {
    try {
      const config = currentGridRef.current.columnApi.getColumnState();

      const payload = {
        un: user.user.name,
        rn_id: ReportNameID.OTIFAnalysis,
        cs: JSON.stringify(config)
      }
      await updateUserUIReportConfigData([payload]);
      await getUserColumnConfig();

    } catch (error) {
      console.error(error);
    }
  }

  const handleResetClick = () => {
    setIsReset(true);
  }

  useEffect(() => {
    setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
  }, [HeaderData])

  useEffect(() => {
    getUserColumnConfig();
    setColumnDef();
  }, [])


  const { state: currFilter, setState: setCurrFilter, onFilterRemove } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_OTIF_Analysis);

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



  return (
    <div>
      {
        isLoading && <OverlayLoader />
      }
      <MTOActionToolBar
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
        onFilterRemove={onFilterRemove}
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", marginLeft: '15px' }}>
        {isGridView ? (
          <GridView
            getData={getOTIFAnalysisData}
            colDef={colDef}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
          />

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
