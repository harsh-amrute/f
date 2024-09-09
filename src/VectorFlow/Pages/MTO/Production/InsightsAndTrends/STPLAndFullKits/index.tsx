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
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import { getColumnDefinations } from '../../../../../../helpers/utils';
import { UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData()
  const [graphData, setGraphData] = useState<any>({});
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState(false);
  const [colDef, setColDef] = useState([{}]);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { screenHeight } = useViewPort();
  const reportName = "STPLAndFullKits";
  const { user } = useUserData();

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

  const colDefCustomizations = {
    Plant: {
      cellRenderer: "agGroupCellRenderer",
    }
  }

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setColDef(getColumnDefinations(response.data.data, colDefCustomizations, []));
    }
    catch (e) {
      console.log(e);
    }
  }
  
  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdStplAndFullKit
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

  const handleSaveClick = async () => {
    try {
      const config = currentGridRef.current.columnApi.getColumnState();

      const payload = {
        un: user.user.name,
        rn_id: UIGridCode.ProdStplAndFullKit,
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
    setColumnDef();
    getUserColumnConfig();
    getGraphData({ graphflag: 1 });
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {
        (isLoading || isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
      }
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
      />
      <HorizontalViewWrapper style={{ flex: 1 }}>
        {isGridView ? (
          <GridView 
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
          />
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 200, paddingLeft: "20px" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <STPLGraph graphData={graphData?.stpl} />
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <FullKitGraph graphData={graphData?.fk} />
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
