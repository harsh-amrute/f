import React, { useEffect, useRef, useState } from "react";
import VFTable from "../../../Common/VFTable";
import { GridOptions } from "ag-grid-enterprise";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { useGetSTPLAndFullKitData } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";
import { useGetBOMExplosionData } from "../../../../../../VectorFlow/Services/MTO/Common/BOMExplosion";
import VFPagination from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { pagination } from "../../../Common/Enum";
import { Wrapper } from "./styles";
import { formatFilterJSON } from "../../../../../../helpers/utils";


const GridView = ({setCurrentGridRef, currentGridRef, columnState, colDef, appliedFilters}: any) => {

  const [gridData, setGridData] = useState([]);
  const [totalRow, setTotalRow] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData();
  const { mutateAsync: getBOMExplosionData, } = useGetBOMExplosionData();


  const gridRef = useRef();

  const handlePageChange = async (currPage: number) => {
    setCurrentPage(currPage);
    getGridData({ graphflag: 0, page: currPage });
  }

  const getGridData = async (params: any) => {
    try {
      const formatedFilters = formatFilterJSON(appliedFilters);
      const response = await getSTPLandFullkitInDaysData({ ...params, appliedFilters: formatedFilters});
      setGridData(response?.data?.data?.results);
      setTotalRow(response?.data?.data?.count)
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Grid data!');
    }
  }


  useEffect(() => {
    getGridData({ graphflag: 0, page: currentPage });
  }, [appliedFilters])

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])


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
        rowHeight: 30,
        domLayout: "autoHeight",
        autoGroupColumnDef: {
          headerName: "Item Name",
          cellRendererParams: {
            suppressCount: true
          }
        },
        columnDefs: [
          { field: "qty", headerName: "Requirement", },
          { field: "soh", headerName: "Stock", },
          { field: "wip", headerName: "WIP", },
          { field: "gap", headerName: "Gap", },
        ],
        defaultColDef: {
          flex: 1,
          suppressMenu: true,
          cellStyle: {
            fontSize: "14px",
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
        const data = await getBOMExplosionData({ orderId: params.data.oid, lineId: params.data.lid });
        params.successCallback(data.data.data)
      }
    },
  };

  useEffect(() => {
    if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
      const result = currentGridRef.current.api.applyColumnState({
        state: columnState,
        applyOrder: true
      });
      if (!result) {
        console.error('Failed to apply column state');
      }
    }
  }, [currentGridRef, columnState]);

  return (
    <>
      {
        isLoading && <OverlayLoader />
      }
      <Wrapper data-testid='grid-view'>
        <VFTable
          {...gridOptions}
          columnDefs={colDef}
          rowData={gridData || []}
          tooltipHideDelay={100000}
          tooltipShowDelay={0}
          tooltipMouseTrack={true}
          ref={gridRef}
          onGridReady={(params: any) => {
            params.api.autoSizeAllColumns();

            setCurrentGridRef(gridRef);
          }}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            ]
          }}
          maintainColumnOrder
        />
        <VFPagination
          selectedRows={0}
          rowsPerPage={pagination.mtoPageSize}
          totalRows={totalRow}
          currentPage={currentPage}
          handleChangePage={(cp) => handlePageChange(cp)}
        />
      </Wrapper>
    </>
  )
}

export default React.memo(GridView);