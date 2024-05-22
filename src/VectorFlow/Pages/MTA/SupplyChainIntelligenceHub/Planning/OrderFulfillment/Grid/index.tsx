import {useMemo, useState} from 'react';
import GridViewTable from "../../GridView/GridViewTable";
import { BPRTagsCellRenderer } from "../../../BPR/BPRCellRenderers";
import { AgGridReactProps } from "ag-grid-react";
import { SideBarDef } from 'ag-grid-enterprise';
import { createIconColumn } from '../../../../../../../helpers/utils';
import BPRGraphCellRenderer from '../../../BPR/BPRGraphCellRenderer';
import ColorCellRenderer from '../../../../InsightsAndTrends/BTR/ColorCellRenderer';
import { OrderCoverageCellRenderer } from '../../../../../../../components/VectorFLOW/commons/OrderCoverageCellRenderer';

const OrderFulfillmentGrid = ({data, paginationProps, onOpenDailyDataGraph, currentCategory, currentTab}:any) => {

    const [activeRow, setActiveRow] = useState<any>();
    const [isSubGridOpen, toggleSubGrid] = useState<any>(false);

    const customCellRenderers = useMemo(() => ({
        grapCellRenderer: BPRGraphCellRenderer,
        tagsCellRenderer: BPRTagsCellRenderer,
        colorCellRenderer: ColorCellRenderer,
        orderCoverageCellRenderer: OrderCoverageCellRenderer
    }), []);

    const sideBar: SideBarDef = {
        toolPanels: [
            {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
                toolPanelParams: {
                    suppressPivots: true,
                    suppressPivotMode: true,
                },
            },
        ],
        defaultToolPanel: '',
    }

    const agGridProps: AgGridReactProps = {
        enableRangeSelection: true,
        rowSelection: "multiple",
        suppressRowTransform: true,
        tooltipShowDelay: 0.3,
        tooltipTrigger: 'focus',
        tooltipInteraction: true,
        readOnlyEdit: true,
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                if (params.node.rowIndex % 2 === 0) {
                    return { background: "#EBEBEB" };
                }
                return { background: "#F7F7F7" };
            },
        },
        onRowClicked: (params: any) => {
            if (params.data.transit && params.data.transit.length > 0) {
                setActiveRow(params.data.transit);
                toggleSubGrid(true);
            }
        },
        sideBar: sideBar,
        suppressRowClickSelection: true,
        components: customCellRenderers,
        defaultColDef: {
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType: false,
            resizable: false,
            cellStyle: {
                "flex": 1,
                'text-align': 'center',
                'height': '50px',
                "font-style": "normal",
                "font-variant": "normal",
                "font-weight": "300",
                "font-size": "20px",
                "font-family": "Roboto",
                "display": "block",
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap'
            },
        },
        statusBar: {
            statusPanels: [
                { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                { statusPanel: 'agAggregationComponent', align: 'left' },
            ],
        }
    }

    const mapUIConfigToColdefs = (columns:any) => {
        let colDefs = [];
        columns.sort((column1:any, column2:any) => {
            return column1.colPosition - column2.colPosition;
        });
        const dailyDataColDef = {...createIconColumn({id:'graph', label:'', cellRenderer:'grapCellRenderer'}), cellRendererParams: {onOpenDailyDataGraph: onOpenDailyDataGraph}};
        const tagsColDef = {
            colId: 'tags',
            field: 'tags',
            headerName: "Tags",
            cellRenderer: 'tagsCellRenderer',
            width: 100
        };

        colDefs = columns.map((column:any) => {
            if (['plp', 'pip'].includes(column.colCode)) {
                return {
                    field: column['colCode'],
                    colId: column['colCode'],
                    headerName: column['header'],
                    cellRenderer: 'colorCellRenderer',
                }
            }
            if (column.colCode === 'c') {
                return {
                    field: column['colCode'],
                    colId: column['colCode'],
                    headerName: column['header'],
                    cellRenderer: 'orderCoverageCellRenderer',
                    minWidth: 250,
                }
            }
            return {
                field: column['colCode'],
                colId: column['colCode'],
                headerName: column['header'],
            }
        });
        return [dailyDataColDef, tagsColDef, ...colDefs];
    }

    const colDefs = mapUIConfigToColdefs(data['uiConfig']);

    const customGridColDef = [
        {
            headerName: "Order No/Tracking No",
            colId: 'on',
            field: 'on'
        },
        {
            headerName: "Creation Date",
            colId: 'id',
            field: 'id'
        },
        {
            headerName: "Pending Quantity",
            colId: 'pq',
            field: 'pq'
        },
        {
            headerName: "Due Date",
            colId: 'dd',
            field: 'dd'
        },
        {
            headerName: "Price",
            colId: 'p',
            field: 'p'
        },
        {
            headerName: "Order Status",
            colId: 'os',
            field: 'os'
        },
    ]

    return (
        <GridViewTable
            currentTab={currentTab}
            currentCategory={currentCategory}
            agGridProps={agGridProps}
            agGridColDefs={colDefs}
            agGridRowData={data['data']}
            customGridRowData={activeRow}
            customGridColDef={customGridColDef}
            isSubGridOpen={isSubGridOpen}
            paginationProps={paginationProps}
            tablePrefixSrc={'/assets/img/VectorFLOW/BPR/order-fullfilment-table-prefix.svg'}
        />
    )
}

export default OrderFulfillmentGrid;
