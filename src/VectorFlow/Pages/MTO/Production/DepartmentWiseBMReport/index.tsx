import React, { useEffect, useMemo, useState } from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from './styles';
import { AgGridReactProps } from 'ag-grid-react';
//import { ColDef } from 'ag-grid-enterprise'

import { deptwiseBMReportData, RemarkHistoryData } from './DeptWiseBMReportData';
import GridView from './GridView';
import { Allotment } from 'allotment';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../Common/SplitGraphContainer/styles';
import useViewPort from '../../../../../hooks/useViewPort';
import OrderElapsedGrid from './OrderElapsedGrid';
import ColorCellRenderer from '../../Common/ColorCellRenderer';
import AgeingCellRenderer from './AgeingIconCellRenderer';
import customCellRenderer from './CustomCellRenderer';
import RowGroupRenderer from './RowGroupRenderer';
import TextBoxCellRenderer from './TextBoxCellRenderer';
import RemarkHistoryRenderer from './RemarkHistoryRenderer';
import BPRRemarkHistoryModal from './MTORemarkHistoryModal';

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
        onClick?: () => void;
    };
}

const DptWiseBMReport = () => {
    const [colDeflatest, setColdef] = useState([{}])
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);

    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "AgeingCellRenderer": AgeingCellRenderer,
            "customCellRenderer": customCellRenderer,
            "TextBoxCellRenderer": TextBoxCellRenderer,
            "RemarkHistoryRenderer": RemarkHistoryRenderer
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
                        "scc": "BPP",
                    },
                    {
                        "cc": "DeptAgeing",
                        "cp": 4,
                        "hd": "Dept Ageing",
                        "v": true,
                        "cla": "Centre",
                        "scc": "D_Ag",
                    },
                    {
                        "cc": "OrderType",
                        "cp": 5,
                        "hd": "Order Type",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Ord_Typ",
                      
                    },
                    {
                        "cc": "OrderID",
                        "cp": 6,
                        "hd": "Order ID",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Ord_ID",
                     
                    },
                    {
                        "cc": "LineItem",
                        "cp": 7,
                        "hd": "Line Item",
                        "v": true,
                        "cla": "Centre",
                        "scc": "L_Itm",
                        "cgs": "closed"
                    },
                    {
                        "cc": "ItemCode",
                        "cp": 8,
                        "hd": "Item Code",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Itm_Code",
                        "cgs": "closed"
                    },
                    {
                        "cc": "ItemDescription",
                        "cp": 9,
                        "hd": "Item Description",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Itm_Desc",
                        "cgs": "closed"
                    },
                    {
                        "cc": "OrderQuantity",
                        "cp": 10,
                        "hd": "Order Quantity",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Ord_Qty",
                        "cgs": "closed"
                    },
                    {
                        "cc": "WIPOnHand",
                        "cp": 11,
                        "hd": "WIPOn Hand",
                        "v": true,
                        "cla": "Centre",
                        "scc": "WIP_O_Hd",
                        "cgs": "closed"
                    },
                    {
                        "cc": "Mfg.Balance",
                        "cp": 12,
                        "hd": "Mfg. Balance",
                        "v": true,
                        "cla": "Centre",
                        "scc": "M_Bal",
                        "cgs": "closed"
                    },
                    {
                        "cc": "DueDate",
                        "cp": 13,
                        "hd": "Due Date",
                        "v": true,
                        "cla": "Centre",
                        "scc": "DDt",
                        "cgs": "closed"
                    },
                    {
                        "cc": "TrailingDepartment",
                        "cp": 14,
                        "hd": "Trailing Department",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Trail_Dpt",
                        "cgs": "closed"
                    },

                    {
                        "cc": "CRDD",
                        "cp": 15,
                        "hd": "CRDD",
                        "v": true,
                        "cla": "Centre",
                        "scc": "CRDDate",
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
                        "scc": "Cust_Nme",
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
                        "cc": "ElapsedDays",
                        "cp": 18,
                        "hd": "Elapsed Days",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Elap_days",

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
                        "scc": "Pl_Nam",

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
                        "cgs": "open"
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
                        "cc": "Latest Remark",
                        "cp": 29,
                        "hd": "Latest Remark",
                        "v": true,
                        "cla": "Centre",
                        "scc": "Latest Remark",
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


    const mapApiResponseToColDefs = (apiResponse: ApiResponse[]): ColDef[] => {
        const mapChildren = (children: ApiResponse[]): ColDefChild[] => {
            return children.map(child => ({
                field: child.scc.trim(),
                headerName: child.hd,
                colId: child.hd,
                cellRenderer: child.cc === 'ec' ? "customCellRenderer" : child.cc === 'ic' ? "AgeingCellRenderer" : child.cc === 'BPP' ? "colorCellRenderer" : child.cc === 'Remark' || child.cc === 'Latest Remark' ? 'TextBoxCellRenderer' : child.cc === 'Remark History' ? 'RemarkHistoryRenderer' : undefined,
                initialWidth: child.cc === 'ec' || child.cc === 'ic' ? 80 : undefined,
                columnGroupShow: child.cgs,
                pinned: child.cc === 'Remark' || child.cc === 'Latest Remark' || child.scc === 'Remark History' ? 'right' : undefined,
                floatingFilter: child.cc === 'ec' ? false : child.cc === 'ic' ? false : true,
                cellRendererParams: child.hd.includes("Remark") ? {
                    visible: {
                        flag: child.scc === 'Remark' ? true : child.scc === 'Latest Remark' ? false : undefined,
                    },
                    onClick: child.scc === 'Remark History' ? () => onOpenRemarkHistory() : undefined
                } : undefined,

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
        setColdef(colDefs)
    }, [])

    const onOpenRemarkHistory = () => {
        setIsRemarkHistoryOpen(true)
        // Function implementation for remark history
    };

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
        detailCellRenderer: RowGroupRenderer,
        //detailCellRendererParams:RowGroupRenderer,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false
    };

    const { screenHeight } = useViewPort()
    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                <MTOActionToolBar
                    comp={'DeptWiseBMReport'}
                    isAddFilterButton
                    isExcelExport
                    isWIPCheckBox
                />
            </BMDepHeaderWraper>

            <HorizontalViewWrapper style={{ marginTop: '0px' }}>
                <BTRTableWrapper style={{ height: screenHeight + 100, margin: '0' }}>
                    <Allotment vertical={true} separator={true} >
                        <Allotment.Pane preferredSize={'60%'}>
                            <BTRAllomentSection>
                                <GridView agGridProps={agGridProps} columDef={colDeflatest} convercolumnDef={deptwiseBMReportData} />
                            </BTRAllomentSection>
                        </Allotment.Pane>

                        <Allotment.Pane preferredSize={'40%'}>
                            <BTRAllomentSection>
                                <OrderElapsedGrid isTrue={true} />
                            </BTRAllomentSection>
                        </Allotment.Pane>
                    </Allotment>
                </BTRTableWrapper>
            </HorizontalViewWrapper>

            <BPRRemarkHistoryModal
                data={RemarkHistoryData}
                isOpen={isRemarkHistoryOpen}
                onClose={() => setIsRemarkHistoryOpen(false)}
            />

        </BMDepWrapper>

    )
}

export default DptWiseBMReport;