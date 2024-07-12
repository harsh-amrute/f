import React from 'react';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from './styles';
import { AgGridReactProps } from 'ag-grid-react';
//import { ColDef } from 'ag-grid-enterprise'
import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    /*createGrid,*/
} from "ag-grid-enterprise";
import GridView from './GridView';

const DptWiseBMReport = () => {
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

            pagination: true,
            defaultColDef: {
                cellStyle: {
                    'text-align': 'center',
                    'height': '50px',
                    "font-style": "normal",
                    "font-variant": "normal",
                    "font-weight": "300",
                    "font-size": "20px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },
            },

        },
        masterDetail: true,

        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
    };

    const columnDefs: (ColDef | ColGroupDef)[] = [
        {
            headerName: "Default Attributes",
            suppressStickyLabel: true,
            openByDefault: true,
            children: [
                { field: "BPP" /*, pinned: true*/, colId: "BPP" },
                { field: "D_Ag",headerName:'', colId: "Dept Ageing", columnGroupShow: "open" },
                { field: "Ord_Typ", colId: "Order Type", columnGroupShow: "open" },
                { field: "Ord_ID", colId: "Order ID", columnGroupShow: "closed" },
                { field: "L_Itm", colId: "Line Item", columnGroupShow: "closed" },
                { field: "Itm_Code", colId: "Item Code", columnGroupShow: "closed" },
                { field: "Itm_Desc", colId: "Item Description", columnGroupShow: "closed" },
                { field: "Ord_Qty", colId: "Order Quantity", columnGroupShow: "closed" },
                { field: "WIP_O_Hd", colId: "WIP On Hand", columnGroupShow: "closed" },
                { field: "M_Bal", colId: "Mfg. Balance", columnGroupShow: "closed" },
                { field: "CCR_Nme", colId: "CCR Name", columnGroupShow: "closed" },
                { field: "Cust_Nme", colId: "Customer Name", columnGroupShow: "closed" },
                { field: "CRDDate", colId: "CRDDate", columnGroupShow: "closed" },
                { field: "DDt", colId: "Due Date", columnGroupShow: "closed" },
                { field: "R_DDt", colId: "Release Date", columnGroupShow: "closed" }
            ],
        },
        {
            headerName: "Calculate Attribute",
            suppressStickyLabel: true,
            openByDefault: true,
            children: [
                { field: "Trail_Dpt", colId: "Trailing Department" },
                { field: "Elap_days", colId: "Elapsed Days", columnGroupShow: 'closed' },
                { field: "Attr", colId: "Attribute", columnGroupShow: 'closed' },
            ],
        },
        {
            headerName: "Order Attribute",
            suppressStickyLabel: true,
            openByDefault: true,
            children: [
                { field: "Pl_Nam", colId: "Plant Name" },
                { field: "PO_No", colId: "Po No.", columnGroupShow: 'closed' },
            ],
        },
        {
            headerName: "Product Attribute",
            suppressStickyLabel: true,
            openByDefault: true,
            children: [
                { field: "Price", colId: "Price" },
                { field: "Itm_Grp", colId: "Item Group" },
                { field: "Att_1", colId: "Attribute 1", columnGroupShow: 'closed' },
                { field: "Att_2", colId: "Attribute 2", columnGroupShow: 'closed' },
                { field: "Att_3", colId: "Attribute 3", columnGroupShow: 'closed' },
                { field: "Att_4", colId: "Attribute 4", columnGroupShow: 'closed' },
            ],
        },
        {
            headerName: "Customer Attribute",
            suppressStickyLabel: true,
            openByDefault: true,
            children: [
                { field: "Customer Code", colId: "Customer Code" },
                { field: "Rgn", colId: "Region", columnGroupShow: 'closed' },
                { field: "Country", colId: "Country", columnGroupShow: 'closed' },
            ],
        },
        {
            headerName: "",
            suppressStickyLabel: true,
            children: [
                { field: "Remark Code", pinned: true, colId: "Customer Code" },
                { field: "Latest Remark", pinned: true, colId: "Region" },
                { field: "Remark History", pinned: true, colId: "Country" },
            ],
        }



    ];

    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>


                <MTOActionToolBar
                    comp={'DeptWiseBMReport'}
                    onDateChange={() => { console.log('') }}
                    submitDate={() => { console.log('') }}
                />
            </BMDepHeaderWraper>
            <GridView />




        </BMDepWrapper>
    )
}

export default DptWiseBMReport;