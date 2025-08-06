import React, { useRef, useState } from "react";
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import { TableWrapper } from "../../../VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/RMPMOrderwiseCoverage/styles";
import { ColDef, FillOperationParams } from "ag-grid-enterprise";
import { AgGridReactProps } from "ag-grid-react";
import BulkUploadHeader from "./BulkUploadHeader";
import VFModalCard from "../../../components/VectorFLOW/commons/VFModalCard";
import {
  useGetAllPermissions,
  useGetAllRoles,
  usePostBulkUploadUsers,
} from "../../../services/profile";
import RoleSelectionModal from "./RoleSelectionModal";
import RoleViewCellRenderer from "./RoleViewCellRenderer";
import { GridRef } from "../../../VectorFlow/types/MDM";
import PermissionSelectionModal from "./PermissionSelectionModal";
import PermissionViewCellRenderer from "./PermissionViewCellRenderer";
import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import VFLoader from "../../../components/VectorFLOW/commons/VFLoader";

type Role = {
  id: number;
  name: string;
  application_name: string;
};

const PermissionSelectionPage = ({
  validUserData,
  themeUi,
}: {
  validUserData: any;
  themeUi: any;
}) => {
  const [isPermissionModalOpen, setIsPermissionModalOpen] =
    React.useState(false);
  const [isPermissionModalOpenForRow, setIsPermissionModalOpenForRow] =
    React.useState(false);

  const {mutateAsync: postPostBulkUploadUsers, isLoading} = usePostBulkUploadUsers();
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
    });
  };

  const updatePermissionsForSelected = (selectedPermissions: Set<string>) => {
    gridRef.current?.api.forEachNode((node: any) => {
      if (node.isSelected()) {
        const userData = node.data;
        userData.permissions = selectedPermissions;
        node.setData(userData);
      }
    });
  };

  const [rowIndex, setRowIndex] = useState<number | null>(0);

  const updatePermissionsForTheRow = (selectedPermissions: Set<string>) => {
    if(rowIndex === null || rowIndex === undefined) return;
    gridRef.current?.api.forEachNode((node: any) => {
      if (
        node.rowIndex === rowIndex
      ) {
        const userData = node.data;

        userData.permissions = selectedPermissions;
        node.setData(userData);
      }
    });
    setRowIndex(null);

  }

    useGetAllRoles((data: any) => {
      const dataAllRoles = data.data ? data.data : [];
      setListRoles(dataAllRoles);
    });

    const dataAllPermissions = dataPermissions?.data;


    const transformUserData=(inputUsers: any[])=> {
      const output: any = {
        users: [],
        permissions: {},
        roles: {}
      };
    
      let permIdCounter = 1;
    
      for (const user of inputUsers) {
        const currentPermId = permIdCounter++;
        const currentRoleId = currentPermId; // Linking role ID to perm ID (can be adjusted if needed)
    
        // Push to users array
        output.users.push({
          id: user.id,
          email: user.email,
          name: user.username,
          pwd: user.pwd,
          tc: true,
          rid: currentRoleId,
          perm_id: currentPermId
        });
    
        // Set roles
        const roleIds = [...user.roles]?.map((r: any) => r.id) || [];
        output.roles[currentRoleId] = { roles: roleIds };
    
        // Set permissions
        const userPerms:any = user.permissions || {};
        const formattedPerms:any = {
          location_permissions: [],
          product_permissions: []
        };
    
        for (const [appName, perms] of Object.entries(userPerms) as [string, any][]) {
          const application_id = getAppId(appName); // You can customize this mapping
          if (perms.location_permission) {
            formattedPerms.location_permissions.push({
              application_id,
              permissions: perms.location_permission.map((locPath: string[]) => {
                const obj: any = {};
                locPath.forEach((lvl, i) => {
                  obj[`location_heirarchy_${i + 1}`] = lvl;
                });
                return obj;
              })
            });
          }
    
          if (perms.product_permission) {
            formattedPerms.product_permissions.push({
              application_id,
              permissions: perms.product_permission.map((prodPath: string[]) => {
                const obj: any = {};
                prodPath.forEach((lvl, i) => {
                  obj[`product_hierarchy_${i + 1}`] = lvl;
                });
                return obj;
              })
            });
          }
        }
    
        output.permissions[currentPermId] = formattedPerms;
      }
    
      return output;
    }
    
    // Helper to assign application IDs (you can customize this)
    const getAppId=(appName: string)=> {
      const appMap: Record<string, number> = {
        Distribution: 2,
        Orders: 3
      };
      return appMap[appName] || 1;
    }
    

    const createUsers = ()=>{
      const userDataAll: string[] = [];
      gridRef &&  gridRef.current && gridRef?.current.api.forEachNode((node: any)=>{
        console.log("node", node);
        userDataAll.push(node.data)
        
      })
      console.log("userData", userDataAll);
      // return;
      try{
        const finalData = transformUserData(userDataAll);
        const response = postPostBulkUploadUsers({...finalData})
        console.log("response", response);
      }catch(e){
        console.error("Error updating roles for selected users", e);
      }
      console.log("userData", userDataAll);

    }

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
        suppressFillHandle: true,
      },
      {
        headerName: "Sr.No",
        field: "id",
        maxWidth: 80,
        suppressFillHandle: true,
      },
      { headerName: "Username", field: "username", suppressFillHandle: true },
      { headerName: "Email ID", field: "email", suppressFillHandle: true },
      { headerName: "Password", field: "pwd", suppressFillHandle: true },
      {
        headerName: "Role",
        field: "roles",
        cellRenderer: RoleViewCellRenderer,
        cellRendererParams: {
          allRoles: listRoles,
        },
      },
      {
        headerName: "Permissions",
        field: "permissions",
        cellRenderer: PermissionViewCellRenderer,
        cellRendererParams: {
          allPermissions: dataAllPermissions,
          setIsPermissionModalOpen: setIsPermissionModalOpenForRow,
          setRowIndex: setRowIndex
        },
      },
    ];
    const [isBulkActionEnabled, setIsBulkActionEnabled] = useState(false);

    console.log("ValidUserData", validUserData)

    const agGridProps: AgGridReactProps = {
      rowSelection: "multiple",
      enableFillHandle: true,
      defaultColDef: {
        flex: 1,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        suppressMenu: true,
        cellRendererParams: {
          roles: [],
        },
      },
      onSelectionChanged: (params) => {
        const selectedRows = params.api.getSelectedRows();
        setIsBulkActionEnabled(selectedRows.length > 0);
      },
      suppressRowClickSelection: true,
      pagination: true,
    };

    return (
      <TableWrapper style={{ paddingBottom: "50px" }}>
        { isLoading && <VFLoader/>}
        <BulkUploadHeader
          themeUi={themeUi}
          isBulkActionEnabled={isBulkActionEnabled}
          setIsPermissionModalOpen={setIsPermissionModalOpen}
          setIsRoleModalOpen={setIsRoleModalOpen}
        />
        <VFTable
          ref={gridRef}
          {...agGridProps}
          columnDefs={columnDefs}
          rowData={validUserData}
          tooltipHideDelay={100000}
          tooltipShowDelay={0}
          tooltipMouseTrack={true}
          enableFillHandle={
            true
          }
          fillHandleDirection={"y"}
          fillOperation={(params: FillOperationParams) => {
            if (params.column.getColId() === "roles") {
              params.api.forEachNode((node: any, index: number) => {
                if (params.rowNode.rowIndex === index) {
                  const userData = node.data;
                  userData.roles = params.initialValues[0];
                  node.setData(userData);
                }
              });
            }
            if(params.column.getColId() === 'permissions') {
              params.api.forEachNode((node: any, index: number) => {
                if (params.rowNode.rowIndex === index) {
                  const userData = node.data;
                  userData.permissions = params.initialValues[0];
                  node.setData(userData);
                }
              });
            }
          }}
          statusBar={{
            statusPanels: [
              { statusPanel: "agTotalRowCountComponent", align: "left" },
            ],
          }}
          maintainColumnOrder
        />
        <div style={{display: 'flex', width:'100%', justifyContent:'flex-end'}}>
          <VFButton onClick={()=>{createUsers()}} themeUi={themeUi}>
            Create Users
          </VFButton>
        </div>
        {
          <VFModalCard
            openModal={isPermissionModalOpen}
            headerIcon={"/assets/img/profile/icon_upload.svg"}
            closeModal={() => {
              setIsPermissionModalOpen(false);
            }}
          >
            {/* <PermissionHeirarchyCanvas  allPermissions={dataAllPermissions}/> */}
            <PermissionSelectionModal
              dataAllPermissions={dataAllPermissions}
              updatePermissions={updatePermissionsForSelected}
              closeModal={() => {
                setIsPermissionModalOpen(false);
              }}
            />
          </VFModalCard>
        }
        {
          <VFModalCard
            openModal={isPermissionModalOpenForRow}
            headerIcon={"/assets/img/profile/icon_upload.svg"}
            closeModal={() => {
              setIsPermissionModalOpenForRow(false);
            }}
          >
            {/* <PermissionHeirarchyCanvas  allPermissions={dataAllPermissions}/> */}
            <PermissionSelectionModal
              dataAllPermissions={dataAllPermissions}
              updatePermissions={(selectedPermissions:any)=>{updatePermissionsForTheRow(selectedPermissions)}}
              closeModal={() => {
                setIsPermissionModalOpenForRow(false);
              }}
            />
          </VFModalCard>
        }
        {
          <VFModalCard
            headerText={"Select User Roles"}
            openModal={isRoleModalOpen}
            headerIcon={"/assets/img/profile/icon_upload.svg"}
            closeModal={() => {
              setIsRoleModalOpen(false);
            }}
          >
            <RoleSelectionModal
              listRoles={listRoles}
              updateRoles={updateRolesForSelected}
              closeModal={() => {
                setIsRoleModalOpen(false);
              }}
            />
          </VFModalCard>
        }
      </TableWrapper>
    );
  };
export default PermissionSelectionPage;
