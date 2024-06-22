import { useState, useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable';
import columnData from '../ColumnData';
import { Order, ColumnDataType } from '../../../../../../types/MTO';
import procData from '../ProcurementData';
import { InsightsAndTrendsString } from "../../../../Common/String";

const GridView = () => {

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

        onCellEditingStopped(event: any) {
            const field = event.colDef.field;
            // const newValue = event.newValue;
            const rowIndex = event.rowIndex;

            if (!field || rowIndex == null) {
                return;
            }
        }
    };

    // const [ShortageColumns, setShortageColumns] = useState(columnData);
    const [ShortageColumns] = useState(columnData);
    const gridRef = useRef();

    const mapDataToColumns = (data: Order[], columns: ColumnDataType[]) => {
        return data.map(item => {
            const mappedItem: any = {};
            columns.forEach(column => {
                if (column.field) {
                    if (column.field === "rmpm") {
                        if (item['or'] > 0) {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithRMPM;
                        }
                        else if (item['po'] > 0) {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitOPO;
                        }
                        else if (item['sit'] > 0) {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitSIT;
                        }
                        else {
                            mappedItem[column.field] = InsightsAndTrendsString.ordersWithFullkitOHS;
                        }
                    }
                    else {
                        mappedItem[column.field] = item[column.field as keyof Order];
                    }
                }
            });
            return mappedItem;
        });
    };

    const convertedData = mapDataToColumns(procData, columnData);
    // const [ShortageDatas, setShortageData] = useState(convertedData);
    const [ShortageDatas] = useState(convertedData);


    return (
        <>
            <VFTable

                {...agGridProps}
                sideBar="columns"
                columnDefs={ShortageColumns}
                rowData={ShortageDatas}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                height={"750px"}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
            />

        </>
    );
}

export default GridView