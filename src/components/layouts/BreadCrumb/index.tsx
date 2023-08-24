import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context";

const BreadCrumb = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  
  if (location.pathname === "/manual-upload") {
    return <span> {t("breadCrumb.ist")} {">"} {t("header.manualUpload")}</span>;
  } else if (location.pathname === "/") {
    return <span> {t("breadCrumb.ist")} {">"} {t("header.pendingISTRequests")}</span>;
  } else if (location.pathname === "/ist-forced-closure") {
    return <span> {t("breadCrumb.ist")} {">"} {t("header.ISTForcedClosure")}</span>;
  } else if (location.pathname === "/ist-status") {
    return <span> {t("breadCrumb.ist")} {">"} {t("header.ISTStatus")}</span>;
  } else if (location.pathname === "/store-status") {
    return <span> {t("breadCrumb.ist")} {">"} {t("header.storeStatus")}</span>;
  } else if (location.pathname === "/profile") {
    if (
      user.user.is_admin ||
      user?.roles?.permission?.includes("IST Admin")
    ) {
      return <span> {t("breadCrumb.um")} {">"} {t("header.administration")}</span>;
    } else {
      return <span> {t("breadCrumb.um")} {">"} {t("header.myProfile")}</span>;
    }
  } else if (location.pathname === "/availability-comparison") {
    return <span> {t("breadCrumb.ist")} {">"} {t("header.availabilityComparison")}</span>;
  } else {
    return <></>
  }
};

export default BreadCrumb