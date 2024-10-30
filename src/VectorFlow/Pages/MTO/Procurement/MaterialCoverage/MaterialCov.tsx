import { useEffect, useRef, useState } from 'react';
import {
  TextXAxis,
  TextYAxis,
  BTRLayoutTabsWrapper,
} from '../MaterialCoverage/styles';
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import ActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import FutureCov from './FutureCov';
import CurrentCov from './CurrentCov';
import { MaterialCoverageString } from '../../Common/String';
import MaterialSODetailed from './MaterialSODetailed';
import { DetailsObj } from './CommonFunc';
import { useGetSOSummaydetails } from '../../../../../VectorFlow/Services/MTO/Procurement/MaterialCoverage';
import { toast } from 'react-toastify';
import { notifyError, notifyLoader } from '../../../../../helpers/notify';
import useFilter from "../../../../../hooks/useFilter";
// import { APIResponseMock } from '../../Production/InsightsAndTrends/OrderBalance/OrderBalanceMockData';
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import OverlayLoader from '../../Common/Loader';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIConfigData } from '../../../../Services/MTO/Common/UIConfig';
import { formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import { FilterPageName, UIGridCode } from "../../Common/Enum";
import { useUserData } from "../../../../../context/index";
import ColorCellRenderer from "../../Common/ColorCellRenderer";
import CustomGroupCellRenderer from "./CustomGroupCellRenderer";
import useColDef from '../../../../../hooks/useColDef';

const APIFilterConfig = {
  filSecVisConfig: {
    "Proc_Material_Coverage_For_OpenSO": {
      mjr: false,
      or: true,
      res: true,
      cus: true
    },
  }
};

const MaterialCov = () => {
  const [detailDataObj, setDetailDataObj] = useState<DetailsObj>();
  // const [currTab, setCurrTab] = useState<string>("Current Coverage");
  const [currTab, setCurrTab] = useState<string>("CurrentCoverage");
  const [toggleComponent, setToggleComponent] = useState<boolean>(false);
  const [soData, setSOData] = useState<any>([]);
  const { mutateAsync: getSOSummaryData, isLoading, /*refetch*/ } = useGetSOSummaydetails();
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData();
  const [filterData, setFilterData] = useState({});
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState(false);
  const [colDef, setColDef] = useState<any>([]);
  const [HeaderData, setHeaderData] = useState([]);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { user } = useUserData();
  const { getColDef , colDefMap} = useColDef();
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
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Proc_Material_Coverage_For_OpenSO);

  useEffect(() => {
    if (isLoading) {

      toast.dismiss();
      notifyLoader("Loading Data ...")
    }
    else {
      toast.dismiss();
    }
  }, [isLoading])


  const handleToggleComponent = (value: boolean) => {
    setToggleComponent(value);
  }

  const handleParameterData = (data: any) => {
    setDetailDataObj(data)
  }

  const getSOData = async () => {
    try {
      const formatedFilters = formatFilterJSON(appliedFilters);
      const response = await getSOSummaryData({ appliedFilters: formatedFilters});
      setSOData(response?.data?.data || []);
    } catch (error) {
      console.log(error);
      notifyError('Failed to fetch Grid data!');
    }
  }

  useEffect(() => {
    getSOData();
  }, [appliedFilters])

  const tabs = [
    {
      id: "1",
      value: 'CurrentCoverage',
      label: "Current Coverage"
    },
    {
      id: "2",
      value: 'FutureCoverage',
      label: "Future Coverage"
    }
  ]

  const defaultTab = tabs.findIndex(tab => tab.value === currTab)

  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProcMaterialCovOpenSales
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

  const handleSaveClick = async () => {
    try {
      if(currentGridRef?.current?.api){
        const config = currentGridRef.current.api.getColumnState();
  
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProcMaterialCovOpenSales,
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

  const reportName = 'MaterialCoverageforOpenSalesOrder';
  const getHeaderData = async () => {
      try {
          const response = await getUIConfigData(reportName);
          getColDef(response)
          setHeaderData(response.data.data);
      }
      catch (e) {
          console.log(e);
      }
  }
  
  const customHeader =
  {
      ColorPriority: {
          cellRenderer: ColorCellRenderer
      },
      FullKitAvail: {
          minWidth: 100,
          maxWidth: 100,
          cellStyle: {
              paddingRight: '25px'
          },
          cellRenderer: "avlCellRenderer",
          tooltipComponent: 'availabilityToolTip',
          tooltipValueGetter: (params: any) => {
              const oq = params.data.oq;
              const fka = params.data.fka;
              return `${fka}/${oq} kits can be manufactured`;
          },
      }
  }

  const extras = [
      {
          field: "",
          resizable: true,
          position: 0,
          suppressHeaderFilterButton: true,
          suppressMenu: true,
          filter: false,
          width: 50,
          maxWidth: 50,
          cellRenderer: CustomGroupCellRenderer
      }
  ]

  const getFilterData = async () => {
    try {
      const response = await getPageWiseFilterData({page_name: FilterPageName.Proc_Material_Coverage_For_OpenSO});
      setFilterData(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const coldefs = getColumnDefinations(HeaderData, customHeader, extras);
    setColDef(coldefs);
  }, [HeaderData])

  useEffect(() => {
    getUserColumnConfig();
    getHeaderData();
    getFilterData()
  }, [])

  useEffect(() => {
    if (isReset) {
      setColumnState(colDef);
      setIsReset(false)
    }else{
      handleSaveClick();
    }
  }, [isReset]);

  const materialSoDetailRef = useRef<any>();
  const callExportExcel = () => {
      const headersdata = currentGridRef?.current?.api.getColumnState();
      const formattedFilters = formatFilterJSON(appliedFilters)
      const body = getBodyForExcelExport({headersdata: headersdata, filterData : formattedFilters , colDefMap})
      if(materialSoDetailRef.current?.getExcelExport)
        materialSoDetailRef.current.getExcelExport(body)
    
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!toggleComponent ?
        <>
          {
            isLoading && (
              <OverlayLoader />
            )
          }

          <ActionToolBar
            comp={'MaterialCov'}
            isExcelExport
            isAddFilterButton
            isFilterOpen={isFilterOpen}
            onAddFilter={onAddFilter}
            toggleFilter={toggleFilter}
            onApplyFilter={onApplyFilter}
            isMfgSelected={isMfgSelected}
            multiFilter={currFilter}
            setMultiFilter={setCurrFilter}
            onFilterRemove={onFilterRemove}
            onDateChange={() => { console.log('') }}
            submitDate={() => { console.log('') }}
          />
          <div>

            <BTRLayoutTabsWrapper>
              <VFFloatingTab
                handleClick={(e) => setCurrTab(e.value)}
                tabs={tabs}
                defaultTab={defaultTab}
              />
            </BTRLayoutTabsWrapper>
            <div style={{ display: 'flex', justifyContent: "center", width: "100%" }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", width: "max-content", position: "relative" }}>
                <TextXAxis style={{ height: 'max-content', position: "absolute", right: "100%" }}>
                  {MaterialCoverageString.orderPriority}
                  <div style={{
                    width: "85%",
                    border: "1px solid #000",
                    color: "#FFFFFF",
                    marginBottom: '10px',
                    marginLeft: '5px'
                  }}>
                  </div>
                </TextXAxis>

                {/**code goes here */}
                {
                  currTab === 'FutureCoverage' ?
                    <FutureCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} data={soData} />
                    :
                    <CurrentCov handleToggleComponent={handleToggleComponent} setDetailDataObj={handleParameterData} data={soData} />
                }
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextYAxis style={{ width: "max-content" }}>
                {MaterialCoverageString.statusKits}
                <div style={{
                  width: "85%",
                  border: "1px solid #000",
                  color: "#FFFFFF",
                  marginBottom: '8px',
                  marginLeft: '5px'
                }}>
                </div>
              </TextYAxis>
            </div>
          </div>

        </>
        :
        <div style={{ height: '100%', display: "flex", flexDirection: "column", paddingBottom: "2rem" }}>


          <ActionToolBar
            isGoBackButton
            isExcelExport
            comp={'MaterialCovDetailData'}
            onDateChange={() => { console.log('') }}
            submitDate={() => { console.log('') }}
            handleGoBack={() => {
              handleToggleComponent(false);
              // setCurrTab("CurrentCoverage")
            }}
            isMfgSelected={isMfgSelected}
            multiFilter={currFilter}
            disableRemoveFilter={true}
            handleSaveClick={handleSaveClick}
            handleResetClick={handleResetClick}
            onExcelExportClick={ callExportExcel}
          />

          <MaterialSODetailed 
            ref={materialSoDetailRef}
            isUpdateUserConfig={isUpdateUserConfig}
            isGetUserConfig={isGetUserConfig}
            parameterData={detailDataObj}
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
          />
        </div>

      }
    </div>

  )
}
export default MaterialCov;