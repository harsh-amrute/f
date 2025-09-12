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
import { Tooltip } from 'react-tooltip';
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import LoadingSpinner from "../LoadingSpinner";

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
  
  const { mutateAsync: usePutDeleteUser, isLoading: isDeleting } = UsePutDeleteUser();
  const { mutateAsync: mutateChangeStatus } = useChangeStatus();
  const { mutateAsync: mutateResetPwd, isLoading: isResettingPwd } = useResetPwd();

  
  const isLoading = isDeleting  || isResettingPwd;


  const changeStatus = (id: number, status: boolean) => {
    const data = {
      user_id: id,
      is_active: status,
    };
  
    mutateChangeStatus(data, {
      onSuccess: (res: any) => {
        if (res?.status === 400) {
          notifyError(res?.response?.msg);
        } else {
          notifySuccess(res?.data?.msg);
          const userIndex = dataAllUsers.findIndex((u: any) => u.id === id);
          if (userIndex !== -1) dataAllUsers[userIndex].is_active = status;
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

  const actionToggle = ({ item }: any) => {
    
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

  const buttonToggle = (item: any, is_admin: any) => {
    const permissionUser = item.role_id.map((item: any) => item.name);
    
    if (is_admin) {
      if (item.is_admin) {
        return <NoAction />;
      } else {
        return <>{actionToggle({ item })}</>;
      }
    } else {
      if (permission?.includes("IST Admin") || permission?.includes("Admin")) {
        if (item.is_admin) {
          return <NoAction />;
        } else {
          if (permissionUser?.includes("IST Admin") || permissionUser?.includes("Admin")) {
            return <NoAction rolesMap={permissionUser} />;
          } else {
            return <>{actionToggle({ item })}</>;
          }
        }
      } else {
        return <NoAction />;
      }
    }
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
        <ListAction item={item} />
      </>
    );
  };

  const NoAction = ({ rolesMap }: any) => {
    return (
      <>
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
        flex: 1,
        filter: false,
        cellRenderer: (params: any) => {
            return renderAction(params.data, params.data.is_admin);
        },
      },
      {
        headerName: "Active",
        field: "active",
        flex: 1,
        filter: false,
        cellRenderer: (params: any) => {

            return buttonToggle(params.data, params.data.is_admin);

        },
      },
    ],
    [is_admin, permission]
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
     
     {isLoading && <LoadingSpinner/>}
    <VFTable
      rowData={rowData}
      columnDefs={columnDefs}
      domLayout="normal"
      rowHeight={45}
      pagination={false}
      height="450px"
      sideBar={false}
      getRowStyle={(params: any) => {
        if (params.node.rowIndex % 2 === 0) {
          return { background: "#F4F4F4" }; 
        }
        return { background: "#ffffff" }; 
      }}
    />
    {isOpenDelete && (
      <Modal
      fileJson=""
      modalTitle="Do you want to delete this user?"
      modalContent="This user will not be able to log back into the system after being deleted"
      openModal={isOpenDelete}
      closeModal={() => setIsOpenDelete(false)}
      onClickModal={handleDeleteUser}
      text="Delete"
    />
    )}

    </>
  );
};

export default TableUserManagement;
