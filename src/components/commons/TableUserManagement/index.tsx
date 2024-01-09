import * as Tab from "./style";
import { ButtonOutlineStoreStatus, Modal } from "../../index";
import {
  UsePutDeleteUser,
  useChangeStatus,
  useResetPwd,
} from "../../../services/profile";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface TableUser {
  handleClickEdit: any;
  dataAllUsers: any;
  refetch: any;
  is_admin: boolean;
  permission: any;
}

const TableUserManagement = ({
  handleClickEdit,
  dataAllUsers,
  refetch,
  is_admin,
  permission,
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
      is_active: !status,
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
          onClick={() => {
            changeStatus(item.id, item.is_active);
          }}
        />
      </Tab.SCTableTdCenter>
    );
  };

  const ListAction = ({ item }: any) => {
    
    return (
      <Tab.SCTableTd>
        <Tab.SCIcon
          src="/assets/img/profile/icon_edit.svg"
          onClick={() => handleClickEdit(item)}
        />
        <Tab.SCIcon
          src="/assets/img/profile/icon_delete.svg"
          onClick={() => {
            handleOpenDelete(item.id);
          }}
        />
        <Tab.SCIcon
          src="/assets/img/profile/icon_lock.svg"
          onClick={() => {
            handleResetPwd(item.id);
          }}
        />
      </Tab.SCTableTd>
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

  return (
    <>
      <Tab.SCTableBox
        style={{ marginBottom: 30 }}
        className="list-roles-per--content"
      >
        <Tab.SCTableTab width="100%">
          <Tab.SCTableTbody>
            <Tab.SCTableTr>
              <Tab.SCTableTh>
                {t("profile.tabContent.manageUsers.table.userID")}
              </Tab.SCTableTh>
              <Tab.SCTableTh>
                {t("profile.tabContent.manageUsers.table.emailID")}
              </Tab.SCTableTh>
              <Tab.SCTableTh>
                {t("profile.tabContent.manageUsers.table.roles")}
              </Tab.SCTableTh>
              <Tab.SCTableTh>
                {t("profile.tabContent.manageUsers.table.actions")}
              </Tab.SCTableTh>
              <Tab.SCTableTh style={{ textAlign: "center" }}>
                {t("profile.tabContent.manageUsers.table.active")}
              </Tab.SCTableTh>
            </Tab.SCTableTr>
          </Tab.SCTableTbody>

          {dataAllUsers &&
            dataAllUsers?.map((item: any) => (
              <Tab.SCTableTbody key={item?.id}>
                <Tab.SCTableTrValue>
                  <Tab.SCTableTd>{item?.name}</Tab.SCTableTd>
                  <Tab.SCTableTd>{item?.email}</Tab.SCTableTd>
                  {renderAction(item, is_admin)}
                </Tab.SCTableTrValue>
              </Tab.SCTableTbody>
            ))}
        </Tab.SCTableTab>
      </Tab.SCTableBox>

      <Modal
        fileJson=""
        modalTitle={t("profile.tabContent.manageUsers.modal.titleDelete")}
        modalContent={t("profile.tabContent.manageUsers.modal.contentDelete")}
        openModal={isOpenDelete}
        closeModal={() => {
          setIsOpenDelete(false);
        }}
        onClickModal={() => {
          handleDeleteUser();
        }}
        text={t("profile.tabContent.manageUsers.button.delete")}
      />

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default TableUserManagement;
