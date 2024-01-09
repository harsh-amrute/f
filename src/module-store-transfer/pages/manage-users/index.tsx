import { useRef, useState } from "react";
import {
  SCProfileOverView,
  SCSubTitleBox,
  SCSubTitlePad,
  SCSubTitleSpan,
  SCSubTitlePadItem,
  SCItemBtn,
} from "./styles";
import {
  ButtonFloat,
  ButtonOutlineIcon,
  TableUserManagement,
  ModalManageUsers,
  ModalAdvanedPermissions,
} from "../../../components/index";
import {
  useGetAllRoles,
  useGetAllUsers,
  useGetAllPermissions,
} from "../../../services/profile";
import Spinner from "../../../components/commons/Spinner";
import { useTranslation } from "react-i18next";
// import { dataListRoles } from "./listRoles";
import { generateRolesObject } from '../../../helpers/utils';

const ManageUsers = ({ is_admin, permission, themeUi }: any) => {
  const { t } = useTranslation();
  const [contentModal, setContentModal] = useState({
    callApi: 0,
    title: "",
    buttonSubmit: "",
  });

  const [listRoles, setListRoles] = useState<any>([]);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenAdvanced, setIsOpenAdvanced] = useState(false);
  const [infoUser, setInfoUser] = useState<any>({
    name: "",
    email: "",
    roles: [],
  });

  const [valueSelect, setvalueSelect] = useState<any>();

  const prdPermissionRef = useRef<any>();
  const lcPermissionRef = useRef<any>();

  const { data: dataFetch, refetch, isFetching } = useGetAllUsers();
  const { data: dataPermissions } = useGetAllPermissions();

  useGetAllRoles((data:any)=>{
    const dataAllRoles = data.data ? generateRolesObject(data.data,permission,is_admin) : [];
    setListRoles(dataAllRoles);
  });

  const dataAllPermissions = dataPermissions?.data;

  const dataAllUsers = dataFetch?.data;

  const handleClickAddNewUser = () => {
    setvalueSelect({});
    setInfoUser({
      name: "",
      email: "",
      roles: [],
    });
    setContentModal({
      callApi: 1,
      title: t("profile.tabContent.manageUsers.modal.addNewTitle"),
      buttonSubmit: "Add User",
    });
    setIsOpenUser(true);
  };

  const onCloseModal = () => {
    setIsOpenUser(false);
  };

  const onCloseModalAdvanced = () => {
    setIsOpenAdvanced(false);
  };

  const getPermission = ({ data, txtParent, txtChild, txtGrandChild }: any) => {
    const parent: any = [];
    const child: any = [];
    const grandChild: any = [];
    const checkAddParent: any = [];
    const checkAddChild: any = [];
    const checkAddGrandChild: any = [];

    data.forEach((item: any) => {
      const valueParent = item[txtParent];
      const valueChild = `${valueParent} > ${item[txtChild]}`;
      const valueGrandChild = `${valueChild} > ${item[txtGrandChild]}`;

      if (!checkAddParent.includes(valueParent)) {
        checkAddParent.push(valueParent);
        parent.push({ label: valueParent, value: valueParent });
      }

      if (!checkAddChild.includes(valueChild)) {
        checkAddChild.push(valueChild);
        child.push({ label: valueChild, value: valueChild });
      }

      if (!checkAddGrandChild.includes(valueGrandChild)) {
        checkAddGrandChild.push(valueGrandChild);
        grandChild.push({ label: valueGrandChild, value: valueGrandChild });
      }
    });

    return {
      parent,
      child,
      grandChild,
      checkAddParent,
      checkAddChild,
      checkAddGrandChild,
    };
  };

  const handleClickEdit = (item: any) => {
    const getProductPermissions = getPermission({
      data: item.product_id,
      txtParent: "product_hierarchy_1",
      txtChild: "product_hierarchy_2",
      txtGrandChild: "product_hierarchy_3",
    });

    const getLocationPermissions = getPermission({
      data: item.location_id,
      txtParent: "wh_region",
      txtChild: "wh_type",
      txtGrandChild: "wh_location_group",
    });

    const productPermission = {
      brand: getProductPermissions.parent,
      sub_brand: getProductPermissions.child,
      category: getProductPermissions.grandChild,
      checkAddBrand: getProductPermissions.checkAddParent,
      checkAddSubBrand: getProductPermissions.checkAddChild,
      checkAddCategory: getProductPermissions.checkAddGrandChild,
    };

    const locationPermission = {
      lcRegion: getLocationPermissions.parent,
      lcType: getLocationPermissions.child,
      lcCluster: getLocationPermissions.grandChild,
      checkAddLcRegion: getLocationPermissions.checkAddParent,
      checkAddLcType: getLocationPermissions.checkAddChild,
      checkAddLcCluster: getLocationPermissions.checkAddGrandChild,
    };

    setvalueSelect({
      productPermission,
      locationPermission,
    });

    const roles = item.role_id.map((role: any) => role.id);

    setInfoUser({
      id: item.id,
      name: item.name,
      email: item.email,
      roles: roles,
    });

    setContentModal({
      callApi: 2,
      title: t("profile.tabContent.manageUsers.modal.editUserTitle"),
      buttonSubmit: "Update User",
    });
    setIsOpenUser(true);
  };

  return (
    <>
      <SCProfileOverView>
        <SCSubTitleBox>
          <SCSubTitlePad>
            <SCSubTitleSpan>
              {t("profile.tabContent.manageUsers.title")}
            </SCSubTitleSpan>
            <SCSubTitlePadItem>
              <SCItemBtn>
                <ButtonFloat
                  text={t("profile.tabContent.manageUsers.button.addNewUser")}
                  onClick={handleClickAddNewUser}
                  icon="/assets/img/profile/icon_plus.svg"
                />
              </SCItemBtn>
              <SCItemBtn>
                <ButtonOutlineIcon
                  text={t("profile.tabContent.manageUsers.button.bulkUpload")}
                  icon={`/assets/img/profile/${
                    themeUi === "REGALBLAZE"
                      ? "icon_upload_yellow"
                      : "icon_upload"
                  }.svg`}
                  disabled={true}
                />
              </SCItemBtn>
            </SCSubTitlePadItem>
          </SCSubTitlePad>
        </SCSubTitleBox>

        {isFetching ? (
          <Spinner />
        ) : (
          <TableUserManagement
            dataAllUsers={dataAllUsers}
            handleClickEdit={handleClickEdit}
            refetch={refetch}
            is_admin={is_admin}
            permission={permission}
          />
        )}
      </SCProfileOverView>

      <ModalManageUsers
        contentModal={contentModal}
        openModal={isOpenUser}
        closeModal={onCloseModal}
        setIsOpenAdvanced={setIsOpenAdvanced}
        infoUser={infoUser}
        setInfoUser={setInfoUser}
        listRoles={listRoles}
        setListRoles={setListRoles}
      />

      <ModalAdvanedPermissions
        contentModal={contentModal}
        openModal={isOpenAdvanced}
        closeModal={onCloseModalAdvanced}
        setIsOpenUser={setIsOpenUser}
        setIsOpenAdvanced={setIsOpenAdvanced}
        prdPermissionRef={prdPermissionRef}
        lcPermissionRef={lcPermissionRef}
        infoUser={infoUser}
        refetch={refetch}
        dataAllPermissions={dataAllPermissions}
        valueSelect={valueSelect}
      />
    </>
  );
};

export default ManageUsers;
