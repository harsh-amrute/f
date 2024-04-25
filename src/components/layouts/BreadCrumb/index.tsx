import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context";

const BreadCrumb = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  if(location.pathname ==='/master-data-management/control-panel')return <span>MDM {">"} Control Panel</span>
  if(location.pathname ==='/master-data-management/view-modify')return <span>MDM {">"} View / Modify</span>
  if(location.pathname ==='/master-data-management/saved-drafts')return <span>MDM {">"} Saved Drafts</span>
  if(location.pathname ==='/master-data-management/task-status')return <span>MDM {">"} Task Status</span>
  if(location.pathname ==='/master-data-management/task-pending')return <span>MDM {">"} Task Pending For Review</span>

  if(location.pathname ==='/supply-chain-intelligence-hub/planning')return <span>SCIH {">"} Planning</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/bpr')return <span>SCIH {">"} BPR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/rrr')return <span>SCIH {">"} RRR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/bor')return <span>SCIH {">"} BOR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/buffer-trend-report')return <span>SCIH {">"} BTR</span>

  if(location.pathname ==='/insights-and-trends/buffer-trend-report')return <span>Insights & Trends {">"} BTR</span>
  if(location.pathname ==='/insights-and-trends/buffer-trends')return <span>Insights & Trends{">"} BT</span>
  if(location.pathname ==='/insights-and-trends/guided-insights')return <span>Insights & Trends {">"} GI</span>
  if(location.pathname ==='/insights-and-trends/research-insights')return <span>Insights & Trends {">"} RI</span>

  if(location.pathname ==='/dbm/dbm-norm-suggestions')return <span>DBM {">"} DBM Norm Suggestion</span>


  










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