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
import GridView from "../../../Common/GridView";

import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import { getColumnDefinations } from '../../../../../../helpers/utils';
import { UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";

const TopFailureReasons = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();
  const { mutateAsync: getTopFailureData, isLoading, isError, isSuccess } = useTopFailureData();
  const [graphData, setGraphData] = useState<any>({});
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState(false);
  const [colDef, setColDef] = useState([{}]);
  const [HeaderData, setHeaderData] = useState([]);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { user } = useUserData();
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
    getGraphData({ graphflag: 1 });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

  
  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.PoogiTopFailureReason
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
      const response = await getUIConfigData(reportName);
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
          rn_id: UIGridCode.PoogiTopFailureReason,
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

  useEffect(() => {
    setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
  }, [HeaderData])

  useEffect(() => {
    getUserColumnConfig();
    setColumnDef();
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

  return (
    <div>
      {
        (isLoading || isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
      }
      <MTOActionToolBar
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        // isChartGridToggle /***commented it  */
        isAddFilterButton
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", marginLeft: '15px' }}>
        {isGridView ? (
          <GridView
            getData={getTopFailureData}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
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
