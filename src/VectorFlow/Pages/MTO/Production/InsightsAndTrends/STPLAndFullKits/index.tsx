import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import STPLGraph from "./STPLGraph";
import FullKitGraph from "./FullKitGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import { useGetSTPLAndFullKitData, useGetSTPLAndFullKitExcelData } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import GridView from "./GridView";
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../../helpers/utils';
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../../hooks/useFilter';
import useColDef from "../../../../../../hooks/useColDef";

const APIFilterConfig = {
  filSecVisConfig: {
    "Prod_STPL_And_FullKits" : {
      mjr : false,
      or: false,
      res: true,
      cus: false
    },
  }
};

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData()
  const [graphData, setGraphData] = useState<any>({});
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState<any>(undefined);
  const [colDef, setColDef] = useState([{}]);
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
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_STPL_And_FullKits);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData();
  const reportName = "STPLAndFullKits";
  const { user } = useUserData();
  const { colDefMap,getColDef } = useColDef()
  const { mutateAsync : getSTPLandFullkitInDaysExcelData} = useGetSTPLAndFullKitExcelData();
  const [masterUIConfig, setMasterUIConfig] = useState([]);

  const getGraphData = async (params: any) => {
    const {isExcelExport,graphflag} = params;
    if(isExcelExport) {
      const headersdata = currentGridRef?.current?.api?.getColumnState();
      const formattedFilters = formatFilterJSON(appliedFilters)
      const body = getBodyForExcelExport({headersdata,appliedFilters : formattedFilters,colDefMap})
      console.log('stpl and full kit response body',body)
      try{
          const response = await getSTPLandFullkitInDaysExcelData({body,isExcelExport : 1,graphflag, report_name : FilterPageName.Prod_STPL_And_FullKits})
          DownloadExcel(response, FilterPageName.Prod_STPL_And_FullKits)
      }
      catch(e){
        console.log(e)
      }

    }
    else{

      try {
        const response = await getSTPLandFullkitInDaysData(params);
        setGraphData(response.data.data);
      }
      catch (e) {
        console.log(e);
        notifyError('Failed to fetch Graph data!');
      }
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
      getColDef(response)
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

  const handleSaveClick = async (coldefs?: any) => {
    try {
      if (coldefs) {
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdStplAndFullKit,
          cs: JSON.stringify(coldefs),
        };
        await updateUserUIReportConfigData([payload]);
        setColumnState([...coldefs]);

      } else {
        if (currentGridRef?.current?.api) {

          const config = currentGridRef.current.api.getColumnState();

          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdStplAndFullKit,
            cs: JSON.stringify(config)
          }
          await updateUserUIReportConfigData([payload]);
          await getUserColumnConfig();
        }
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
        const response = await getPageWiseFilterData({page_name: FilterPageName.Prod_STPL_And_FullKits});
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    setColumnDef();
    getGraphData({ graphflag: 1 });
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
      handleSaveClick(masterUIConfig);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (currentGridRef?.current) {
      setMasterUIConfig(currentGridRef?.current.api.getColumnState());
      getUserColumnConfig();
    }
  }, [colDef, currentGridRef]);
  
  const GetExcelData = async () => {
    getGraphData({graphflag : 0 , isExcelExport : true , appliedFilters})
  }
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
        isExcelExport={isGridView?true:false}
        onExcelExportClick = {GetExcelData}
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
      <HorizontalViewWrapper style={{ flex: 1 }}>
        {isGridView ? (
          <GridView 
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
            appliedFilters={appliedFilters}
          />
        ) : (
          <BTRTableWrapper style={{ maxHeight:"95%", paddingLeft: "20px" }}>
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
