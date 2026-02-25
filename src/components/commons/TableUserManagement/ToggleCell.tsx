import * as Tab from "./style.css";
import { ButtonOutlineStoreStatus } from "../../index";
import { useChangeStatus } from "../../../services/profile";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useTranslation } from "react-i18next";

const ToggleCell = (params: any) => {

  const { t } = useTranslation();
  const { mutateAsync: mutateChangeStatus } = useChangeStatus();
  const changeStatus = (status: any) => {
    const payload = {
      user_id: params.data.id,
      is_active: status,
    };
    params.api.applyTransaction({ update: [{ ...params.data, is_active: status }] });

    mutateChangeStatus(payload, {
      onSuccess: (res:any) => {
        if (res?.status === 400) {
          notifyError(res?.response?.msg);
          params.api.applyTransaction({ update: [{ ...params.data, is_active: !status }] });
        } else {
          notifySuccess(res?.data?.msg);
        }
      },
      onError: (error:any) => {
        console.error("error", error);
        notifyError(error.msg);
        params.api.applyTransaction({ update: [{ ...params.data, is_active: !status }] });
      },
    });
  };

  const permissionUser = params.data.role_id.map((item: any) => item.name);

  if (params.is_admin) {
    if (params.data.is_admin) {
      return null;
    }
  } else {
    if (
      (params.permission?.includes("IST Admin") || params.permission?.includes("Admin")) &&
      (permissionUser?.includes("IST Admin") || permissionUser?.includes("Admin"))
    ) {
      return null;
    }
  }



  return (
    <div className={Tab.tableTdCenter}>
      <ButtonOutlineStoreStatus
        labelOn={t("profile.tabContent.manageUsers.button.active")}
        labelOff={t("profile.tabContent.manageUsers.button.inactive")}
        toggled={params.data.is_active}
        onClick={changeStatus}
      />
    </div>
  );
};

export default ToggleCell;