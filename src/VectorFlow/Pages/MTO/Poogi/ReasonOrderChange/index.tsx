import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../Common/VFTable';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { Wrapper } from './styles';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetReasonForDelayOrder, useGetPoogiRemarks, usePutPoogiRemarks, useGetPoogReasonForDealyedOrderExcel, useGetPoogiMajorMinorReason } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import { toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import { AgGridReactProps } from 'ag-grid-react';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useUserData } from '../../../../../context';
import RemarkHistoryRenderer from '../../Production/DepartmentWiseBMReport/RemarkHistoryRenderer';
import MTORemarkHistoryModal from '../../Production/DepartmentWiseBMReport/MTORemarkHistoryModal';
import PlannedReleaseRenderer from './PlannedReleaseRenderer';
import CustomCellEditor from './MajorDropDownRenderer';
import { ColorsMTO } from '../../Common/Colors';
import VFPagination from "../../Common/VFPagination";
import BPPRenderer from '../../Common/BPRRenderer/BPPRenderer';
import OverlayLoader from '../../Common/Loader';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { FilterPageName, pagination, UIGridCode } from '../../Common/Enum';
import useFilter from '../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import useColDef from '../../../../../hooks/useColDef';
import VFSaveRemark from '../../../../../components/VectorFLOW/commons/VFSaveRemark';

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
    const { data: reasonData, isLoading: isGetPoogiMajorMinorReason } = useGetPoogiMajorMinorReason();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getPoogiReasonsDelayedOrder, isLoading: isPoogiReasonsDelayedOrder } = useGetReasonForDelayOrder();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
    const { mutateAsync: updatePoogiRemarks, isLoading: isPutPoogiRemarks} = usePutPoogiRemarks();
    const [rowData, setRowData] = useState<any>();
    const [isWIPChecked, setWIPChecked] = useState<boolean>(true);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    //const [items, setItems] = useState<any[]>([]);
    //const [disabled, setDisabled] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowDataCount, setRowDataCount] = useState<number>(0);
    const [currentGridRef, setCurrentGridRef] = useState<any>(null);
    const [columnState, setColumnState] = useState<any>([]);
    const [isReset, setIsReset] = useState<any>(undefined);
    const [colDef, setColDef] = useState([{}]);
    const [filterData, setFilterData] = useState({});
    const [isDisabled, setIsDisabled]= useState<boolean>(true)
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
    const { colDefMap, getColDef } = useColDef();
    const { mutateAsync: getPoogiReasonsDelayedOrderExcelExport } = useGetPoogReasonForDealyedOrderExcel();
    const themeUi = user?.user?.theme_ui;
    const [masterUIConfig, setMasterUIConfig] = useState([]);
    const unsavedUserData = useRef(new Map());

    const [userPageSize, setUserPageSize] = useState<any>();
    const [userConfigFetched, setUserConfigFetched] = useState<any>(false);


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
                cellRendererParams: {
                    isWip: isWIPChecked,
                    reasonData: reasonData,
                },
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                cellStyle: {
                    'textAlign': 'center',
                    //'height': '50px',
                    //"font-style": "Roboto",
                    //"font-variant": "normal",
                    "fontSize": "18px",
                    "fontFamily": "Roboto",
                    'whiteSpace': 'nowrap',
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
        pivotMode: false,
        onCellValueChanged: (params) => onCellValueChanged(params.data),
    }

    const onCellValueChanged = (newRow: any) => {
        if (newRow.maj !== null) {
            unsavedUserData.current.set(newRow.ok, newRow);
        } else {
            unsavedUserData.current.delete(newRow.ok);
        }
    }

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
            cellStyle: {
                'background': 'none',
                'border': "none",
            },    
            cellRenderer: (props: any) => {
                return <CustomCellEditor {...props} selectedValue={props.data.maj} selectedMinorReason={props.data.min}
                />
            }
        },
        MinorReason: {
            pinned: "right",
            lockPosition: true,
            minWidth: 300,
            cellStyle: {
                'background': 'none',
                'border': "none",
            },
            cellRenderer: (props: any) => {
                return <CustomCellEditor {...props} selectedValue={props.data.maj} selectedMinorReason={props.data.min}
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

    const getInitialData = async (wipval = isWIPChecked, page = 1, isExcelExport = false, pageSize?: any) => {
        if (isExcelExport) {
            try {
                const headersdata = currentGridRef?.current?.api.getColumnState();
                const formattedFilters = formatFilterJSON(appliedFilters);
                const body = getBodyForExcelExport({ headersdata, appliedFilters: formattedFilters, colDefMap });
                const apiResponse = await getPoogiReasonsDelayedOrderExcelExport({ wip: wipval == true ? 1 : 0, body, isExcelExport: 1, report_name: FilterPageName.Poogi_Reason_For_Delayed_Orders })
                if (apiResponse.status == 200) {
                    DownloadExcel(apiResponse, FilterPageName.Poogi_Reason_For_Delayed_Orders)
                } else {
                    notifyError("Error downloading")
                }
            } catch (error) {
                notifyError("An error occurred")
                console.log(error)
            }
        } else {
            try {
                const formatedFilters = formatFilterJSON(appliedFilters);
                const apiResponse = await getPoogiReasonsDelayedOrder({ 
                    'wip': wipval === true ? false : true, 
                    'curr': page, 
                    appliedFilters: formatedFilters,
                    pageSize: pageSize || userPageSize || pagination.mtoPageSize
                });
                setRowDataCount(apiResponse.data?.data?.count);
                setRowData(apiResponse?.data?.data?.results);
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
    
            setUserConfigFetched(true)
            const newConfig = data?.data?.data[0]? JSON.parse(data?.data?.data[0]?.columns_settings) || [] : [];
            setUserPageSize(newConfig.pageSize ? Number(newConfig.pageSize) : undefined);
            setColumnState(newConfig.cs);
    
            if (!data) {
                console.error('Failed to apply column state');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveClick = async (coldefs?: any, page_size?:any) => {
        try {
            if (coldefs) {
                const fullConfig = {cs: coldefs, pageSize:userPageSize };
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.PoogiReasonForDelayedOrders,
                    cs: JSON.stringify(fullConfig),
                };
                await updateUserUIReportConfigData([payload]);
                setColumnState([...coldefs]);
                
            }
            else if(page_size){
                const config = columnState;
                const fullConfig = { cs: config, pageSize: page_size };        
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.PoogiReasonForDelayedOrders,
                    cs: JSON.stringify(fullConfig),
                };
                await updateUserUIReportConfigData([payload]);
            }
            else {
                if (currentGridRef?.current?.api) {
                    const config = currentGridRef.current.api.getColumnState();
    
                    const fullConfig = { cs: config, pageSize: userPageSize };
    
                    const payload = {
                        un: user.user.name,
                        rn_id: UIGridCode.PoogiReasonForDelayedOrders,
                        cs: JSON.stringify(fullConfig)
                    }
                    await updateUserUIReportConfigData([payload]);
                    await getUserColumnConfig();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }


    const savePageSize = (pageSize: any) => {
        if (pageSize) {
            setCurrentPage(1)
            setUserPageSize(pageSize);
            handleSaveClick(undefined, pageSize);
            getInitialData(isWIPChecked, 1, false, pageSize);
        } else {
            notifyError("Invalid page size");
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
        getHeaderData();
    }, []);
    
    useEffect(() => {
        if (Object.entries(appliedFilters).length && userConfigFetched) {
            setCurrentPage(1);
            getInitialData();
        }
    }, [appliedFilters, userConfigFetched])
    
    useEffect(() => {
        getFilterData();
    }, [isWIPChecked])

    const checkForNullMinid = async (data: any): Promise<any> => {
        return new Promise((resolve) => {
            const hasNullMinid = data.find((item: any) => item.minid === null);
            resolve(hasNullMinid);
        });
    };

    const updateMajorMinorReason = async () => {
        let putData: MyObject[] = [];

        unsavedUserData.current.forEach((updatedRow) => {
            const singleData: any = {
                'ok': updatedRow.ok,
                minid: null,
                majid: null
            }
            if (updatedRow.maj) {
                singleData['majid'] = Number(updatedRow.maj);
                if (updatedRow.min) {
                    singleData.minid = Number(updatedRow.min);
                }
                putData.push(singleData);
            }
        });

        if (putData.length === 0) {
            notifyError("Please Select Reason")
        } else {
            const checkData = async () => {
                const result = await checkForNullMinid(putData);
                // Execute further code if `minid` is null
                if (result) {
                    // Place your further code here
                    notifyError('Please select Minor Reason For Order Id: ' + result.ok.split("_")[0]);
                } else {
                    const RemarkHistory = await updatePoogiRemarks(putData);
                    if (RemarkHistory.status == 200) {
                        toast.dismiss();
                        notifySuccess('Successfull');
                        if (isWIPChecked) {
                            getInitialData(isWIPChecked, 1)
                        }
                        unsavedUserData.current.clear();
                        putData = [];
                    }
                }
            };

            checkData();
        }
    }

    const handlePageChange = (currPage: number) => {
        setCurrentPage(currPage);
        getInitialData(isWIPChecked, currPage, false, userPageSize);
    }

    const updateUserChanges = (params: any) => {
        if (unsavedUserData.current.size > 0) {
            // Update grid
            params.api.forEachNode((node: any) => {
                unsavedUserData.current.forEach((updatedRow) => {
                    if (node.data.ok === updatedRow.ok) {
                        node.setData(updatedRow);
                    }
                }); 
            });
        }
    }
    
    useEffect(() => {
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
            const result = currentGridRef?.current?.api?.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    },[columnState]);

    useEffect(() => {
        if (isReset) {
            handleSaveClick(masterUIConfig);
            setIsReset(false);
        }
    }, [isReset]);

    useEffect(() => {
        if (colDef.length > 0) {
            if (currentGridRef?.current) {
                setMasterUIConfig(currentGridRef?.current.api.getColumnState());
                getUserColumnConfig();
            }
        }
    }, [colDef]);
      
    // if (!rowData) {
    //     return null;
    // }

    const ExcelData = () => {
        getInitialData(isWIPChecked, 0, true);
    }


    return (
        <div>
            <MTOActionToolBar
                quickFilter={
                    <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        <Checkbox checked={isWIPChecked} onChange={(e) => setWIPChecked(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>
                            Show Only Unassigned Orders
                        </strong>
                    </div>
                }
                isAddFilterButton
                themeUi={themeUi}
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
            {(isPoogiReasonsDelayedOrder || isUpdateUserConfig || isGetUserConfig || isGetPoogiMajorMinorReason || isPutPoogiRemarks) && (<OverlayLoader />)}
            <Wrapper>
                <VFTable
                    {...agGridProps}
                    paginationPageSize={10}
                    height='480px'
                    columnDefs={colDef}
                    rowData={rowData}
                    pagination={false}
                    ref={tableRowRef}
                    onGridReady={(params: any) => {
                        params?.api.autoSizeAllColumns();
                        setCurrentGridRef(tableRowRef);
                    }}
                    onRowDataUpdated={(params: any) => { updateUserChanges(params); }}
                    maintainColumnOrder
                    onFilterChanged={()=>{Object.keys((currentGridRef?.current?.api?.getFilterModel()))?.length>0 ? setIsDisabled(false) : setIsDisabled(true)}}
                />
                <VFPagination
                    selectedRows={0}
                    rowsPerPage={userPageSize || pagination.mtoPageSize}
                    totalRows={rowDataCount}
                    currentPage={currentPage}
                    handleChangePage={(page) => {
                        setCurrentPage(page);
                        getInitialData(isWIPChecked, page, false, userPageSize);
                    }}
                    resetGridRef={currentGridRef}
                    isDisabled={isDisabled}
                    customPageSizeEnabled={true}
                    savePageSize={savePageSize}
                    userPageSize={userPageSize}
                />
                
                <VFSaveRemark onSubmitRemarks={updateMajorMinorReason} />
                

                {/* <SaveBtnWrapper>
                    <SaveBtn onClick={() => updateMajorMinorReason()}>
                        Save Reasons
                    </SaveBtn>
                </SaveBtnWrapper> */}

                <MTORemarkHistoryModal
                    data={remarkHistory}
                    isOpen={isRemarkHistoryOpen}
                    onClose={() => setIsRemarkHistoryOpen(false)}
                />
            </Wrapper>
            
        </div>

    )
}

export default ReasonForDelayOrder;