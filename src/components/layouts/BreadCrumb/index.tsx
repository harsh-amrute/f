import { useTranslation } from "react-i18next";
import { useUserData } from "../../../context";
import { boldSpan } from "./styles.css";

const BreadCrumb = () => {
  const { t } = useTranslation();
  const { user } = useUserData();
  if (location.pathname === '/mta/master-data-management/control-panel' || location.pathname === '/mto/master-data-management/control-panel') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Control Panel</span></span>
  if (location.pathname === '/mta/master-data-management/control-panel/view-modify' || location.pathname === '/mto/master-data-management/control-panel/view-modify') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>View / Modify</span></span>
  if ( location.pathname === '/mto/master-data-management/saved-drafts') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Saved Drafts </span></span>
  if (location.pathname === '/mta/master-data-management/task-status' || location.pathname === '/mto/master-data-management/task-status') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Task Status </span></span>
  if (location.pathname === '/mta/master-data-management/task-pending' || location.pathname === '/mto/master-data-management/task-pending') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Task Pending For Review </span></span>
  if (location.pathname === '/mta/master-data-management/control-panel/add' || location.pathname === '/mto/master-data-management/control-panel/add') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Add Records </span></span>
  if (location.pathname === '/mta/master-data-management/control-panel/delete' || location.pathname === '/mto/master-data-management/control-panel/delete') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Delete Records </span></span>
  if (location.pathname === '/mta/master-data-management/data-modification-history' || location.pathname === '/mto/master-data-management/data-modification-history') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Data Modification History</span></span>
  
  if (location.pathname === '/masters-interceptor/control-panel') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Control Panel <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Module Selection </span></span>
  if (location.pathname === '/masters-interceptor/saved-drafts') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Saved Drafts <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}> Module Selection </span></span>
  if (location.pathname === '/masters-interceptor/task-pending') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Task Pending for Review  <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Module Selection</span></span>
  if (location.pathname === '/masters-interceptor/task-status') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Task Status<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Module Selection</span></span>
  if (location.pathname === '/masters-interceptor/data-modification-history') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> Data Modification History <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}> Module Selection</span></span>
  


  if (location.pathname === '/mta/supply-chain-intelligence-hub/planning') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Planning </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/bpr') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BPR</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/rrr') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>RRR</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/bor') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BOR</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/buffer-trend-report') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>BTR </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/open-expediting-requests') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>OER </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/sdr') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>SDR </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/eo') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>EO </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/planning') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Planning</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/bpr') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BPR </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/rrr') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>RRR </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/bor') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BOR </span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/buffer-trend-report') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BTR</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/open-expediting-requests') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>OER</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/sdr') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>SDR</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/eo') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>EO</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/total-requirement-report') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Total Requirement Report</span></span>

  if (location.pathname === '/mta/logistics/intransit-whereabouts') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>In Transit whereabouts</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/bor-color-bandwise') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BOR - Color Bandwise</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/SupplierWiseAllocation') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Supplier Wise Allocation</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/rrr-color-bandwise') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>RRR - Color Bandwise</span></span>
  if (location.pathname === '/mta/supply-chain-intelligence-hub/order-allocation-report') return <span>SCIH <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Order Allocation Report</span></span>
  if (location.pathname === '/mta/logistics/intransit-whereabouts') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>In Transit whereabouts</span></span>



  if (location.pathname === '/mta/insights-and-trends/buffer-trend-report') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>BTR</span></span>
  if (location.pathname === '/mta/insights-and-trends/buffer-trends') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BT</span></span>
  if (location.pathname === '/mta/insights-and-trends/guided-insights') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>GI</span></span>
  if (location.pathname === '/mta/insights-and-trends/research-insights') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>RI</span></span>

  if (location.pathname === '/mta/dbm/dbm-norm-suggestions') return <span>DBM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>DBM Norm Suggestion</span></span>





  if (location.pathname === '/mta/insights-and-trends/buffer-trend-report') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BTR</span></span>
  if (location.pathname === '/mta/insights-and-trends/buffer-trends') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>BT</span></span>
  if (location.pathname === '/mta/insights-and-trends/guided-insights') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>GI</span></span>
  if (location.pathname === '/mta/insights-and-trends/research-insights') return <span>Insights & Trends <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>RI</span></span>

  if (location.pathname === '/mta/dbm/dbm-norm-suggestions') return <span>DBM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>DBM Norm Suggestion</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/enquiry-response') return <span><span style={{ fontWeight: 'normal' }}>Production Planning & Scheduling </span><img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Enquiry Response</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/insight-and-trends/bm-trends') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / BM Trends</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/insight-and-trends/stpl-full-kits') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / STPL & Full Kits</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/insight-and-trends/order-at-risk') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / Orders At Risk</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/insight-and-trends/order-balance') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / Order Balance</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/insights-and-trends/elapsed-time') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / Elapsed Time</span></span>

  if (location.pathname === '/mto/procurement/material-coverage-open-sales') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Material Coverage For Open Sales Order</span></span>
  if (location.pathname === '/mto/procurement-planning/planning') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Procurement Planning</span></span>
  if (location.pathname === '/mto/planning/simulative-fullkit') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Procurement Planning</span></span>
  if (location.pathname === '/mto/procurement/material-requirement') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Material Requirement</span></span>
  if (location.pathname === '/mto/procurement/insights-and-trends/day-wise-coverage') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Insights & Trends / Day Wise Coverage </span></span>
  if (location.pathname === '/mto/procurement/insights-and-trends/rmpm-orderwise-coverage') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insights & Trends / RM/PM Orderwise Coverage </span></span>
  if (location.pathname === '/mto/procurement/insights-and-trends/rmpm-buffer-trends') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insights & Trends / RM/PM Buffer Trends </span></span>
  if (location.pathname === '/mto/procurement/insights-and-trends/rmpm-expediting-rm-suppliers') return <span>Procurement <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insights & Trends / Expediting RM/Suppliers </span></span>
  if (location.pathname === '/mto/production-planning-scheduling/insights-and-trends/fol-summary') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} />  <span className={boldSpan}>Insights & Trends / FOL Summary </span></span>
  if (location.pathname === '/mto/production-planning-and-scheduling/due-date-quotation') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Due Date Quotation </span></span>
  if (location.pathname === '/mto/production-planning-and-scheduling/order-rescheduling') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Order Rescheduling </span></span>

  if (location.pathname === '/mto/production-planning-scheduling/dynamic-release-mangement') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Dynamic Release Management </span></span>

  if (location.pathname === '/mto/production-planning-scheduling/deptwise-bm-report') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Dept-wise BM Report</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/full-kit-assignment') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Full Kit Assignment</span></span>
  if (location.pathname === '/mto/production-planning-scheduling/overall-bm-report') return <span>Production Planning & Scheduling <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Overall BM Report</span></span>

  if (location.pathname === '/mto/poogi/insight-and-trends/resource-utilization-wip-profile') return <span>Poogi<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> <span className={boldSpan}>Resource Utilization & WIP Profile </span></span>
  if (location.pathname === '/mto/poogi/reasons-for-delayed-orders') return <span>Poogi<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Reason For Delayed Orders </span></span>
  if (location.pathname === '/mto/poogi/insight-and-trends/otif-analysis') return <span>POOGI <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>OTIF Analysis</span></span>
  if (location.pathname === '/mto/poogi/insight-and-trends/ot-and-if-analysis') return <span>POOGI <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / OT & IF Analysis</span></span>
  if (location.pathname === '/mto/poogi/insight-and-trends/lead-time') return <span>POOGI <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / Lead Time </span> </span>
  if (location.pathname === '/mto/poogi/insight-and-trends/top-failure-reasons') return <span>POOGI <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / Top Failure Reasons </span></span>
  if (location.pathname === '/mto/poogi/insight-and-trends/trend-of-failure-reason') return <span>POOGI <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /><span className={boldSpan}>Insight & Trends / Trend Of Failure Reason</span></span>


  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/bm-trends') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance / BM Trend</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/otif-analysis') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance /OTIF Analysis</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/ot-and-if-analysis') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance /OT & IF Analysis</span></span>


  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/lead-time') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance / Lead Time</span></span>




  if (location.pathname === '/mto/manufacturing-intelligence-hub/congestion-analysis/elapsed-time') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Congestion Analysis / Elapsed Time</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/congestion-analysis/orders-at-risk') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Congestion Analysis / Orders At Risk</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/congestion-analysis/order-balance') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Congestion Analysis / Order Balance</span></span>


  if (location.pathname === '/mto/manufacturing-intelligence-hub/future-order-load-chart') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Future Order Load Chart</span></span>



  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/fol-summary') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / FOL Summary</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/stpl-and-fullkit') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / STPL & Full Kits</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/day-wise-coverage') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / Day Wise Coverage</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/rm-pm-order-wise-coverage') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / RM / PM Order Wise Coverage</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/expetiting-rm-supplier') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / Expediting - RM & Suppliers</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/rm-pm-buffer-trend') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / RM - PM Buffer Trend</span></span>




  if (location.pathname === '/mto/manufacturing-intelligence-hub/improvement-areas/top-failure-reasons') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Improvement Areas / Top Failure Reasons</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/improvement-areas/trends-failure-reasons') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Improvement Areas / Trend Of Failure Reasons</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/improvement-areas/resource-wip-profile') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Improvement Areas / Resource Utilization & WIP Profile</span></span>


  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/bm-trends') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance / BM Trend</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/otif-analysis') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance /OTIF Analysis</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/ot-and-if-analysis') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance /OT & IF Analysis</span></span>


  if (location.pathname === '/mto/manufacturing-intelligence-hub/delivery-performance/lead-time') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Delivery Performance / Lead Time</span></span>
  if (location.pathname === '/mta/logistics/intransit-whereabouts') return <span>MDM <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} />In Transit whereabouts</span>



  if (location.pathname === '/mto/manufacturing-intelligence-hub/congestion-analysis/elapsed-time') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Congestion Analysis / Elapsed Time</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/congestion-analysis/orders-at-risk') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Congestion Analysis / Orders At Risk</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/congestion-analysis/order-balance') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Congestion Analysis / Order Balance</span></span>





  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/fol-summary') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / FOL Summary</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/stpl-and-fullkit') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / STPL & Full Kits</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/day-wise-coverage') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / Day Wise Coverage</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/rm-pm-order-wise-coverage') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / RM / PM Order Wise Coverage</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/expetiting-rm-supplier') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / Expediting - RM & Suppliers</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/forward-exceution/rm-pm-buffer-trend') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Forward Execution / RM - PM Buffer Trend</span></span>




  if (location.pathname === '/mto/manufacturing-intelligence-hub/improvement-areas/top-failure-reasons') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Improvement Areas / Top Failure Reasons</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/improvement-areas/trends-failure-reasons') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Improvement Areas / Trend Of Failure Reasons</span></span>

  if (location.pathname === '/mto/manufacturing-intelligence-hub/improvement-areas/resource-wip-profile') return <span>Manufacturing Intelligence Hub <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Improvement Areas / Resource Utilization & WIP Profile</span></span>


  if( location.pathname==='/mto/production/scheduling' && location.search==='?page=ResourceView') return <span>Production Planning & Scheduling<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Scheduling / Resource View</span></span>
  if( location.pathname==='/mto/production/scheduling' && location.search==='?page=JobView') return <span>Production Planning & Scheduling<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Scheduling / Job View</span></span>
  if( location.pathname==='/mto/production/scheduling' && location.search==='?page=GridViewR') return <span>Production Planning & Scheduling<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Scheduling / GridView - Resource List</span></span>
  if( location.pathname==='/mto/production/scheduling' && location.search==='?page=GridViewJ') return <span>Production Planning & Scheduling<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Scheduling / GridView - Job List</span></span>
  if( location.pathname==='/mto/production/scheduling') return <span>Production Planning & Scheduling<img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={8} width={8} /><span className={boldSpan}>Scheduling / Download-Upload Template</span></span>
  
  if(location.pathname==='/login-audit-report') return <span> {t("breadCrumb.um")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("Login Audit Report")}</span>;






  if (location.pathname === "/manual-upload") {
    return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.manualUpload")}</span>;
  } else if (location.pathname === "/") {
    // return <span> {t("breadCrumb.ist")} <img src={"/assets/img/VectorFLOW/arrowbreadcrumb.svg"} alt="Arrow" height={11} width={11} /> {t("header.pendingISTRequests")}</span>;
    return <></>;
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