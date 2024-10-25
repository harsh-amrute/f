import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper,
    VFWrapper
} from '../DepartmentWiseBMReport/styles';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../Common/SplitGraphContainer/styles';
import { Allotment } from 'allotment';
//import BPRRemarkHistoryModal from '../DepartmentWiseBMReport/MTORemarkHistoryModal';
// import useViewPort from '../../../../../hooks/useViewPort';
//import { useUserData } from '../../../../../context';
import { AgGridReactProps } from 'ag-grid-react';
import BPPRenderer from '../../Common/BPPRenderer';
import AgeingCellRenderer from '../DepartmentWiseBMReport/AgeingIconCellRenderer';
//import customCellRenderer from '../DepartmentWiseBMReport/CustomCellRenderer';
import RemarkHistoryRenderer from '../DepartmentWiseBMReport/RemarkHistoryRenderer';
import GridView from '../DepartmentWiseBMReport/GridView'
import OrderElapsedGrid from '../DepartmentWiseBMReport/OrderElapsedGrid';
import { useGetOverAllBMReport } from '../../../../Services/MTO/Production/OverallBMReport/index'
import { notifyError, notifyLoader, notifySuccess } from '../../../../../helpers/notify';
import { useGetBOMExplosionData } from '../../../../../VectorFlow/Services/MTO/Common/BOMExplosion';
import { useGetPoogiRemarks } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import BPRRemarkHistoryModal from '../DepartmentWiseBMReport/MTORemarkHistoryModal';
import { useGetDeptWiseWipData, useGetHighAgeingData } from '../../../../../VectorFlow/Services/MTO/Production/DepartmentWiseBMReport/index';
import { IRowNode } from 'ag-grid-enterprise';
import OverlayLoader from '../../Common/Loader';
import { ColorsMTO } from '../../Common/Colors';
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../hooks/useFilter';
import { formatFilterJSON } from '../../../../../helpers/utils';
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { FilterPageName, UIGridCode } from '../../Common/Enum';
import { useDispatch } from 'react-redux';
import { BM_REPORT_ANALYTICS } from '../../../../../redux/actions/MTO';
import { modifyAnalyticsData } from '../DepartmentWiseBMReport/helper';
import { useGetDBRsettingsData } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import _, { debounce } from 'lodash';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig';
import { useUserData } from '../../../../../context';
import { useGetDate } from '../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting';
import moment from 'moment';


interface ApiResponse {
    cc: string;
    cp: number;
    hd: string;
    v: boolean;
    cla: string;
    scc: string;
    children?: ApiResponse[];
    cgs?: string
}

interface ColDef {
    headerName: string;
    suppressStickyLabel?: boolean;
    colId: string;
    openByDefault?: boolean;
    children?: ColDefChild[];
    headerCheckboxSelection?: boolean;
    checkboxSelection?: boolean;
    maxWidth?: number;
    floatingFilter?: boolean;
}
interface ColDefChild {
    field: string;
    headerName: string;
    colId: string;
    cellRenderer?: string;
    initialWidth?: number;
    floatingFilter?: boolean;
    columnGroupShow?: string;
    pinned?: string;
    cellRendererParams?: {
        onClick?: (data: string) => Promise<void>;
    };
}

type orderkeyObj = {
    ok: []
}

interface Orders {
    [key: string]: OrderItem; // Order ID as the key
}

interface OrderItem {
    tq: number;
    li: string;
    [key: string]: number | string | DepartmentData; // Allow additional properties like departments
}
interface DepartmentData {
    woh: number;
    mfg: number;
    int: number | null;
    out: number;
}

interface ApiResponseItem {
    cc: string;       // Main category code
    v: boolean;       // Visibility flag
    cp?: number;      // Main category property (optional since it will be added)
    hd: string;       // Header description (will be set to the name of cc)
    cla: string;      // Class alignment (fixed value)
    scc: string;      // Sub-channel code (will be set to the name of cc)
    ch?: ApiResponse[]; // Array of channel items
}


const APIFilterConfig = {
    filSecVisConfig: {
        "Prod_OverAll_BMReport": {
            mjr: false,
            or: true,
            res: true,
            cus: true
        },
    }
};

const OverallBmReport = () => {
    const { mutateAsync: getOverallBMReportData } = useGetOverAllBMReport();
    const { mutateAsync: getBOMExplosionData, /*isLoading :BombDataLoading*/ } = useGetBOMExplosionData();
    const { mutateAsync: getDBRsettingsData, } = useGetDBRsettingsData();
    const { mutateAsync: getHighAgeingData } = useGetHighAgeingData();
    const { mutateAsync: getDeptWiseWipData } = useGetDeptWiseWipData();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    // const { screenHeight } = useViewPort();
    const refGraph2 = useRef<any>(null);
    const allotementRef = useRef<any>(null);

    const [coldefs, setColdef] = useState<any>();
    const [gridData, setGridData] = useState<any>();
    const [gridDataCount, setGridDataCount] = useState<number>(0);
    const rowsSelected = useRef(false);
    
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [masterSelectedRowData, setMasterSelectedRowData] = useState<any>(()=>{
        return [];
    });
    const [deptWiseWipData, setDeptWiseWipData] = useState<any>();
    const [deptName, setDeptName] = useState<any>([]);
    const [isOrderElapsedGrid, setIsOrderElapsedGrid] = useState<boolean>(false);
    const [filterData, setFilterData] = useState({});
    const [systemType, setSystemType] = useState<any>();
    const [isGridLoading, setIsGridLoading] = useState(false);
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
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_OverAll_BMReport);
    const [highAgeing, sethighAgeing] = useState<any>();
    const [tempColdef, setTempColdef] = useState<any>();

    const { mutateAsync: getUserUIConfigData, isLoading: isGetStateLoading } = useGetUserUIConfigData();
    const { mutateAsync: updateUserUIConfigData } = useUpdateUserUIConfigData();


    const { user } = useUserData();
    // const themeUi = user?.user?.theme_ui;

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            getOverallBMReportData({ page: 1, appliedFilters, analytics: 1 }).then((data) => {

                const response: any = data?.data?.data;
                if(response){
                    const analytics = modifyAnalyticsData(response);
                    dispatch(BM_REPORT_ANALYTICS(analytics))
                }
            })
        }
        catch (e) {
            dispatch(BM_REPORT_ANALYTICS([]))
        }
    }, [])

    useEffect(() => {
        if (coldefs) {
            const tempcoldeflatest = _.cloneDeep(coldefs);
            tempcoldeflatest.shift();
            tempcoldeflatest.shift();
            setTempColdef(tempcoldeflatest);
        }
    }, [coldefs])

      const onOpenRemarkHistory = async (data: any) => {
        // Function implementation for remark history
        try {
            //console.log('data.rm', data.rm.length)
            // if (data.rm.length === 0) {
            const RemarkHistory = await getPoogIRemarks(data.ok)
            //console.log('RemarkHistory', RemarkHistory?.data?.data)
            if (RemarkHistory.data?.data === 'No remarks are present for the order') {
                data.rm = []
            }
            else {
                data.rm = RemarkHistory.data?.data;
            }
            // }
            setRemarkHistory(data.rm)
            setIsRemarkHistoryOpen(true)
        }
        catch (e) {
            console.log(e);
        }
        setIsRemarkHistoryOpen(true)

    };

    const getSystemType = async () => {
        const DBRSettingsData: any = await getDBRsettingsData()
        const DBRSettings = DBRSettingsData.data?.data;
        const systemType = DBRSettings?.find((data: any) => {
            return data.flag == "SystemType"
        })
        setSystemType(Number(systemType.value))
        setColumnDef();
    }


    const setColumnDef = async () => {
        try {
            const reportName = "BMReport";
            const response = await getUIConfigData(reportName);
            const modifiedResponse = addDefaultAttributes(response?.data?.data)
            const coldef = mapApiResponseToColDefs(modifiedResponse);
            getUserColumnConfig();
            setColdef(coldef)
        }
        catch (e) {
            console.log(e);
        }
    }

    const addDefaultAttributes = (apiResponse: ApiResponseItem[]): ApiResponseItem[] => {
        const modifiedResponse: ApiResponseItem[] = [];
        const cpMap: { [key: string]: number } = {};

        // Create the specified default objects for the item's ch array

        const defaultSecondObject: any = {
            cc: 'ic',
            cp: 2,
            hd: '',
            v: true,
            cla: 'centre',
            scc: 'ic'
        };

        apiResponse.forEach((item) => {
            const modifiedItem = { ...item };
            // Initialize cp for this cc if not already done
            if (!(item.cc in cpMap)) {
                cpMap[item.cc] = 3; // Start from 3 since 1 and 2 are taken by default objects
            }
            // Add new properties to the outer object
            modifiedItem.cp = cpMap[item.cc]++;
            modifiedItem.hd = item.hd || item.cc; // Set hd to the name of cc
            modifiedItem.cla = "Centre"; // Fixed value
            modifiedItem.scc = item.scc; // Set scc to the name of ccc
            
            if(item.cc){
                if(item.cc.includes("Dept") && modifiedItem.ch){
                    modifiedItem.ch = item.ch?.map((child)=>{
                        return {...child, scc: `ddtl.${item.cc}.${child.scc}`}
                    })
                }
            }


            // If it's the first object, add default items to the ch array

            // Push the modified item to the response array
            modifiedResponse.push(modifiedItem);
        });

        // Add a default object outside each main object
        const defaultOuterObject: ApiResponseItem = {
            cc: "chckbx",
            v: true,
            cp: 0,
            hd: "",
            cla: "Centre",
            scc: "chckbx",
        };

        // Prepend the default outer object
        modifiedResponse.unshift(defaultOuterObject, defaultSecondObject);

        // Calculate cp for the additional object based on existing cp values
        const maxCp = Math.max(...modifiedResponse.map(item => item.cp || 0));

        // Create the additional object to be added at the end
        const additionalObject: ApiResponseItem = {
            cc: "",
            cp: maxCp + 1, // Set cp based on the maximum cp value
            hd: " ",
            v: true,
            cla: "Centre",
            scc: "rmk",
            ch: []
        };

        // Add the additional object to the end of the modified response
        modifiedResponse.push(additionalObject);

        return modifiedResponse;
    };


    const mapApiResponseToColDefs = (apiResponse: ApiResponseItem[]): ColDef[] => {
        const mapChildren = (parent: any, children: ApiResponse[]): ColDefChild[] => {
            return children.map((child: ApiResponse) => ({
                field: child.scc.trim(),
                headerName: child.hd,
                colId: `${parent}-${child.cc}`,
                hide: !child.v,
                suppressHeaderFilterButton: true,
                cellRenderer: (child.cc === 'ec' && systemType >= 3) ? "agGroupCellRenderer" : child.cc === 'ic' ? "AgeingCellRenderer" : child.cc === 'BPP' ? "colorCellRenderer" : child.cc === 'RemarksHistory' ? 'RemarkHistoryRenderer' : undefined,
                maxWidth: child.cc === 'ec' || child.cc === 'ic' || child.scc === 'bpp' ? 80 : undefined,
                // columnGroupShow: index > 2 ? "open" : undefined,
                floatingFilter: child.cc === 'ec' ? false : child.cc === 'ic' ? false : true,
                cellRendererParams: child.hd.includes("Remark") ? {
                    onClick: child.scc === 'rm' ? (data: string) => onOpenRemarkHistory(data) : undefined
                } : undefined,
                cellStyle: child.cc === 'Remark' ? {
                    justifyContent: child.cla,
                    backgroundColor: 'white',
                    border: '1px solid #b9bdba',
                    color: 'black',
                    padding: '1px'
                } : child.cc === 'da' ? {
                    justifyContent: child.cla,
                    'color': ColorsMTO.Pink.code,
                } : {
                    justifyContent: child.cla,
                    paddingRight: child.cla == "right" ? "3rem" : undefined,
                    paddingLeft: child.cla == "left" ? "1rem" : undefined,
                }
            }));
        };

        return apiResponse.map(section => ({
            headerCheckboxSelection: section.scc === "chckbx" ? true : undefined,
            floatingFilterComponentParams: section.scc === "chckbx" || section.scc == "ic" ? { suppressFilterButton: false } : undefined,
            suppressHeaderFilterButton: section.scc === "chckbx" || section.scc === "ic" ? true : false,
            suppressMenu: section.scc === "chckbx" || section.scc === "ic" ? true : false,
            sortable: section.scc === "chckbx" || section.scc === "ic" ? false : true,
            checkboxSelection: section.scc === "chckbx" ? true : undefined,
            maxWidth: section.scc === "chckbx" || section.scc == "ic" ? 60 : undefined,
            floatingFilter: section.scc === "chckbx" || section.scc == "ic" ? false : undefined,
            headerName: section.hd,
            suppressStickyLabel: section.scc === "chckbx" ? undefined : true,
            colId: section.cc,
            cellRenderer: section.cc === 'ec' || section.scc === "chckbx" && systemType >= 3 ? "agGroupCellRenderer" : section.cc === 'ic' ? "AgeingCellRenderer" : undefined,
            openByDefault: section.scc === "chckbx" ? undefined : section.scc === 'rmk' ? false : true,
            children: section.scc === "chckbx" ? undefined : section.ch ? mapChildren(section.cc, section.ch) : undefined,

        }));
    }

    const getFilterData = async () => {
        try {
            const response = await getPageWiseFilterData({ page_name: FilterPageName.Prod_OverAll_BMReport });
            setFilterData(response?.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSystemType();
        // setColumnDef();
        // const colDefs = mapApiResponseToColDefs(apiResponse);
        // //console.log('coldefs', colDefs)
        // setColdef(colDefs)
        // getInitialGridData(1);
        getFilterData();
    }, [])

    // useEffect(() => {
    //     if (isGridLoading) {
    //         toast.dismiss();
    //         notifyLoader("Loading Data ...")
    //     }
    //     else {
    //         toast.dismiss();
    //     }
    // }, [isGridLoading])

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": BPPRenderer,
            "AgeingCellRenderer": AgeingCellRenderer,
            "RemarkHistoryRenderer": RemarkHistoryRenderer,
        }), []);

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);


    const getInitialGridData = async (currentPage: number) => {
        try {
            setIsGridLoading(true)
            const formatedFilters = formatFilterJSON(appliedFilters);
            
            const gridData = await getOverallBMReportData({ page: currentPage, appliedFilters: formatedFilters });
            if(!gridData.data || gridData.data.data.length===0){
                setGridDataCount(0);
                setGridData([]);
                setIsGridLoading(false);
                return;
            }
            setGridData(gridData?.data?.data?.results)
            setGridDataCount(gridData?.data?.data?.count)
            setIsGridLoading(false)

        }
        catch (e) {
            setIsGridLoading(false)
            console.log(e)
        }
    }

    const handlePageChange = useCallback((currPage: number) => {
        setCurrentPage(currPage)
    }, [])

    const extractDepartmentNames = (orders: Orders): string[] => {
        const departmentNames: Set<string> = new Set();

        // Iterate over each order
        Object.values(orders).forEach(orderItem => {
            // Iterate over each property in the order item
            Object.keys(orderItem).forEach(key => {
                // Check if the property is a department (i.e., not 'tq' or 'li')
                if (key !== 'tq' && key !== 'li') {
                    departmentNames.add(key);
                }
            });
        });

        // Convert Set to Array and return
        return Array.from(departmentNames);
    };

    useEffect(() => {
        if (allotementRef.current)
            allotementRef.current.reset();
    }, [rowsSelected.current])
    


    const fetchDeptWiseWiphData = async (selectedOrderKeys: any) => {
        try {
            notifyLoader("Loading")
            const DeptWiseWipData = await getDeptWiseWipData(selectedOrderKeys);
            const highAgeingData = await getHighAgeingData(selectedOrderKeys);
            sethighAgeing(highAgeingData?.data?.data);
            //console.log('DeptWiseWipData', DeptWiseWipData?.data?.data);
            setDeptWiseWipData(DeptWiseWipData?.data?.data);
            const departmentNames = extractDepartmentNames(DeptWiseWipData?.data?.data);
            departmentNames.sort()
            setDeptName(departmentNames);
            notifySuccess("Fetched")
        } catch (error) {
            notifyError('Failed to fetch data');
        }

    };

    const getSelectedRow = () => {
        const selectedData = refGraph2.current?.api.getSelectedRows();
        if (selectedData.length == 0) {
            rowsSelected.current = false
        } else {
            rowsSelected.current = true
        }
        /* To persist the state*/
        if (selectedData) {
            let mergedData: any = [...masterSelectedRowData]; // Start with the existing selected data
            selectedData.forEach((newItem: any) => {
                const index = mergedData.findIndex((item: any) => item.oid === newItem.oid);
                if (index !== -1) {
                    // If the item exists, replace it
                    // mergedData[index] = newItem;
                } else {
                    // Otherwise, add the new item
                    mergedData.push(newItem);
                }
            });


            gridData?.forEach((item: any) => {
                let isThere = 0;
                selectedData.forEach((selectedD: any) => {
                    if (selectedD.oid === item.oid) {
                        isThere = 1;
                    }
                })
                if (isThere == 0) {
                    mergedData = mergedData.filter((e: any) => e.oid !== item.oid)
                }
            })
            
            // setMasterSelectedRowData(mergedData);
            if (!_.isEqual(mergedData, masterSelectedRowData)) {
                setMasterSelectedRowData(mergedData);
            }
            /*persist data finised*/
        }
    }

    useEffect(()=>{
        if (masterSelectedRowData.length > 0) {
            //console.log('selected', masterSelectedRowData.length)
            const selectedOrderKeys: orderkeyObj[] = []
            masterSelectedRowData.map((ele: any) => {
                selectedOrderKeys.push(ele.ok)
            })
            //console.log('slectedOrder', selectedOrderKeys)
            
            fetchDeptWiseWiphData(selectedOrderKeys);
            setIsOrderElapsedGrid(true)
        } else {
            setDeptWiseWipData('');
            setIsOrderElapsedGrid(false)
        }
    }, [masterSelectedRowData])



    const existsInSelected = (reqOid: string): boolean => {
        for (let index = 0; index < masterSelectedRowData.length; index++) {
            const element: any = masterSelectedRowData[index];
            if (element.oid === reqOid) {
                return true;
            }
        }
        return false;
    }
    
    const onFirstDataRendered = (params: any) => {
        const nodesToSelect: IRowNode[] = [];
        params.api.forEachNode((node: any) => {
            if (node.data && node.data.oid && existsInSelected(node.data.oid)) {
                node.data.Remark = masterSelectedRowData[0].Remark;
                for (let index = 0; index < masterSelectedRowData.length; index++) {
                    const element = masterSelectedRowData[index];
                    if (element.oid === node.data.oid) {
                        node.data.Remark = element.Remark;

                    }
                }
                nodesToSelect.push(node);
            }

        });
        params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
    }

    const cache = useRef<any>({});

    const agGridProps: AgGridReactProps = useMemo(()=>{
        return    {
            tooltipShowDelay: 0,
            tooltipTrigger: "focus",
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
                components: customCellRenderers,
                pagination: true,
                defaultColDef: {
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                    //suppressFiltersToolPanel:true,
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
            //detailCellRenderer: RowGroupRenderer,
            //detailCellRendererParams:RowGroupRenderer,
            paginationAutoPageSize: true,
            enterNavigatesVertically: true,
            enterNavigatesVerticallyAfterEdit: true,
            groupDefaultExpanded: 0,
            pivotMode: false,
            onSelectionChanged: debounce(getSelectedRow, 1000),
            onRowDataUpdated: onFirstDataRendered,
            detailCellRendererParams: {
                suppressMenu: true,
                detailGridOptions: {
                    rowHeight: 45,
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
                    if (cache.current[`${params.data.oid}-${params.data.lid}`]) {
                        params.successCallback(cache.current[`${params.data.oid}-${params.data.lid}`])
                        return
                    }
                    const data = await getBOMExplosionData({ orderId: params.data.oid, lineId: params.data.lid });
                    cache.current[`${params.data.oid}-${params.data.lid}`] = data.data.data;
                    params.successCallback(data?.data?.data)
                    return
                }
            },
        };
    },[masterSelectedRowData, gridData])

    useEffect(() => {
        if (Object.keys(appliedFilters).length) {
            getInitialGridData(currentPage);
        }
    }, [currentPage])

    useEffect(() => {
        if (Object.keys(appliedFilters).length) {
        if(currentPage != 1){
            setCurrentPage(1)
        }else{
            getInitialGridData(currentPage);
        }}
    }, [appliedFilters])


    const tempGridRef = useRef<any>(null);
    const [tempGridData, setTempGridData] = useState<any>(undefined);
    const [isExcelLoading, setIsExcelLoading] = useState<boolean>(false);

    const getTempGridData = async () => {
        setIsExcelLoading(true);
        try {
            const formatedFilters = formatFilterJSON(appliedFilters);
            const gridData = await getOverallBMReportData({ page: 1, appliedFilters: formatedFilters, page_size: gridDataCount });
            setTempGridData(gridData?.data?.data?.results)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsExcelLoading(false);
        }
    }




    const onExcelExport = () => {
        getTempGridData();
    }

    useEffect(() => {
        if (tempGridData) {
            const colState = refGraph2.current?.api?.getColumnState();
            tempGridRef.current?.api?.applyColumnState({
                state: colState,
                applyOrder: true
            });
            tempGridRef.current?.api?.exportDataAsExcel({ fileName: "OverallBMReport" })

            console.log("tempgreid state", tempGridRef.current?.api.getColumnState())
        }
    }, [tempGridData])


    // for save and reset

    // useEffect(() => {
    //     // getUserColumnConfig();
    // }, [])


    const [isReset, setIsReset] = useState<any>();
    const [columnState, setColumnState] = useState<any>();


    const getUserColumnConfig = async () => {
        try {
            const data = await getUserUIConfigData({
                un: user.user.name,
                rn_id: UIGridCode.ProdOverallBMReport
            });

            const newConfig = JSON.parse(data?.data?.data?.[0]?.columns_settings) || [];

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
            if(coldefs){
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.ProdOverallBMReport,
                    cs: JSON.stringify(coldefs)
                }
                await updateUserUIConfigData([payload]);
            }
            else{
                if (refGraph2?.current?.api) {
                    const config = refGraph2.current.api.getColumnState();
                    const payload = {
                        un: user.user.name,
                        rn_id: UIGridCode.ProdOverallBMReport,
                        cs: JSON.stringify(config)
                    }
                    await updateUserUIConfigData([payload]);
                }
            }
            notifySuccess("Changes saved successfully");
        } catch (error) {
            console.error(error);
            notifyError("Error saving changes");
        }
    }

    const handleResetClick = () => {
        setIsReset(true);
    }

    useEffect(() => {
        applyColumnState(true);
    }, [columnState]);

    const applyColumnState = useCallback((flag = false) => {
        if (refGraph2?.current && columnState?.length) {
            let colState = [...columnState];
            if(flag){
                const arr: any = []
                colState.forEach((col: any)=>{
                    if(col.children){
                        col.children.forEach((child: any)=>{
                            arr.push({
                                "colId": child.colId,
                                "hide": false,
                                "pinned": null,
                                "sort": null,
                                "sortIndex": null,
                                "aggFunc": null,
                                "rowGroup": false,
                                "rowGroupIndex": null,
                                "pivot": false,
                                "pivotIndex": null,
                                "flex": null
                              })
                        })
                    }
                    else{
                        arr.push({
                            "colId": col.colId,
                            "hide": false,
                            "pinned": null,
                            "sort": null,
                            "sortIndex": null,
                            "aggFunc": null,
                            "rowGroup": false,
                            "rowGroupIndex": null,
                            "pivot": false,
                            "pivotIndex": null,
                            "flex": null
                          })
                    }
                    colState = arr;
                })
            }
            refGraph2.current.api?.applyColumnState({
                state: colState,
                applyOrder: true
            });

         
        }
    }, [columnState])

    const { data: apiResponseData, /*isLoading, refetch*/ } = useGetDate();

    const date = apiResponseData?.data?.data;

    useEffect(() => {
       
        if (isReset) {
            setColumnState([...coldefs]);
            setIsReset(false)
        } else {
            if(isReset != undefined){
                handleSaveClick(coldefs);
            }
        }
    }, [isReset]);

    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                <MTOActionToolBar
                    comp={'OverallBMReport'}
                    isAddFilterButton
                    isExcelExport
                    onExcelExportClick={onExcelExport}
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
            </BMDepHeaderWraper>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', fontFamily: 'Roboto'}}>
                <p>{date? moment(date).format('D MMM YYYY'): ""}</p>
            </div>

            {(isGridLoading || isExcelLoading || isGetStateLoading ) &&  <OverlayLoader/> }

                <HorizontalViewWrapper style={{ marginTop: '0' }}>
                    <BTRTableWrapper style={{ height: rowsSelected.current ? "120vh" : "75vh", margin: '0' }}>
                        <Allotment vertical={true} separator={true} ref={allotementRef}>
                            <Allotment.Pane preferredSize={rowsSelected.current ? "45%" : '70%'}>
                                <BTRAllomentSection>
                                    <GridView
                                        reference={refGraph2}
                                        agGridProps={agGridProps}
                                        columDef={coldefs}
                                        convercolumnDef={gridData}
                                        handlePageChange={handlePageChange}
                                        saveBtn={false}
                                        totalRow={gridDataCount}
                                        currentPage={currentPage}
                                        onGridReady={applyColumnState}
                                    />
                                    {/* This Grid is only for the user to download the excel report */}
                                    <div style={{display: 'none'}}>
                                        <GridView
                                            reference={tempGridRef}
                                            agGridProps={agGridProps}
                                            columDef={tempColdef}
                                            convercolumnDef={tempGridData}
                                            handlePageChange={handlePageChange}
                                            saveBtn={false}
                                            totalRow={gridDataCount}
                                            currentPage={currentPage}
                                        />
                                    </div>
                                </BTRAllomentSection>
                            </Allotment.Pane>

                            <Allotment.Pane preferredSize={rowsSelected.current ? "55%" : '30%'}>
                                <VFWrapper>
                                    <BTRAllomentSection>
                                        <OrderElapsedGrid
                                            isTrue={isOrderElapsedGrid}
                                            data={deptWiseWipData}
                                            deptName={deptName}
                                            selectedOrderCount={masterSelectedRowData.length}
                                            highAgeingdata={highAgeing}
                                        />
                                    </BTRAllomentSection>
                                </VFWrapper>
                            </Allotment.Pane>
                        </Allotment>
                    </BTRTableWrapper>
                </HorizontalViewWrapper>

            <BPRRemarkHistoryModal
                data={remarkHistory}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            />

        </BMDepWrapper>

    )
}

export default OverallBmReport