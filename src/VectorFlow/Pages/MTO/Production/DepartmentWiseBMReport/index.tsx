import React, { useEffect, useMemo, useRef, useState } from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from './styles';
import { AgGridReactProps } from 'ag-grid-react';
//import { ColDef } from 'ag-grid-enterprise'

//import { /*deptwiseBMReportData*/ RemarkHistoryData } from './DeptWiseBMReportData';
import GridView from './GridView';
import { Allotment } from 'allotment';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../Common/SplitGraphContainer/styles';
import useViewPort from '../../../../../hooks/useViewPort';
import OrderElapsedGrid from './OrderElapsedGrid';
import AgeingCellRenderer from './AgeingIconCellRenderer';
// import customCellRenderer from './CustomCellRenderer';
// import RowGroupRenderer from './RowGroupRenderer';
import RemarkHistoryRenderer from './RemarkHistoryRenderer';
import BPRRemarkHistoryModal from './MTORemarkHistoryModal';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useUserData } from '../../../../../context';
import { useGetDeptWiseBMReport, useAddBMReportRemark, useGetDeptWiseWipData } from '../../../../../VectorFlow/Services/MTO/Production/DepartmentWiseBMReport/index'
import { notifyError, notifyLoader, notifySuccess } from '../../../../../helpers/notify';
import { toast } from 'react-toastify';
import OverlayLoader from '../../Common/Loader';
import { useGetPoogiRemarks } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import BPPRenderer from '../../Common/BPPRenderer';
import { IRowNode } from 'ag-grid-enterprise';
import { FirstDataRenderedEvent } from 'ag-grid-community';
import { useGetBOMExplosionData } from '../../../../../VectorFlow/Services/MTO/Common/BOMExplosion';
import { ColorsMTO } from '../../Common/Colors';

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
        visible?: {
            flag: any;
        };
        onClick?: (data: string) => Promise<void>;
    };
}

type UpdateRemarkObj = {
    ok: string;
    dept: number;
    rm: string;
    user: string
};

type orderkeyObj = {
    ok: []
}

interface DepartmentData {
    woh: number;
    mfg: number;
    int: number | null;
    out: number;
}
// Define the structure for each order item
interface OrderItem {
    tq: number;
    li: string;
    [key: string]: number | string | DepartmentData; // Allow additional properties like departments
}

// Define the structure of the input data
interface Orders {
    [key: string]: OrderItem; // Order ID as the key
}


const DptWiseBMReport = () => {
    const { mutateAsync: getDeptWiseBMReportData, isLoading: DeptWiseLoading } = useGetDeptWiseBMReport();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
    const { mutateAsync: addBMReportRemark } = useAddBMReportRemark();
    const { mutateAsync: getDeptWiseWipData } = useGetDeptWiseWipData();
    const { mutateAsync: getBOMExplosionData, /*isLoading :BombDataLoading*/ } = useGetBOMExplosionData();
    const [colDeflatest, setColdef] = useState([{}])
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    const [gridData, setGridData] = useState<any>();
    const [isWIPChecked, setWIPCheck] = useState<boolean>(true);
    const [isOrderElapsedGrid, setIsOrderElapsedGrid] = useState<boolean>(false);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [editedRows, setEditedRows] = useState<Set<number>>(new Set());
    const [deptWiseWipData, setDeptWiseWipData] = useState<any>();
    const { screenHeight } = useViewPort();
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    const refGraph1 = useRef<any>(null);
    const [deptName, setDeptName] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gridDataCount, setGridDataCount] = useState<number>(0);
    const [masterSelectedRowData, setMasterSelectedRowData] = useState<any>([]);

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": BPPRenderer,
            "AgeingCellRenderer": AgeingCellRenderer,
            //"customCellRenderer": customCellRenderer,
            "RemarkHistoryRenderer": RemarkHistoryRenderer,
            //"EditableRender": isCellEditable
            //"TextBoxCellRenderer": TextBoxCellRenderer,
        }), []);

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const apiResponse: ApiResponse[] =
        [
            {
                "cc": "",
                "cp": 0,
                "hd": " ",
                "v": true,
                "cla": "Centre",
                "scc": "chckbx",
            },
            {
                "cc": "Default Attributes",
                "cp": 2,
                "hd": "Default Attributes",
                "v": true,
                "cla": "Centre",
                "scc": "Default Attributes",
                "children": [
                    {
                        "cc": 'ec',
                        'cp': 1,
                        'hd': '',
                        'v': true,
                        'cla': 'centre',
                        'scc': 'ec',
                    },
                    {
                        "cc": 'ic',
                        'cp': 2,
                        'hd': '',
                        'v': true,
                        'cla': 'centre',
                        'scc': 'ic',
                    },
                    {
                        "cc": "BPP",
                        "cp": 3,
                        "hd": "BPP",
                        "v": true,
                        "cla": "Centre",
                        "scc": "bpp",
                    },
                    {
                        "cc": "da",
                        "cp": 4,
                        "hd": "Dept Ageing",
                        "v": true,
                        "cla": "Centre",
                        "scc": "da",
                    },
                    {
                        "cc": "OrderType",
                        "cp": 5,
                        "hd": "Order Type",
                        "v": true,
                        "cla": "Centre",
                        "scc": "ot",

                    },
                    {
                        "cc": "OrderID",
                        "cp": 6,
                        "hd": "Order ID",
                        "v": true,
                        "cla": "Centre",
                        "scc": "oid",

                    },
                    {
                        "cc": "LineItem",
                        "cp": 7,
                        "hd": "Line Item",
                        "v": true,
                        "cla": "Centre",
                        "scc": "lid",
                        "cgs": "closed"
                    },
                    {
                        "cc": "ItemCode",
                        "cp": 8,
                        "hd": "Item Code",
                        "v": true,
                        "cla": "Centre",
                        "scc": "ic",
                        "cgs": "closed"
                    },
                    {
                        "cc": "ItemDescription",
                        "cp": 9,
                        "hd": "Item Description",
                        "v": true,
                        "cla": "Centre",
                        "scc": "id",
                        "cgs": "closed"
                    },
                    {
                        "cc": "OrderQuantity",
                        "cp": 10,
                        "hd": "Order Quantity",
                        "v": true,
                        "cla": "Centre",
                        "scc": "oq",
                        "cgs": "closed"
                    },
                    {
                        "cc": "WIPOnHand",
                        "cp": 11,
                        "hd": "WIPOn Hand",
                        "v": true,
                        "cla": "Centre",
                        "scc": "woh",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Mfg.Balance",
                        "cp": 12,
                        "hd": "Mfg. Balance",
                        "v": true,
                        "cla": "Centre",
                        "scc": "mfg",
                        "cgs": "closed"
                    },
                    {
                        "cc": "DueDate",
                        "cp": 13,
                        "hd": "Due Date",
                        "v": true,
                        "cla": "Centre",
                        "scc": "dd",
                        "cgs": "closed"
                    },
                    {
                        "cc": "TrailingDepartment",
                        "cp": 14,
                        "hd": "Trailing Department",
                        "v": true,
                        "cla": "Centre",
                        "scc": "td",
                        "cgs": "closed"
                    },

                    {
                        "cc": "CRDD",
                        "cp": 15,
                        "hd": "CRDD",
                        "v": true,
                        "cla": "Centre",
                        "scc": "crdd",
                        "cgs": "closed"
                    },
                    {
                        "cc": "CCRName",
                        "cp": 16,
                        "hd": "CCRName ",
                        "v": true,
                        "cla": "Centre",
                        "scc": "CCR_Nme",
                        "cgs": "closed"
                    },
                    {
                        "cc": "CustomerName",
                        "cp": 17,
                        "hd": "Customer Name",
                        "v": true,
                        "cla": "Centre",
                        "scc": "cn",
                        "cgs": "closed"
                    },
                ],
            },

            {
                "cc": "Calculate Attributes",
                "cp": 3,
                "hd": "Calculate Attributes",
                "v": true,
                "cla": "Centre",
                "scc": "Calculate Attributes",
                "children": [
                    {
                        "cc": "ed",
                        "cp": 18,
                        "hd": "Elapsed Days",
                        "v": true,
                        "cla": "Centre",
                        "scc": "ed",

                    },
                    {
                        "cc": "Attribute",
                        "cp": 19,
                        "hd": "Attribute ",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Attr",
                        "cgs": "closed"
                    },
                ]
            },
            {
                "cc": "Order Attribute",
                "cp": 4,
                "hd": "Order Attribute",
                "v": true,
                "cla": "Centre",
                "scc": "Order Attribute",
                "children": [
                    {
                        "cc": "pn",
                        "cp": 20,
                        "hd": "Plant Name",
                        "v": true,
                        "cla": "Centre",
                        "scc": "pn",

                    },
                    {
                        "cc": "PONo.",
                        "cp": 21,
                        "hd": "PO No.",
                        "v": true,
                        "cla": "Centre",
                        "scc": "PO_No.",
                        "cgs": "closed"
                    }
                ]
            },
            {
                "cc": "Product Attribute",
                "cp": 5,
                "hd": "Product Attribute",
                "v": true,
                "cla": "Centre",
                "scc": "Product Attribute",
                "children": [
                    {
                        "cc": "Price",
                        "cp": 22,
                        "hd": "Price ",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Price",


                    },
                    {
                        "cc": "ItemGroup",
                        "cp": 23,
                        "hd": "Item Group",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Itm_Grp",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Attribute1",
                        "cp": 24,
                        "hd": "Attribute 1",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Att_1",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Attribute2",
                        "cp": 25,
                        "hd": "Attribute 2",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Att_2",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Attribute3",
                        "cp": 26,
                        "hd": "Attribute 3",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Att_3",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Attribute4",
                        "cp": 27,
                        "hd": "Attribute 4",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Att_4",
                        "cgs": "closed"
                    },
                ]
            },
            {
                "cc": "Customer Attribute",
                "cp": 4,
                "hd": "Customer Attribute",
                "v": true,
                "cla": "Centre",
                "scc": "Customer Attribute",
                "children": [

                    {
                        "cc": "CustCode",
                        "cp": 26,
                        "hd": "Cust Code",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Cust_Cd",
                        //"cgs": "open"
                    },
                    {
                        "cc": "Region",
                        "cp": 27,
                        "hd": "Region ",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Rgn",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Country",
                        "cp": 28,
                        "hd": "Country ",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Cntry",
                        "cgs": "closed"
                    }
                ]
            },
            {
                "cc": "",
                "cp": 6,
                "hd": " ",
                "v": true,
                "cla": "Centre",
                "scc": "rmk",
                "children": [
                    {
                        "cc": "Remark",
                        "cp": 28,
                        "hd": "Remark",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Remark",

                    },
                    {
                        "cc": "lr",
                        "cp": 29,
                        "hd": "Latest Remark",
                        "v": true,
                        "cla": "Centre",
                        "scc": "lr",
                    },
                    {

                        "cc": "Remark History",
                        "cp": 30,
                        "hd": "Remark History",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Remark History",
                    }

                ]
            }
        ]

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


    const mapApiResponseToColDefs = (apiResponse: ApiResponse[]): ColDef[] => {
        const mapChildren = (children: ApiResponse[]): ColDefChild[] => {
            return children.map(child => ({
                field: child.scc.trim(),
                headerName: child.hd,
                colId: child.hd,
                cellRenderer: child.cc === 'ec' ? "agGroupCellRenderer" : child.cc === 'ic' ? "AgeingCellRenderer" : child.cc === 'BPP' ? "colorCellRenderer" :/* child.cc === 'Remark' || child.cc === 'Latest Remark' ? 'inputbox' :*/ child.cc === 'Remark History' ? 'RemarkHistoryRenderer' : undefined,
                maxWidth: child.cc === 'ec' || child.cc === 'ic' ? 80 : undefined,
                columnGroupShow: child.cgs,
                pinned: child.cc === 'Remark' || child.cc === 'lr' || child.scc === 'Remark History' ? 'right' : undefined,
                editable: child.cc === 'Remark' ? true : false,
                floatingFilter: child.cc === 'ec' ? false : child.cc === 'ic' ? false : true,
                cellRendererParams: child.hd.includes("Remark") ? {
                    // visible: {
                    //     flag: child.scc === 'Remark' ? true : child.scc === 'Latest Remark' ? false : undefined,
                    // },
                    onClick: child.scc === 'Remark History' ? (data: string) => onOpenRemarkHistory(data) : undefined
                } : undefined,
                cellStyle: child.cc === 'Remark' ? {
                    backgroundColor: 'white',
                    border: '1px solid #b9bdba',
                    color: 'black',
                    padding: '1px'
                } : child.cc === 'da' ? {
                    'color': ColorsMTO.Pink.code
                } : undefined
            }));
        };

        return apiResponse.map(section => ({
            headerCheckboxSelection: section.scc === "chckbx" ? true : undefined,
            checkboxSelection: section.scc === "chckbx" ? true : undefined,
            maxWidth: section.scc === "chckbx" ? 80 : undefined,
            floatingFilter: section.scc === "chckbx" ? false : undefined,
            headerName: section.cc,
            suppressStickyLabel: section.scc === "chckbx" ? undefined : true,
            colId: section.hd,
            openByDefault: section.scc === "chckbx" ? undefined : section.scc === 'rmk' ? false : true,
            children: section.scc === "chckbx" ? undefined : mapChildren(section.children || [])
        }));
    }

    const getInitialGridData = async (wip: boolean, page: number) => {
        try {
            setCurrentPage(page)
            setWIPCheck(wip)
            const gridData = await getDeptWiseBMReportData({ 'wip': wip === true ? 1 : 0, 'curr': page });
            setGridData(gridData?.data?.data?.results)
            //console.log('first', gridData?.data?.data)
            setGridDataCount(gridData?.data?.data?.count)
        }
        catch (e) {
            console.log('e');
        }
    }


    useEffect(() => {
        const colDefs = mapApiResponseToColDefs(apiResponse);
        // console.log('coldefs', colDefs)
        setColdef(colDefs)
        getInitialGridData(isWIPChecked, 1);
    }, [])

    useEffect(() => {
        if (DeptWiseLoading) {
            toast.dismiss();
            notifyLoader("Loading Data ...")
        }
        else {
            toast.dismiss();
        }
    }, [DeptWiseLoading])

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



    const getSelectedRow = async () => {

        const selectedData = refGraph1.current?.api.getSelectedRows();

        // To persist the state
        if (selectedData) {
            let mergedData: any = [...masterSelectedRowData]; // Start with the existing selected data

            selectedData.forEach((newItem: any) => {
                const index = mergedData.findIndex((item: any) => item.oid === newItem.oid);

                if (index !== -1) {
                    // If the item exists, replace it
                    mergedData[index] = newItem;
                } else {
                    // Otherwise, add the new item
                    mergedData.push(newItem);
                }
            });

            gridData.forEach((item: any) => {
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

            setMasterSelectedRowData(mergedData);
            //console.log("masterDataaa", mergedData)

            ///

            if (mergedData.length > 0) {
                //console.log('selected', mergedData.length)
                const selectedOrderKeys: orderkeyObj[] = []
                mergedData.map((ele: any) => {
                    selectedOrderKeys.push(ele.ok)
                })
                //console.log('slectedOrder',selectedOrderKeys)
                const fetcDeptWiseWiphData = async () => {
                    try {
                        const DeptWiseWipData = await getDeptWiseWipData(selectedOrderKeys);
                        //console.log('DeptWiseWipData', DeptWiseWipData?.data?.data);
                        setDeptWiseWipData(DeptWiseWipData?.data?.data);
                        const departmentNames = extractDepartmentNames(DeptWiseWipData?.data?.data);
                        //console.log('DeptWiseWipData===',departmentNames);
                        setDeptName(departmentNames);
                    } catch (error) {
                        notifyError('Failed to fetch data');
                    }

                };
                fetcDeptWiseWiphData();
                setIsOrderElapsedGrid(true)
            } else {
                setDeptWiseWipData('');
                setIsOrderElapsedGrid(false)
            }
        }
    }

    // Handle cell value changes
    const onCellValueChanged = (event: any) => {
        if (event.data) {
            // const updatedSet = new Set(editedRows);
            // updatedSet.add(event.data.ok); // Assuming "ok" is the unique ID of the row
            // setEditedRows(updatedSet);
            setEditedRows(prev => new Set(prev.add(event.data.ok)));
        }
    };

    const handleUpdateReason = async () => {
        //  console.log('editedRows', editedRows)
        try {
            if (refGraph1.current) {
                // Get the grid API reference
                const api = refGraph1.current.api;

                // Ensure that any ongoing editing is stopped and values are committed
                api.stopEditing();
                const updatedRow = gridData.filter((row: any) => editedRows.has(row.ok))
                // console.log('updated row', updatedRow)
                if (updatedRow.length > 0) {
                    let putData: UpdateRemarkObj[] = [];
                    updatedRow.forEach((e: any) => {
                        const singleData: any = {
                            "ok": e.ok,
                            "dept": e.did,
                            "rm": e.Remark,
                            "user": user?.user?.name
                        }
                        putData.push(singleData);
                    })
                    // console.log('putData', putData)
                    const RemarkHistory = await addBMReportRemark(putData);
                    //console.log('REmakrf', RemarkHistory)
                    if (RemarkHistory.status === 200) {
                        putData = [];
                        setEditedRows(new Set());
                        notifySuccess('Remark saved successfully')
                    }
                    else {
                        notifyError('Remark not save')
                    }
                }
                else {
                    notifyError('Please add remarks/remark to save')
                }
            }
            return [];
        }
        catch (e) {
            console.log(e)
        }
    }

    const existsInSelected = (reqOid: string): boolean => {
        for (let index = 0; index < masterSelectedRowData.length; index++) {
            const element: any = masterSelectedRowData[index];
            if (element.oid === reqOid) {
                return true;
            }

        }
        return false;
    }

    const onFirstDataRendered = (params: FirstDataRenderedEvent<any>) => {
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


    const handlePageChange = async (currPage: number) => {
        //console.log('first,', currPage)
        setCurrentPage(currPage)
        getInitialGridData(isWIPChecked, currPage)
    }

    const agGridProps: AgGridReactProps = {
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
        //masterDetail: true,
        //detailCellRenderer: RowGroupRenderer,
        //detailCellRendererParams:RowGroupRenderer,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false,
        onSelectionChanged: getSelectedRow,
        onCellValueChanged: onCellValueChanged,
        stopEditingWhenCellsLoseFocus: true,
        //onGridReady: onGridReady
        onFirstDataRendered: onFirstDataRendered,
        onGridReady: onFirstDataRendered,
        onRowDataUpdated: onFirstDataRendered,
        masterDetail: true,
        detailRowAutoHeight: true,
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
                const data = await getBOMExplosionData({ orderId: params.data.oid, lineId: params.data.lid });
                params.successCallback(data.data.data)
            }
        },
    };


    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                <MTOActionToolBar
                    comp={'DeptWiseBMReport'}
                    isAddFilterButton
                    isExcelExport
                    quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        <Checkbox
                            checked={isWIPChecked}
                            onChange={(e) => getInitialGridData(e.target.checked, 1)}
                            theme={themeUi}
                        />
                        &nbsp;&nbsp; <strong>Show order with available WIP Only</strong></div>}
                />
            </BMDepHeaderWraper>

            <>
                {
                    DeptWiseLoading ? <OverlayLoader /> :

                        <HorizontalViewWrapper style={{ marginTop: '0px' }}>
                            <BTRTableWrapper style={{ height: screenHeight + 100, margin: '0' }}>
                                <Allotment vertical={true} separator={true} >
                                    <Allotment.Pane preferredSize={'60%'}>
                                        <BTRAllomentSection>
                                            <GridView
                                                reference={refGraph1}
                                                agGridProps={agGridProps}
                                                columDef={colDeflatest}
                                                convercolumnDef={gridData}
                                                updateReason={() => handleUpdateReason()}
                                                handlePageChange={(cp) => handlePageChange(cp)}
                                                totalRow={gridDataCount}
                                                currentPage={currentPage}
                                            />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>

                                    <Allotment.Pane preferredSize={'40%'}>
                                        <BTRAllomentSection>
                                            <OrderElapsedGrid
                                                isTrue={isOrderElapsedGrid}
                                                data={deptWiseWipData}
                                                deptName={deptName}
                                                selectedOrderCount={masterSelectedRowData.length}

                                            />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>
                            </BTRTableWrapper>
                        </HorizontalViewWrapper>
                }
            </>

            <BPRRemarkHistoryModal
                data={remarkHistory}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            />

        </BMDepWrapper>

    )
}

export default DptWiseBMReport;