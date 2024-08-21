import { ColDef, GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../../helpers/utils';
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import { useGetUIConfigData } from '../../../../../Services/MTO/Common/UIConfig';
import useViewPort from "../../../../../../hooks/useViewPort";
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import OverlayLoader from '../../../../../../VectorFlow/Pages/MTO/Common/Loader';
import CustomTagTooltip from '../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import VFPagination from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { SCDynamicContainer } from './styles';
import './style.css'

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
    const { screenHeight } = useViewPort();
    const gridRef = useRef(null);
    const [colDef, setColDef] = useState([{}]);
    const [HeaderData, setHeaderData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [totalRow, setTotalRow] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()

    const defaultColDef = useMemo<ColDef>(() => {
        return {
          suppressMenu: true,
          autoHeaderHeight: true,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          enableRowGroup: true,
          floatingFilterComponentParams: { suppressFilterButton: true },
          tooltipComponent: CustomTagTooltip,
        };
    }, []);

    const gridOptions: GridOptions = {
        groupDefaultExpanded: 0,
        detailRowHeight: 500,
        detailCellRendererParams: {
          innerHeight: 400,
        },
        rowGroupPanelShow: 'always'
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
          const data = response.data.data.results?.map((row: any) => row[0]);
          setGridData(data);
          console.log(response.data?.data?.count, 'REPS')
          setTotalRow(response?.data?.data?.count);
        }
        catch (e) {
          console.log(e);
          notifyError('Failed to fetch Grid data!');
        }
    }

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
        getGridData({graphflag: 0, page: currPage});
    }

    useEffect(() => {
        getGridData({graphflag: 0, page: currentPage});
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
            <div data-testid='grid-view' style={{ height: screenHeight - 50 }} >
               <VFTable
                    {...gridOptions}
                    sideBar={{
                    toolPanels: ['columns'],
                    }}
                    defaultColDef={defaultColDef}
                    columnDefs={colDef}
                    rowData={gridData || []}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    height={"75%"}
                    ref={gridRef}
                    statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                    }}
                />
                <VFPagination
                    selectedRows={0}
                    rowsPerPage={10}
                    totalRows={totalRow}
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                />
            </div>
        </SCDynamicContainer>

    )
}

export default GridView