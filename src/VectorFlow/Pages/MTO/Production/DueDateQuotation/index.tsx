import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline'
import { useUserData } from '../../../../../context'
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { Footer, Wrapper } from './DueDateQuotation.styled'
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useGetBufferMasterData, useGetCCRGroupMaster, useGetCCRItemTypeMappingMaster, useGetCCRMasterData, useGetDailyWorkingCalendar, useGetFOLData, useGetMarketOperatingLeadTimeMasterData, useGetOrdersForDDQ, useGetUIConfig } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation'
import { getColumnDefinations } from '../../../../../helpers/utils'
import { GridOptions } from 'ag-grid-enterprise'
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox'
import "./style.css"
import Step1 from './Step1'
import Step2 from './Step2'
import OverlayLoader from '../../Common/Loader'
import Step3 from './Step3'

const DueDateQuotation = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    //States
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [unScheduled, setUnScheduled] = useState(true);
    const [rows, setRows] = useState<any>([]);
    const [selectedRows] = useState<any>(new Map());
    const [step, setStep] = useState(1);
    const [masters, setMasters] = useState<any>(null);
    const [rowsSelectedForAssignment, setRowsSelectedForAssignment] = useState<any>(false);

    const [confirmedRows, setConfirmedRows] = useState<any>(null);

    //Refs
    const totalRows = useRef(0);
    const currentPageSelectedRows = useRef<any>([]);
    const assignmentRef = useRef<any>();

    const { mutateAsync: getData, isLoading: isDataLoading } = useGetOrdersForDDQ();
    const { mutateAsync: getBufferMaster, } = useGetBufferMasterData();
    const { mutateAsync: getCCRGroupMaster, } = useGetCCRGroupMaster();
    const { mutateAsync: getCCRItemTypeMappingMaster, } = useGetCCRItemTypeMappingMaster();
    const { mutateAsync: getFOLData, } = useGetFOLData();
    const { mutateAsync: getCCRMasterData, } = useGetCCRMasterData();
    const { mutateAsync: getDailyWorkingCalendar, } = useGetDailyWorkingCalendar();
    const { mutateAsync: getMarketOperatingLeadTimeMasterData, } = useGetMarketOperatingLeadTimeMasterData();
    const { data: UIConfig, isLoading: isUIConfigLoading } = useGetUIConfig("DueDateQuotation");

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
    
    const columnDefs = useMemo(() => {
        return getColumnDefinations(UIConfig?.data ? UIConfig?.data?.data : [], undefined, extras);
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
        defaultColDef: {
            wrapHeaderText: true,
            autoHeaderHeight: true,
            // resizable: true,
            // flex: 1,
            suppressSizeToFit: false,
            filter: "agTextColumnFilter",
            floatingFilter: true,
            resizable: true,
            cellStyle:{
              fontSize:"18px",
            }
        },
        sideBar: {
            toolPanels: ["columns"],
        },
    }



    useEffect(() => {
        getDDQData()
    }, [currentPage, unScheduled])

    useEffect(()=>{
      setLoading(false)
    }, [masters])

    const getDDQData = async () => {
        const data = await getData({ currentPage, unScheduled: unScheduled });
        totalRows.current = data?.data?.data?.count;
        setRows(data?.data?.data?.results)
    }

    const getMastersData = async () => {
      if(!masters){
        setLoading(true);
        const bufferMaster = await getBufferMaster();
        const allBufferMaster = bufferMaster?.data?.data;
        const prodMaster: any = []
        const procMaster: any = []
        if(allBufferMaster){
          allBufferMaster.forEach((master: any)=>{
            if(master.buffer_type.buffer_type.toLowerCase() === "prod"){
              prodMaster.push({label: master.buffer_code, value: master.buffer_id, size: master.buffer_size})
            }
            else if(master.buffer_type.buffer_type.toLowerCase() === "proc"){
              procMaster.push({label: master.buffer_code, value: master.buffer_id, size: master.buffer_size})
            }
          })
        }

        const ccrGroupMaster = await getCCRGroupMaster();
        const ccrGroupData = Object.values(ccrGroupMaster?.data?.data);
        const ccrGroups: any = []

        ccrGroupData.forEach((group: any)=>{

          const obj: any = {label:group.ccr_group_code, value: group.ccr_group_id, ccrs:[]}
          group.ccrs.forEach((ccr: any)=>{
            obj.ccrs.push({label:ccr.ccr_name, value: ccr.ccr_id});
          })
          ccrGroups.push(obj);
        })      
        const CCRItemTypeMappingMasterData = await getCCRItemTypeMappingMaster();

        const CCRItemTypeMappingMaster = CCRItemTypeMappingMasterData?.data?.data;
        const FOLData = await getFOLData();
        const FOL = FOLData?.data?.data;

        const CCRMasterData = await getCCRMasterData();
        const CCRMaster = CCRMasterData?.data?.data;

        const WorkingCalenderData = await getDailyWorkingCalendar();
        const WorkingCalender = WorkingCalenderData.data.data;

        const MarketLeadTimeMasterData = await getMarketOperatingLeadTimeMasterData();
        const MarketLeadTimeMaster = MarketLeadTimeMasterData.data?.data;

        setMasters({procMaster, prodMaster, ccrGroups, CCRItemTypeMappingMaster, FOL, CCRMaster, WorkingCalender, MarketLeadTimeMaster});

      }
    }

    const getCurrentStep = () => {
        switch (step) {
            case 1: {
                return (
                    <Step1 
                      gridOptions={gridOptions} 
                      rows={rows} 
                      selectedRows={selectedRows} 
                      currentPageSelectedRows={currentPageSelectedRows} 
                      totalRows={totalRows}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
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
                          getMastersData={getMastersData}
                          rowsSelectedForAssignment={rowsSelectedForAssignment}
                          setRowsSelectedForAssignment={setRowsSelectedForAssignment}
                          setConfirmedRows={setConfirmedRows}
                        />
                )
            }
            case 3: {
              return (
                <Step3
                  columnData={UIConfig?.data?.data}
                  gridOptions={gridOptions} 
                  confirmedRows={confirmedRows}
                  theme={themeUi}
                />
              )
            }
        }
    }


    return (
        <Wrapper style={{height:step === 2 && rowsSelectedForAssignment ? "130vh" : "100%"}} className="wrapper">
            <MTOActionToolBar comp="DDQ" quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}><Checkbox checked={unScheduled} onChange={(e: any) => setUnScheduled(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>Show Only Unscheduled Orders</strong></div>} />
            {(isDataLoading || loading) && <OverlayLoader/>}
            
            {getCurrentStep()}
            <Footer>
                <VFButtonOutline
                    themeUi={themeUi}
                    onClick={() => {
                        setStep(step - 1);
                    }}
                    style={{ width: "50px", height: "40px" }}>
                    <img src="/assets/img/mto/dueDateQuotation/back-btn.svg" />
                </VFButtonOutline>
                <VFButtonOutline themeUi={themeUi} onClick={() => { console.log() }} style={{ fontSize: "12px", width: "100px", height: "40px" }}>
                    Cancel
                </VFButtonOutline>
                <VFButton themeUi={themeUi} 
                  onClick={() => { 
                    setStep(step + 1) ;
                    if(assignmentRef.current?.onConfirm){
                      assignmentRef.current.onConfirm() 
                    }
                  }} 
                  style={{ fontSize: "12px", width: "100px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {step === 2 ? "Confirm" :"Continue"}
                </VFButton>
            </Footer>
        </Wrapper>
    )
}

export default DueDateQuotation