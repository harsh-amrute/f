import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline'
import { useUserData } from '../../../../../context'
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { Footer, Wrapper } from './DueDateQuotation.styled'
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useGetBufferMasterData, useGetCCRGroupMaster, useGetCCRItemTypeMappingMaster, useGetCCRMasterData, useGetDailyWorkingCalendar, useGetDBRsettingsData, useGetFOLData, useGetLineCCRDetails, useGetMarketOperatingLeadTimeMasterData, useGetUIConfig, useGetFilteredOrdersForDDQ, useGetOrdersForExcelDDQ } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation'
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils'
import { GridOptions } from 'ag-grid-enterprise'
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox'
import "./style.css"
import Step1 from './Step1'
import Step2 from './Step2'
import OverlayLoader from '../../Common/Loader'
import Step3 from './Step3'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import { notifyError } from '../../../../../helpers/notify'
import { useGetBOMExplosionData } from '../../../../../VectorFlow/Services/MTO/Common/BOMExplosion'
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../hooks/useFilter';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { FilterPageName, UIGridCode } from '../../Common/Enum'
import useColDef from '../../../../../hooks/useColDef'

const APIFilterConfig = {
  filSecVisConfig: {
    "Prod_DDQ": {
      mjr: false,
      or: true,
      res: true,
      cus: true
    },
  }
};

const DueDateQuotation = () => {
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  //States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [unScheduled, setUnScheduled] = useState(true);
  const [rows, setRows] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>(new Map());
  const [step, setStep] = useState(1);
  const [masters, setMasters] = useState<any>(null);
  const [lineCCR, setLineCCR] = useState<any>(null);
  const [rowsSelectedForAssignment, setRowsSelectedForAssignment] = useState<any>(false);
  const [disabled, setDisabled] = useState(true);
  const [confirmedRows, setConfirmedRows] = useState<any>(null);
  const [scheduledOrders, setScheduledOrders] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState<any>();
  //Refs
  const totalRows = useRef(0);
  const currentPageSelectedRows = useRef<any>([]);
  const assignmentRef = useRef<any>();
  const gridRef = useRef<any>();

  const { mutateAsync: getBufferMaster, } = useGetBufferMasterData();
  const { mutateAsync: getCCRGroupMaster, } = useGetCCRGroupMaster();
  const { mutateAsync: getCCRItemTypeMappingMaster, } = useGetCCRItemTypeMappingMaster();
  const { mutateAsync: getFOLData, } = useGetFOLData();
  const { mutateAsync: getCCRMasterData, } = useGetCCRMasterData();
  const { mutateAsync: getDailyWorkingCalendar, } = useGetDailyWorkingCalendar();
  const { mutateAsync: getMarketOperatingLeadTimeMasterData, } = useGetMarketOperatingLeadTimeMasterData();
  const { mutateAsync: getLineCCRDetails, } = useGetLineCCRDetails();
  const { mutateAsync: getBOMExplosionData, } = useGetBOMExplosionData();
  const { mutateAsync: getDBRsettingsData, } = useGetDBRsettingsData();
  const { data: UIConfig, isLoading: isUIConfigLoading } = useGetUIConfig("DueDateQuotation");
  const { mutateAsync: getFilteredOrdersForDDQ, isLoading: isFilteredDataLoaded } = useGetFilteredOrdersForDDQ();
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const [filterData, setFilterData] = useState({});
  const {  mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
  const { mutateAsync: getFilteredOrdersForExcelDDQ} = useGetOrdersForExcelDDQ();
  const {colDefMap , getColDef} = useColDef();
  const  { 
    state: currFilter, 
    setState: setCurrFilter, 
    onFilterRemove, 
    isFilterOpen, 
    isMfgSelected,
    onAddFilter, 
    onApplyFilter, 
    toggleFilter,
    appliedFilters
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_DDQ);

  const [loading, setLoading] = useState(false);

  const extras: any = [
    {
      field: "",
      colId:"checkbox",
      resizable: false,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      flex: 1,
      initialHide: false,
      suppressMenu: true,
      maxWidth: 30,
      pinned: 'left',
      position: 0,
      filter: false
    },
  ]

  const customization: any = {
    "OrderID": {
      cellRenderer: "agGroupCellRenderer"
    }
  }

  const columnDefs = useMemo(() => {
    return getColumnDefinations(UIConfig?.data ? UIConfig?.data?.data : [], customization, extras);
  }, [isUIConfigLoading]);

  const gridOptions: GridOptions = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
      };
    },
    rowSelection: "multiple",
    columnDefs: columnDefs,
    suppressRowClickSelection: true,
    masterDetail: true,
    detailRowAutoHeight: true,
    detailCellRendererParams: {
      suppressMenu: true,
      detailGridOptions: {
        rowHeight: 30,
        domLayout: "autoHeight",
        autoGroupColumnDef: {
          headerName: "Item Name",
          cellRendererParams: {
            suppressCount: true
          }
        },
        columnDefs: [
          { field: "qty", headerName: "Requirement", },
          { field: "soh", headerName: "Stock", },
          { field: "wip", headerName: "WIP", },
          { field: "gap", headerName: "Gap", },
        ],
        defaultColDef: {
          flex: 1,
          suppressMenu: true,
          cellStyle: {
            fontSize: "16px",
            display: "flex",
            alignItems: "center"
          }
        },
        treeData: true,
        getDataPath: (data: any) => {
          return data.path;
        },
      },
      getDetailRowData: async (params: any) => {
        const data = await getBOMExplosionData({ orderId: params.data.oid, lineId: params.data.lid });
        params.successCallback(data?.data?.data)
      }
    },
    defaultColDef: {
      wrapHeaderText: true,
      autoHeaderHeight: true,
      // resizable: true,
      // flex: 1,
      suppressSizeToFit: false,
      filter: "agTextColumnFilter",
      suppressMenu: true,
      floatingFilter: true,
      resizable: true,
      cellStyle: {
        fontSize: "18px",
      }
    },
    sideBar: {
      toolPanels: ["columns"],

    },
    
  }

  // useEffect(() => {
  //   // getDDQData();
    
  //   // console.log("running");
  // }, [currentPage, unScheduled, step == 1]);

  useEffect(() => {
    if (selectedRows.size > 0) {
      setDisabled(false)
    }
    else if (selectedRows.size == 0) {
      setDisabled(true)
    }
  }, [selectedRows]);

  useEffect(()=>{
    if(UIConfig){
      getColDef(UIConfig)
    }
  },[UIConfig])

  // useEffect(()=>{
  //   setLoading(false)
  // }, [masters])

  // const getDDQData = async () => {
  //   try {
  //     const formatedFilters = formatFilterJSON(appliedFilters);
  //     const data: any = await getFilteredOrdersForDDQ({ page: currentPage, unSch: unScheduled, appliedFilters: formatedFilters });
  //     totalRows.current = data?.data?.data?.count;
  //     const results: any = data?.data?.data?.results;
  //     // results = results?.filter((order: any) => {
  //     //   return !scheduledOrders.has(order.id);
  //     // })
  //     setRows(results);
  //   }
  //   catch (err) {
  //     console.error(err);
  //     notifyError("Something Went Wrong!");
  //   }
  // }

  const getMastersData = async () => {
    try {
      setLoading(true);
      const bufferMaster = await getBufferMaster();
      const allBufferMaster = bufferMaster?.data?.data;
      const prodMaster: any = []
      const procMaster: any = []
      if (allBufferMaster) {
        allBufferMaster.forEach((master: any) => {
          if ("production".includes(master.buffer_type.buffer_type.toLowerCase())) {
            prodMaster.push({ label: master.buffer_code, value: master.buffer_id, size: master.buffer_size })
          }
          else if ("procurement".includes(master.buffer_type.buffer_type.toLowerCase())) {
            procMaster.push({ label: master.buffer_code, value: master.buffer_id, size: master.buffer_size })
          }
        })
      }

      const ccrGroupMaster = await getCCRGroupMaster();
      const ccrGroupData = Object.values(ccrGroupMaster?.data?.data);
      const ccrGroups: any = [];

      const FOLData = await getFOLData();
      const FOL = FOLData?.data?.data;

      ccrGroupData.forEach((group: any) => {
        const obj: any = { label: group.ccr_group_code, value: group.ccr_group_id, ccrs: [] }
        // let minFOL = Infinity
        let minFol = Infinity;
        let maxFol = -Infinity;
        group.ccrs.forEach((ccr: any) => {
          minFol = Math.min(minFol, FOL[ccr.ccr_id]?.fol || 0);
          maxFol = Math.max(maxFol, FOL[ccr.ccr_id]?.fol || 0)
        })
        group.ccrs.forEach((ccr: any) => {
          obj.ccrs.push({ label: ccr.ccr_name, value: ccr.ccr_id, minFol, maxFol, fol: FOL[ccr.ccr_id]?.fol || 0, plant_id: ccr.plant });
        })
        ccrGroups.push(obj);
      })
      const CCRItemTypeMappingMasterData = await getCCRItemTypeMappingMaster();

      const CCRItemTypeMappingMaster = CCRItemTypeMappingMasterData?.data?.data;


      const CCRMasterData = await getCCRMasterData();
      const CCRMaster = CCRMasterData?.data?.data;

      const WorkingCalenderData = await getDailyWorkingCalendar();
      const WorkingCalender = WorkingCalenderData.data.data;

      const MarketLeadTimeMasterData = await getMarketOperatingLeadTimeMasterData();
      const MarketLeadTimeMaster = MarketLeadTimeMasterData.data?.data;


      const DBRSettingsData = await getDBRsettingsData();
      const DBRSettings = DBRSettingsData.data?.data;

      setMasters({ procMaster, prodMaster, ccrGroups, CCRItemTypeMappingMaster, FOL, CCRMaster, WorkingCalender, MarketLeadTimeMaster, DBRSettings });

      const orders = Array.from(selectedRows.values()).map((row: any) => {
        return row.data.ok
      })

      if (Array.from(selectedRows.values()).length != 0) {
        const lineCCRData = await getLineCCRDetails(orders);
        setLineCCR(lineCCRData.data.data);
      }

      setLoading(false)
    }
    catch (err) {
      console.error(err);
      notifyError("Something Went Wrong!");
    }
  }


  const getCurrentStep = () => {
    switch (step) {
      case 1: {
        return (
          <Step1
            ref={gridRef}
            gridOptions={gridOptions}
            colDef={columnDefs}
            rows={rows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            currentPageSelectedRows={currentPageSelectedRows}
            totalRows={totalRows}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            scheduledOrders={scheduledOrders}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
            
          />
        )
      }
      case 2: {
        return (
          <Step2
            ref={assignmentRef}
            columnData={UIConfig?.data?.data}
            gridOptions={gridOptions}
            selectedRows={selectedRows}
            theme={themeUi}
            masters={masters}
            lineCCR={lineCCR}
            getMastersData={getMastersData}
            rowsSelectedForAssignment={rowsSelectedForAssignment}
            setRowsSelectedForAssignment={setRowsSelectedForAssignment}
            confirmedRows={confirmedRows}
            setConfirmedRows={setConfirmedRows}
            setDisabled={setDisabled}
          />
        )
      }
      case 3: {
        return (
          <Step3
            columnData={UIConfig?.data?.data}
            gridOptions={gridOptions}
            confirmedRows={confirmedRows}
            setConfirmedRows={setConfirmedRows}
            theme={themeUi}
            ref={assignmentRef}
            WorkingCalender={masters?.WorkingCalender}
            scheduledOrders={scheduledOrders}
            setScheduledOrders={setScheduledOrders}
            setStep={setStep}
            setDisabled={setDisabled}
            setSelectedRows={setSelectedRows}
            setMasters={setMasters}
          />
        )
      }
    }
  }

  const renderSubmitText = () => {
    switch (step) {
      case 1: {
        return <>Continue</>
      }
      case 2: {
        return <>Confirm</>
      }
      case 3: {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.6rem" }}><img src="/assets/img/mto/dueDateQuotation/calender.svg" /> Schedule</div>
      }
      default: {
        return <>  Continue</>
      }
    }
  }

  const getUpdatedFilterData = async (isExcelExport = false) => {
    if(isExcelExport){
      const headersdata = currentGridRef?.current?.api?.getColumnState();
      const formatedFilters = formatFilterJSON(appliedFilters);
      const body = getBodyForExcelExport({headersdata , filterData : formatedFilters, colDefMap});
      try{
        const response = await getFilteredOrdersForExcelDDQ({body,isExcelExport : 1,report_name : FilterPageName.Prod_DDQ,unSch : unScheduled})
        if(response.status == 200){
          DownloadExcel(response,FilterPageName.Prod_DDQ)
        }else{
          notifyError("Error exporting Excel!");
        }
      }catch(e){
        console.error("Error exporting Excel", e);
        notifyError("Error exporting Excel!");
      }
    }else{

      try {
        const formatedFilters = formatFilterJSON(appliedFilters);
        const data: any = await getFilteredOrdersForDDQ({ page: currentPage, unSch: unScheduled, appliedFilters: formatedFilters });
        totalRows.current = data?.data?.data?.count;
        let results: any = data?.data?.data?.results;
        if(scheduledOrders){
          results = results?.filter((order: any) => {
            return !scheduledOrders.has(order.id);
          })
        }
        setRows(results);
      }
      catch (err) {
        console.error(err);
        notifyError("Something Went Wrong!");
      }
    }
  }


  useEffect(() => {
    if (Object.entries(appliedFilters).length) {
      getUpdatedFilterData();
    }
  }, [appliedFilters, currentPage, unScheduled, step == 1]);


  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdDDQ
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

  const handleSaveClick = async (coldefs?: any) => {
    try {
      if (coldefs) {
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdDDQ,
          cs: JSON.stringify(coldefs),
        };
        await updateUserUIReportConfigData([payload]);
      } else {
        if (currentGridRef?.current?.api) {
          const config = currentGridRef.current.api.getColumnState();

          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdDDQ,
            cs: JSON.stringify(config),
          };

          await updateUserUIReportConfigData([payload]);
          await getUserColumnConfig();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetClick = () => {
    setIsReset(true);
  };

  const getFilterData = async () => {
    try {
      const response = await getPageWiseFilterData({
        page_name: FilterPageName.Prod_DDQ,
      });
      setFilterData(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserColumnConfig();
    getFilterData();
  }, []);

  useEffect(() => {
    if (isReset) {
      setColumnState([...columnDefs]);
      setIsReset(false);
    } else {
      if (isReset != undefined) {
        handleSaveClick(columnDefs);
      }
    }
  }, [isReset]);

  useEffect(() => {
    if (currentGridRef?.current && columnState?.length) {
      columnState.forEach((col: any) => {
        if (col.initialHide != undefined) {
          col.hide = col.initialHide;
        }
      });
      
      const result = currentGridRef?.current?.api.applyColumnState({
        state: columnState,
        applyOrder: true,
      });
      if (!result) {
        console.error("Failed to apply column state 1");
      }
    }
  }, [columnState]);
  
 const ExcelData = ()=>{
    getUpdatedFilterData(true);
 }
  return (
    <Wrapper style={{ height: step === 2 && rowsSelectedForAssignment ? "130vh" : "100%" }} className="wrapper">
      {step === 1 ?
        <MTOActionToolBar
          comp="DDQ"
          quickFilter={
            step === 1 ? <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
              <Checkbox checked={unScheduled} onChange={(e: any) => setUnScheduled(e.target.checked)} theme={themeUi} />
              &nbsp;&nbsp; <strong>Show Only Unscheduled Orders</strong>
            </div> : null
          }
          isAddFilterButton
          isExcelExport
          onExcelExportClick={ExcelData}
          isFilterOpen={isFilterOpen}
          onAddFilter={onAddFilter}
          toggleFilter={toggleFilter}
          onApplyFilter={onApplyFilter}
          multiFilter={currFilter}
          setMultiFilter={setCurrFilter}
          onFilterRemove={onFilterRemove}
          isMfgSelected={isMfgSelected}
          handleSaveClick={handleSaveClick}
          handleResetClick={handleResetClick}
        />
        :
        <MTOActionToolBar 
          comp="DDQ"
          multiFilter={currFilter}
          disableRemoveFilter={true}
        />
      }
      {(isFilteredDataLoaded || loading || isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />}
      {getCurrentStep()}
      <VFModalCard key={"key2"} openModal={showModal} closeModal={() => { setShowModal(false) }} headerText={'Warning'} headerIcon={'/assets/img/ist/warning.svg'} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} paddingLeftAndRight={0} headerTextColor={'black'} backgroundColor={'f4f4f4'} data-testid="vfmultifilter-img" >
        <div style={{ margin: "0 2rem" }}>
          <div style={{ minHeight: '10vh', fontSize: '16px', padding: "20px", textAlign: "center" }}>
            Any unsaved changes will be discarded, <br /> Are you sure you want to go back ?
          </div>
          <div style={{ zoom: '0.7', display: 'flex', justifyContent: 'right', gap: '8px', borderTop: '2px dashed #A0A0A0', padding: '20px 0 0 0' }}>

            <VFButton onClick={() => { setShowModal(false) }} themeUi={themeUi}>
              No
            </VFButton>
            <VFButtonOutline onClick={() => {
              setShowModal(false)
              setCurrentPage(1);
              setConfirmedRows(null);
              setStep(1);
            }} themeUi={themeUi}>
              Yes, Go Back
            </VFButtonOutline>
          </div>
        </div>
      </VFModalCard>
      <Footer style={(rowsSelectedForAssignment && step == 2) ? { position: "fixed", bottom: 0, background: "white", width: "92.6%", zIndex: "2", padding: "1rem 0", paddingBottom: "20px", margin: 0 } : {}}>
        {step != 1 && <VFButtonOutline
          themeUi={themeUi}
          onClick={() => {
            if (step > 1) {
              if (step != 2) {
                setStep(step - 1);
                setDisabled(false);
              }
              if (step == 2) {
                setShowModal(true)
              }
            }
          }}
          style={{ width: "50px", height: "40px" }}>
          <img src="/assets/img/mto/dueDateQuotation/back-btn.svg" />
        </VFButtonOutline>}
        {step != 3 && <VFButtonOutline themeUi={themeUi}
          onClick={() => {
            if (step == 1) {
              gridRef.current?.deselectAllForStep1()
            }
            if (step == 2) {
              assignmentRef.current?.deselectAllForStep2()
            }
          }}
          style={{ fontSize: "12px", width: "100px", height: "40px" }}>
          Deselect Orders
        </VFButtonOutline>}

        <VFButton themeUi={themeUi}
          disabled={disabled}
          onClick={() => {
            if (step == 1) {
              setStep(step + 1);
            }
            else if (assignmentRef.current?.onConfirm && step == 2) {
              const isDDQActiveFlag = masters.DBRSettings.find((setting: any) => setting.flag == "IsDDQActive");
              // const isDDQActiveFlag = false;
              assignmentRef.current.onConfirm().then((data: any) => {
                if (data && isDDQActiveFlag) { //TODO: what to do when the flag is false and no changes are made, what message to show
                  setStep(step + 1);
                }
              });
            }
            else if (assignmentRef.current?.onScheduled && step == 3) {
              assignmentRef.current.onScheduled();
            }
          }}
          style={{ fontSize: "12px", width: "100px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {renderSubmitText()}
        </VFButton>
      </Footer>
      {/* <BomExplosionPOC/> */}
    </Wrapper>
  )
}

export default DueDateQuotation

