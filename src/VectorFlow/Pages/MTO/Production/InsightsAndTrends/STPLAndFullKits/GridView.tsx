import { useEffect, useMemo, useRef, useState } from "react";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import RowGrpRender from "./RowGrpRender";
import { GridOptions } from "ag-grid-enterprise";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetSTPLAndFullKitData } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";

const GridView = () => {

    const [gridData, setGridData] = useState([]);
    const [HeaderData, setHeaderData] = useState([{}]);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData()
    const reportName = "STPLAndFullKits";
    
    const gridRef = useRef();

    const getGridData = async (isGraph: any) => {
        try {
          const response = await getSTPLandFullkitInDaysData(isGraph);
          setGridData(response.data.data.results);
        }
        catch (e) {
          console.log(e);
          notifyError('Failed to fetch Grid data!');
        }
    }

    const setColumnDef = async () => {
        try {
          const response = await getUIConfigData(reportName);
          setHeaderData(response.data.data);
        }
        catch (e) {
          console.log(e);
        }
    }

    useEffect(() => {
        setColumnDef();
        getGridData(0);
    }, [])

    useEffect(() => {
        if (isSuccess) {
          notifySuccess("Fetched Data successfully!")
        }
        if (isError) {
          notifyError("Failed to load data!")
        }
    }, [isSuccess, isError])

    const colDefCustomizations = {
        Plant: {
          cellRenderer: "agGroupCellRenderer",
        }
    }

    const colDefs = useMemo(() => {
    return getColumnDefinations(HeaderData, colDefCustomizations, [])
    }, [HeaderData]);

    const gridOptions: GridOptions = {
        sideBar: {
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'Columns',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
              minWidth: 225,
              maxWidth: 225,
              width: 225
            },
            {
              id: 'filters',
              labelDefault: 'Filters',
              labelKey: 'filters',
              iconKey: 'filter',
              toolPanel: 'agFiltersToolPanel',
              minWidth: 180,
              maxWidth: 400,
              width: 250
            }
          ],
        },
        defaultColDef: {
          flex: 1,
          enableRowGroup: true,
        },
        groupDefaultExpanded: 0,
        masterDetail: true,
        detailRowHeight: 500,
        detailCellRenderer: RowGrpRender,
        detailCellRendererParams: {
          innerHeight: 400,
        },
        rowGroupPanelShow: 'always'
    };

    return (
        <>
            {
                isLoading && <OverlayLoader />
            }
            <div data-testid='grid-view'>
                <VFTable
                {...gridOptions}
                columnDefs={colDefs}
                rowData={gridData || []}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                height={"95vh"}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
                />
            </div>
        </>
    )
}

export default GridView;