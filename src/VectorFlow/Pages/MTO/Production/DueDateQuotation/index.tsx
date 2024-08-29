import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline'
import { useUserData } from '../../../../../context'
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { Footer, Wrapper } from './DueDateQuotation.styled'
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useGetBufferMasterData, useGetCCRGroupMaster, useGetCCRItemTypeMappingMaster, useGetCCRMasterData, useGetDailyWorkingCalendar, useGetDBRsettingsData, useGetFOLData, useGetLineCCRDetails, useGetMarketOperatingLeadTimeMasterData, useGetUIConfig, useGetFilteredOrdersForDDQ } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation'
import { formatFilterJSON, getColumnDefinations } from '../../../../../helpers/utils'
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

const APIFilterConfig = {
  filSecVisConfig :  {
    "Prod_DDQ" : {
      mjr : false,
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
  const [disabled, setDisabled] = useState(false);
  const [confirmedRows, setConfirmedRows] = useState<any>(null);
  const [scheduledOrders, setScheduledOrders] = useState(new Set());
  const [showModal, setShowModal] = useState(false);

  //Refs
  const totalRows = useRef(0);
  const currentPageSelectedRows = useRef<any>([]);
  const assignmentRef = useRef<any>();
  const gridRef= useRef<any>();

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
  const [filterData, setFilterData] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const { data: filterResponse, /*isLoading*/ } = useGetFilterData()
  const {state:currFilter,setState:setCurrFilter, onFilterRemove} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_DDQ);
    
    const toggleFilter = (state: boolean) => {
        setIsFilterOpen(state);
    }
  const [loading, setLoading] = useState(false);

  const extras: any = [
    {
      field: "",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      suppressMenu: true,
      maxWidth: 50,
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

  useEffect(() => {
    getDDQData();
  }, [currentPage, unScheduled, step == 1]);

  useEffect(() => {
    if (selectedRows.size > 0) {
      setDisabled(false)
    }
    else if (selectedRows.size == 0) {
      setDisabled(true)
    }
  }, [selectedRows]);


  // useEffect(()=>{
  //   setLoading(false)
  // }, [masters])

  const getDDQData = async () => {
    try {
      const formatedFilters = formatFilterJSON(appliedFilters);
      const data: any = await getFilteredOrdersForDDQ({ page: currentPage, unSch: unScheduled, appliedFilters: formatedFilters });
      totalRows.current = data?.data?.data?.count;
      const results: any = data?.data?.data?.results;
      // results = results?.filter((order: any) => {
      //   return !scheduledOrders.has(order.id);
      // })
      setRows(results);
    }
    catch (err) {
      console.error(err);
      notifyError("Something Went Wrong!");
    }
  }

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
      console.log()
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
            rows={rows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            currentPageSelectedRows={currentPageSelectedRows}
            totalRows={totalRows}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            scheduledOrders={scheduledOrders}
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

  const onApplyFilter = (filter:any)=>{
    console.log(filter);
    setAppliedFilters(filter);
    setIsFilterOpen(false)
  }
  
  const onAddFilter = ()=>{
      setIsFilterOpen(true)
  }

  const getUpdatedFilterData = async() => {
    try {
      const formatedFilters = formatFilterJSON(appliedFilters);
      const data: any = await getFilteredOrdersForDDQ({ page: currentPage, unSch: unScheduled, appliedFilters: formatedFilters });
      totalRows.current = data?.data?.data?.count;
      let results: any = data?.data?.data?.results;
      results = results?.filter((order: any) => {
        return !scheduledOrders.has(order.id);
      })
      setRows(results);
    }
    catch (err) {
      console.error(err);
      notifyError("Something Went Wrong!");
    }
  }

  useEffect(()=>{
    setAppliedFilters(currFilter);
  },[currFilter])

  useEffect(() => {
      getUpdatedFilterData();
  }, [appliedFilters,currentPage, unScheduled]);

  useEffect(() => {
      setFilterData(filterResponse?.data.data)
  }, [filterResponse]);

  return (
    <Wrapper style={{ height: step === 2 && rowsSelectedForAssignment ? "130vh" : "100%" }} className="wrapper">
      {step != 3 && 
        <MTOActionToolBar 
          comp="DDQ" 
          quickFilter={
            step === 1 ? <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
              <Checkbox checked={unScheduled} onChange={(e: any) => setUnScheduled(e.target.checked)} theme={themeUi} />
               &nbsp;&nbsp; <strong>Show Only Unscheduled Orders</strong>
            </div> : null
          } 
          isAddFilterButton 
          isFilterOpen={isFilterOpen}
          onAddFilter={onAddFilter}
          toggleFilter={toggleFilter}
          onApplyFilter={onApplyFilter} 
          multiFilter={currFilter}
          setMultiFilter={setCurrFilter}
          onFilterRemove={onFilterRemove}
        />
      }
      {(isFilteredDataLoaded || loading) && <OverlayLoader />}
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
      <Footer>
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
            console.log();
            if(step == 1){
              gridRef.current?.deselectAllForStep1()
            }
            if(step == 2){
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
              const isDDQActiveFlag = masters.DBRSettings.find((setting: any)=> setting.flag == "IsDDQActive");
              // const isDDQActiveFlag = false;
              assignmentRef.current.onConfirm().then((data: any)=>{
                if (data && isDDQActiveFlag){ //TODO: what to do when the flag is false and no changes are made, what message to show
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