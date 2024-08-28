import React, { useEffect, useMemo, useRef, useState } from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from '../DepartmentWiseBMReport/styles';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../Common/SplitGraphContainer/styles';
import { Allotment } from 'allotment';
//import BPRRemarkHistoryModal from '../DepartmentWiseBMReport/MTORemarkHistoryModal';
import useViewPort from '../../../../../hooks/useViewPort';
//import { useUserData } from '../../../../../context';
import { AgGridReactProps } from 'ag-grid-react';
import BPPRenderer from '../../Common/BPPRenderer';
import AgeingCellRenderer from '../DepartmentWiseBMReport/AgeingIconCellRenderer';
//import customCellRenderer from '../DepartmentWiseBMReport/CustomCellRenderer';
import RemarkHistoryRenderer from '../DepartmentWiseBMReport/RemarkHistoryRenderer';
import GridView from '../DepartmentWiseBMReport/GridView'
import OrderElapsedGrid from '../DepartmentWiseBMReport/OrderElapsedGrid';
import { useGetOverAllBMReport } from '../../../../Services/MTO/Production/OverallBMReport/index'
import { notifyError, notifyLoader } from '../../../../../helpers/notify';
import { toast } from 'react-toastify';
import { useGetBOMExplosionData } from '../../../../../VectorFlow/Services/MTO/Common/BOMExplosion';
import { useGetPoogiRemarks } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import BPRRemarkHistoryModal from '../DepartmentWiseBMReport/MTORemarkHistoryModal';
import { useGetDeptWiseWipData } from '../../../../../VectorFlow/Services/MTO/Production/DepartmentWiseBMReport/index';
import { FirstDataRenderedEvent } from 'ag-grid-community';
import { IRowNode } from 'ag-grid-enterprise';
import OverlayLoader from '../../Common/Loader';
import { ColorsMTO } from '../../Common/Colors';
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../hooks/useFilter';

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

const APIFilterConfig = {
    filSecVisConfig :  {
        "Prod_OverAll_BMReport" : {
            mjr : false,
            or: true,
            res: true,
            cus: true
        },
    }
};

const OverallBmReport = () => {
    //console.log()
    const { mutateAsync: getOverallBMReportData, isLoading: OverAllBMLoading } = useGetOverAllBMReport();
    const { mutateAsync: getBOMExplosionData, /*isLoading :BombDataLoading*/ } = useGetBOMExplosionData();
    const { mutateAsync: getDeptWiseWipData } = useGetDeptWiseWipData();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();

    const { screenHeight } = useViewPort();
    const refGraph2 = useRef<any>(null);

    const [coldefs, setColdef] = useState<any>();
    const [gridData, setGridData] = useState<any>();
    const [gridDataCount, setGridDataCount] = useState<number>(0);
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [masterSelectedRowData, setMasterSelectedRowData] = useState<any>([]);
    const [deptWiseWipData, setDeptWiseWipData] = useState<any>();
    const [deptName, setDeptName] = useState<any>([]);
    const [isOrderElapsedGrid, setIsOrderElapsedGrid] = useState<boolean>(false);
    const [filterData, setFilterData] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<any>({});
    const { data: filterResponse, /*isLoading*/ } = useGetFilterData()
    const {state:currFilter,setState:setCurrFilter, onFilterRemove} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_OverAll_BMReport);
    

    // const { user } = useUserData();
    // const themeUi = user?.user?.theme_ui;

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
                "cp": 1,
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
                ],
            },
            {
                "cc": "ddt1",
                "cp": 2,
                "hd": "Department 1",
                "v": true,
                "cla": "Centre",
                "scc": "ddt1",
                "children": [
                    {
                        "cc": 'woh',
                        'cp': 1,
                        'hd': 'WIP on Hand',
                        'v': true,
                        'cla': 'centre',
                        'scc': 'woh',
                    },
                    {
                        "cc": 'mfg',
                        'cp': 2,
                        'hd': 'Mfg. Balance',
                        'v': true,
                        'cla': 'centre',
                        'scc': 'mfg',
                        "cgs": "closed"
                    },
                ]
            },
            {
                "cc": "ddt2",
                "cp": 3,
                "hd": "Department 2",
                "v": true,
                "cla": "Centre",
                "scc": "ddt2",
                "children": [
                    {
                        "cc": '2_woh',
                        'cp': 1,
                        'hd': 'WIP on Hand',
                        'v': true,
                        'cla': 'centre',
                        'scc': '2_woh',
                    },
                    {
                        "cc": '2_mfg',
                        'cp': 2,
                        'hd': 'Mfg. Balance',
                        'v': true,
                        'cla': 'centre',
                        'scc': '2_mfg',
                        "cgs": "closed"
                    },
                ]
            },
            {
                "cc": "",
                "cp": 2,
                "hd": "",
                "v": true,
                "cla": "Centre",
                "scc": "",
                "children": [
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
                    {
                        "cc": "Release Date",
                        "cp": 30,
                        "hd": "Release Date",
                        "v": true,
                        "cla": "Centre",
                        "scc": "rd",
                        "cgs": "closed"
                    },
                    {

                        "cc": "Remark History",
                        "cp": 30,
                        "hd": "Remark History",
                        "v": true,
                        "cla": "Centre",
                        "scc": "rh",
                        "cgs": "closed"
                    },

                ]
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
                        "cc": "ElapsedDays",
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
                        "cc": "PlantName",
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
        ]

    /* const rowData = [
         {
             ec: "EC1",
             ic: "IC1",
             bpp: "BPP1",
             da: "5 days",
             ot: "Urgent",
             oid: "Order001",
             lid: "Line001",
             id: "Product A",
             oq: 100,
             wipoh: 50,
             mfg: 30,
             dd: "2024-08-25",
             td: "Dept A",
             crdd: "2024-08-30",
             CCR_Nme: "John Doe",
             cn: "Customer X",
             "Release Date": "2024-08-20",
             "Remark History": "On track",
             Elap_days: 5,
             Attr: "Attribute A",
             Pl_Nam: "Plant X",
             "PO_No.": "PO001",
             Price: 1500,
             Itm_Grp: "Electronics",
             Att_1: "Color: Red",
             Att_2: "Size: M",
             Att_3: "Weight: 2kg",
             Att_4: "Battery: 6 hours",
             Cust_Cd: "Cust001",
             Rgn: "North America",
             Cntry: "USA"
         },
         {
             ec: "EC2",
             ic: "IC2",
             bpp: "BPP2",
             da: "3 days",
             ot: "Normal",
             oid: "Order002",
             lid: "Line002",
             id: "Product B",
             oq: 200,
             wipoh: 100,
             mfg: 80,
             dd: "2024-08-28",
             td: "Dept B",
             crdd: "2024-09-02",
             CCR_Nme: "Jane Doe",
             cn: "Customer Y",
             "Release Date": "2024-08-22",
             "Remark History": "Delayed",
             Elap_days: 7,
             Attr: "Attribute B",
             Pl_Nam: "Plant Y",
             "PO_No.": "PO002",
             Price: 2500,
             Itm_Grp: "Appliances",
             Att_1: "Color: Blue",
             Att_2: "Size: L",
             Att_3: "Weight: 3kg",
             Att_4: "Battery: 8 hours",
             Cust_Cd: "Cust002",
             Rgn: "Europe",
             Cntry: "Germany"
         },
         {
             ec: "EC3",
             ic: "IC3",
             bpp: "BPP3",
             da: "7 days",
             ot: "Urgent",
             oid: "Order003",
             lid: "Line003",
             id: "Product C",
             oq: 300,
             wipoh: 150,
             mfg: 100,
             dd: "2024-09-01",
             td: "Dept C",
             crdd: "2024-09-05",
             CCR_Nme: "Jack Smith",
             cn: "Customer Z",
             "Release Date": "2024-08-25",
             "Remark History": "Ahead of schedule",
             Elap_days: 3,
             Attr: "Attribute C",
             Pl_Nam: "Plant Z",
             "PO_No.": "PO003",
             Price: 3500,
             Itm_Grp: "Furniture",
             Att_1: "Color: Green",
             Att_2: "Size: S",
             Att_3: "Weight: 5kg",
             Att_4: "Battery: N/A",
             Cust_Cd: "Cust003",
             Rgn: "Asia",
             Cntry: "India"
         },
         {
             ec: "EC4",
             ic: "IC4",
             bpp: "BPP4",
             da: "2 days",
             ot: "Normal",
             oid: "Order004",
             lid: "Line004",
             id: "Product D",
             oq: 400,
             wipoh: 200,
             mfg: 120,
             dd: "2024-08-30",
             td: "Dept D",
             crdd: "2024-09-04",
             CCR_Nme: "Alice Brown",
             cn: "Customer W",
             "Release Date": "2024-08-21",
             "Remark History": "Needs review",
             Elap_days: 10,
             Attr: "Attribute D",
             Pl_Nam: "Plant W",
             "PO_No.": "PO004",
             Price: 4500,
             Itm_Grp: "Automotive",
             Att_1: "Color: Black",
             Att_2: "Size: XL",
             Att_3: "Weight: 10kg",
             Att_4: "Battery: 12 hours",
             Cust_Cd: "Cust004",
             Rgn: "South America",
             Cntry: "Brazil"
         },
         {
             ec: "EC5",
             ic: "IC5",
             bpp: "BPP5",
             da: "1 day",
             ot: "Urgent",
             oid: "Order005",
             lid: "Line005",
             id: "Product E",
             oq: 500,
             wipoh: 250,
             mfg: 140,
             dd: "2024-09-03",
             td: "Dept E",
             crdd: "2024-09-07",
             CCR_Nme: "Bob White",
             cn: "Customer V",
             "Release Date": "2024-08-23",
             "Remark History": "Under review",
             Elap_days: 6,
             Attr: "Attribute E",
             Pl_Nam: "Plant V",
             "PO_No.": "PO005",
             Price: 5500,
             Itm_Grp: "Textiles",
             Att_1: "Color: Yellow",
             Att_2: "Size: XS",
             Att_3: "Weight: 1kg",
             Att_4: "Battery: 3 hours",
             Cust_Cd: "Cust005",
             Rgn: "Oceania",
             Cntry: "Australia"
         }
     ];*/


    const mapApiResponseToColDefs = (apiResponse: ApiResponse[]): ColDef[] => {
        const mapChildren = (children: ApiResponse[]): ColDefChild[] => {
            return children.map(child => ({
                field: child.scc.trim(),
                headerName: child.hd,
                colId: child.hd,
                cellRenderer: child.cc === 'ec' ? "agGroupCellRenderer" : child.cc === 'ic' ? "AgeingCellRenderer" : child.cc === 'BPP' ? "colorCellRenderer" : child.cc === 'Remark History' ? 'RemarkHistoryRenderer' : undefined,
                maxWidth: child.cc === 'ec' || child.cc === 'ic' ? 80 : undefined,
                columnGroupShow: child.cgs,
                floatingFilter: child.cc === 'ec' ? false : child.cc === 'ic' ? false : true,
                cellRendererParams: child.hd.includes("Remark") ? {
                    onClick: child.scc === 'rh' ? (data: string) => onOpenRemarkHistory(data) : undefined
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

    useEffect(() => {
        const colDefs = mapApiResponseToColDefs(apiResponse);
        //console.log('coldefs', colDefs)
        setColdef(colDefs)
        getInitialGridData(1);
    }, [])

    useEffect(() => {
        if (OverAllBMLoading) {
            toast.dismiss();
            notifyLoader("Loading Data ...")
        }
        else {
            toast.dismiss();
        }
    }, [OverAllBMLoading])

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": BPPRenderer,
            "AgeingCellRenderer": AgeingCellRenderer,
            //"customCellRenderer": customCellRenderer,
            "RemarkHistoryRenderer": RemarkHistoryRenderer,
        }), []);

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const getInitialGridData = async (currentPage: number) => {
        try {
            const gridData = await getOverallBMReportData({page: currentPage, appliedFilters});
            setGridData(gridData?.data?.data?.results)
            setGridDataCount(gridData?.data?.data?.count)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
    }

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
        const selectedData = refGraph2.current?.api.getSelectedRows();
        /* To persist the state*/
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
            /*persist data finised*/

            if (mergedData.length > 0) {
                //console.log('selected', mergedData.length)
                const selectedOrderKeys: orderkeyObj[] = []
                mergedData.map((ele: any) => {
                    selectedOrderKeys.push(ele.ok)
                })
                //console.log('slectedOrder', selectedOrderKeys)
                const fetchDeptWiseWiphData = async () => {
                    try {
                        const DeptWiseWipData = await getDeptWiseWipData(selectedOrderKeys);
                        console.log('DeptWiseWipData', DeptWiseWipData?.data?.data);
                        setDeptWiseWipData(DeptWiseWipData?.data?.data);
                        const departmentNames = extractDepartmentNames(DeptWiseWipData?.data?.data);
                        //console.log('DeptWiseWipData===',departmentNames);
                        setDeptName(departmentNames);
                    } catch (error) {
                        notifyError('Failed to fetch data');
                    }

                };
                fetchDeptWiseWiphData();
                setIsOrderElapsedGrid(true)
            } else {
                setDeptWiseWipData('');
                setIsOrderElapsedGrid(false)
            }
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
        masterDetail: true,
        //detailCellRenderer: RowGroupRenderer,
        //detailCellRendererParams:RowGroupRenderer,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false,
        onSelectionChanged: getSelectedRow,
        onFirstDataRendered: onFirstDataRendered,
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

    const onApplyFilter = (filter:any)=>{
        console.log(filter);
        setAppliedFilters(filter);
        setIsFilterOpen(false)
    }

    const onAddFilter = ()=>{
        setIsFilterOpen(true)
    }

    const toggleFilter = (state: boolean) => {
        setIsFilterOpen(state);
    }
        
    useEffect(()=>{
        getInitialGridData(currentPage);
    },[currentPage, appliedFilters])

    useEffect(() => {
        setFilterData(filterResponse?.data.data)
    }, [filterResponse]);

    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                <MTOActionToolBar
                    comp={'OverallBMReport'}
                    isAddFilterButton
                    isExcelExport
                    isFilterOpen={isFilterOpen}
                    onAddFilter={onAddFilter}
                    toggleFilter={toggleFilter}
                    onApplyFilter={onApplyFilter} 
                    multiFilter={currFilter}
                    setMultiFilter={setCurrFilter}
                    onFilterRemove={onFilterRemove}
                />
            </BMDepHeaderWraper>

            {OverAllBMLoading ? <OverlayLoader /> :

                <HorizontalViewWrapper style={{ marginTop: '0px' }}>
                    <BTRTableWrapper style={{ height: screenHeight + 100, margin: '0' }}>
                        <Allotment vertical={true} separator={true} >
                            <Allotment.Pane preferredSize={'60%'}>
                                <BTRAllomentSection>
                                    <GridView
                                        reference={refGraph2}
                                        agGridProps={agGridProps}
                                        columDef={coldefs}
                                        convercolumnDef={gridData}
                                        handlePageChange={(cp) => handlePageChange(cp)}
                                        saveBtn={false}
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

            <BPRRemarkHistoryModal
                data={remarkHistory}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            />

        </BMDepWrapper>

    )
}

export default OverallBmReport