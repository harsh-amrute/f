import { useEffect, useMemo, useState } from "react"
import { AgGridReactProps } from "ag-grid-react"
import AvlCellRenderer from '../../Common/AvlCellRenderer';
import AvailabilityToolTip from "../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import DetailCellRenderer from "../../Procurement/MaterialCoverage/MaterialCellRendere";
import {  OrderDetailsHeaderData } from '../MaterialCoverage/Data';
import { mapMaterialCoverageFieldsToColDefs } from '../../../../../helpers/utils'
import ColorCellRenderer from "../../Common/ColorCellRenderer";
import { useGetOpenSODetailsData } from "../../../../../VectorFlow/Services/MTO/Procurement/MaterialCoverage";
const useMaterialSO = (data: any) => {
    const [orderDetailsData, setOrderDetailsData] = useState<any>();

    const { HeaderData } = OrderDetailsHeaderData;
    const columnDef = mapMaterialCoverageFieldsToColDefs(HeaderData);

    const { mutateAsync: getOpenSODetailsData } = useGetOpenSODetailsData()

    useEffect(() => {
        getInitialData()
    }, [])

    const getInitialData = async () => {
        let queryString = '?Color='
        const colorsArray = Object.keys(data).filter((k: string) => k.startsWith('c'))
        colorsArray.forEach((s: string, index: number) => {
            if (index === colorsArray.length - 1) {
                queryString += `${data[s]}`
            }
            else {
                queryString += `${data[s]},`
            }
        })
        queryString += `&KitStatus=${data.kit}&S=${data.S}&E=${data.E}`

        const someData = await getOpenSODetailsData(queryString);
        const output = someData.data?.data?.results.map((item: any) => ({
            ...item,
            fkapr: ((item.fka / item.oq) * 100).toFixed(2)
        })
        )
        setOrderDetailsData(output)
    }

    // const LoadData = (data: any) => {
    //     //console.log('LoadData', data)
    //     const calculate = data.map((item: any) => ({
    //         ...item,
    //         fkapr: ((item.fka / item.oq) * 100).toFixed(2)
    //     }))
    //     return calculate;
    // }
    // const output = LoadData(OrderDetailsData);
    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/VectorFLOW/NMS/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
            groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
        };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);
    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "avlCellRenderer": AvlCellRenderer,
            "availabilityToolTip": AvailabilityToolTip
        }), []);

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
            pagination: true,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            components: customCellRenderers,
            icons: icons,
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
        sideBar: sideBar,
        masterDetail: true,
        detailCellRenderer: DetailCellRenderer,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
    };

    return {
        agGridProps,
        columnDef,
        RRRRowData: orderDetailsData,
    }
}

export default useMaterialSO;