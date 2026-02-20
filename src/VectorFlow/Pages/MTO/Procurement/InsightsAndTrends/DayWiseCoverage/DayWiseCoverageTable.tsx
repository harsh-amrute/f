import { ExcelCell, ExcelExportParams, ExcelRow, GridOptions, ProcessRowGroupForExportParams } from "ag-grid-enterprise";
import { useEffect, useMemo, useRef, useState } from "react";
import VFTable from "../../../Common/VFTable";
import CustomGroupCellRenderer from "./CustomGroupCellRenderer";
import DayWiseCoverageDetailsCellRenderer from "./DayWiseCoverageDetailsCellRenderer";
import { useGetDayWiseCoverageData } from "../../../../../../VectorFlow/Services/MTO/Procurement/DayWiseCoverage";
import { GridFilterWrapper, TextBtn } from "../../../Common/VFPagination/styles";
import { useUserData } from "../../../../../../context";
import { formatFilterJSON } from "../../../../../../helpers/utils";
import { TableWrapper } from "./style";
import VFPagination from "../../../Common/VFPagination";

interface IDayWiseCoverageProps {
  columnState: any,
  setCurrentGridRef: any,
  colDef: any,
  currentGridRef: any,
  selectedDate: string,
  startDate: string,
  endDate: string,
  setLoading: any,
  appliedFilters: any,
  childColDef: any,

  userPageSize: number;        
  onSavePageSize: (size: number) => void; 
  configLoaded: boolean;     
}

const DayWiseCoverageTable = ({
  columnState,
  setCurrentGridRef,
  colDef,
  currentGridRef,
  selectedDate,
  startDate,
  endDate,
  setLoading,
  appliedFilters,
  childColDef,

  userPageSize,
  onSavePageSize,
  configLoaded

}: IDayWiseCoverageProps) => {

  // const extra = [
  //   {
  //       headerName: "Action",
  //       cellRenderer: () => <div>Hello</div>,
  //       position: 0
  //   }
  // ]
  const gridRef = useRef<any>(null);
  const [rowData, setRowData] = useState([]);
  const { mutateAsync: getData, isLoading: isGridLoading } = useGetDayWiseCoverageData();
  const [isDisabled, setIsDisabled]= useState<boolean>(true)
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui

  const [currentPage, setCurrentPage] = useState<number>(1);
const [totalRows, setTotalRows] = useState<number>(0);
// const [pageSize, setPageSize] = useState<number>(20); 

  const getGridData = async (pageNumber = 1,size = userPageSize) => {
    if (selectedDate) {
      const formattedFilters = formatFilterJSON(appliedFilters);
      
      const data = await getData({
        startDate: startDate,
        endDate: endDate,
        plannedReleaseDate: selectedDate,
        appliedFilters: formattedFilters,
        page: pageNumber, 
        page_size: size,
      });
      console.log("dataaaa",data.data.data.results);
      const convertToArray = !Array.isArray(data?.data?.data.results) ? [] : data?.data?.data.results;
      const count = data?.data?.data?.count || 0;
      setTotalRows(count);
      setCurrentPage(pageNumber);
      setRowData(convertToArray);
    }
  }

  
  const clearGridFilter = () =>{
    gridRef?.current?.api.setFilterModel(null);
      setIsDisabled(true);
}

  const CustomStatusPanel = () => {
          return (
              <GridFilterWrapper style={{marginTop:'15px'}}>
                  <TextBtn onClick={clearGridFilter} disabled={isDisabled} themeUi={theme_ui}>
                      Clear All Grid Filters
                  </TextBtn>  
              </GridFilterWrapper>           
          );
      };
      

 useEffect(() => {
    // Only fetch if config is loaded to avoid fetching with default 20 then switching to saved 50
    if(configLoaded){ 
        getGridData(1, userPageSize); 
    }
  }, [selectedDate, appliedFilters, configLoaded]);

  useEffect(() => {
    setLoading(isGridLoading)
  }, [isGridLoading])

 const handlePageChange = (pageNumber: number) => {
     setCurrentPage(pageNumber);
     getGridData(pageNumber, userPageSize);
  };

const handlePageSizeChange = (newSize: any) => {
    onSavePageSize(newSize); // Update parent and save to backend
    setCurrentPage(1); // Reset to page 1
    getGridData(1, newSize); // Fetch new data
  };
  



  const options: GridOptions<any> = useMemo(() => ({
    getRowStyle: (params: any) => ({
      background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7",
    }),
    columnDefs: colDef,
    defaultColDef: {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      cellStyle: {
        display: "flex",
      }
    },
    autoGroupColumnDef: {
      headerName: "Group",
      cellRenderer: CustomGroupCellRenderer,
      suppressMenu: true,
      initialWidth: 260,
    },
    masterDetail: true,
    detailRowAutoHeight: true,
    sideBar: {
      toolPanels: ["columns"],
    },
  }), [colDef, childColDef]);

  useEffect(()=>{ 
    if (columnState?.length && colDef.length > 0) {
        const result = currentGridRef?.current?.api.applyColumnState({
            state: columnState,
            applyOrder: true
        });
        if (!result) {
            console.error('Failed to apply column state');
        }
    }
  },[columnState,currentGridRef]);

  const cell: (text: string, styleId?: string) => ExcelCell = (
    text: string,
    styleId?: string,
  ) => {
    return {
      styleId: styleId,
      data: {
        type: /^\d+$/.test(text) ? "Number" : "String",
        value: String(text),
      },
    };
  };


  // const getRows = (params: ProcessRowGroupForExportParams) => {
  //   const childData = params?.node?.data?.children;
  
  //   if (!childData || !childData.length) return [];
  
  //   const childColDefHeaders: string[] = [];
  //   childColDef.forEach((col: any) => {
  //     if (col?.headerName) {
  //       childColDefHeaders.push(col.headerName);
  //     }
  //   });
  
  //   const rows = [
  //     {
  //       outlineLevel: 2,
  //       cells: [
  //         cell(""),
  //         ...childColDefHeaders.map((col) => cell(col, "header")),
  //       ],
  //     },
  //     ...childData.map((data: any) => ({
  //       outlineLevel: 2,
  //       cells: [
  //         cell(""),
  //         ...childColDef.map((col: any) => cell(data[col.field], "data")),
  //       ],
  //     })),
  //   ];
  
  //   return rows;
  // };
  

  // const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
  //   return {
  //     getCustomContentBelowRow: (params) => getRows(params) as ExcelRow[],
  //     columnWidth: 120,
  //     fileName: "ag-grid.xlsx",
  //   };
  // }, [gridRef.current, childColDef, rowData]);

  return (
    <>
     <TableWrapper>
    <VFTable
      ref={gridRef}   
      animateRows={true}
      gridOptions={options}
      height={"400px"}
      disableZoomScaling={true}
      columnDefs={options.columnDefs}
      rowData={rowData}
      // pagination={true}
      detailCellRenderer={DayWiseCoverageDetailsCellRenderer}
      detailCellRendererParams={ {  
        colDef : childColDef,
        innerHeight: 400,
      }}
      onGridReady={(params: any) => {
        params.api.autoSizeAllColumns();
        setCurrentGridRef(gridRef);
      }}
      // defaultExcelExportParams={defaultExcelExportParams}  
      maintainColumnOrder={true}    
       groupLockGroupColumns={1}

      />

     <VFPagination
      key="day-wise-pagination"
      resetGridRef={gridRef}
      isDisabled={isDisabled} 
      selectedRows={0}
      rowsPerPage={userPageSize}
      totalRows={totalRows}
      currentPage={currentPage}
      handleChangePage={handlePageChange}
      customPageSizeEnabled={true}
      savePageSize={handlePageSizeChange}
    />
      </TableWrapper>


    </>

  );
};

export default DayWiseCoverageTable;
