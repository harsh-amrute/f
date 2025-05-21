import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFTable from '../../Common/VFTable';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { Wrapper } from './styles';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetReasonForDelayOrder, useGetPoogiRemarks, usePutPoogiRemarks, useGetPoogReasonForDealyedOrderExcel, useGetPoogiMajorMinorReason } from '../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index';
import { toast } from 'react-toastify';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import { AgGridReactProps } from 'ag-grid-react';
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox';
import { useUserData } from '../../../../../context';
import RemarkHistoryRenderer from '../../Production/DepartmentWiseBMReport/RemarkHistoryRenderer';
import MTORemarkHistoryModal from '../../Production/DepartmentWiseBMReport/MTORemarkHistoryModal';
import PlannedReleaseRenderer from './PlannedReleaseRenderer';
import CustomCellEditor from './MajorDropDownRenderer';
import { ColorsMTO } from '../../Common/Colors';
import VFPagination from "../../Common/VFPagination";
import BPPRenderer from '../../Common/BPRRenderer/BPPRenderer';
import OverlayLoader from '../../Common/Loader';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { FilterPageName, pagination, UIGridCode } from '../../Common/Enum';
import useFilter from '../../../../../hooks/useFilter'
import { useGetFilterData } from '../../../../../VectorFlow/Services/MTO/Common/CommonFilter'
import useColDef from '../../../../../hooks/useColDef';
import VFSaveRemark from '../../../../../components/VectorFLOW/commons/VFSaveRemark';
import CustomDropdownRenderer from '../../../../../components/commons/CustomDropdown';

const APIFilterConfig = {
    filSecVisConfig: {
        "Poogi_Reason_For_Delayed_Orders" : {
            mjr : false,
            or: true,
            res: true,
            cus: true
        },
    }
};

type MyObject = {
    ok: string;
    minid: number;
    majid: number;
};

const ReasonForDelayOrder = () => {
    const { data: reasonData, isLoading: isGetPoogiMajorMinorReason } = useGetPoogiMajorMinorReason();
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getPoogiReasonsDelayedOrder, isLoading: isPoogiReasonsDelayedOrder } = useGetReasonForDelayOrder();
    const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
    const { mutateAsync: updatePoogiRemarks, isLoading: isPutPoogiRemarks} = usePutPoogiRemarks();
    const [rowData, setRowData] = useState<any>();
    const [isWIPChecked, setWIPChecked] = useState<boolean>(true);
    const [remarkHistory, setRemarkHistory] = useState<any>();
    const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] = useState<boolean>(false);
    //const [items, setItems] = useState<any[]>([]);
    //const [disabled, setDisabled] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowDataCount, setRowDataCount] = useState<number>(0);
    const [currentGridRef, setCurrentGridRef] = useState<any>(null);
    const [columnState, setColumnState] = useState<any>([]);
    const [isReset, setIsReset] = useState<any>(undefined);
    const [colDef, setColDef] = useState([{}]);
    const [filterData, setFilterData] = useState({});
    const [isDisabled, setIsDisabled]= useState<boolean>(true)
    const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
    const {
        state: currFilter,
        setState: setCurrFilter,
        onFilterRemove,
        isFilterOpen,
        isMfgSelected,
        onAddFilter,
        onApplyFilter,
        toggleFilter,
        appliedFilters
    } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Poogi_Reason_For_Delayed_Orders);
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
    const reportName = 'ReasonForDelayedOrders';
    const tableRowRef = useRef<any>(null);
    const { user } = useUserData();
    const { colDefMap, getColDef } = useColDef();
    const { mutateAsync: getPoogiReasonsDelayedOrderExcelExport } = useGetPoogReasonForDealyedOrderExcel();
    const themeUi = user?.user?.theme_ui;
    const [masterUIConfig, setMasterUIConfig] = useState([]);
    const unsavedUserData = useRef(new Map());
    // const rolesData = [
    //     {
    //         "id": 3,
    //         "title": "Orders",
    //         "status": false,
    //         "child": [
    //             {
    //                 "id": 1,
    //                 "name": "BM Report Manager",
    //                 "description": "BM report manager",
    //                 "application_id": 3,
    //                 "code": "BMR",
    //                 "application_name": "Orders",
    //                 "urls": [
    //                     {
    //                         "id": 2,
    //                         "name": "vectorFlow : Landing Page",
    //                         "code": "LP",
    //                         "description": "Landing Page",
    //                         "url": "/landing-page"
    //                     },
    //                     {
    //                         "id": 3,
    //                         "name": "control panel interceptor",
    //                         "code": "cpi",
    //                         "description": "control panel interceptor",
    //                         "url": "/masters-interceptor/control-panel"
    //                     },
    //                     {
    //                         "id": 7,
    //                         "name": "VectorFlow. Master Data Management. Control Panel",
    //                         "code": "MDM-CP",
    //                         "description": "VectorFlow. Master Data Management. Control Panel",
    //                         "url": "/master-data-management/control-panel"
    //                     },
    //                     {
    //                         "id": 8,
    //                         "name": "VectorFlow. Master Data Management. View-Modify",
    //                         "code": "MDM-CP-VM",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/view-modify"
    //                     },
    //                     {
    //                         "id": 9,
    //                         "name": "VectorFlow. Master Data Management. Add",
    //                         "code": "MDM-CP-ADD",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/add"
    //                     },
    //                     {
    //                         "id": 10,
    //                         "name": "VectorFlow. Master Data Management. Delete",
    //                         "code": "MDM-CP-DEL",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/delete"
    //                     },
    //                     {
    //                         "id": 11,
    //                         "name": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "code": "MDM-TP",
    //                         "description": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "url": "/master-data-management/task-pending"
    //                     },
    //                     {
    //                         "id": 12,
    //                         "name": "VectorFlow. Master Data Management. Task Status ",
    //                         "code": "MDM-TS",
    //                         "description": "VectorFlow. Master Data Management. Task Status",
    //                         "url": "/master-data-management/task-status"
    //                     },
    //                     {
    //                         "id": 13,
    //                         "name": "VectorFlow. Master Data Management. Saved Drafts ",
    //                         "code": "MDM-SD",
    //                         "description": "VectorFlow. Master Data Management. Saved Drafts",
    //                         "url": "/master-data-management/saved-drafts"
    //                     },
    //                     {
    //                         "id": 6,
    //                         "name": "MDM-Saved-Draft-interceptor",
    //                         "code": "MDM-Saved-Draft-interceptor",
    //                         "description": "MDM-Saved-Draft-interceptor",
    //                         "url": "/masters-interceptor/saved-drafts"
    //                     },
    //                     {
    //                         "id": 25,
    //                         "name": "intercept-task-status",
    //                         "code": "intercept-task-status",
    //                         "description": "intercept-task-status",
    //                         "url": "/masters-interceptor/task-status"
    //                     },
    //                     {
    //                         "id": 26,
    //                         "name": "intercept-data-modification",
    //                         "code": "intercept-data-modification",
    //                         "description": "intercept-data-modification",
    //                         "url": "/masters-interceptor/data-modification-history"
    //                     },
    //                     {
    //                         "id": 27,
    //                         "name": "OverAll BM Report",
    //                         "code": "OBMR",
    //                         "description": "Over all BM Report Page",
    //                         "url": "/production-planning-scheduling/overall-bm-report"
    //                     },
    //                     {
    //                         "id": 28,
    //                         "name": "profile",
    //                         "code": "profile",
    //                         "description": "profile",
    //                         "url": "/profile"
    //                     },
    //                     {
    //                         "id": 32,
    //                         "name": "Deptwise BM Report",
    //                         "code": "Dept BM",
    //                         "description": "Deptwise BM Report URL",
    //                         "url": "/production-planning-scheduling/deptwise-bm-report"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 2,
    //         "title": "Distribution",
    //         "status": false,
    //         "child": [
    //             {
    //                 "id": 4,
    //                 "name": "User Manager",
    //                 "description": "usm",
    //                 "application_id": 2,
    //                 "code": "usm",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 28,
    //                         "name": "profile",
    //                         "code": "profile",
    //                         "description": "profile",
    //                         "url": "/profile"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 7,
    //                 "name": "DBMManager",
    //                 "description": "No Description Available",
    //                 "application_id": 2,
    //                 "code": "DBMManager",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 1,
    //                         "name": "bor-color-bandwise",
    //                         "code": "bor-color-bandwise",
    //                         "description": "bor-color-bandwise",
    //                         "url": "/supply-chain-intelligence-hub/bor-color-bandwise"
    //                     },
    //                     {
    //                         "id": 14,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Planning ",
    //                         "code": "MTA-P",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Planning",
    //                         "url": "/supply-chain-intelligence-hub/planning"
    //                     },
    //                     {
    //                         "id": 15,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. BPR ",
    //                         "code": "MTA-BPR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. BPR",
    //                         "url": "/supply-chain-intelligence-hub/bpr"
    //                     },
    //                     {
    //                         "id": 17,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. RRR ",
    //                         "code": "MTA-RRR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. RRR",
    //                         "url": "/supply-chain-intelligence-hub/rrr"
    //                     },
    //                     {
    //                         "id": 18,
    //                         "name": "VectorFlow. Insights and Trends. Guided Insights ",
    //                         "code": "MTA-GI",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Guided Insights",
    //                         "url": "/insights-and-trends/guided-insights"
    //                     },
    //                     {
    //                         "id": 19,
    //                         "name": "VectorFlow. Insights and Trends. Research Insights ",
    //                         "code": "MTA-RI",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Research Insights",
    //                         "url": "/insights-and-trends/research-insights"
    //                     },
    //                     {
    //                         "id": 20,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Open Expediting Requests ",
    //                         "code": "MTA-OER",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Open Expediting Requests",
    //                         "url": "/supply-chain-intelligence-hub/open-expediting-requests"
    //                     },
    //                     {
    //                         "id": 21,
    //                         "name": "VectorFlow. Insights and Trends.  Buffer Trend Report (BTR) ",
    //                         "code": "MTA-BTR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Buffer Trend Report (BTR)",
    //                         "url": "/insights-and-trends/buffer-trend-report"
    //                     },
    //                     {
    //                         "id": 22,
    //                         "name": "VectorFlow. Insights and Trends.  Buffer Trends ",
    //                         "code": "MTA-BT",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Buffer Trends",
    //                         "url": "/insights-and-trends/buffer-trends"
    //                     },
    //                     {
    //                         "id": 23,
    //                         "name": "VectorFlow. DBM.  DBM Norm Suggestions ",
    //                         "code": "MTA-DBMNS",
    //                         "description": "VectorFlow. DBM.  DBM Norm Suggestions",
    //                         "url": "/dbm/dbm-norm-suggestions"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 8,
    //                 "name": "BPRManager",
    //                 "description": "No Description Available",
    //                 "application_id": 2,
    //                 "code": "BPRManager",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 1,
    //                         "name": "bor-color-bandwise",
    //                         "code": "bor-color-bandwise",
    //                         "description": "bor-color-bandwise",
    //                         "url": "/supply-chain-intelligence-hub/bor-color-bandwise"
    //                     },
    //                     {
    //                         "id": 14,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Planning ",
    //                         "code": "MTA-P",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Planning",
    //                         "url": "/supply-chain-intelligence-hub/planning"
    //                     },
    //                     {
    //                         "id": 15,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. BPR ",
    //                         "code": "MTA-BPR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. BPR",
    //                         "url": "/supply-chain-intelligence-hub/bpr"
    //                     },
    //                     {
    //                         "id": 17,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. RRR ",
    //                         "code": "MTA-RRR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. RRR",
    //                         "url": "/supply-chain-intelligence-hub/rrr"
    //                     },
    //                     {
    //                         "id": 18,
    //                         "name": "VectorFlow. Insights and Trends. Guided Insights ",
    //                         "code": "MTA-GI",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Guided Insights",
    //                         "url": "/insights-and-trends/guided-insights"
    //                     },
    //                     {
    //                         "id": 19,
    //                         "name": "VectorFlow. Insights and Trends. Research Insights ",
    //                         "code": "MTA-RI",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Research Insights",
    //                         "url": "/insights-and-trends/research-insights"
    //                     },
    //                     {
    //                         "id": 20,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Open Expediting Requests ",
    //                         "code": "MTA-OER",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Open Expediting Requests",
    //                         "url": "/supply-chain-intelligence-hub/open-expediting-requests"
    //                     },
    //                     {
    //                         "id": 21,
    //                         "name": "VectorFlow. Insights and Trends.  Buffer Trend Report (BTR) ",
    //                         "code": "MTA-BTR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Buffer Trend Report (BTR)",
    //                         "url": "/insights-and-trends/buffer-trend-report"
    //                     },
    //                     {
    //                         "id": 22,
    //                         "name": "VectorFlow. Insights and Trends.  Buffer Trends ",
    //                         "code": "MTA-BT",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Buffer Trends",
    //                         "url": "/insights-and-trends/buffer-trends"
    //                     },
    //                     {
    //                         "id": 24,
    //                         "name": "VectorFlow. Logistics Intransit Whereabouts.",
    //                         "code": "MTA-IW",
    //                         "description": "VectorFlow. Logistics Intransit Whereabouts.",
    //                         "url": "/logistics/intransit-whereabouts"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 22,
    //                 "name": "MasterUpdater",
    //                 "description": "No Description Available",
    //                 "application_id": 2,
    //                 "code": "MasterUpdater",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 1,
    //                         "name": "bor-color-bandwise",
    //                         "code": "bor-color-bandwise",
    //                         "description": "bor-color-bandwise",
    //                         "url": "/supply-chain-intelligence-hub/bor-color-bandwise"
    //                     },
    //                     {
    //                         "id": 7,
    //                         "name": "VectorFlow. Master Data Management. Control Panel",
    //                         "code": "MDM-CP",
    //                         "description": "VectorFlow. Master Data Management. Control Panel",
    //                         "url": "/master-data-management/control-panel"
    //                     },
    //                     {
    //                         "id": 8,
    //                         "name": "VectorFlow. Master Data Management. View-Modify",
    //                         "code": "MDM-CP-VM",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/view-modify"
    //                     },
    //                     {
    //                         "id": 9,
    //                         "name": "VectorFlow. Master Data Management. Add",
    //                         "code": "MDM-CP-ADD",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/add"
    //                     },
    //                     {
    //                         "id": 10,
    //                         "name": "VectorFlow. Master Data Management. Delete",
    //                         "code": "MDM-CP-DEL",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/delete"
    //                     },
    //                     {
    //                         "id": 12,
    //                         "name": "VectorFlow. Master Data Management. Task Status ",
    //                         "code": "MDM-TS",
    //                         "description": "VectorFlow. Master Data Management. Task Status",
    //                         "url": "/master-data-management/task-status"
    //                     },
    //                     {
    //                         "id": 13,
    //                         "name": "VectorFlow. Master Data Management. Saved Drafts ",
    //                         "code": "MDM-SD",
    //                         "description": "VectorFlow. Master Data Management. Saved Drafts",
    //                         "url": "/master-data-management/saved-drafts"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 23,
    //                 "name": "MasterApprover",
    //                 "description": "No Description Available",
    //                 "application_id": 2,
    //                 "code": "MasterApprover",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 1,
    //                         "name": "bor-color-bandwise",
    //                         "code": "bor-color-bandwise",
    //                         "description": "bor-color-bandwise",
    //                         "url": "/supply-chain-intelligence-hub/bor-color-bandwise"
    //                     },
    //                     {
    //                         "id": 2,
    //                         "name": "vectorFlow : Landing Page",
    //                         "code": "LP",
    //                         "description": "Landing Page",
    //                         "url": "/landing-page"
    //                     },
    //                     {
    //                         "id": 4,
    //                         "name": "Task Pending for Review",
    //                         "code": "TPR",
    //                         "description": "Adding Task Pending for Review page",
    //                         "url": "/masters-interceptor/task-pending"
    //                     },
    //                     {
    //                         "id": 9,
    //                         "name": "VectorFlow. Master Data Management. Add",
    //                         "code": "MDM-CP-ADD",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/add"
    //                     },
    //                     {
    //                         "id": 10,
    //                         "name": "VectorFlow. Master Data Management. Delete",
    //                         "code": "MDM-CP-DEL",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/delete"
    //                     },
    //                     {
    //                         "id": 11,
    //                         "name": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "code": "MDM-TP",
    //                         "description": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "url": "/master-data-management/task-pending"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 5,
    //                 "name": "Admin",
    //                 "description": "Must have access to all pages",
    //                 "application_id": 2,
    //                 "code": "ADMIN",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 1,
    //                         "name": "bor-color-bandwise",
    //                         "code": "bor-color-bandwise",
    //                         "description": "bor-color-bandwise",
    //                         "url": "/supply-chain-intelligence-hub/bor-color-bandwise"
    //                     },
    //                     {
    //                         "id": 2,
    //                         "name": "vectorFlow : Landing Page",
    //                         "code": "LP",
    //                         "description": "Landing Page",
    //                         "url": "/landing-page"
    //                     },
    //                     {
    //                         "id": 3,
    //                         "name": "control panel interceptor",
    //                         "code": "cpi",
    //                         "description": "control panel interceptor",
    //                         "url": "/masters-interceptor/control-panel"
    //                     },
    //                     {
    //                         "id": 4,
    //                         "name": "Task Pending for Review",
    //                         "code": "TPR",
    //                         "description": "Adding Task Pending for Review page",
    //                         "url": "/masters-interceptor/task-pending"
    //                     },
    //                     {
    //                         "id": 5,
    //                         "name": "VectorFlow : Default",
    //                         "code": "DF",
    //                         "description": "VectorFlow : Default",
    //                         "url": "/"
    //                     },
    //                     {
    //                         "id": 6,
    //                         "name": "MDM-Saved-Draft-interceptor",
    //                         "code": "MDM-Saved-Draft-interceptor",
    //                         "description": "MDM-Saved-Draft-interceptor",
    //                         "url": "/masters-interceptor/saved-drafts"
    //                     },
    //                     {
    //                         "id": 7,
    //                         "name": "VectorFlow. Master Data Management. Control Panel",
    //                         "code": "MDM-CP",
    //                         "description": "VectorFlow. Master Data Management. Control Panel",
    //                         "url": "/master-data-management/control-panel"
    //                     },
    //                     {
    //                         "id": 8,
    //                         "name": "VectorFlow. Master Data Management. View-Modify",
    //                         "code": "MDM-CP-VM",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/view-modify"
    //                     },
    //                     {
    //                         "id": 9,
    //                         "name": "VectorFlow. Master Data Management. Add",
    //                         "code": "MDM-CP-ADD",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/add"
    //                     },
    //                     {
    //                         "id": 10,
    //                         "name": "VectorFlow. Master Data Management. Delete",
    //                         "code": "MDM-CP-DEL",
    //                         "description": "VectorFlow. Master Data Management. View-Modify",
    //                         "url": "/master-data-management/control-panel/delete"
    //                     },
    //                     {
    //                         "id": 11,
    //                         "name": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "code": "MDM-TP",
    //                         "description": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "url": "/master-data-management/task-pending"
    //                     },
    //                     {
    //                         "id": 12,
    //                         "name": "VectorFlow. Master Data Management. Task Status ",
    //                         "code": "MDM-TS",
    //                         "description": "VectorFlow. Master Data Management. Task Status",
    //                         "url": "/master-data-management/task-status"
    //                     },
    //                     {
    //                         "id": 13,
    //                         "name": "VectorFlow. Master Data Management. Saved Drafts ",
    //                         "code": "MDM-SD",
    //                         "description": "VectorFlow. Master Data Management. Saved Drafts",
    //                         "url": "/master-data-management/saved-drafts"
    //                     },
    //                     {
    //                         "id": 14,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Planning ",
    //                         "code": "MTA-P",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Planning",
    //                         "url": "/supply-chain-intelligence-hub/planning"
    //                     },
    //                     {
    //                         "id": 15,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. BPR ",
    //                         "code": "MTA-BPR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. BPR",
    //                         "url": "/supply-chain-intelligence-hub/bpr"
    //                     },
    //                     {
    //                         "id": 16,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. BOR ",
    //                         "code": "MTA-BOR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. BOR",
    //                         "url": "/supply-chain-intelligence-hub/bor"
    //                     },
    //                     {
    //                         "id": 17,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. RRR ",
    //                         "code": "MTA-RRR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. RRR",
    //                         "url": "/supply-chain-intelligence-hub/rrr"
    //                     },
    //                     {
    //                         "id": 18,
    //                         "name": "VectorFlow. Insights and Trends. Guided Insights ",
    //                         "code": "MTA-GI",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Guided Insights",
    //                         "url": "/insights-and-trends/guided-insights"
    //                     },
    //                     {
    //                         "id": 19,
    //                         "name": "VectorFlow. Insights and Trends. Research Insights ",
    //                         "code": "MTA-RI",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Research Insights",
    //                         "url": "/insights-and-trends/research-insights"
    //                     },
    //                     {
    //                         "id": 20,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Open Expediting Requests ",
    //                         "code": "MTA-OER",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Open Expediting Requests",
    //                         "url": "/supply-chain-intelligence-hub/open-expediting-requests"
    //                     },
    //                     {
    //                         "id": 21,
    //                         "name": "VectorFlow. Insights and Trends.  Buffer Trend Report (BTR) ",
    //                         "code": "MTA-BTR",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Buffer Trend Report (BTR)",
    //                         "url": "/insights-and-trends/buffer-trend-report"
    //                     },
    //                     {
    //                         "id": 22,
    //                         "name": "VectorFlow. Insights and Trends.  Buffer Trends ",
    //                         "code": "MTA-BT",
    //                         "description": "VectorFlow. Supply Chain Intelligence Hub. Buffer Trends",
    //                         "url": "/insights-and-trends/buffer-trends"
    //                     },
    //                     {
    //                         "id": 23,
    //                         "name": "VectorFlow. DBM.  DBM Norm Suggestions ",
    //                         "code": "MTA-DBMNS",
    //                         "description": "VectorFlow. DBM.  DBM Norm Suggestions",
    //                         "url": "/dbm/dbm-norm-suggestions"
    //                     },
    //                     {
    //                         "id": 24,
    //                         "name": "VectorFlow. Logistics Intransit Whereabouts.",
    //                         "code": "MTA-IW",
    //                         "description": "VectorFlow. Logistics Intransit Whereabouts.",
    //                         "url": "/logistics/intransit-whereabouts"
    //                     },
    //                     {
    //                         "id": 25,
    //                         "name": "intercept-task-status",
    //                         "code": "intercept-task-status",
    //                         "description": "intercept-task-status",
    //                         "url": "/masters-interceptor/task-status"
    //                     },
    //                     {
    //                         "id": 26,
    //                         "name": "intercept-data-modification",
    //                         "code": "intercept-data-modification",
    //                         "description": "intercept-data-modification",
    //                         "url": "/masters-interceptor/data-modification-history"
    //                     },
    //                     {
    //                         "id": 27,
    //                         "name": "OverAll BM Report",
    //                         "code": "OBMR",
    //                         "description": "Over all BM Report Page",
    //                         "url": "/production-planning-scheduling/overall-bm-report"
    //                     },
    //                     {
    //                         "id": 28,
    //                         "name": "profile",
    //                         "code": "profile",
    //                         "description": "profile",
    //                         "url": "/profile"
    //                     },
    //                     {
    //                         "id": 29,
    //                         "name": "rrr-color",
    //                         "code": "rrr-color-bandwise",
    //                         "description": "rrr-color-bandwise",
    //                         "url": "/supply-chain-intelligence-hub/rrr-color-bandwise"
    //                     },
    //                     {
    //                         "id": 30,
    //                         "name": "BM Trend",
    //                         "code": "BM-TREND",
    //                         "description": "BM trend page will be visible",
    //                         "url": "/production-planning-scheduling/insight-and-trends/bm-trends"
    //                     },
    //                     {
    //                         "id": 31,
    //                         "name": "DDQ",
    //                         "code": "DDQ",
    //                         "description": "DDQ URL",
    //                         "url": "/production-planning-and-scheduling/due-date-quotation"
    //                     },
    //                     {
    //                         "id": 32,
    //                         "name": "Deptwise BM Report",
    //                         "code": "Dept BM",
    //                         "description": "Deptwise BM Report URL",
    //                         "url": "/production-planning-scheduling/deptwise-bm-report"
    //                     },
    //                     {
    //                         "id": 33,
    //                         "name": "scih-oar",
    //                         "code": "scih-oar",
    //                         "description": "scih-oar",
    //                         "url": "/supply-chain-intelligence-hub/order-allocation-report"
    //                     },
    //                     {
    //                         "id": 34,
    //                         "name": "scih-trr",
    //                         "code": "scih-trr",
    //                         "description": "scih-trr",
    //                         "url": "/supply-chain-intelligence-hub/total-requirement-report"
    //                     },
    //                     {
    //                         "id": 35,
    //                         "name": "VectorFlow. Procurement. Planning. Simulative Fullkit",
    //                         "code": "VectorFlow. Procurement. Planning. Simulative Fullkit",
    //                         "description": "MTO-PL-SF",
    //                         "url": "/planning/simulative-fullkit"
    //                     },
    //                     {
    //                         "id": 36,
    //                         "name": "VectorFlow. Procurement. Planning.",
    //                         "code": "VectorFlow. Procurement. Planning.",
    //                         "description": "MTO-PR-PL",
    //                         "url": "/procurement-planning/planning"
    //                     },
    //                     {
    //                         "id": 37,
    //                         "name": "VectorFlow. Procurement. Material Coverage Open Sales.",
    //                         "code": "VectorFlow. Procurement. Material Coverage Open Sales.",
    //                         "description": "MTO-PR-MCOS",
    //                         "url": "/procurement/material-coverage-open-sales"
    //                     },
    //                     {
    //                         "id": 38,
    //                         "name": "VectorFlow. Master Data Management. Data Modification History",
    //                         "code": "VectorFlow. Master Data Management. Data Modification History",
    //                         "description": "MDM-DMH",
    //                         "url": "/master-data-management/data-modification-history"
    //                     },
    //                     {
    //                         "id": 39,
    //                         "name": "VectorFlow. Procurement. Insights and Trends Sales. RMPM Orderwise Coverage",
    //                         "code": "VectorFlow. Procurement. Insights and Trends Sales. RMPM Orderwise Coverage",
    //                         "description": "MTO-PR-RMPM",
    //                         "url": "/procurement/insights-and-trends/rmpm-orderwise-coverage"
    //                     },
    //                     {
    //                         "id": 40,
    //                         "name": "VectorFlow. Procurement. Material Requirement",
    //                         "code": "VectorFlow. Procurement. Material Requirement",
    //                         "description": "MTO-PR-MR",
    //                         "url": "/procurement/material-requirement"
    //                     },
    //                     {
    //                         "id": 41,
    //                         "name": "VectorFlow. Procurement. Insights and Trends. Day Wise Coverage",
    //                         "code": "VectorFlow. Procurement. Insights and Trends. Day Wise Coverage",
    //                         "description": "MTO-PR-DWC",
    //                         "url": "/procurement/insights-and-trends/day-wise-coverage"
    //                     },
    //                     {
    //                         "id": 42,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. SDR",
    //                         "code": "VectorFlow. Supply Chain Intelligence Hub. SDR",
    //                         "description": "MTA-SDR",
    //                         "url": "/supply-chain-intelligence-hub/sdr"
    //                     },
    //                     {
    //                         "id": 43,
    //                         "name": "VectorFlow. Procurement. Insights and Trends. RMPM Buffer Trend",
    //                         "code": "VectorFlow. Procurement. Insights and Trends. RMPM Buffer Trend",
    //                         "description": "MTO-PR-RMPMBT",
    //                         "url": "/procurement/insights-and-trends/rmpm-buffer-trends"
    //                     },
    //                     {
    //                         "id": 44,
    //                         "name": "VectorFlow. Procurement. Insights and Trends. Expediting - RM & Supplier",
    //                         "code": "VectorFlow. Procurement. Insights and Trends. Expediting - RM & Supplier",
    //                         "description": "MTO-PR-RMPM R&S",
    //                         "url": "/procurement/insights-and-trends/rmpm-expediting-rm-suppliers"
    //                     },
    //                     {
    //                         "id": 45,
    //                         "name": "VectorFlow. Production. Enquiry Response",
    //                         "code": "VectorFlow. Production. Enquiry Response",
    //                         "description": "ER",
    //                         "url": "/production-planning-scheduling/enquiry-response"
    //                     },
    //                     {
    //                         "id": 47,
    //                         "name": "VectorFlow. Production. STPL Full Kit",
    //                         "code": "VectorFlow. Production. STPL Full Kit",
    //                         "description": "MTO-PR-STPL-FULL-KIT",
    //                         "url": "/production-planning-scheduling/insight-and-trends/stpl-full-kits"
    //                     },
    //                     {
    //                         "id": 49,
    //                         "name": "VectorFlow. Production. Full Kit Assignment",
    //                         "code": "VectorFlow. Production. Full Kit Assignment",
    //                         "description": "MTO-PR-FK-ASSGN",
    //                         "url": "/production-planning-scheduling/full-kit-assignment"
    //                     },
    //                     {
    //                         "id": 50,
    //                         "name": "VectorFlow.Production.OrderReScheduling",
    //                         "code": "VectorFlow.Production.OrderReScheduling",
    //                         "description": "MTO-PR-ORD-RESCHEDULE",
    //                         "url": "/production-planning-and-scheduling/order-rescheduling"
    //                     },
    //                     {
    //                         "id": 51,
    //                         "name": "VectorFlow.Production.InsightsTrends.OrderRisks",
    //                         "code": "VectorFlow.Production.InsightsTrends.OrderRisks",
    //                         "description": "MTO-IT-OR",
    //                         "url": "/production-planning-scheduling/insight-and-trends/order-at-risk"
    //                     },
    //                     {
    //                         "id": 53,
    //                         "name": "VectorFlow.Production.Dynamic.Release.Management",
    //                         "code": "VectorFlow.Production.Dynamic.Release.Management",
    //                         "description": "MTO-PR-DRM",
    //                         "url": "/production-planning-scheduling/dynamic-release-mangement"
    //                     },
    //                     {
    //                         "id": 54,
    //                         "name": "VectorFlow.Production.InsightTrends.OrderBalance",
    //                         "code": "VectorFlow.Production.InsightTrends.OrderBalance",
    //                         "description": "MTO-PR-IT-OB",
    //                         "url": "/production-planning-scheduling/insight-and-trends/order-balance"
    //                     },
    //                     {
    //                         "id": 55,
    //                         "name": "VectorFlow.Production.InsightsTrends.FOLSummary",
    //                         "code": "VectorFlow.Production.InsightsTrends.FOLSummary",
    //                         "description": "MTO-PR-IT-FOL-SUMM",
    //                         "url": "/production-planning-scheduling/insights-and-trends/fol-summary"
    //                     },
    //                     {
    //                         "id": 56,
    //                         "name": "VectorFlow.POOGI.InsightsTrends.OtifAnalysis",
    //                         "code": "VectorFlow.POOGI.InsightsTrends.OtifAnalysis",
    //                         "description": "MTO-POOGI-IT-OTIF-ANLYS",
    //                         "url": "/poogi/insight-and-trends/otif-analysis"
    //                     },
    //                     {
    //                         "id": 57,
    //                         "name": "VectorFlow.Poogi.InsightTrends.Resource.WIP.Profile",
    //                         "code": "VectorFlow.Poogi.InsightTrends.Resource.WIP.Profile",
    //                         "description": "MTO-POOGI-IT-RU-WIP",
    //                         "url": "/poogi/insight-and-trends/resource-utilization-wip-profile"
    //                     },
    //                     {
    //                         "id": 58,
    //                         "name": "VectorFlow.POOGI.Reasons.DelayedOrders",
    //                         "code": "VectorFlow.POOGI.Reasons.DelayedOrders",
    //                         "description": "MTO-POOGI-RDO",
    //                         "url": "/poogi/reasons-for-delayed-orders"
    //                     },
    //                     {
    //                         "id": 60,
    //                         "name": "VectorFlow.Poogi.OTANDIF",
    //                         "code": "VectorFlow.Poogi.OTANDIF",
    //                         "description": "MTO.OT.AND.IF",
    //                         "url": "/poogi/insight-and-trends/ot-and-if-analysis"
    //                     },
    //                     {
    //                         "id": 61,
    //                         "name": "VectorFlow.Poogi.InsightsTrends.TrendsOfFailureReason",
    //                         "code": "VectorFlow.Poogi.InsightsTrends.TrendsOfFailureReason",
    //                         "description": "MTO-POOGI-IT-FAILURE-REASON",
    //                         "url": "/poogi/insight-and-trends/trend-of-failure-reason"
    //                     },
    //                     {
    //                         "id": 62,
    //                         "name": "VectorFlow.Poogi.InsightTrends.LeadTime",
    //                         "code": "VectorFlow.Poogi.InsightTrends.LeadTime",
    //                         "description": "MTO-POOGI-IT-LT",
    //                         "url": "/poogi/insight-and-trends/lead-time"
    //                     },
    //                     {
    //                         "id": 63,
    //                         "name": "VectorFlow.Production.InsightTrends.ElapsedTime",
    //                         "code": "VectorFlow.Production.InsightTrends.ElapsedTime",
    //                         "description": "MTO-PR-IT-ET",
    //                         "url": "/production-planning-scheduling/insights-and-trends/elapsed-time"
    //                     },
    //                     {
    //                         "id": 64,
    //                         "name": "VectoFlow.POOGI.InsightTrends.TopFailureReaons",
    //                         "code": "VectoFlow.POOGI.InsightTrends.TopFailureReaons",
    //                         "description": "MTO-POOGI-IT-TFR",
    //                         "url": "/poogi/insight-and-trends/top-failure-reasons"
    //                     },
    //                     {
    //                         "id": 66,
    //                         "name": "VectorFlow.IntelligenceHub.Delivery.BMTrend",
    //                         "code": "VectorFlow.IntelligenceHub.Delivery.BMTrend",
    //                         "description": "MTO-IH-DP-BM",
    //                         "url": "/manufacturing-intelligence-hub/delivery-performance/bm-trends"
    //                     },
    //                     {
    //                         "id": 67,
    //                         "name": "VectorFlow.IntelligenceHub.Delivery.OTIFAnalysis",
    //                         "code": "VectorFlow.IntelligenceHub.Delivery.OTIFAnalysis",
    //                         "description": "MTO-IH-DP-OTIF",
    //                         "url": "/manufacturing-intelligence-hub/delivery-performance/otif-analysis"
    //                     },
    //                     {
    //                         "id": 68,
    //                         "name": "VectorFlow.IntelligenceHub.Delivery.OTANDIF",
    //                         "code": "VectorFlow.IntelligenceHub.Delivery.OTANDIF",
    //                         "description": "MTO-IH-DP-OT-AND-IF",
    //                         "url": "/manufacturing-intelligence-hub/delivery-performance/ot-and-if-analysis"
    //                     },
    //                     {
    //                         "id": 69,
    //                         "name": "VectorFlow.IntelligenceHub.Delivery.LeadTime",
    //                         "code": "VectorFlow.IntelligenceHub.Delivery.LeadTime",
    //                         "description": "MTO-IH-DP-LD",
    //                         "url": "/manufacturing-intelligence-hub/delivery-performance/lead-time"
    //                     },
    //                     {
    //                         "id": 70,
    //                         "name": "VectorFlow.IntelligenceHub.Congestion.ElapsedTime",
    //                         "code": "VectorFlow.IntelligenceHub.Congestion.ElapsedTime",
    //                         "description": "MTO-IH-CA-ET",
    //                         "url": "/manufacturing-intelligence-hub/congestion-analysis/elapsed-time"
    //                     },
    //                     {
    //                         "id": 71,
    //                         "name": "VectorFlow.IntelligenceHub.Congestion.OrderAtRisk",
    //                         "code": "VectorFlow.IntelligenceHub.Congestion.OrderAtRisk",
    //                         "description": "MTO-IH-CA-OAR",
    //                         "url": "/manufacturing-intelligence-hub/congestion-analysis/orders-at-risk"
    //                     },
    //                     {
    //                         "id": 72,
    //                         "name": "VectorFlow.IntelligenceHub.Congestion.OrderBalance",
    //                         "code": "VectorFlow.IntelligenceHub.Congestion.OrderBalance",
    //                         "description": "MTO-IH-CA-OB",
    //                         "url": "/manufacturing-intelligence-hub/congestion-analysis/order-balance"
    //                     },
    //                     {
    //                         "id": 73,
    //                         "name": "VectorFlow.IntelligenceHub.Forward.FOL",
    //                         "code": "VectorFlow.IntelligenceHub.Forward.FOL",
    //                         "description": "MTO-IH-FW-FOL",
    //                         "url": "/manufacturing-intelligence-hub/forward-exceution/fol-summary"
    //                     },
    //                     {
    //                         "id": 74,
    //                         "name": "VectorFlow.IntelligenceHub.Forward.STPL.FK",
    //                         "code": "VectorFlow.IntelligenceHub.Forward.STPL.FK",
    //                         "description": "MTO-IH-FW-STPL-FK",
    //                         "url": "/manufacturing-intelligence-hub/forward-exceution/stpl-and-fullkit"
    //                     },
    //                     {
    //                         "id": 75,
    //                         "name": "VectorFlow.IntelligenceHub.Forward.Day.WiseCoverage",
    //                         "code": "VectorFlow.IntelligenceHub.Forward.Day.WiseCoverage",
    //                         "description": "MTO-IH-FW-DWC",
    //                         "url": "/manufacturing-intelligence-hub/forward-exceution/day-wise-coverage"
    //                     },
    //                     {
    //                         "id": 76,
    //                         "name": "VectorFlow.IntelligenceHub.Forward.RM.PM.Orderwise",
    //                         "code": "VectorFlow.IntelligenceHub.Forward.RM.PM.Orderwise",
    //                         "description": "MTO-IH-FW-RMPM-OW-COV",
    //                         "url": "/manufacturing-intelligence-hub/forward-exceution/rm-pm-order-wise-coverage"
    //                     },
    //                     {
    //                         "id": 77,
    //                         "name": "VectorFlow.IntelligenceHub.Forward.RM.Exp.Supp",
    //                         "code": "VectorFlow.IntelligenceHub.Forward.RM.Exp.Supp",
    //                         "description": "MTO-IH-FW-RM-EXP",
    //                         "url": "/manufacturing-intelligence-hub/forward-exceution/expetiting-rm-supplier"
    //                     },
    //                     {
    //                         "id": 78,
    //                         "name": "VectorFlow.IntelligenceHub.Forward.RM.PM.Buffer.Trend",
    //                         "code": "VectorFlow.IntelligenceHub.Forward.RM.PM.Buffer.Trend",
    //                         "description": "MTO-IH-FW-RM-PM-BUF-TREND",
    //                         "url": "/manufacturing-intelligence-hub/forward-exceution/rm-pm-buffer-trend"
    //                     },
    //                     {
    //                         "id": 79,
    //                         "name": "VectorFlow.IntelligenceHub.ImprovementAreas.Top.Failure.Reason",
    //                         "code": "VectorFlow.IntelligenceHub.ImprovementAreas.Top.Failure.Reason",
    //                         "description": "MTO-IH-IA-TFR",
    //                         "url": "/manufacturing-intelligence-hub/improvement-areas/top-failure-reasons"
    //                     },
    //                     {
    //                         "id": 80,
    //                         "name": "VectorFlow.IntelligenceHub.ImprovementAreas.Trend.Failure.Reason",
    //                         "code": "VectorFlow.IntelligenceHub.ImprovementAreas.Trend.Failure.Reason",
    //                         "description": "MTO-IH-IA-TFFR",
    //                         "url": "/manufacturing-intelligence-hub/improvement-areas/trends-failure-reasons"
    //                     },
    //                     {
    //                         "id": 81,
    //                         "name": "VectorFlow.IntelligenceHub.ImprovementAreas.Resource.WIP",
    //                         "code": "VectorFlow.IntelligenceHub.ImprovementAreas.Resource.WIP",
    //                         "description": "MTO-IH-IA-RS-WIP",
    //                         "url": "/manufacturing-intelligence-hub/improvement-areas/resource-wip-profile"
    //                     },
    //                     {
    //                         "id": 82,
    //                         "name": "VectorFlow. Supply Chain Intelligence Hub. Merchandising Grid",
    //                         "code": "VectorFlow. Supply Chain Intelligence Hub. Merchandising Grid",
    //                         "description": "MTA-MCGRID",
    //                         "url": "/supply-chain-intelligence-hub/merchandising-grid"
    //                     },
    //                     {
    //                         "id": 105,
    //                         "name": "MDM.MTO.control.panel",
    //                         "code": "MDM.MTO.control.panel",
    //                         "description": "MTO-CP",
    //                         "url": "/mto/master-data-management/control-panel"
    //                     },
    //                     {
    //                         "id": 106,
    //                         "name": "MDM.MTO.control.panel.add",
    //                         "code": "MDM.MTO.control.panel.add",
    //                         "description": "MTO-CP-ADD",
    //                         "url": "/mto/master-data-management/control-panel/add"
    //                     },
    //                     {
    //                         "id": 107,
    //                         "name": "MDM.MTO.control.panel.modify",
    //                         "code": "MDM.MTO.control.panel.modify",
    //                         "description": "MTO-CP-MOD",
    //                         "url": "/mto/master-data-management/control-panel/view-modify"
    //                     },
    //                     {
    //                         "id": 108,
    //                         "name": "MDM.MTO.saved",
    //                         "code": "MDM.MTO.saved",
    //                         "description": "MTO-SD",
    //                         "url": "/mto/master-data-management/saved-drafts"
    //                     },
    //                     {
    //                         "id": 109,
    //                         "name": "MDM.MTO.taskPending",
    //                         "code": "MDM.MTO.taskPending",
    //                         "description": "MDM.MTO.TaskP",
    //                         "url": "/mto/master-data-management/task-pending"
    //                     },
    //                     {
    //                         "id": 110,
    //                         "name": "MDM.MTO.taskStatus",
    //                         "code": "MDM.MTO.taskStatus",
    //                         "description": "MDM.MTO.TaskS",
    //                         "url": "/mto/master-data-management/task-status"
    //                     },
    //                     {
    //                         "id": 111,
    //                         "name": "MDM.MTO.dmh",
    //                         "code": "MDM.MTO.dmh",
    //                         "description": "MTO-DMH",
    //                         "url": "/mto/master-data-management/data-modification-history"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 6,
    //                 "name": "VectorConsultant",
    //                 "description": "Must have access to all pages",
    //                 "application_id": 2,
    //                 "code": "VectorConsultant",
    //                 "application_name": "Distribution",
    //                 "urls": [
    //                     {
    //                         "id": 2,
    //                         "name": "vectorFlow : Landing Page",
    //                         "code": "LP",
    //                         "description": "Landing Page",
    //                         "url": "/landing-page"
    //                     },
    //                     {
    //                         "id": 4,
    //                         "name": "Task Pending for Review",
    //                         "code": "TPR",
    //                         "description": "Adding Task Pending for Review page",
    //                         "url": "/masters-interceptor/task-pending"
    //                     },
    //                     {
    //                         "id": 11,
    //                         "name": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "code": "MDM-TP",
    //                         "description": "VectorFlow. Master Data Management. Task Pending For Review",
    //                         "url": "/master-data-management/task-pending"
    //                     },
    //                     {
    //                         "id": 27,
    //                         "name": "OverAll BM Report",
    //                         "code": "OBMR",
    //                         "description": "Over all BM Report Page",
    //                         "url": "/production-planning-scheduling/overall-bm-report"
    //                     },
    //                     {
    //                         "id": 28,
    //                         "name": "profile",
    //                         "code": "profile",
    //                         "description": "profile",
    //                         "url": "/profile"
    //                     },
    //                     {
    //                         "id": 30,
    //                         "name": "BM Trend",
    //                         "code": "BM-TREND",
    //                         "description": "BM trend page will be visible",
    //                         "url": "/production-planning-scheduling/insight-and-trends/bm-trends"
    //                     },
    //                     {
    //                         "id": 31,
    //                         "name": "DDQ",
    //                         "code": "DDQ",
    //                         "description": "DDQ URL",
    //                         "url": "/production-planning-and-scheduling/due-date-quotation"
    //                     },
    //                     {
    //                         "id": 32,
    //                         "name": "Deptwise BM Report",
    //                         "code": "Dept BM",
    //                         "description": "Deptwise BM Report URL",
    //                         "url": "/production-planning-scheduling/deptwise-bm-report"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const agGridProps: AgGridReactProps = {
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            pagination: true,
            defaultColDef: {
                cellRendererParams: {
                    isWip: isWIPChecked,
                    reasonData: reasonData,
                    // rolesData: rolesData
                },
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                cellStyle: {
                    'textAlign': 'center',
                    //'height': '50px',
                    //"font-style": "Roboto",
                    //"font-variant": "normal",
                    "fontSize": "18px",
                    "fontFamily": "Roboto",
                    'whiteSpace': 'nowrap',
                    'resizable': 'true',
                    'color': '#000'
                },
                floatingFilterComponentParams: {
                    suppressFilterButton: true
                }
            },
        },
        sideBar: sideBar,
        masterDetail: true,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        pivotMode: false,
        onCellValueChanged: (params) => onCellValueChanged(params.data),
    }

    const onCellValueChanged = (newRow: any) => {
        if (newRow.maj !== null) {
            unsavedUserData.current.set(newRow.ok, newRow);
        } else {
            unsavedUserData.current.delete(newRow.ok);
        }
    }

    const customHeader = {
        RemarksHistory: {
            pinned: "right",
            minWidth: 120,
            lockPosition: true,
            cellRenderer: RemarkHistoryRenderer,
            cellRendererParams: {
                onClick: (oid: string) => handleModal(oid)
            }
        },
        MajorReason: {
            pinned: "right",
            lockPosition: true,
            initialWidth: 300,
            cellStyle: {
                'background': 'none',
                'border': "none",
            },    
            cellRenderer: (props: any) => {
                return <CustomCellEditor {...props} selectedValue={props.data.maj} selectedMinorReason={props.data.min}
                />
            }
        },
        MinorReason: {
            pinned: "right",
            lockPosition: true,
            minWidth: 300,
            cellStyle: {
                'background': 'none',
                'border': "none",
            },
            cellRenderer: (props: any) => {
                return <CustomCellEditor {...props} selectedValue={props.data.maj} selectedMinorReason={props.data.min}
                />
            },

        },
        ElapsedDays: {
            cellStyle: {
                'color': ColorsMTO.Pink.code
            }
        },
        PlannedReleaseDate: {
            cellRenderer: PlannedReleaseRenderer,
        },
        QuotedDueDate: {
            cellRenderer: PlannedReleaseRenderer,
        },
        BPP: {
            cellRenderer: BPPRenderer,
        }
    }

    //to get the header data from api
    const getHeaderData = async () => {
        try {
            const response = await getUIConfigData(reportName);
            getColDef(response);
            setColDef(getColumnDefinations(response.data.data, customHeader))
        }
        catch (e) {
            console.log(e);
        }
    }

    //to get the rowdata for Aggrid
    const getInitialData = async (wipval = isWIPChecked, page = 1, isExcelExport = false) => {
        if (isExcelExport) {
            try {
                const headersdata = currentGridRef?.current?.api.getColumnState();
                const formattedFilters = formatFilterJSON(appliedFilters);
                const body = getBodyForExcelExport({ headersdata, appliedFilters: formattedFilters, colDefMap });
                const apiResponse = await getPoogiReasonsDelayedOrderExcelExport({ wip: wipval == true ? 1 : 0, body, isExcelExport: 1, report_name: FilterPageName.Poogi_Reason_For_Delayed_Orders })
                if (apiResponse.status == 200) {
                    DownloadExcel(apiResponse, FilterPageName.Poogi_Reason_For_Delayed_Orders)
                } else {
                    notifyError("Error downloading")
                }
            } catch (error) {
                notifyError("An error occurred")
                console.log(error)
            }
        } else {

            try {
                const formatedFilters = formatFilterJSON(appliedFilters);
                const apiResponse = await getPoogiReasonsDelayedOrder({ 'wip': wipval === true ? 0 : 1, 'curr': page, appliedFilters: formatedFilters });
                setRowDataCount(apiResponse.data?.data?.count);
                setRowData(apiResponse?.data?.data?.results);
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    //to handle the modal for remark
    const handleModal = async (data: any) => {
        try {
            if (data.r.length === 0) {
                const RemarkHistory = await getPoogIRemarks(data.ok)
                if (RemarkHistory.data?.data === 'No remarks are present for the order') {
                    data.r = []
                }
                else {
                    data.r = RemarkHistory.data?.data;
                }
            }
            setRemarkHistory(data.r)
            setIsRemarkHistoryOpen(true)
        }
        catch (e) {
            console.log(e);
        }

    }

    const getUserColumnConfig = async () => {
        try {
            const data = await getUserUIReportConfigData({
                un: user.user.name,
                rn_id: UIGridCode.PoogiReasonForDelayedOrders
            });
    
            const newConfig = data?.data?.data[0]?.columns_settings ? JSON.parse(data?.data?.data[0]?.columns_settings) : [];
            setColumnState(newConfig);
    
            if (!data) {
                console.error('Failed to apply column state');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveClick = async (coldefs?: any) => {
        try {
            if (coldefs) {
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.PoogiReasonForDelayedOrders,
                    cs: JSON.stringify(coldefs),
                };
                await updateUserUIReportConfigData([payload]);
                setColumnState([...coldefs]);
        
            } else {
                if (currentGridRef?.current?.api) {
                    const config = currentGridRef?.current?.api?.getColumnState() || [];
        
                    const payload = {
                        un: user.user.name,
                        rn_id: UIGridCode.PoogiReasonForDelayedOrders,
                        cs: JSON.stringify(config)
                    }
                    await updateUserUIReportConfigData([payload]);
                    await getUserColumnConfig();
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleResetClick = () => {
        setIsReset(true);
    }

    const getFilterData = async () => {
        try {
            const response = await getPageWiseFilterData({ page_name: FilterPageName.Poogi_Reason_For_Delayed_Orders, isAssigned: isWIPChecked ? 0 : 1 });
            setFilterData(response?.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getHeaderData();
    }, []);
    
    useEffect(() => {
        if (Object.entries(appliedFilters).length) {
            setCurrentPage(1);
            getInitialData();
        }
    }, [appliedFilters])
    
    useEffect(() => {
        getFilterData();
    }, [isWIPChecked])

    const checkForNullMinid = async (data: any): Promise<any> => {
        return new Promise((resolve) => {
            const hasNullMinid = data.find((item: any) => item.minid === null);
            resolve(hasNullMinid);
        });
    };

    const updateMajorMinorReason = async () => {
        let putData: MyObject[] = [];

        unsavedUserData.current.forEach((updatedRow) => {
            const singleData: any = {
                'ok': updatedRow.ok,
                minid: null,
                majid: null
            }
            if (updatedRow.maj) {
                singleData['majid'] = Number(updatedRow.maj);
                if (updatedRow.min) {
                    singleData.minid = Number(updatedRow.min);
                }
                putData.push(singleData);
            }
        });

        if (putData.length === 0) {
            notifyError("Please Select Reason")
        } else {
            const checkData = async () => {
                const result = await checkForNullMinid(putData);
                // Execute further code if `minid` is null
                if (result) {
                    // Place your further code here
                    notifyError('Please select Minor Reason For Order Id: ' + result.ok.split("_")[0]);
                } else {
                    const RemarkHistory = await updatePoogiRemarks(putData);
                    if (RemarkHistory.status == 200) {
                        toast.dismiss();
                        notifySuccess('Successfull');
                        if (isWIPChecked) {
                            getInitialData(isWIPChecked, 1)
                        }
                        unsavedUserData.current.clear();
                        putData = [];
                    }
                }
            };

            checkData();
        }
    }

    const handlePageChange = (currPage: number) => {
        setCurrentPage(currPage);
        getInitialData(isWIPChecked, currPage);
    }

    const updateUserChanges = (params: any) => {
        if (unsavedUserData.current.size > 0) {
            // Update grid
            params.api.forEachNode((node: any) => {
                unsavedUserData.current.forEach((updatedRow) => {
                    if (node.data.ok === updatedRow.ok) {
                        node.setData(updatedRow);
                    }
                }); 
            });
        }
    }
    
    useEffect(() => {
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
            const result = currentGridRef?.current?.api?.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    },[columnState]);

    useEffect(() => {
        if (isReset) {
            handleSaveClick(masterUIConfig);
            setIsReset(false);
        }
    }, [isReset]);

    useEffect(() => {
        if (colDef.length > 0) {
            if (currentGridRef?.current) {
                setMasterUIConfig(currentGridRef?.current.api.getColumnState());
                getUserColumnConfig();
            }
        }
    }, [colDef]);
      
    // if (!rowData) {
    //     return null;
    // }

    const ExcelData = () => {
        getInitialData(isWIPChecked, 0, true);
    }


    return (
        <div>
            <MTOActionToolBar
                quickFilter={
                    <div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}>
                        <Checkbox checked={isWIPChecked} onChange={(e) => setWIPChecked(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>
                            Show Only Unassigned Orders
                        </strong>
                    </div>
                }
                isAddFilterButton
                themeUi={themeUi}
                isExcelExport
                onExcelExportClick={ExcelData}
                handleSaveClick={handleSaveClick}
                handleResetClick={handleResetClick}
                isFilterOpen={isFilterOpen}
                onAddFilter={onAddFilter}
                toggleFilter={toggleFilter}
                onApplyFilter={onApplyFilter}
                multiFilter={currFilter}
                setMultiFilter={setCurrFilter}
                onFilterRemove={onFilterRemove}
                isMfgSelected={isMfgSelected}
            />
            {(isPoogiReasonsDelayedOrder || isUpdateUserConfig || isGetUserConfig || isGetPoogiMajorMinorReason || isPutPoogiRemarks) && (<OverlayLoader />)}
            <Wrapper>
                <VFTable
                    {...agGridProps}
                    paginationPageSize={10}
                    height='480px'
                    columnDefs={colDef}
                    rowData={rowData}
                    pagination={false}
                    ref={tableRowRef}
                    onGridReady={(params: any) => {
                        params?.api.autoSizeAllColumns();
                        setCurrentGridRef(tableRowRef);
                    }}
                    onRowDataUpdated={(params: any) => { updateUserChanges(params); }}
                    maintainColumnOrder
                    onFilterChanged={()=>{Object.keys((currentGridRef?.current?.api?.getFilterModel()))?.length>0 ? setIsDisabled(false) : setIsDisabled(true)}}
                />
                <VFPagination
                    selectedRows={0}
                    rowsPerPage={pagination.mtoPageSize}
                    totalRows={rowDataCount}
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                    resetGridRef={currentGridRef}
                    isDisabled={isDisabled}

                />
                
                <VFSaveRemark onSubmitRemarks={updateMajorMinorReason} />
                

                {/* <SaveBtnWrapper>
                    <SaveBtn onClick={() => updateMajorMinorReason()}>
                        Save Reasons
                    </SaveBtn>
                </SaveBtnWrapper> */}

                <MTORemarkHistoryModal
                    data={remarkHistory}
                    isOpen={isRemarkHistoryOpen}
                    onClose={() => setIsRemarkHistoryOpen(false)}
                />
            </Wrapper>
            
        </div>

    )
}

export default ReasonForDelayOrder;