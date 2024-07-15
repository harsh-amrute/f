import { useState, useEffect } from 'react'
import ActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import GridView from './GridView/GridView'
import GraphView from './GraphView/GraphView'
import { InsightsAndTrendsString } from '../../../Common/String'
import { Order } from '../../../../../../VectorFlow/types/MTO'
import { ColDef } from 'ag-grid-enterprise'
import columnData from './ColumnData'
import { AgGridReactProps } from 'ag-grid-react'
import { useGetOrderwiseCoverageData } from '../../../../../../VectorFlow/Services/MTO/Procurement/OrderwiseCoverage'

const RMPMOrderwiseCoverage = () => {

    const [isGridView, setIsGridView] = useState(false);


    const { mutateAsync: getOrderwiseCoverageData } = useGetOrderwiseCoverageData();



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

    const mapDataToColumns = (data: any, columns: ColDef[]) => {
        return data.map((item: any) => {
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

    const [convertedData, setConvertedData] = useState([{}]);

    const [ShortageDatas, setShortageDatas] = useState(convertedData);

    const GetData = async () => {
        const APIData = await getOrderwiseCoverageData();
        console.log("orderwise: ", APIData.data.data.results)
        setConvertedData(mapDataToColumns(APIData.data.data.results, columnData));
        setShortageDatas(convertedData);
        console.log("convertedData:=:=:", convertedData);
    }

    useEffect(() => {
        GetData();

    }, [])
    return (
        <>
            <div style={{ zoom: 1.3 }}>

                <ActionToolBar comp={"rmpm"} isGridView={isGridView} setIsGridView={setIsGridView} />
            </div>
            {(isGridView) ? <GridView agGridProps={agGridProps} ShortageColumns={ShortageColumns} ShortageDatas={convertedData} /> : <GraphView shortageData={convertedData} />}
        </>
    )
}
export default RMPMOrderwiseCoverage
