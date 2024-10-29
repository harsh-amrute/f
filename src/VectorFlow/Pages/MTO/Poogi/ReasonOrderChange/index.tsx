import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { SaveBtnWrapper, SaveBtn } from './styles';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetReasonForDelayOrder, useGetPoogiRemarks, usePutPoogiRemarks, useGetPoogReasonForDealyedOrderExcel } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import { toast } from 'react-toastify';
import { notifyError, notifyLoader, notifySuccess } from '../../../../../helpers/notify';
import { AgGridReactProps } from 'ag-grid-react';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useUserData } from '../../../../../context';
import RemarkHistoryRenderer from '../../Production/DepartmentWiseBMReport/RemarkHistoryRenderer';
import MTORemarkHistoryModal from '../../Production/DepartmentWiseBMReport/MTORemarkHistoryModal';
import PlannedReleaseRenderer from './PlannedReleaseRenderer';
import CustomCellEditor from './MajorDropDownRenderer';
import { ColorsMTO } from '../../Common/Colors';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import BPPRenderer from '../../Common/BPPRenderer';
import OverlayLoader from '../../Common/Loader';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { FilterPageName, pagination, UIGridCode } from '../../Common/Enum';
import useFilter from '../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import useColDef from '../../../../../hooks/useColDef';

const APIFilterConfig = {
    filSecVisConfig: {
        "Poogi_Reason_For_Delayed_Orders" : {
            mjr : false,
            or: true,
            res: true,
            cus: true
        },
    }
};

type MyObject = {
    ok: string;
    minid: number;
    majid: number;
};

const ReasonForDelayOrder = () => {
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getPoogiReasonsDelayedOrder, isLoading } = useGetReasonForDelayOrder();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
    const { mutateAsync: updatePoogiRemarks } = usePutPoogiRemarks();
    const [rowData, setRowData] = useState<any>();
    const [isWIPChecked, setWIPCheck] = useState<boolean>(true);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    //const [items, setItems] = useState<any[]>([]);
    //const [disabled, setDisabled] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowDataCount, setRowDataCount] = useState<number>(0);
    const [currentGridRef, setCurrentGridRef] = useState<any>(null);
    const [columnState, setColumnState] = useState<any>([]);
    const [isReset, setIsReset] = useState(false);
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
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_Reason_For_Delayed_Orders);
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();  
    const reportName = 'ReasonForDelayedOrders';
    const tableRowRef = useRef<any>(null);
    const { user } = useUserData();
    const { colDefMap , getColDef} = useColDef();
    const { mutateAsync : getPoogiReasonsDelayedOrderExcelExport} = useGetPoogReasonForDealyedOrderExcel();
    const themeUi = user?.user?.theme_ui;

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const agGridProps: AgGridReactProps = {
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            pagination: true,
            defaultColDef: {
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                cellStyle: {
                    'text-align': 'center',
                    //'height': '50px',
                    //"font-style": "Roboto",
                    //"font-variant": "normal",
                    "font-size": "18px",
                    "font-family": "Roboto",
                    'white-space': 'nowrap',
                    'resizable': 'true',
                    'color': '#000'
                },
                floatingFilterComponentParams: {
                    suppressFilterButton: true
                }
            },
        },
        sideBar: sideBar,
        masterDetail: true,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false
    };

    const customHeader = {
        RemarksHistory: {
            pinned: "right",
            minWidth: 120,
            lockPosition: true,
            cellRenderer: RemarkHistoryRenderer,
            cellRendererParams: {
                onClick: (oid: string) => handleModal(oid)
            }
        },
        MajorReason: {
            pinned: "right",
            lockPosition: true,
            initialWidth: 300,
            cellRenderer: (props: any) => {
                return <CustomCellEditor {...props} isWip={isWIPChecked} rowData={rowData} selectedValue={props.data.maj} selectedMinorReason={props.data.min} setRowData={setRowData}
                />
            }
        },
        MinorReason: {
            pinned: "right",
            lockPosition: true,
            minWidth: 300,
            cellRenderer: (props: any) => {
                return <CustomCellEditor {...props} rowData={rowData} isWip={isWIPChecked} selectedValue={props.data.maj} selectedMinorReason={props.data.min} setRowData={setRowData}
                />
            },

        },
        ElapsedDays: {
            cellStyle: {
                'color': ColorsMTO.Pink.code
            }
        },
        PlannedReleaseDate: {
            cellRenderer: PlannedReleaseRenderer,
        },
        QuotedDueDate: {
            cellRenderer: PlannedReleaseRenderer,
        },
        BPP: {
            cellRenderer: BPPRenderer,
        }
    }

    //to get the header data from api
    const getHeaderData = async () => {
        try {
            const response = await getUIConfigData(reportName);
            getColDef(response);
            setColDef(getColumnDefinations(response.data.data, customHeader))
        }
        catch (e) {
            console.log(e);
        }
    }

    //to get the rowdata for Aggrid
    const getInitialData = async (wipval: boolean, page: number, isExcelExport = false) => {
        if(isExcelExport){
            try {
                const headersdata = currentGridRef?.current?.api.getColumnState();
                const formattedFilters = formatFilterJSON(appliedFilters);
                const body = getBodyForExcelExport({headersdata,appliedFilters : formattedFilters,colDefMap});
                const apiResponse = await getPoogiReasonsDelayedOrderExcelExport({ wip : wipval == true ? 1 : 0,body, isExcelExport : 1, report_name : FilterPageName.Poogi_Reason_For_Delayed_Orders})
                if(apiResponse.status == 200) {
                    DownloadExcel(apiResponse,FilterPageName.Poogi_Reason_For_Delayed_Orders)
                }else{
                    notifyError("Error downloading")
                }
            } catch (error) {
                notifyError("An error occurred")
                console.log(error)
            }
        }else{

            try {
                setCurrentPage(page);
                setWIPCheck(wipval);
                const formatedFilters = formatFilterJSON(appliedFilters);
                const apiResponse = await getPoogiReasonsDelayedOrder({ 'wip': wipval === true ? 0 : 1, 'curr': page, appliedFilters: formatedFilters });
                setRowDataCount(apiResponse.data?.data?.count);
                setRowData(apiResponse?.data?.data?.results)
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    //to handle the modal for remark
    const handleModal = async (data: any) => {
        try {
            if (data.r.length === 0) {
                const RemarkHistory = await getPoogIRemarks(data.ok)
                if (RemarkHistory.data?.data === 'No remarks are present for the order') {
                    data.r = []
                }
                else {
                    data.r = RemarkHistory.data?.data;
                }
            }
            setRemarkHistory(data.r)
            setIsRemarkHistoryOpen(true)
        }
        catch (e) {
            console.log(e);
        }

    }

    const getUserColumnConfig = async () => {
        try {
          const data = await getUserUIReportConfigData({
            un: user.user.name,
            rn_id: UIGridCode.PoogiReasonForDelayedOrders
          });
    
          const newConfig =  data?.data?.data[0]?.columns_settings ? JSON.parse(data?.data?.data[0]?.columns_settings) : [];
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
                const config = currentGridRef?.current?.api?.getColumnState() || [];
        
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.PoogiReasonForDelayedOrders,
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

    const getFilterData = async () => {
        try {
          const response = await getPageWiseFilterData({ page_name: FilterPageName.Poogi_Reason_For_Delayed_Orders, isAssigned: isWIPChecked ? 0 : 1 });
          setFilterData(response?.data.data);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getUserColumnConfig();
        getHeaderData();
    }, []);
    
    useEffect(()=>{
        getInitialData(true, 1);
    },[appliedFilters])
    
    useEffect(()=>{
        getFilterData();
    },[isWIPChecked])

    useEffect(() => {
        if (isLoading) {
            toast.dismiss();
            notifyLoader("Loading Data ...")
        }
        else {
            toast.dismiss();
        }
    }, [isLoading, isWIPChecked])

    const checkForNullMinid = async (data: any): Promise<boolean> => {
        return new Promise((resolve) => {
            const hasNullMinid = data.some((item: any) => item.minid === null);
            resolve(hasNullMinid);
        });
    };

    const updateMajorMinorReason = async () => {
        //console.log('body to api = ', tableRowRef.current.props.rowData)
        const allRows = tableRowRef?.current?.props?.rowData;
        let putData: MyObject[] = [];
        allRows.forEach((e: any) => {
            const singleData: any = {
                'ok': e.ok,
                minid: null,
                majid: null
            }
            if (e.maj) {
                singleData['majid'] = Number(e.maj);
                if (e.min) {
                    singleData.minid = Number(e.min);
                }
                putData.push(singleData);
            }
        })
        // console.log('put', putData)
        if (putData.length === 0) {
            notifyError("Please Select Minor Reason ")
        } else {
            const checkData = async () => {
                const result = await checkForNullMinid(putData);
                // Execute further code if `minid` is null
                if (result) {
                    // Place your further code here
                    notifyError('Please select Minor Reason');
                } else {
                    const RemarkHistory = await updatePoogiRemarks(putData);
                    //console.log('remarkHistory', RemarkHistory)
                    if (RemarkHistory.status == 200) {
                        toast.dismiss();
                        notifySuccess('Successfull');
                        if (isWIPChecked) {
                            getInitialData(isWIPChecked, 1)
                        }
                        putData = [];
                    }
                }
            };

            checkData();
        }
    }

    const handlePageChange = (currPage: number) => {
        setCurrentPage(currPage);
        getInitialData(isWIPChecked ? true : false, currPage)
    }

    useEffect(()=>{ 
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
            const result = currentGridRef?.current?.api?.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    });

    useEffect(() => {
        if (isReset) {
          setColumnState(colDef);
          setIsReset(false)
        }else{
          handleSaveClick();
        }
    }, [isReset]);

      
    if (!rowData) {
        return null;
    }
    const ExcelData = ()=>{
        getInitialData(isWIPChecked,0,true)
    }

    return (
        <div style={{ zoom: 1.1 }}>
            <MTOActionToolBar
                quickFilter={
                    <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        <Checkbox checked={isWIPChecked} onChange={(e) => getInitialData(e.target.checked, 1)} theme={themeUi} /> &nbsp;&nbsp; <strong>
                            Show Only Unassigned Orders
                        </strong>
                    </div>
                }
                isAddFilterButton
                isExcelExport
                onExcelExportClick={ExcelData}
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
            {(isLoading || isUpdateUserConfig || isGetUserConfig) ?
                <OverlayLoader /> :
                <>
                    <VFTable
                        {...agGridProps}
                        paginationPageSize={10}
                        height='650px'
                        columnDefs={colDef}
                        rowData={rowData}
                        pagination={false}
                        ref={tableRowRef}
                        onGridReady={(params: any) => {
                            console.log(params, 'PARAMS');
                            params?.api.autoSizeAllColumns();

                            setCurrentGridRef(tableRowRef);
                        }}
                    />
                    <VFPagination
                        selectedRows={0}
                        rowsPerPage={pagination.mtoPageSize}
                        totalRows={rowDataCount}
                        currentPage={currentPage}
                        handleChangePage={handlePageChange}
                    />


                    <SaveBtnWrapper>
                        <SaveBtn onClick={() => updateMajorMinorReason()}>
                            Save Reasons
                        </SaveBtn>
                    </SaveBtnWrapper>

                    <MTORemarkHistoryModal
                        data={remarkHistory}
                        isOpen={isRemarkHistoryOpen}
                        onClose={() => setIsRemarkHistoryOpen(false)}
                    />
                </>
            }
        </div>

    )
}

export default ReasonForDelayOrder;