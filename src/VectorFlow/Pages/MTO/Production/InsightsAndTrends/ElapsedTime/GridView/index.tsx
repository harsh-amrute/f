import { GridOptions } from 'ag-grid-enterprise';
import React, { useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../../../helpers/utils';
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable'
import CustomTagTooltip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import TagCellToolTip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import { APIMock, gridColumnConfig } from '../Data';
import { useGetUIConfigData } from '../../../../../../Services/MTO/Common/UIConfig';
import './styles.css'
import { SCDynamicContainer } from './styles';
import ColorCellRenderer from '../../../../../MTA/SupplyChainIntelligenceHub/OpenExpeditingRequests/ColorCellRenderer';
import _ from 'lodash';
const GridView = () => {
    const gridRef = useRef(null);
    const HeaderData = gridColumnConfig;
    // const [HeaderData, setHeaderData] = React.useState(gridColumnConfig);
    // const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    // const reportName = "ElapsedTime";

    const defaultColDef = {
        // suppressMenu: true,
        autoHeaderHeight: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        enableRowGroup: true,
        floatingFilterComponentParams: { suppressFilterButton: true },
        tooltipComponent: CustomTagTooltip,
        initialWidth: 110,
        cellStyle: {
            'text-align': 'center',
            'height': '50px',
            "font-style": "normal",
            "font-variant": "normal",
            "font-weight": "300",
            "font-size": "12px",
            "font-family": "Roboto",
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
            'resizable': 'true',

        },
    }

    const gridOptions: GridOptions = {
        groupDefaultExpanded: 0,
        detailRowHeight: 500,
        rowHeight: 26,
        rowGroupPanelShow: 'always',
        getRowStyle: (params: any) => {
            return {
                background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
            };
        },
    };

    const colDefCustomizations = {
        Tags: {
            tooltipValueGetter: (params: any) => params.value,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            }
        },
        BPP: {
            cellRenderer: ColorCellRenderer,
        },
    }

    // // const setColumnDef = async () => {
    // //     try {
    // //         const response = await getUIConfigData(reportName);
    // //         setHeaderData(response?.data?.data);
    // //     }
    // //     catch (e) {
    // //         console.log(e);
    // //     }
    // // }

    // // React.useEffect(() => {
    // //     setColumnDef();
    // // }, [])


    // // React.useEffect(() => {
    const newHeader = _.cloneDeep(HeaderData);
    console.log('Header Data', HeaderData)
    console.log('coldef customs', colDefCustomizations);

    const colDef = getColumnDefinations(newHeader, colDefCustomizations)
    // }, [])
    // }, [HeaderData])



    return (

        <SCDynamicContainer className="ag-theme-planning-custom">
            <VFTable
                {...gridOptions}
                sideBar={{
                    toolPanels: ['columns'],
                }}
                defaultColDef={defaultColDef}
                columnDefs={colDef}
                disableZoomScaling
                rowData={APIMock}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
                pagination
            />
        </SCDynamicContainer>

    )
}

export default GridView