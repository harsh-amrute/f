import React, { useRef, useState } from "react";
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import { TableWrapper } from "../../../VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/RMPMOrderwiseCoverage/styles";
import { ColDef, FillOperationParams } from "ag-grid-enterprise";
import { AgGridReactProps } from "ag-grid-react";
import BulkUploadHeader from "./BulkUploadHeader";
import CustomDropdown from "../../../components/commons/CustomDropdown";
import PermissionHeirarchyCanvas from "../manage-users/PermissioinHeirarchyCanvas";
import VFModalCard from "../../../components/VectorFLOW/commons/VFModalCard";
import { useGetAllPermissions, useGetAllRoles } from "../../../services/profile";
import RoleSelectionModal from "./RoleSelectionModal";
import { generateRolesObject } from "../../../helpers/utils";
import RoleViewCellRenderer from "./RoleViewCellRenderer";
import { GridRef } from "../../../VectorFlow/types/MDM";
import PermissionSelectionModal from "./PermissionSelectionModal";
import PermissionViewCellRenderer from "./PermissionViewCellRenderer";

type Role = {
  id: number;
  name: string;
  application_name: string;
};


const PermissionSelectionPage = ({ validUserData, setValidUserData , themeUi}: {validUserData: any, setValidUserData: any, themeUi: any}) => {
  const [isPermissionModalOpen, setIsPermissionModalOpen] = React.useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const { data: dataPermissions } = useGetAllPermissions();
  const [listRoles, setListRoles] = useState<any>([]);
  const gridRef = useRef<GridRef>(null);

  const updateRolesForSelected = (selectedRoles: Set<Role>) => {

    gridRef.current?.api.forEachNode((node: any) => {
      if (node.isSelected()) {
        const userData = node.data;
        
        userData.roles = selectedRoles;
        node.setData(userData);
      }
    })
  }

  
  
    useGetAllRoles((data:any)=>{
      const dataAllRoles = data.data ? data.data : [];
      setListRoles(dataAllRoles);
    });

    
  const dataAllPermissions = dataPermissions?.data;

  console.log("dataAllPermissions", dataAllPermissions);
  
  const columnDefs: ColDef[] = [
    {
      headerName: "",
      field: "checkbox",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      maxWidth: 50,
      suppressFloatingFilterButton: true,
      filter: false,
      suppressFillHandle: true
    },
    { headerName: "Sr.No", field: "id",maxWidth: 80, suppressFillHandle: true},
    { headerName: "Username", field: "username" , suppressFillHandle: true},
    { headerName: "Email ID", field: "email" , suppressFillHandle: true},
    { headerName: "Password", field: "pwd" , suppressFillHandle: true},
    { headerName: "Role", field: "roles", cellRenderer: RoleViewCellRenderer, cellRendererParams: {
      allRoles: listRoles
    }},
    { headerName: "Permissions", field: "permissions",cellRenderer: PermissionViewCellRenderer,
      cellRendererParams: {
        allPermissions: dataAllPermissions,
      }
    },
  ];
  const [isBulkActionEnabled, setIsBulkActionEnabled] = useState(false);

  const agGridProps: AgGridReactProps ={
    rowSelection: 'multiple',
    enableFillHandle: true,
    defaultColDef: {
        flex: 1,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        suppressMenu: true,
        cellRendererParams: {
          roles: []
        }
    },
    onSelectionChanged: (params) => {
      const selectedRows = params.api.getSelectedRows();
      setIsBulkActionEnabled(selectedRows.length > 0);
    },
    suppressRowClickSelection: true,
    pagination: true
  }


  return (
    <TableWrapper style={{paddingBottom: '50px'}}>
    <BulkUploadHeader themeUi={themeUi} isBulkActionEnabled={isBulkActionEnabled} setIsPermissionModalOpen={setIsPermissionModalOpen} setIsRoleModalOpen={setIsRoleModalOpen}/>
    <VFTable
        ref={gridRef}
        {...agGridProps}
        columnDefs={columnDefs}
        rowData={validUserData}
        tooltipHideDelay={100000}
        tooltipShowDelay={0}
        tooltipMouseTrack={true}
        cellSelection={
          {handle: {mode: "fill",setFillValue: (params: FillOperationParams)=>{
            if(params.column.getColId()==="roles"){

              params.api.forEachNode((node: any, index:number) => {
                if(params.rowNode.rowIndex===index){
                  const userData = node.data;
                  userData.roles = params.initialValues[0];
                  node.setData(userData);
                }
              }
            )
          }
          }}}
        }
        
        statusBar={{
            statusPanels: [
                { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            ]
        }}
        maintainColumnOrder
    />
    {
      <VFModalCard
      openModal={isPermissionModalOpen}
      headerIcon={"/assets/img/profile/icon_upload.svg"}
      closeModal={()=>{setIsPermissionModalOpen(false)}}>
   {/* <PermissionHeirarchyCanvas  allPermissions={dataAllPermissions}/> */}
      <PermissionSelectionModal dataAllPermissions={dataAllPermissions}/>

    </VFModalCard>
    }
    {
      <VFModalCard
      headerText={"Select User Roles"}
      openModal={isRoleModalOpen}
      headerIcon={"/assets/img/profile/icon_upload.svg"}
      closeModal={()=>{setIsRoleModalOpen(false)}}>
        <RoleSelectionModal listRoles={listRoles} updateRoles={updateRolesForSelected} closeModal={()=>{setIsRoleModalOpen(false)}} />

    </VFModalCard>
    }
   
</TableWrapper>
  );
};

export default PermissionSelectionPage;
