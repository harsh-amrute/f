import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import STPLGraph from "./STPLGraph";
import FullKitGraph from "./FullKitGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import { useGetSTPLAndFullKitData } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import GridView from "./GridView";

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData()
  const [graphData, setGraphData] = useState<any>({});

  const { screenHeight } = useViewPort();

  const getGraphData = async (params: any) => {
    try {
      const response = await getSTPLandFullkitInDaysData(params);
      setGraphData(response.data.data);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Graph data!');
    }
  }

  useEffect(() => {
    getGraphData({graphflag: 1});
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
    <div style={{}}>
       {
        isLoading && <OverlayLoader />
      }
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
      />
      <HorizontalViewWrapper style={{ marginTop: "20px" }}>
        {isGridView ? (
          <GridView />
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 200, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <STPLGraph graphData={graphData?.stpl}/>
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <FullKitGraph graphData={graphData?.fk}/>
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default STPLAndFullKits;
