import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context";

const BreadCrumb = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  if(location.pathname ==='/master-data-management/control-panel')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Control Panel</span>
  if(location.pathname ==='/master-data-management/control-panel/view-modify')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> View / Modify</span>
  if(location.pathname ==='/master-data-management/saved-drafts')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Saved Drafts</span>
  if(location.pathname ==='/master-data-management/task-status')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Task Status</span>
  if(location.pathname ==='/master-data-management/task-pending')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Task Pending For Review</span>
  if(location.pathname ==='/master-data-management/control-panel/add')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Add Records</span>
  if(location.pathname ==='/master-data-management/control-panel/delete')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Delete Records</span>
  if(location.pathname === '/master-data-management/data-modification-history')return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} />Data Modification History</span>



  if(location.pathname ==='/supply-chain-intelligence-hub/planning')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Planning</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/bpr')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> BPR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/rrr')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> RRR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/bor')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> BOR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/buffer-trend-report')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> BTR</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/open-expediting-requests')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> OER</span>
  if(location.pathname ==='/supply-chain-intelligence-hub/sdr')return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> SDR</span>

  

  if(location.pathname ==='/insights-and-trends/buffer-trend-report')return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> BTR</span>
  if(location.pathname ==='/insights-and-trends/buffer-trends')return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> BT</span>
  if(location.pathname ==='/insights-and-trends/guided-insights')return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> GI</span>
  if(location.pathname ==='/insights-and-trends/research-insights')return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> RI</span>

  if(location.pathname ==='/dbm/dbm-norm-suggestions')return <span>DBM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> DBM Norm Suggestion</span>
  if(location.pathname ==='/production-planning-scheduling/enquiry-response')return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} />Enquiry Response</span>
  if(location.pathname ==='/production-planning-scheduling/insight-and-trends/bm-trends')return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} />Insight & Trends / BM Trends</span>
  if(location.pathname ==='/production-planning-scheduling/insight-and-trends/stpl-full-kits')return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} />Insight & Trends / STPL & Full Kits</span>

  if(location.pathname==='/procurement/material-coverage-open-sales')return <span>Procurement<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} />Material Coverage For Open Sales Order</span>


  










  if (location.pathname === "/manual-upload") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.manualUpload")}</span>;
  } else if (location.pathname === "/") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.pendingISTRequests")}</span>;
  } else if (location.pathname === "/ist-forced-closure") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.ISTForcedClosure")}</span>;
  } else if (location.pathname === "/ist-status") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.ISTStatus")}</span>;
  } else if (location.pathname === "/store-status") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.storeStatus")}</span>;
  } else if (location.pathname === "/profile") {
    if (
      user.user.is_admin ||
      user?.roles?.permission?.includes("IST Admin")
    ) {
      return <span> {t("breadCrumb.um")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.administration")}</span>;
    } else {
      return <span> {t("breadCrumb.um")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.myProfile")}</span>;
    }
  } else if (location.pathname === "/availability-comparison") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.availabilityComparison")}</span>;
  } else {
    return <></>
  }
};

export default BreadCrumb