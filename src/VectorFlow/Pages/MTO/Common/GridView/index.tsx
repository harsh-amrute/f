import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../helpers/utils';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import { useGetUIConfigData } from '../../../../Services/MTO/Common/UIConfig';
import './style.css'
import { SCDynamicContainer } from './styles';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import OverlayLoader from '../../../../../VectorFlow/Pages/MTO/Common/Loader';
import CustomTagTooltip from '../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';

interface IGridViewProps {
    getData : (isGraph: number) => any,
    reportName: string,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    colDefCustomizations?: any
}

const GridView = (props: IGridViewProps) => {

    const { getData, reportName, isLoading, isError, isSuccess, colDefCustomizations={} } = props;

    const gridRef = useRef(null);
    const [colDef, setColDef] = useState([{}]);
    const [HeaderData, setHeaderData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()

    const defaultColDef = {
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

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response?.data?.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const getGridData = async (isGraph: any) => {
        try {
          const response = await getData(isGraph);
          setGridData(response.data.data.results);
        }
        catch (e) {
          console.log(e);
          notifyError('Failed to fetch Grid data!');
        }
    }

    useEffect(() => {
        getGridData(0);
        setColumnDef();
    }, [])

    useEffect(() => {
        setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
    }, [HeaderData])

    useEffect(() => {
        if (isSuccess) {
          notifySuccess("Fetched Data successfully!")
        }
        if (isError) {
          notifyError("Failed to load data!")
        }
    }, [isSuccess, isError])

    return (

        <SCDynamicContainer className="ag-theme-planning-custom">
            {
                isLoading && <OverlayLoader />
            }
            <VFTable
                {...gridOptions}
                sideBar={{
                    toolPanels: ['columns'],
                }}
                defaultColDef={defaultColDef}
                columnDefs={colDef}
                disableZoomScaling
                rowData={gridData}
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