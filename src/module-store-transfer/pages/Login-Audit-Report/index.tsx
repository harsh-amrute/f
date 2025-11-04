import React, { useRef, useState } from "react";
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import { ColDef } from "ag-grid-community"; // Import ColDef for type safety
import MTOActionToolBar from "../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { GridFilterWrapper, TextBtn } from "../../../VectorFlow/Pages/MTO/Common/VFPagination/styles";
import { useUserData } from "../../../context";
import { useLoginAuditReport } from "../../../VectorFlow/Services/MTO/Login-Audit-Report";

const AuditReport = () => {
    const gridRef = useRef<any>();  
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const { user } = useUserData();
    const theme_ui = user.user.theme_ui;
    
    const { data: dataa = [], isLoading, isError, error } = useLoginAuditReport();

    // Log the data (as you were)
    console.log("API RESPONSE DATA:", dataa);
    console.log("IS LOADING:", isLoading);
    console.log("IS ERROR:", isError);
    console.log("ERROR OBJECT:", error);
    

  const [columnDefs] = useState<ColDef[]>([
    { 
      headerName: "Username", 
      field: "username",
      sortable: true ,
      flex:1
    },
    { 
        headerName: "Status", 
        field: "status",
        sortable: true,
        flex:1,
      },
    { 
      headerName: "Last Login Date", 
      field: "lastLoginDate",
      sortable: true,
      flex:1,
      filter:"agDateColumnFilter",

    },
    { 
      headerName: "Days Since Last Login", 
      field: "daysSinceLastLogin",
      sortable: true,
      flex:1,
      filter:"agNumberColumnFilter"

    },
  ]);

  // 2. Define your dummy data
  const [rowData] = useState([

    
    
        { username: "jdoe", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "asmith", status: "inactive", lastLoginDate: "10/20/2025", daysSinceLastLogin: 15 },
        { username: "bwayne", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "ckent", status: "active", lastLoginDate: "11/01/2025", daysSinceLastLogin: 2 },
        { username: "dprince", status: "inactive", lastLoginDate: "10/25/2025", daysSinceLastLogin: 9 },
        { username: "ethomas", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "fgarcia", status: "active", lastLoginDate: "10/31/2025", daysSinceLastLogin: 4 },
        { username: "glopez", status: "inactive", lastLoginDate: "10/15/2025", daysSinceLastLogin: 18 },
        { username: "hhughes", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "ijones", status: "inactive", lastLoginDate: "10/12/2025", daysSinceLastLogin: 21 },
        { username: "kpatel", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "lwang", status: "inactive", lastLoginDate: "10/22/2025", daysSinceLastLogin: 12 },
        { username: "mmurphy", status: "active", lastLoginDate: "11/01/2025", daysSinceLastLogin: 2 },
        { username: "nroberts", status: "inactive", lastLoginDate: "10/17/2025", daysSinceLastLogin: 17 },
        { username: "opatel", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "pparker", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "qnguyen", status: "inactive", lastLoginDate: "10/18/2025", daysSinceLastLogin: 16 },
        { username: "rlee", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "sjohnson", status: "inactive", lastLoginDate: "10/10/2025", daysSinceLastLogin: 23 },
        { username: "tjackson", status: "active", lastLoginDate: "11/01/2025", daysSinceLastLogin: 2 },
        { username: "uwilson", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "vcarter", status: "inactive", lastLoginDate: "10/14/2025", daysSinceLastLogin: 19 },
        { username: "wbrown", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "xmartin", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "yyoung", status: "inactive", lastLoginDate: "10/21/2025", daysSinceLastLogin: 13 },
        { username: "zzimmer", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "ablake", status: "active", lastLoginDate: "11/01/2025", daysSinceLastLogin: 2 },
        { username: "bfernandez", status: "inactive", lastLoginDate: "10/16/2025", daysSinceLastLogin: 18 },
        { username: "ccruz", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "dwhite", status: "inactive", lastLoginDate: "10/11/2025", daysSinceLastLogin: 22 },
        { username: "egarcia", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "fwalker", status: "inactive", lastLoginDate: "10/19/2025", daysSinceLastLogin: 15 },
        { username: "gking", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "hmorris", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "ijames", status: "inactive", lastLoginDate: "10/13/2025", daysSinceLastLogin: 20 },
        { username: "jlopez", status: "active", lastLoginDate: "11/01/2025", daysSinceLastLogin: 2 },
        { username: "kbell", status: "inactive", lastLoginDate: "10/24/2025", daysSinceLastLogin: 10 },
        { username: "lsanchez", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "mgreen", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "nturner", status: "inactive", lastLoginDate: "10/15/2025", daysSinceLastLogin: 18 },
        { username: "oward", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "pallen", status: "inactive", lastLoginDate: "10/20/2025", daysSinceLastLogin: 15 },
        { username: "qhill", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 },
        { username: "rscott", status: "inactive", lastLoginDate: "10/23/2025", daysSinceLastLogin: 11 },
        { username: "tsanders", status: "active", lastLoginDate: "11/03/2025", daysSinceLastLogin: 0 },
        { username: "ujordan", status: "inactive", lastLoginDate: "10/14/2025", daysSinceLastLogin: 19 },
        { username: "vbrooks", status: "active", lastLoginDate: "11/01/2025", daysSinceLastLogin: 2 },
        { username: "wwatson", status: "inactive", lastLoginDate: "10/18/2025", daysSinceLastLogin: 16 },
        { username: "xross", status: "active", lastLoginDate: "11/04/2025", daysSinceLastLogin: 0 },
        { username: "yreed", status: "inactive", lastLoginDate: "10/17/2025", daysSinceLastLogin: 17 },
        { username: "zkelly", status: "active", lastLoginDate: "11/02/2025", daysSinceLastLogin: 1 }
      
       
      
      
  ]);

  const ExcelExport = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '-'); 
    // formats as DD-MM-YYYY
  
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
              { statusPanel: 'agTotalRowCountComponent', align: 'right' },
              { statusPanel: 'agFilteredRowCountComponent', align: 'right' },
              { statusPanel: 'agSelectedRowCountComponent', align: 'right' },
              { statusPanel: 'agAggregationComponent', align: 'right' },
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