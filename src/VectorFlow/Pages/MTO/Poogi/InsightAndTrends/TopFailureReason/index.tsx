import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import OTIFFailureGraph from "./OTIFFailureGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import TagCellToolTip from "../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer";
import { useTopFailureData } from "../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/TopFailureReasons";
import GridView from "./GridView";

const TopFailureReasons = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();
  const { mutateAsync: getTopFailureData, isLoading, isError, isSuccess } = useTopFailureData();
  const [graphData, setGraphData] = useState<any>({});
  const reportName = "TopFailureReasons";

  const colDefCustomizations = {
    tag: {
      tooltipValueGetter: (params: any) => params.value,
      cellRenderer: TagCellToolTip,
      cellStyle: {
        display: 'flex',
        justifyContent: "center",
      }
    },
    bpp: {
      cellRenderer: ColorCellRenderer,
    },
  }
  
  const getGraphData = async (isGraph: any) => {
    try {
      const response = await getTopFailureData(isGraph);
      setGraphData(response.data.data);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Graph data!');
    }
  }

  useEffect(() => {
    getGraphData({graphflag: 1});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

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
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", marginLeft: '15px' }}>
        {isGridView ? (
          <GridView 
              getData={getTopFailureData} 
              reportName={reportName} 
              isLoading={isLoading} 
              isError={isError} 
              isSuccess={isSuccess} 
              colDefCustomizations={colDefCustomizations}
          />
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 190, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTIFFailureGraph month="previous" graphData={graphData.m1} />
                </BTRAllomentSection>
              </Allotment.Pane>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTIFFailureGraph month="current" graphData={graphData.m2} />
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default TopFailureReasons;
