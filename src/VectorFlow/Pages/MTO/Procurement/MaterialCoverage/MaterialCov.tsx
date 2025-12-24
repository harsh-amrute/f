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
import { useGetOpenSODetailsData, useGetOpenSODetailsDataForExcelExport, useGetSOSummaydetails } from '../../../../../VectorFlow/Services/MTO/Procurement/MaterialCoverage';
import { toast } from 'react-toastify';
import { notifyError, notifyLoader, notifySuccess} from '../../../../../helpers/notify';
import useFilter from "../../../../../hooks/useFilter";
// import { APIResponseMock } from '../../Production/InsightsAndTrends/OrderBalance/OrderBalanceMockData';
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import OverlayLoader from '../../Common/Loader';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { useGetUIAndUserConfigData, useGetUIConfigData } from '../../../../Services/MTO/Common/UIConfig';
import { formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import { FilterPageName, UIGridCode } from "../../Common/Enum";
import { useUserData } from "../../../../../context/index";
import ColorCellRenderer from "../../Common/ColorCellRenderer/ColorCellRenderer";
import CustomGroupCellRenderer from "./CustomGroupCellRenderer";
import useColDef from '../../../../../hooks/useColDef';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import ChildrenColor from "../../Common/ChildrenColor/ChildrenColor";
import { useGetDBRsettingsData } from '../../../../../VectorFlow/Services/MTO/Common/DBRSettings';
import CommonGridview, { getExcelExportDataArgs, GetGridDataArgs, getRowDataArgs } from '../../../../../helpers/CommonGridview';
import useMaterialSO from './useMaterialSO';
import BomExcelModal from '../../Common/BomExcelModal';



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
  const [isReset, setIsReset] = useState<boolean | undefined>(undefined);
  const [colDef, setColDef] = useState<any>([]);
  const [HeaderData, setHeaderData] = useState([]);
  const [HeaderDataChild, setHeaderDataChild] = useState([]);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  
  const { mutateAsync: getOpenSODetailsData, isLoading: gridDataLoading} = useGetOpenSODetailsData()
  const { mutateAsync : getOpenSODetailsDataForExcelExport } = useGetOpenSODetailsDataForExcelExport();
  const { user } = useUserData();
  const { getColDef , colDefMap, getNewColDef} = useColDef();
  const [defaultColState,setDefaultColState] = useState<any>([])

  const [userConfigFetched, setUserConfigFetched] = useState<any>(false);
  const [userPageSize, setUserPageSize] = useState<any>();
  const {mutateAsync: getDBRsettingsData} = useGetDBRsettingsData();
  const [childColDef, setChildColDef] = useState<any>();
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [excelBody, setExcelBody] = useState<any>({});
  const [isAllData, setIsAllData] = useState(false);
  
    const reportName = 'MaterialCoverageforOpenSalesOrder';
    const childReportName = "MaterialCoverageforOpenSalesOrder_Child"
  
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
    setAppliedFilters,
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Proc_Material_Coverage_For_OpenSO);

  const {
    agGridProps,
    // RRRRowData,
    // isLoading,
    // rowDataCount,
    // handlePageChangeOnHook,
    // currentPage,
    // savePageSize,
    getInitialDataQuery,

} = useMaterialSO(detailDataObj, childColDef);



    const themeUi = user?.user?.theme_ui;
    
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
      // const formatedFilters = formatFilterJSON(appliedFilters);
      // const response = await getSOSummaryData({ appliedFilters: formatedFilters});
      const response = await getSOSummaryData();
      setSOData(response?.data?.data || []);
    } catch (error) {
      console.log(error);
      notifyError('Failed to fetch Grid data!');
    }
  }

  useEffect(() => {
    getSOData();
    // }, [appliedFilters])
  }, [])


  // const getUserColumnConfig = async () => {
  //     try {
  //       const data = await getUserUIReportConfigData({
  //         un: user.user.name,
  //         rn_id: (detailDataObj?.allOrders)?UIGridCode.ProcMaterialCovOpenSalesAll:UIGridCode.ProcMaterialCovOpenSales
  //       });
  
  //       setUserConfigFetched(true);
  //       const newConfig = data?.data?.data[0]?.columns_settings ? JSON.parse(data?.data?.data[0]?.columns_settings) : [];
  //       setUserPageSize(newConfig.pageSize? Number(newConfig.pageSize) : undefined);
  //       setColumnState(newConfig.cs)

  
  //       if (!data) {
  //         console.error('Failed to apply column state');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  // }

  // useEffect(()=>{
  //   if(colDef.length > 0 && currentGridRef?.current?.api && !defaultColState.length){
  //     setDefaultColState(currentGridRef?.current?.api?.getColumnState())
  //   }
  // },[colDef,currentGridRef])

  

  // const handleSaveClick = async (isReset = false, page_size?: number) => {
  //   try {
  //     if (page_size) {
  //       const config = columnState;
  //       const fullConfig = { cs: config, pageSize: page_size };
  //       const payload = {
  //         un: user.user.name,
  //         rn_id: (detailDataObj?.allOrders)?UIGridCode.ProcMaterialCovOpenSalesAll:UIGridCode.ProcMaterialCovOpenSales,
  //         cs: JSON.stringify(fullConfig),
  //       };
  //       await updateUserUIReportConfigData([payload]);

  //     } else {

  //       const config = isReset ? defaultColState : currentGridRef.current.api.getColumnState(); 
        
  
  //       const fullConfig = {
  //         cs: config,
  //         pageSize: userPageSize,
  //       };
  
  //       const payload = {
  //         un: user.user.name,
  //         rn_id: (detailDataObj?.allOrders)?UIGridCode.ProcMaterialCovOpenSalesAll:UIGridCode.ProcMaterialCovOpenSales,
  //         cs: JSON.stringify(fullConfig),
  //       };
  
  //       await updateUserUIReportConfigData([payload]);
  //       !isReset && notifySuccess("Saved successfully")
    

  //       if (!isReset) {
  //         setColumnState([...config]);
  //       }
  //     }
  
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  
  // const handleResetClick = () => {
  //   setIsReset(true);
  // }


  // const getHeaderData = async () => {
  //     try {
  //         const response = await getUIConfigData(reportName);
  //       const childResponse = await getUIConfigData(childReportName)
  //         // getColDef(response)
  //         // setHeaderData(response.data.data);
  //         setHeaderDataChild(childResponse.data.data)
  //     }
  //     catch (e) {
  //         console.log(e);
  //     }
  // }
    const { mutateAsync: getUIAndUserConfigData  } =
      useGetUIAndUserConfigData();

  const setColumnDef = async () => {
      try {
        const response = await getUIAndUserConfigData({
          reportName:childReportName,
          userName: user.user.name,
          reportNameId:UIGridCode.ProcMaterialCovOpenSales,
        });
        const defaultColDef = response?.data?.data?.default_coldef;
      
        getNewColDef(response);
        setChildColDef(
          getColumnDefinations(
            defaultColDef,
            childCustomheader
          )
        );
  
       
      } catch (e) {
        console.log(e);
      }
    };


  const customHeader =
  {
      ColorPriority: {
          cellRenderer: ColorCellRenderer
      },
      FullKitAvail: {
          minWidth: 150,
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

  const childCustomheader = {
    clr:{
      cellRenderer : ChildrenColor
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
          pinned:"left",
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

  // useEffect(() => {
  //   const coldefs = getColumnDefinations(HeaderData, customHeader, extras);
  //   const childColDefs = getColumnDefinations(HeaderDataChild,childCustomheader)
  //   if(detailDataObj?.allOrders){
  //     setColDef([
  //       {
  //         field: "fk_status",
  //         headerName: "Status",
  //         minWidth: 150,
  //       },...coldefs]
  //     )
  //   }else{
  //   setColDef(coldefs);
  //   }
  
  //   setChildColDef(childColDefs)
  // }, [HeaderData, detailDataObj,HeaderDataChild])

  useEffect(() => {
    // getHeaderData();
    setColumnDef()
    getFilterData()
  }, [])

  // useEffect(()=>{
  //   if(defaultColState && defaultColState.length){
  //     getUserColumnConfig();
  //   }

  // },[defaultColState, detailDataObj])

  // useEffect(() => {
  //   if (isReset) {
  //     setColumnState([...defaultColState])

  //     handleSaveClick(true);

  //     setIsReset(false) 
  //     notifySuccess("Reset successfully")

  //   }
  // }, [isReset]);

  
  
  // const materialSoDetailRef = useRef<any>();
  
  // const callExportExcel = () => {
  //   const headersdata = currentGridRef?.current?.api.getColumnState();
  //   const formattedFilters = formatFilterJSON(appliedFilters)
  //   const body = getBodyForExcelExport({ headersdata, filterData: formattedFilters, colDefMap })
  //   setExcelBody(body);
  //   setShowExcelModal(true);
  // }



  const getSettingsData = async()=>{
    const DBRSettingsData: any = await getDBRsettingsData()
    const DBRSettings = DBRSettingsData.data?.data;

    for(const setting of DBRSettings){
      if(setting.flag === "MaterialSOAllData"){
          setIsAllData(setting.value == 1 ? true : false)
      }
  }
  }

  useEffect(()=>{
    getSettingsData()
  },[])

  type ExportModalProps = {
    onConfirm: () => void;
    onCancel: () => void; 
    onClose: () => void;
    showExcelModal : boolean;
  };
  
  const BomExcelExportModal = ({
    onConfirm,
    onCancel,
    onClose,
    showExcelModal,
  }: ExportModalProps) => {
    return (
      <BomExcelModal
        open={showExcelModal}
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
        themeUi={themeUi}
        headerText="Excel Export"
        messageText="Do you want to download Excel with RM/PM details?"
      />
    );
  };

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
            themeUi={themeUi}
            // isAddFilterButton
            // isFilterOpen={isFilterOpen}
            // onAddFilter={onAddFilter}
            // toggleFilter={toggleFilter}
            // onApplyFilter={onApplyFilter}
            // isMfgSelected={isMfgSelected}
            // multiFilter={currFilter}
            // setMultiFilter={setCurrFilter}
            // onFilterRemove={onFilterRemove}
            // onDateChange={() => { console.log('') }}
            // submitDate={() => { console.log('') }}
          />
          <div >
            <div style={{display: 'flex', justifyContent: isAllData?'right':'center', alignItems: 'center', width: '100%', padding: '0 1rem'}}>

            <BTRLayoutTabsWrapper>
              <VFFloatingTab
                handleClick={(e) => setCurrTab(e.value)}
                tabs={tabs}
                defaultTab={defaultTab}
              />

              </BTRLayoutTabsWrapper>
              
           
              {isAllData &&

                <VFButton style={{ marginLeft: '30%', fontSize: '10px', height: '30px', fontFamily: 'roboto' }} themeUi={themeUi} onClick={() => { handleToggleComponent(true), handleParameterData({ allOrders: true }) }}>
                  Show All Orders
                </VFButton>
              }
                </div>
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


          {/* <ActionToolBar
            isGoBackButton
            themeUi={themeUi}
            isExcelExport
            comp={'MaterialCovDetailData'}
            onDateChange={() => { console.log('') }}
            submitDate={() => { console.log('') }}
            handleGoBack={() => {
              handleToggleComponent(false);
              // setCurrTab("CurrentCoverage")
            }}
            // disableRemoveFilter={true}
            handleSaveClick={handleSaveClick}
            handleResetClick={handleResetClick}
            onExcelExportClick={callExportExcel}
            isAddFilterButton
            isFilterOpen={isFilterOpen}
            onAddFilter={onAddFilter}
            toggleFilter={toggleFilter}
            onApplyFilter={onApplyFilter}
            isMfgSelected={isMfgSelected}
            multiFilter={currFilter}
            setMultiFilter={setCurrFilter}
            onFilterRemove={onFilterRemove}
            // onDateChange={() => { console.log('') }}
            // submitDate={() => { console.log('') }}
          /> */}

          <CommonGridview 
            reportName={reportName}
            columnDefinationProps={{
              customColDef: customHeader,
              extras:extras,
            }}
            gridDataLoading={gridDataLoading}
            excelExportParams={{ isExcelExportFromBackend: true, excelExportReportName: reportName, showBomExcelModal:true}}
            customGridOptions={agGridProps}
            setAppliedFilters={setAppliedFilters}
            setCurrentFilters={setCurrFilter}
            appliedFilters={appliedFilters}
            reportNameId={UIGridCode.ProcMaterialCovOpenSales}
            getExcelExportData={(params:getExcelExportDataArgs)=>{
              const queryString = getInitialDataQuery({ isChildren : params.isChildren,isExcelExport:true});
              return getOpenSODetailsDataForExcelExport({data:queryString,...params})
            }}
            getRowData={(params:getRowDataArgs)=>{
              const queryString = getInitialDataQuery({currPage:params.page,pageSize:params.page_size});
              return getOpenSODetailsData({data:queryString, appliedFilters: params?.appliedFilters})
            }}
            actionToolBarProps={{
              comp:'MaterialCovDetailData',
              isAddFilterButton:true,
              isGoBackButton:true,
              handleGoBack:() => {
                handleToggleComponent(false);
                // setCurrTab("CurrentCoverage")
              },
              isFilterOpen:isFilterOpen,
              onAddFilter:onAddFilter,
              toggleFilter:toggleFilter,
              onApplyFilter:onApplyFilter,
              isMfgSelected:isMfgSelected,
              multiFilter:currFilter,
              setMultiFilter:setCurrFilter,
              onFilterRemove:onFilterRemove,

            }}
            BomExcelExport={BomExcelExportModal}
          />

          {/* <MaterialSODetailed 
            ref={materialSoDetailRef}
            isUpdateUserConfig={isUpdateUserConfig}
            isGetUserConfig={isGetUserConfig}
            parameterData={detailDataObj}
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
            appliedFilters={appliedFilters}
            handleSaveClick={handleSaveClick}
            userConfigFetched={userConfigFetched}
            userPageSize={userPageSize}
            setUserPageSize={setUserPageSize}
            childColDef={childColDef}
            showExcelModal={showExcelModal}
            setShowExcelModal={setShowExcelModal}
            excelBody={excelBody}
          /> */}
        </div>

      }
    </div>

  )
}
export default MaterialCov;