import { useEffect, useMemo, useRef, useState } from "react";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { GridOptions } from "ag-grid-enterprise";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetSTPLAndFullKitData } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";
import { useGetBOMExplosionData } from "../../../../../../VectorFlow/Services/MTO/Common/BOMExplosion";
import VFPagination from "../../../../../../components/VectorFLOW/commons/VFPagination";


const GridView = () => {

    const [gridData, setGridData] = useState([]);
    const [HeaderData, setHeaderData] = useState([{}]);
    const [totalRow, setTotalRow] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData();
    const { mutateAsync: getBOMExplosionData, } = useGetBOMExplosionData();

    const reportName = "STPLAndFullKits";
    
    const gridRef = useRef();

    const handlePageChange = async (currPage: number) => {
      setCurrentPage(currPage);
      getGridData({graphFlag: 0, page: currPage});
  }

    const getGridData = async (params: any) => {
        try {
          const response = await getSTPLandFullkitInDaysData(params);
          const data = response?.data?.data?.results?.map((row: any) => row[0]);
          setGridData(data);
          setTotalRow(response?.data?.data?.count)
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
        getGridData({graphFlag: 0, page: currentPage});
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
        detailRowAutoHeight: true,
        detailCellRendererParams: {
          suppressMenu: true,
          detailGridOptions: {
            rowHeight: 45,
            domLayout:"autoHeight",
            autoGroupColumnDef: {
              headerName:"Item Name",
              cellRendererParams: {
                  suppressCount: true
              }
          },
            columnDefs: [
              { field: "qty", headerName: "Requirement", },
              { field: "soh", headerName: "Stock",  },
              { field: "wip", headerName: "WIP",  },
              { field: "gap", headerName: "Gap", },
            ],
            defaultColDef: {
              flex: 1,
              suppressMenu: true,
              cellStyle: {
                fontSize:"16px",
                display: "flex",
                alignItems: "center"
              }
            },
            treeData: true,
            getDataPath: (data: any) => {
              return data.path;
            },
          },
          getDetailRowData: async (params: any) => {
            const data = await getBOMExplosionData({orderId: params.data.oid, lineId: params.data.lid});
            params.successCallback(data.data.data)
          }
        },
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
            <VFPagination
                selectedRows={0}
                rowsPerPage={10}
                totalRows={totalRow}
                currentPage={currentPage}
                handleChangePage={(cp) => handlePageChange(cp)}
            />
        </>
    )
}

export default GridView;