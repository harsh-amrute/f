import React, { useEffect, useRef, useState } from "react";
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import { TableWrapper } from "../../../VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/RMPMOrderwiseCoverage/styles";
import { CellStyle, ColDef, FillOperationParams, RowStyle } from "ag-grid-enterprise";
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
import OverlayLoader from "../../../VectorFlow/Pages/MTO/Common/Loader";
import { SCGoBackContainer, SCGoBackText } from "../../../components/VectorFLOW/commons/MTO/ActionToolBar/styles";

type Role = {
  id: number;
  name: string;
  application_name: string;
};

const PermissionSelectionPage = ({
  validUserData,
  themeUi,
  setValidUsersData,
  setIsAssignPage
}: {
  validUserData: any;
  setValidUsersData: any
  themeUi: any;
  setIsAssignPage: any
}) => {

  const [isFinalView, setIsFinalView] = useState(false);
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
        const currentRoleId = currentPermId;// Linking role ID to perm ID (can be adjusted if needed)
    
        // Push to users array 
        output.users.push({
          id: user.id || "",
          email: user.email || "",
          name: user.username || "",
          pwd: user.pwd || "",
          tc: true,
          rid: currentRoleId,
          perm_id: currentPermId
        });
    
        // Set roles
        const roleIds = [...(user.roles || [])]?.map((r: any) => r.id || "") || [];
        output.roles[currentRoleId] = { roles: roleIds };
    
        // Set permissions
        const userPerms:any = user.permissions || {};
        const formattedPerms:any = {
          location_permissions: [],
          product_permissions: []
        };
    
        for (const [appName, perms] of Object.entries(userPerms) as [string, any][]) {
          const application_id = getAppId(appName); // You can customize this mapping
          if (perms?.location_permission) {
            formattedPerms.location_permissions.push({
              application_id,
              permissions: perms.location_permission.map((locPath: string[]) => {
                const obj: any = {};
                locPath.forEach((lvl, i) => {
                  obj[`location_heirarchy_${i + 1}`] = lvl || "";
                });
                return obj;
              })
            });
          }
    
          if (perms?.product_permission) {
            formattedPerms.product_permissions.push({
              application_id,
              permissions: perms.product_permission.map((prodPath: string[]) => {
                const obj: any = {};
                prodPath.forEach((lvl, i) => {
                  obj[`product_hierarchy_${i + 1}`] = lvl || "";
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


    const [errorRes, setErrorRes] = useState(0);

    const createUsers = async()=>{
      const userDataAll: string[] = [];
      gridRef &&  gridRef.current && gridRef?.current.api.forEachNode((node: any)=>{
        userDataAll.push(node.data);
        
      })
      // return;
      try{
        const finalData = transformUserData(userDataAll);
        const response = await postPostBulkUploadUsers({...finalData})
        if(response.status===200){
          // setIsFinalView(true);
          const errorUserData = response?.data?.failed_users || [];
          const updatedUserData:any = userDataAll;
          errorUserData.forEach((ele:any)=>{
            const index = updatedUserData.findIndex((user:any)=>user.id === ele.id);
            if(index !== -1){
              updatedUserData[index].error = ele.error;
            }
          })
          setErrorRes(errorUserData.length);
          setIsFinalView(true);
          setValidUsersData(validUserData)
        }
        else{
          setIsFinalView(false);
          console.error("Failed to register Users! Please try again!", response);
        }
        
      }catch(e){
        console.error("Error updating roles for selected users", e);
      }

    }


    const columnDefs: ColDef[] = [
      {
        headerName: isFinalView?"Error":"",
        field: isFinalView?"error":"checkbox",
        checkboxSelection: isFinalView?false:true,
        headerCheckboxSelection: isFinalView?false:true,
        initialWidth: isFinalView?200: 50,
        maxWidth: isFinalView? 200: 50,
        pinned: isFinalView?'left':undefined,
        suppressFloatingFilterButton: true,
        filter: false,
        valueFormatter: (params) => {
          if (isFinalView) {
            if (!params.value){
              return "";
            }
            else{
              let error  = "";
              params.value.forEach((ele:string)=>{
                error+= ele;
              })
              return error;
            }
          }
          return "";
        },
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
        cellRenderer: isFinalView?()=>{return <VFButton onClick={()=>{return;}}  disabled={true}
        style={{ width: "90px", height: "25px", fontSize: "1rem" }}
        themeUi={themeUi} >Edit Role</VFButton>}: RoleViewCellRenderer,
        cellRendererParams: {
          allRoles: listRoles,
        },
        cellStyle: (props:any)=>{
          if (isFinalView && props.data.error) {
            return { cursor: "not-allowed"  }as CellStyle;
          }
          else if(isFinalView){
            return { cursor: "not-allowed" } as CellStyle;
          }
          return {};
        }
      },
      {
        headerName: "Permissions",
        field: "permissions",
        cellRenderer:isFinalView?()=>{return <VFButton onClick={()=>{return;}}  disabled={true}
        style={{ width: "120px", height: "25px", fontSize: "1rem" }}
        themeUi={themeUi} >Edit Permission</VFButton>}: PermissionViewCellRenderer,
        cellRendererParams: {
          allPermissions: dataAllPermissions,
          setIsPermissionModalOpen: setIsPermissionModalOpenForRow,
          setRowIndex: setRowIndex
        },
      },
    ];

    const [isBulkActionEnabled, setIsBulkActionEnabled] = useState(false);

    const agGridProps: AgGridReactProps = {
      rowSelection: "multiple",
    
      getRowStyle: (params)=>{
        if (isFinalView && params.data.error) {
          return { backgroundColor: "rgb(242, 75, 75,0.3)",  } as RowStyle;
        }
        else if(isFinalView){
          return { backgroundColor: "rgb(103, 242, 75,0.4)", } as RowStyle;
        }
    
      },
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
        {isLoading && <OverlayLoader message="Creating Users..." />}
        {!isFinalView && (
          <BulkUploadHeader
            gridRef={gridRef}
            themeUi={themeUi}
            isBulkActionEnabled={isBulkActionEnabled}
            setIsPermissionModalOpen={setIsPermissionModalOpen}
            setIsRoleModalOpen={setIsRoleModalOpen}
            resetState={() => {
              setIsFinalView(false);
              setIsAssignPage(false);
            }}
          />
        )}
        {isFinalView && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <SCGoBackContainer
                  style={{ paddingLeft: "10px" }}
                  onClick={() => {
                    setIsFinalView(false);
                    setIsAssignPage(false);
                  }}
                >
                  <img
                    src="/assets/img/VectorFLOW/BPR/goback.svg"
                    alt=""
                    style={{ height: "20px" }}
                  />
                  <SCGoBackText style={{ fontSize: "1.5rem" }}>
                    <b>Reupload</b>
                  </SCGoBackText>
                </SCGoBackContainer>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <VFButton
                  disabled={false}
                  style={{ width: "100px", height: "35px", fontSize: "1rem" }}
                  themeUi={themeUi}
                  onClick={() => {
                    gridRef.current?.api.exportDataAsExcel({
                      fileName: "UserData.xlsx",
                      sheetName: "User Data",
                      columnKeys: ["id", "username", "email", "pwd"],
                    });
                  }}
                >
                  {"Export"}
                </VFButton>
              </div>
            </div>

            <div
              style={{
                fontSize: "1.4rem",
                padding: "34px 0 8px 20px",
                fontWeight: "bold",
              }}
            >
              {errorRes
                ? "* " + errorRes + " of the following users failed to created."
                : "All users created successfully!"}
            </div>
          </div>
        )}
        <VFTable
          ref={gridRef}
          {...agGridProps}
          columnDefs={columnDefs}
          rowData={validUserData}
          tooltipHideDelay={100000}
          tooltipShowDelay={0}
          tooltipMouseTrack={true}
          enableFillHandle={true}
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
            if (params.column.getColId() === "permissions") {
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
        {!isFinalView && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: "1.2rem",
            }}
          >
            <VFButton
              style={{ height: "3.5rem", fontSize: "1.2rem" }}
              onClick={() => {
                createUsers();
              }}
              themeUi={themeUi}
            >
              Create Users
            </VFButton>
          </div>
        )}
        {
          <VFModalCard
            openModal={isPermissionModalOpen}
            headerIcon={"/assets/img/profile/icon_upload.svg"}
            closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
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
            closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
            closeModal={() => {
              setIsPermissionModalOpenForRow(false);
            }}
          >
            {/* <PermissionHeirarchyCanvas  allPermissions={dataAllPermissions}/> */}
            <PermissionSelectionModal
              selectedIndex={rowIndex}
              gridRef={gridRef}
              dataAllPermissions={dataAllPermissions}
              updatePermissions={(selectedPermissions: any) => {
                updatePermissionsForTheRow(selectedPermissions);
              }}
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
            closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
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
