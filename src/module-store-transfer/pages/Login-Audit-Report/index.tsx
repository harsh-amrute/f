import React, { useEffect, useRef, useState } from "react";
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import MTOActionToolBar from "../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { GridFilterWrapper, TextBtn } from "../../../VectorFlow/Pages/MTO/Common/VFPagination/styles";
import { useUserData } from "../../../context";
import { useLoginAuditReport } from "../../../VectorFlow/Services/MTO/Login-Audit-Report";
import OverlayLoader from "../../../VectorFlow/Pages/MTO/Common/Loader";

const AuditReport = () => {
  const { mutateAsync: getLoginAuditReport, isLoading } = useLoginAuditReport();
  const gridRef = useRef<any>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;

  const [rowData, setRowData] = useState([]);

  const getLoginDetails = async () => {
    try {
      const response = await getLoginAuditReport();
      console.log("Login Audit Report Data:", response.data);
      
   
      setRowData(response.data.data); 
    } catch (error) {
      console.error("Failed to fetch audit report:", error);
    }
  };

  useEffect(() => {
    getLoginDetails();
  }, []); 

  const [columnDefs] = useState<any>([
    {
      headerName: "Username",
      field: "username", // Matches API
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Status",
      field: "status", 
      sortable: true,
      flex: 1,
    },
    {
        headerName: "Last Login Date",
        field: "last_login",
        sortable: true,
        flex: 1,
        filter: "agDateColumnFilter",
        
        filterParams: {
            comparator: function(filterDate:any, cellValue:any) {
              if (cellValue == null) {
                return 0;
              }
              
              const parts = cellValue.split('-');
              const month = Number(parts[0]) - 1; 
              const day = Number(parts[1]);     
               const year = Number(parts[2]);    
              
              const cellDate = new Date(year, month, day);
    
              if (cellDate < filterDate) {
                return -1;
              } else if (cellDate > filterDate) {
                return 1;
              }
              return 0;
            }
          }
      },
    {
      headerName: "Days Since Last Login",
      field: "days_since_last_login", 
      sortable: true,
      flex: 1,
      filter: "agNumberColumnFilter",
    },
  ]);

  

  const ExcelExport = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '-');
    gridRef.current?.api?.exportDataAsExcel({
      fileName: `Login_Audit_Report_${formattedDate}.xlsx`,
    });
  };

  const clearGridFilter = () => {
    gridRef?.current?.api.setFilterModel(null);
    setIsDisabled(true);
  };

  const CustomStatusPanel = () => {
    return (
      <GridFilterWrapper style={{ marginTop: '15px' }}>
        <TextBtn onClick={clearGridFilter} disabled={isDisabled} themeUi={theme_ui}>
          Clear All Grid Filters
        </TextBtn>
      </GridFilterWrapper>
    );
  };

  return (
    <>
    {isLoading && <OverlayLoader/>}
      <MTOActionToolBar
        isExcelExport
        onExcelExportClick={ExcelExport}
      />
      <VFTable
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        height="500px"
        sideBar={false}
        style={{ marginTop: '10px' }}
        statusBar={{
          statusPanels: [
            { statusPanel: CustomStatusPanel, align: "left" },
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'right' },
          ],
        }}
        onGridReady={(params: any) => {
            params.api.addEventListener('filterChanged', () => {
                const filterModel = params.api.getFilterModel();
                if (Object.keys(filterModel).length > 0) {
                    setIsDisabled(false);
                } else {
                    setIsDisabled(true);
                }
            });
            
        }}
      />
    </>
  );
};

export default AuditReport;