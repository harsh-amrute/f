import * as Tab from "./style";
import { ButtonOutlineStoreStatus, Modal } from "../../index";
import {
  UsePutDeleteUser,
  useChangeStatus,
  useResetPwd,
} from "../../../services/profile";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Tooltip } from 'react-tooltip';
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import { filter } from "lodash";

interface TableUser {
  handleClickEdit: any;
  dataAllUsers: any;
  refetch: any;
  is_admin: boolean;
  permission: any;
  searchUserBasedOn: string
}

const TableUserManagement = ({
  handleClickEdit,
  dataAllUsers,
  refetch,
  is_admin,
  permission,
  searchUserBasedOn
}: TableUser) => {
  const { t } = useTranslation();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idUser, setIdUser] = useState<string>("");
  
  const { mutateAsync: usePutDeleteUser } = UsePutDeleteUser();
  const { mutateAsync: mutateChangeStatus } = useChangeStatus();
  const { mutateAsync: mutateResetPwd, isLoading } = useResetPwd();

  const changeStatus = (id: number, status: boolean) => {
    const data = {
      user_id: id,
      is_active: status,
    };

    mutateChangeStatus(data, {
      onSuccess: (res: any) => {
        if(res?.status === 400) {
          notifyError(res?.response?.msg)
        } else {
          notifySuccess(res?.data?.msg);
        }
      },
      onError: (error: any) => {
        console.log("error", error);
        notifyError(error.msg);
      },
    });
  };

  const handleDeleteUser = () => {
    setTimeout(() => {
      usePutDeleteUser(idUser, {
        onSuccess: (data: any) => {
          if(data?.status === 400) {
            notifyError(data?.response?.msg)
          } else {
            notifySuccess(data?.data?.msg);
          }
          setIsOpenDelete(false);
          refetch();
        },
        onError: (error: any) => {
          notifyError(error.response.msg || error.message);
          setIsOpenDelete(false);
        },
      });
    }, 200);
  };  

  const handleResetPwd = (id: string) => {
    mutateResetPwd(id, {
      onSuccess: (res: any) => {
        if(res?.status === 400) {
          notifyError(res?.response?.msg)
        } else {
          notifySuccess(res?.data?.msg);
        }
      },
      onError: (error: any) => {
        console.log("error", error);
        notifyError(error.msg);
      },
    });
  };

  const handleOpenDelete = (id: string) => {
    setIsOpenDelete(true);
    setIdUser(id);
  };

  const renderAction = (item: any, is_admin: any) => {
    const permissionUser = item.role_id.map((item: any) => item.name);
    
    if (is_admin) {
      if (item.is_admin) {
        return <NoAction rolesMap={permissionUser} />;
      } else {
        return <>{action({ item, permissionUser })}</>;
      }
    } else {
      if (permission?.includes("IST Admin") || permission?.includes("Admin")) {
        if (item.is_admin) {
          return <NoAction rolesMap={permissionUser} />;
        } else {
          if (permissionUser?.includes("IST Admin") || permissionUser?.includes("Admin")) {
            return <NoAction rolesMap={permissionUser} />;
          } else {
            return <>{action({ item, permissionUser })}</>;
          }
        }
      } else {
        return <NoAction rolesMap={permissionUser} />;
      }
    }
  };

  const buttonToggle = (item: any) => {
    return (
      <Tab.SCTableTdCenter>
        <ButtonOutlineStoreStatus
          labelOn={t("profile.tabContent.manageUsers.button.active")}
          labelOff={t("profile.tabContent.manageUsers.button.inactive")}
          toggled={item?.is_active}
          onClick={(param:any) => {
            changeStatus(item.id,param);
          }}
        />
      </Tab.SCTableTdCenter>
    );
  };

  const ListAction = ({ item }: any) => {
    
    return (
      <>
      <Tab.SCTableTd>
        <Tab.SCIconWrapper>
          <Tab.SCIcon
            data-tooltip-id="edit"
            src="/assets/img/profile/icon_edit.svg"
            onClick={() => handleClickEdit(item)}
          />
          <Tooltip
            id="edit"
            content={"Edit User"}
            place="top"
            className="user-manage-tooltip"
          />
        </Tab.SCIconWrapper>
        <Tab.SCIconWrapper>
          <Tab.SCIcon
            data-tooltip-id="delete"
            src="/assets/img/profile/icon_delete.svg"
            onClick={() => {
              handleOpenDelete(item.id);
            }}
          />
          <Tooltip id="delete" content={"Delete User"}  className="user-manage-tooltip"/>
        </Tab.SCIconWrapper>
        <Tab.SCIconWrapper>
          <Tab.SCIcon
            data-tooltip-id="reset"
            src="/assets/img/profile/icon_lock.svg"
            onClick={() => {
              handleResetPwd(item.id);
            }}
          />
          <Tooltip id="reset" content={"Reset Password"} className="user-manage-tooltip"/>
        </Tab.SCIconWrapper>
      </Tab.SCTableTd>
      </>
    );
  };

  const action = ({ item, permissionUser }: any) => {
    
    return (
      <>
        <Tab.SCTableTd>
          {permissionUser.toString().replace(/,/g, " | ")}
        </Tab.SCTableTd>
        <ListAction item={item} />
        {buttonToggle(item)}
      </>
    );
  };

  const NoAction = ({ rolesMap }: any) => {
    return (
      <>
        <Tab.SCTableTd>
          {rolesMap.toString().replace(/,/g, " | ")}
        </Tab.SCTableTd>
        <Tab.SCTableTd style={{ padding: "20px" }}></Tab.SCTableTd>
        <Tab.SCTableTdCenter></Tab.SCTableTdCenter>
      </>
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "User ID",
        field: "name",
        flex: 1,
      },
      {
        headerName: "Email ID",
        field: "email",
        flex: 1,
      },
      {
        headerName: "Roles",
        field: "role_id",
        flex: 1.5,
        cellRenderer: (params: any) => {
          const roles = params.value?.map((r: any) => r.name).join(" | ");
          return <span>{roles}</span>;
        },
      },
      {
        headerName: "Actions",
        field: "actions",
        height: 550,
        filter: false,
        cellRenderer: (params: any) => {
          const item = params.data;
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <img
                src="/assets/img/profile/icon_edit.svg"
                style={{ cursor: "pointer" }}
                data-tooltip-id="edit"
                onClick={() => handleClickEdit(item)}
              />
              <img
                src="/assets/img/profile/icon_delete.svg"
                style={{ cursor: "pointer" }}
                data-tooltip-id="delete"
                onClick={() => {
                  handleOpenDelete(item.id);
                }}
              />
              <img
                src="/assets/img/profile/icon_lock.svg"
                style={{ cursor: "pointer" }}
                data-tooltip-id="reset"
                onClick={() => {
                  handleResetPwd(item.id);
                }}
              />
            </div>
          );
        },
      },
      {
        headerName: "Active",
        field: "is_active",
        flex: 1,
        filter: false,
        
        cellRenderer: (params: any) => {
          const item = params.data;
          return (
            <ButtonOutlineStoreStatus
              labelOn="Active"
              labelOff="Inactive"
              toggled={item?.is_active}
              onClick={(val: boolean) => {
                changeStatus(item.id, val);
              }}
            />
          );
        },
      },
    ],
    [handleClickEdit]
  );

  const rowData = useMemo(() => {
    return (
      dataAllUsers?.filter((userData: any) =>
        userData.name
          ?.toLowerCase()
          .includes(searchUserBasedOn.toLowerCase())
      ) || []
    );
  }, [dataAllUsers, searchUserBasedOn]);

  return (
    <>
       <VFTable
      rowData={rowData}
      columnDefs={columnDefs}
      domLayout="normal"
      rowHeight={45}
      pagination={false}
      height="450px"    

    />
    </>
  );
};

export default TableUserManagement;
