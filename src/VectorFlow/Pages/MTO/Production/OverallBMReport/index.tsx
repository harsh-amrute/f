import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MTOActionToolBar from "../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import {
  BMDepWrapper,
  BMDepHeaderWraper,
  VFWrapper,
} from "../DepartmentWiseBMReport/styles";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "../../Common/SplitGraphContainer/styles";
import { Allotment } from "allotment";
//import BPRRemarkHistoryModal from '../DepartmentWiseBMReport/MTORemarkHistoryModal';
// import useViewPort from '../../../../../hooks/useViewPort';
//import { useUserData } from '../../../../../context';
import { AgGridReactProps } from "ag-grid-react";
import BPPRenderer from "../../Common/BPRRenderer/BPPRenderer";
import AgeingCellRenderer from "../DepartmentWiseBMReport/AgeingIconCellRenderer";
//import customCellRenderer from '../DepartmentWiseBMReport/CustomCellRenderer';
import RemarkHistoryRenderer from "../DepartmentWiseBMReport/RemarkHistoryRenderer";
import GridView from "../DepartmentWiseBMReport/GridView";
import OrderElapsedGrid from "../DepartmentWiseBMReport/OrderElapsedGrid";
import {
  useGetOverAllBMReport,
  useShortOrderCompleteOrder,
} from "../../../../Services/MTO/Production/OverallBMReport/index";
import {
  notifyError,
  notifyLoader,
  notifySuccess,
} from "../../../../../helpers/notify";
import { useGetBOMExplosionData } from "../../../../../VectorFlow/Services/MTO/Common/BOMExplosion";
import { useGetPoogiRemarks } from "../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index";
import BPRRemarkHistoryModal from "../DepartmentWiseBMReport/MTORemarkHistoryModal";
import {
  useGetDeptWiseWipData,
  useGetHighAgeingData,
} from "../../../../../VectorFlow/Services/MTO/Production/DepartmentWiseBMReport/index";
import { IRowNode } from "ag-grid-enterprise";
import OverlayLoader from "../../Common/Loader";
import { ColorsMTO } from "../../Common/Colors";
import { useGetFilterData } from "../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import useFilter from "../../../../../hooks/useFilter";
import { formatFilterJSON, getColumnDefinations,DownloadExcel, getBodyForExcelExport } from "../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { FilterPageName, UIGridCode } from "../../Common/Enum";
import { useDispatch } from "react-redux";
import { BM_REPORT_ANALYTICS } from "../../../../../redux/actions/MTO";
import { modifyAnalyticsData } from "../DepartmentWiseBMReport/helper";
import { useGetDBRsettingsData } from '../../../../Services/MTO/Common/DBRSettings';
import _ from "lodash";
import {
  useGetUserUIConfigData,
  useUpdateUserUIConfigData,
} from "../../../../../VectorFlow/Services/MTO/Common/UserUIConfig";
import { useUserData } from "../../../../../context";
import { useGetDate } from "../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/RMPMExpediting";
import moment from "moment";
import VFSelect from "../../../../../../src/components/VectorFLOW/commons/MTO/VFSelect";
import ConfirmationModal from "./ConfirmationModal";
import { InputCheckBox } from "./styles";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import BomExcelModal from "../../Common/BomExcelModal";
import useColDef from "../../../../../hooks/useColDef";


interface ApiResponse {
  cc: string;
  cp: number;
  hd: string;
  v: boolean;
  cla: string;
  scc: string;
  children?: ApiResponse[];
  cgs?: string;
  pinned?: string;
  dt?: string;
}

interface ColDefChild {
  field: string;
  headerName: string;
  colId: string;
  cellRenderer?: string;
  initialWidth?: number;
  floatingFilter?: boolean;
  columnGroupShow?: string;
  pinned?: any;
  cellRendererParams?: {
    onClick?: (data: string) => Promise<void>;
  };
}

type orderkeyObj = {
  ok: [];
};

interface Orders {
  [key: string]: OrderItem; // Order ID as the key
}

interface OrderItem {
  tq: number;
  li: string;
  [key: string]: number | string | DepartmentData; // Allow additional properties like departments
}
interface DepartmentData {
  woh: number;
  mfg: number;
  int: number | null;
  out: number;
}

interface ApiResponseItem {
  cc: string; // Main category code
  v: boolean; // Visibility flag
  cp?: number; // Main category property (optional since it will be added)
  hd: string; // Header description (will be set to the name of cc)
  cla: string; // Class alignment (fixed value)
  scc: string; // Sub-channel code (will be set to the name of cc)
  ch?: ApiResponse[]; // Array of channel items
  pinned?: string; // Pin property
  dt?: string;
}

const APIFilterConfig = {
  filSecVisConfig: {
    Prod_OverAll_BMReport: {
      mjr: false,
      or: true,
      res: true,
      cus: true,
    },
  },
};

const OverallBmReport = () => {
  const { mutateAsync: getOverallBMReportData} = useGetOverAllBMReport();
  const { mutateAsync: getBOMExplosionData /*isLoading :BombDataLoading*/ } =
    useGetBOMExplosionData();
  const { mutateAsync: getDBRsettingsData} = useGetDBRsettingsData();
  const { mutateAsync: getHighAgeingData } = useGetHighAgeingData();
  const { mutateAsync: getDeptWiseWipData } = useGetDeptWiseWipData();
  const { mutateAsync: getPoogIRemarks } = useGetPoogiRemarks();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData();
  // const { screenHeight } = useViewPort();
  const refGraph2 = useRef<any>(null);
  const allotementRef = useRef<any>(null);

  const [coldefs, setColdef] = useState<any>();

  const [gridData, setGridData] = useState<any>();
  const [gridDataCount, setGridDataCount] = useState<number>(0);
  const rowsSelected = useRef(false);
  const [isRemarkHistoryOpen, setIsRemarkHistoryOpen] =useState<boolean>(false);
  const [remarkHistory, setRemarkHistory] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cache = useRef<any>({});
  // for save and reset
  const [isReset, setIsReset] = useState<any>();
  const [columnState, setColumnState] = useState<any>();
  const [masterUIConfig, setMasterUIConfig] = useState([]);
  const [isPivot, setIsPivot] = useState<any>(false);
  const [userConfigFetched, setUserConfigFetched] = useState<any>(false);
  const [orderClosingEnable, setorderClosingEnable] = useState<any>();
  const { getGroupedColDef, groupedColDefsRef } = useColDef();

  const [masterSelectedRowData, setMasterSelectedRowData] = useState<any>(
    () => {
      return [];
    }
  );
  const [deptWiseWipData, setDeptWiseWipData] = useState<any>();
  
  const [deptName, setDeptName] = useState<any>([]);
  const [isOrderElapsedGrid, setIsOrderElapsedGrid] = useState<boolean>(false);
  const [filterData, setFilterData] = useState({});
  const [systemType, setSystemType] = useState<any>();
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  

  const { mutateAsync: getPageWiseFilterData /*isLoading*/ } =
  useGetFilterData();
  const {
    state: currFilter,
    setState: setCurrFilter,
    onFilterRemove,
    isFilterOpen,
    isMfgSelected,
    onAddFilter,
    onApplyFilter,
    toggleFilter,
    appliedFilters,
  } = useFilter(
    filterData,
    APIFilterConfig.filSecVisConfig.Prod_OverAll_BMReport
  );
  const [highAgeing, sethighAgeing] = useState<any>();
  const [tempColdef, setTempColdef] = useState<any>();

  const [bomHeader, setBomHeader]= useState([])
  const [bomActive, setBomActive] = useState<any>(undefined);
  const ReportName='BomExplosion'



  const { mutateAsync: getUserUIConfigData, isLoading: isGetStateLoading } =
    useGetUserUIConfigData();
  const { mutateAsync: updateUserUIConfigData, isLoading: isUpdateUserConfig } =
    useUpdateUserUIConfigData();

  const {
    mutateAsync: getShortOrderCompleteOrder,
    isLoading: isShortOrderCompleteOrder,
  } = useShortOrderCompleteOrder();

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui; 

   
  const dispatch = useDispatch();
  const [userPageSize, setUserPageSize] = useState<any>();

  useEffect(() => {
    try {
      getOverallBMReportData({ page: 1, appliedFilters, analytics: 1 }).then(
        (data) => {
          const response: any = data?.data?.data;
          if (response) {
            const analytics = modifyAnalyticsData(response);
            dispatch(BM_REPORT_ANALYTICS(analytics));
          }
        }
      );
    } catch (e) {
      dispatch(BM_REPORT_ANALYTICS([]));
    }
  }, []);

  useEffect(() => {
    if (coldefs) {
      const tempcoldeflatest = _.cloneDeep(coldefs);
      tempcoldeflatest.shift();
      tempcoldeflatest.shift();
      setTempColdef(tempcoldeflatest);
    }
  }, [coldefs]);


  const onOpenRemarkHistory = async (data: any) => {
    // Function implementation for remark history
    try {
      //console.log('data.rm', data.rm.length)
      // if (data.rm.length === 0) {
      const RemarkHistory = await getPoogIRemarks(data.ok);
      //console.log('RemarkHistory', RemarkHistory?.data?.data)
      if (RemarkHistory.data?.data === "No remarks are present for the order") {
        data.rm = [];
      } else {
        data.rm = RemarkHistory.data?.data;
      }
      // }
      setRemarkHistory(data.rm);
      setIsRemarkHistoryOpen(true);
    } catch (e) {
      console.log(e);
    }
    setIsRemarkHistoryOpen(true);
  };

  const getSystemType = async () => {
    const DBRSettingsData: any = await getDBRsettingsData();
    const DBRSettings = DBRSettingsData.data?.data;
    const BomFlag = DBRSettings?.find((data: any) => data.flag === "BOMActive" && data.value==1);
    if(BomFlag){
        setBomActive(true)
    }
    else {
      setBomActive(false)
    }
    const orderClosingEnable = DBRSettings?.find((data: any) => {
      return data.flag == "CloseOrdersFromUI";
    });
    
    setorderClosingEnable(orderClosingEnable?.value);
    setSystemType(Number(systemType?.value || 0));
  };

   useEffect(()=>{
    if(bomActive != undefined){
      setColumnDef();
    }
    },[bomActive])

  const setColumnDef = async () => {
    try {
      const reportName = "BMReport";
      const response = await getUIConfigData(reportName);
      getGroupedColDef(response)
      

      const modifiedResponse: ApiResponseItem[] = addDefaultAttributes(
        response?.data?.data
      );

     
      const coldef = mapApiResponseToColDefs(modifiedResponse);
      setColdef(coldef);
    } catch (e) {
      console.log(e);
    }
  };
  
  const addDefaultAttributes = (
    apiResponse: ApiResponseItem[]
  ): ApiResponseItem[] => {
    const modifiedResponse: ApiResponseItem[] = [];
    const cpMap: { [key: string]: number } = {};

    // Create the specified default objects for the item's ch array

    const defaultSecondObject: any = {
      cc: "ic",
      cp: 2,
      hd: "",
      v: true,
      cla: "centre",
      scc: "ic",
    };

    apiResponse.forEach((item) => {
      const modifiedItem = { ...item };
      // Initialize cp for this cc if not already done
      if (!(item.cc in cpMap)) {
        cpMap[item.cc] = 3; // Start from 3 since 1 and 2 are taken by default objects
      }
      // Add new properties to the outer object
      modifiedItem.cp = cpMap[item.cc]++;
      modifiedItem.hd = item.hd || item.cc; // Set hd to the name of cc
      modifiedItem.cla = "Centre"; // Fixed value
      modifiedItem.scc = item.scc; // Set scc to the name of ccc

 
  

      if (item.cc) {
        if (item.cc.includes("Dept") && modifiedItem.ch) {
          modifiedItem.ch = item.ch?.map((child) => {
            return { ...child, scc: `ddtl.${item.cc}.${child.scc}` };
          });
        }

      }

      // If it's the first object, add default items to the ch array

      // Push the modified item to the response array
      modifiedResponse.push(modifiedItem);
    });
    // Add a default object outside each main object
    const defaultOuterObject: ApiResponseItem = {
      cc: "chckbx",
      v: true,
      cp: 0,
      hd: "",
      cla: "Centre",
      scc: "chckbx",
      pinned: "left",
    };

    // Prepend the default outer object
    modifiedResponse.unshift(defaultOuterObject);

    // Calculate cp for the additional object based on existing cp values
    const maxCp = Math.max(...modifiedResponse.map((item) => item.cp || 0));

    // Create the additional object to be added at the end
    const additionalObject: ApiResponseItem = {
      cc: "",
      cp: maxCp + 1, // Set cp based on the maximum cp value
      hd: " ",
      v: true,
      cla: "Centre",
      scc: "rmk",
      pinned: "right",
      ch:[]
    };


    // const short_complete_OrderColumn: ApiResponseItem = {
    //     cc: "oca",
    //     cp: maxCp + 2,
    //     hd: "Order Close Action",
    //     v: true,
    //     cla: "Centre",
    //     scc: "oca",
    //     ch: [],
    // }
    const short_complete_OrderColumn: ApiResponseItem = {
      cc: "",
      cp: maxCp + 2, // Set cp based on the maximum cp value
      hd: " ",
      v: true,
      cla: "Centre",
      scc: "",
      pinned: "right",
      ch: [
        {
          cc: "ct",
          cp: maxCp + 2,
          hd: "Order Close Action",
          v: true,
          cla: "Centre",
          scc: "ct",
          pinned: "right",
        },
      ],
    };

    // Add the additional object to the end of the modified response
    modifiedResponse.push(additionalObject);

    if (orderClosingEnable) modifiedResponse.push(short_complete_OrderColumn);

    return modifiedResponse;
  };

  interface ActionOption {
    value: string;
    label: string;
  }

  const actionOptions: ActionOption[] = [
    { value: "Short Close", label: "Short Close" },
    { value: "Complete Close", label: "Complete Close" },
  ];

  // const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [textAction, setTextAction] = useState<any>();

  const [totalOrderCount, setTotalOrderCount] = useState<any>(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const debouncedRef = useRef<any>(null);
  const onCheckBoxToggle = (e: any) => {
    const isChecked = e.target.checked;
    
    if (debouncedRef.current) {
      debouncedRef.current.cancel();
    }
    debouncedRef.current = _.debounce(() => {
     setIsCheckboxChecked(isChecked);
      if (refGraph2.current?.api) {
        refGraph2.current.api.deselectAll();
  
        if (isChecked) {
          refGraph2.current.api.forEachNodeAfterFilterAndSort((node: any) => {
            node.setSelected(true);
          });
        }
      }
      getSelectedRow();
    }, 300); 
    debouncedRef.current();
  };
  

  const toggleCheckBox = () => {
    const selectedNodes = refGraph2?.current?.api?.getSelectedRows();
    const totalRows = refGraph2?.current?.api?.getDisplayedRowCount();

    setIsCheckboxChecked(totalRows > 0 && selectedNodes?.length === totalRows);
  };

  const handleActionChange = (option: any) => {
    setSelectedAction(option);
    // const mySelectedNodes = refGraph2.current.api.getSelectedRows();
    const newData: any = [];
    gridData?.forEach((ele: any) => {
      const newEle = _.cloneDeep(ele);
      newEle.oca = option.value;
      newData.push(newEle);
    });

    setGridData([...newData]);
  };

  const updateActionAPI = async (action: string, order_ids: any) => {
    try {
      if (action === "undo") {
        const response = await getShortOrderCompleteOrder({
          order_keys: order_ids,
        });
        return response;
      } else {
        const response = await getShortOrderCompleteOrder({
          close_type: action === "Short Close" ? "0" : "1",
          order_keys: order_ids,
        });
        return response;
      }
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  const [showModal, setShowModal] = useState(false); // Renamed state

  const handleRightArrowClick = () => {
    setShowModal(true); // Open the modal
    setTextAction(selectedAction?.label);

    if (Array.isArray(masterSelectedRowData)) {
      const okValues = masterSelectedRowData
        .map((item) => item?.ok)
        .filter((value) => value !== undefined);

      setTotalOrderCount(okValues.length);
    }
  };

  const handleRightArrowClick1 = (action: string, orderId: string) => {
    setShowModal(true); // Open the modal
    setTextAction(action);
    setTotalOrderCount(orderId);
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
  };

  const handleModalConfirm = async (orderId?: any, actionText?: any) => {
    try {
      setShowModal(false);

      if (orderId && orderId !== "") {
        const response = await updateActionAPI(actionText, [orderId]);

        if (response?.status === 200) {
          notifySuccess("Order closed successfully!");

          const newGridData = [...gridData];
          newGridData.forEach((ele: any) => {
            if (!_.isEmpty(ele)) {
              if (ele.ok === orderId) ele.ct = actionText;
            }
          });
          setGridData(newGridData);
        } else {
          notifyError("Something went wrong!");
        }
      } else if (Array.isArray(masterSelectedRowData)) {
        const okValues = masterSelectedRowData
          .map((item) => item?.ok)
          .filter((value) => value !== undefined);

        const response = await updateActionAPI(selectedAction.value, okValues);

        if (response?.status === 200) {
          const newGridData = [...gridData];
          newGridData.forEach((ele: any) => {
            if (!_.isEmpty(ele)) {
              if (okValues.includes(ele.ok)) {
                ele.ct = actionText;
              }
            }
          });
          setGridData(newGridData);
          setMasterSelectedRowData([]); // after short/complete close reset selected rows

          notifySuccess("Order closed successfully!");
        } else {
          notifySuccess("something went wrong!");
        }
      }
    } catch (error) {
      console.error("Failed to perform action:", error);
    }
  };

  const undoClicked = async (props: any, orderId: string) => {
    console.log(props)
    try {
      const response = await updateActionAPI("undo", [orderId]);
      if (response?.status === 200) {
        notifySuccess("Order retrived succesfully! ");
        const newGridData: any = [];
        props.api.forEachNode((node: any) => {
          newGridData.push(node.data);
        });

        newGridData?.forEach((ele: any) => {
          if (!_.isEmpty(ele)) {            
            if (ele.ok === orderId) {
              ele.ct = null;
              ele.oca = null;
            }
          }
        });
        setGridData(newGridData);
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      console.log("Error occurred while updating action:", error);
      throw error;
    }
  };

  const isRightArrowEnabled =
    (isCheckboxChecked || masterSelectedRowData.length > 1) &&
    selectedAction != null;

  const DropdownArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
    </svg>
  );

  const OrderCloseHeader: any = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "bold",
          gap: "15px",
        }}
      >
        {/* Checkbox and Select */}
        <div
          style={{
            borderRadius: "5px",
            background: "white",
            padding: "10px 30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(133, 132, 132, 0.247) -5px 4px 10px",
            gap: "10px",
          }}
        >
          <InputCheckBox
            onChange={onCheckBoxToggle}
            type="checkbox"
            theme={themeUi}
            disabled={isPivot}
            checked={isCheckboxChecked}
          />
          <VFSelect
            options={actionOptions}
            themeUi={themeUi}
            icon={DropdownArrowIcon}
            disabled={!(refGraph2.current?.api?.getSelectedRows()?.length > 0)}
            placeholder="Select Action"
            value={selectedAction}
            onChange={handleActionChange}
          />
        </div>

        {/* Right Arrow - Disabled if Checkbox is Unchecked */}
        <VFButton
          data-testid={"isReleaseBtn"}
          onClick={() => handleRightArrowClick()}
          themeUi={themeUi}
          disabled={false}
          style={{
            cursor: isRightArrowEnabled ? "pointer" : "not-allowed",
            height: "50px",
            width: "60px",
            borderRadius: "3px",
            opacity: isRightArrowEnabled ? 1 : 0.5, // Visual cue for disabled
            pointerEvents: isRightArrowEnabled ? "auto" : "none", // Prevent click when disabled
          }}
        >
          <img
            src="/assets/img/rightArrowHorizontal.svg"
            height={13}
            width={7}
          />
        </VFButton>

        {/* Confirmation Modal */}
        {/* <ConfirmationModal
      key={1}
        isOpen={showModal}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Close Order"
        message="Are you sure?"
        actionText={selectedAction?.label||"action"}
        orderCount={totalOrderCount}
      /> */}
      </div>
    </>
  );

  const onSelectChange = (props: any, option: any, index: number) => {
  
    const updatedData = { ...props.data, oca: option.value };
    props.node.setData(updatedData); 
    props.api.refreshCells({ rowNodes: [props.node], columns: ['oca'], force: true });

};

  const DropDownCellRenderer = (props: any) => {
    return (
      <>
        
        {!_.isEmpty(props.data) && props.data?.ct === null ? (
          <>
          <VFSelect
              options={actionOptions}
              themeUi={themeUi}
              icon={DropdownArrowIcon}
              placeholder="Select Action"
              disabled={!props.node.selected}
              value={
                props.node.selected ? 
                  actionOptions.find((opt) => opt.value === props.data?.oca) :
                  null}
              onChange={(option: any) => {
              if (option) {
              onSelectChange(props, option, props.node.rowIndex);
              }
            }}
          />

            <div
              style={{
                cursor:
                  props.data?.oca && props.node.selected
                    ? "pointer"
                    : "not-allowed",
                opacity: props.data?.oca && props.node.selected ? 1 : 0.5,
                background:
                  props.data?.oca && props?.node?.selected
                    ? `linear-gradient(to right, ${ColorsMTO.darkPink.code}, ${ColorsMTO.Pink.code})`
                    : "#ccc",
                height: "43px",
                width: "59px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-testid="isReleaseBtn"
              onClick={() => {
                if (props.data?.oca && props.node.selected) {
                  handleRightArrowClick1(
                    props.data.oca === "Short Close"
                      ? "Short Close"
                      : "Complete Close",
                    props.data.ok
                  );
                }
              }}
            >
              <img
                src="/assets/img/rightArrowHorizontal.svg"
                height={13}
                width={7}
                alt="Right Arrow"
              />
            </div>
          </>
        ) : (
          <>
          {!_.isEmpty(props.data) && 
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                margin: "10px",
              }}
            >
                {
                  props?.data?.ct &&
                  <>
                    <p>{props.data?.ct}</p>
                    <div
                      onClick={() => {
                        undoClicked(props, props.data.ok);
                      }}
                      style={{
                        marginLeft: "10px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{
                          transform: "rotateY(180deg)",
                          margin: "4px",
                          cursor: "pointer",
                        }}
                        src="/assets/img/VectorFLOW/reset.svg"
                        alt="Undo"
                        title="Undo"
                        height={14}
                        width={14}
                      />
                    </div>
                  </>
                }
              
            </div>
          }
          </>
          )}
          
      </>
    );
  };

  const excelColorArr = ["Black", "Red", "White", "Green", "Yellow", "Blue"]


  const mapApiResponseToColDefs = (apiResponse: ApiResponseItem[]): any => {
    const mapChildren: any = (
      parent: any,
      children: ApiResponse[]
    ): ColDefChild[] => {
      return children.map((child: ApiResponse) => ({
        field: child.scc.trim(),
        headerName: child.hd,
        colId: `${parent}-${child.cc}`,
        initialHide: !child.v,
        suppressHeaderFilterButton: true,
        filter:
        (child.dt === "number" || child.dt === "decimal")
          ? "agNumberColumnFilter"
          : child.dt === "date"
            ? "agDateColumnFilter"
              : "agMultiColumnFilter",
        
        pinned: child.cc === "ct" ? "right" : null,
        cellRenderer:
          child.cc === "ec" && bomActive
            ? "agGroupCellRenderer"
            : child.cc === "ic"
            ? "AgeingCellRenderer"
            : child.cc === "BPP"
            ? "colorCellRenderer"
            : child.cc === "RemarkHistory"
            ? "RemarkHistoryRenderer"
            : child.cc === "ct"
            ? "DropDownCellRenderer"
            : undefined,
        minWidth:
          child.cc === "ec" || child.cc === "ic" || child.scc === "bpp"
            ? 80
            : 150,
        // columnGroupShow: index > 2 ? "open" : undefined,
        floatingFilter:
          child.cc === "ec" ? false : child.cc === "ic" ? false : true,
        valueFormatter: (params: any) => {
          if (params.value) {
              const format = (process.env.REACT_APP_NUMBER_FORMAT || '').toUpperCase();
              const locale = format === 'USA' ? 'en-US' : format === 'IND' ? 'hi-IN' : undefined;
        
              if (child.dt === 'number') {
                  return locale ? params.value.toLocaleString(locale) : params.value;
              }
        
              if (child.dt === 'decimal') {
                const fixedValue = parseFloat(params.value.toFixed(2)); 
                return locale ? fixedValue.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :fixedValue;
              }
        
              return params.value;
          }
        }, 
        filterParams: {
          buttons: ['reset'], 
          comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => {
            if (!cellValue) return -1;
          
            const cellDate = new Date(cellValue);
            if (isNaN(cellDate.getTime())) return -1;
          
            const cellDateOnly = new Date(
              cellDate.getFullYear(),
              cellDate.getMonth(),
              cellDate.getDate()
            );
          
            if (cellDateOnly < filterLocalDateAtMidnight) return -1;
            if (cellDateOnly > filterLocalDateAtMidnight) return 1;
            return 0;
          }
          
        },
        cellRendererParams: child?.hd.includes("Remark") ? {
          onClick: child?.cc === 'RemarkHistory' ? (data: string) => onOpenRemarkHistory(data) : undefined
        } : undefined,
  
        cellClassRules:
          child.cc === "BPP" && excelColorArr.reduce(
            (acc, color) => ({
              ...acc,
              [color]: (params: any) => !_.isEmpty(params.data) && params.data?.cl === color
            }),
            {}
          ),
        cellStyle:
          child.cc === "Remark"
            ? {
                justifyContent: child.cla,
                backgroundColor: "white",
                border: "1px solid #b9bdba",
                color: "black",
                padding: "1px",
              }
            : child.cc === "da"
            ? {
                justifyContent: child.cla,
                color: ColorsMTO.Pink.code,
              }
            : {
                justifyContent: child.cla,
                paddingRight: child.cla == "right" ? "3rem" : undefined,
                paddingLeft: child.cla == "left" ? "1rem" : undefined,
              },
      }));

    };

    const res = apiResponse.map((section) => (
      {
      headerCheckboxSelection: (params:any) => {
        // Only show if no grouping is applied
        return section.scc === "chckbx" && params.api.getRowGroupColumns().length === 0;
      },
      checkboxSelection: (params:any) => {
        // Only show on leaf rows, not group rows
        return section.scc === "chckbx" && params.node && !params.node.group;
      },
      // headerCheckboxSelection: section.scc === "chckbx" ? true : undefined,
      // checkboxSelection: section.scc === "chckbx" ? true : undefined,
      pinned: section.pinned || null,
      floatingFilterComponentParams:
        section.scc === "chckbx" || section.scc == "ic"
          ? { suppressFilterButton: false }
          : undefined,
      suppressHeaderFilterButton:
        section.scc === "chckbx" || section.scc === "ic" ? true : false,
      suppressMenu:
        section.scc === "chckbx" || section.scc === "ic" ? true : false,
      sortable: section.scc === "chckbx" || section.scc === "ic" ? false : true,
      maxWidth:
        section.scc === "chckbx" || section.scc == "ic" ? 60 : undefined,
      floatingFilter:
        section.scc === "chckbx" || section.scc == "ic" ? false : undefined,
      headerName: section.hd,
      suppressStickyLabel: section.scc === "chckbx" ? undefined : true,
      colId: section.cc,
      // pinned: section.scc==="scos"?'right':"",

      cellRenderer:
        section.cc === "ec" || (section.scc === "chckbx" && bomActive)
          ? "agGroupCellRenderer"
          : section.cc === "ic"
          ? "AgeingCellRenderer"
          : section.scc == "oca"
          ? "DropDownCellRenderer"
          : undefined,
      
      openByDefault:
        section.scc === "chckbx"
          ? undefined
          : section.scc === "rmk"
          ? false
          : true,

      ////////this could be some problem
      children:
        section.scc === "chckbx" || section.scc === "oca"
          ? undefined
          : section.ch
          ? mapChildren(section.cc, section.ch)
          : undefined,
    }));

    return res;
  };

  const getFilterData = async () => {
    try {
      const response = await getPageWiseFilterData({
        page_name: FilterPageName.Prod_OverAll_BMReport,
      });
      setFilterData(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSystemType();
  }, []);

  useEffect(()=>{
    getFilterData();
  },[systemType])

  const customCellRenderers = useMemo(
    () => ({
      colorCellRenderer: BPPRenderer,
      AgeingCellRenderer: AgeingCellRenderer,
      RemarkHistoryRenderer: RemarkHistoryRenderer,
      DropDownCellRenderer: DropDownCellRenderer,
    }),
    []
  );

  const sideBar = useMemo(() => {
    return {
      toolPanels: ["columns"],
    };
  }, []);

   useEffect(()=>{
         if(coldefs && bomActive ){
           getBOMUIConfigData()
         }
       }, [coldefs,bomActive])
     
  
        const getBOMUIConfigData = async () => {
          try {
            const response = await getUIConfigData (ReportName);
            setBomHeader(response?.data?.data)
          } catch (err) {
            console.error(err);
            notifyError("Something Went Wrong!");
          }
        };
      
        const columnBomDefs = useMemo(() => {
          return getColumnDefinations(bomHeader);
        }, [bomHeader]);


  const getInitialGridData = async (currentPage: number, pageSize?: any, isExcelExport = false, isBomExplosion=0) => {
    //excellll
    if (isExcelExport) {
      const headersdata = refGraph2?.current?.api?.getColumnState();
      const formatedFilters = formatFilterJSON(appliedFilters);
      const filterHeadersData = headersdata.filter(((e:any) => {
        return (e.colId!== 'Default Attribute-RemarkHistory')
      }))
      const body = getBodyForExcelExport({headersdata:filterHeadersData,filterData: formatedFilters,groupedColDefsRef})
          try{
              const response = await getOverallBMReportData({body,isExcelExport : 1,page:currentPage,report_name : FilterPageName.Prod_OverAll_BMReport, page_size: pageSize || userPageSize,isBomExplosion})
              if(response.status == 200){//1,userpage,true,0
                DownloadExcel(response,FilterPageName.Prod_OverAll_BMReport)
              }else{
                notifyError("Error exporting Excel!");
              }
            }catch(e){
              console.error("Error exporting Excel", e);
              notifyError("Error exporting Excel!");
            }
      
      
    } else {
    try {
      setIsGridLoading(true);
      const formatedFilters = formatFilterJSON(appliedFilters);

      const gridData = await getOverallBMReportData({
        page: currentPage,
        appliedFilters: formatedFilters,
        user,
        page_size: pageSize || userPageSize
      });
      if (!gridData?.data?.data || gridData?.data?.data?.length === 0) {
        setGridDataCount(0);
        setGridData([]);
        setIsGridLoading(false);
        return;
      }
      const modifiedGridData = gridData?.data?.data?.results.map(
        (data: any) => {
          return {
            ...data,
            oca: null,
          };
        },
        []
      );
      setGridData(modifiedGridData);
      setGridDataCount(gridData?.data?.data?.count);
      setIsGridLoading(false);
    } catch (e) {
      notifyError("No Records found for the selected filter!");
      setGridDataCount(0);
      setGridData([]);
      setIsGridLoading(false);
      console.log(e);
    }
  }
  };


  const handlePageChange = useCallback((currPage: number) => {
    setCurrentPage(currPage);
    setIsCheckboxChecked(false);
  }, []);

  const savePageSize = (pageSize: any) => {
    if (pageSize) {
      setCurrentPage(1);
      setUserPageSize(pageSize);
      handleSaveClick(undefined,pageSize);
      getInitialGridData(1, pageSize);
    } else {
      notifyError("Invalide page size");
    }
    
  }

  const extractDepartmentNames = (orders: Orders): string[] => {
    const departmentNames: Set<string> = new Set();

    // Iterate over each order
    Object.values(orders).forEach((orderItem) => {
      // Iterate over each property in the order item
      Object.keys(orderItem).forEach((key) => {
        // Check if the property is a department (i.e., not 'tq' or 'li')
        if (key !== "tq" && key !== "li") {
          departmentNames.add(key);
        }
      });
    });

    // Convert Set to Array and return
    return Array.from(departmentNames);
  };

  useEffect(() => {
    if (allotementRef.current) allotementRef.current.reset();
  }, [rowsSelected.current]);

  const fetchDeptWiseWiphData = async (selectedOrderKeys: any) => {
    try {
      notifyLoader("Loading");
      const DeptWiseWipData = await getDeptWiseWipData(selectedOrderKeys);
      const highAgeingData = await getHighAgeingData(selectedOrderKeys);
      sethighAgeing(highAgeingData?.data?.data);
      setDeptWiseWipData(DeptWiseWipData?.data?.data);
      const departmentNames = extractDepartmentNames(
        DeptWiseWipData?.data?.data
      );
      departmentNames.sort();
      setDeptName(departmentNames);
      notifySuccess("Fetched");
    } catch (error) {
      notifyError("Failed to fetch data");
    }
  };

  const getSelectedRow = () => {
    const selectedData = refGraph2.current?.api.getSelectedRows();
    if (selectedData.length == 0) {
      rowsSelected.current = false;
    } else {
      rowsSelected.current = true;
    }
    /* To persist the state*/
    if (selectedData && selectedData.length >= 0) {
      let mergedData: any = [...masterSelectedRowData]; // Start with the existing selected data
      selectedData.forEach((newItem: any) => {
        const index = mergedData.findIndex(
          (item: any) => item.ok === newItem.ok
        );
        if (index !== -1) {
          // If the item exists, replace it
          // mergedData[index] = newItem;
        } else {
          // Otherwise, add the new item
          mergedData.push(newItem);
        }
      });

      gridData?.forEach((item: any) => {
        if (item && item.ok) {
          let isThere = 0;
          selectedData.forEach((selectedD: any) => {
            if (selectedD.ok === item.ok) {
              isThere = 1;
            }
          });
          if (isThere == 0) {
            mergedData = mergedData.filter((e: any) => e.ok !== item.ok);
          }
        }
      });
      // if (!_.isEqual(mergedData, masterSelectedRowData)) {
      setMasterSelectedRowData(mergedData);
      // }
      /*persist data finised*/
    }
    toggleCheckBox();
    refGraph2.current.api.refreshCells();
  };

  useEffect(() => {
    if (masterSelectedRowData.length > 0) {
      const selectedOrderKeys: orderkeyObj[] = [];
      masterSelectedRowData?.map((ele: any) => {
        selectedOrderKeys.push(ele.ok);
      });

      fetchDeptWiseWiphData(selectedOrderKeys);
      setIsOrderElapsedGrid(true);
    } else {
      setDeptWiseWipData("");
      setIsOrderElapsedGrid(false);
    }
  }, [masterSelectedRowData]);

  const existsInSelected = (reqOid: string): boolean => {
    for (let index = 0; index < masterSelectedRowData.length; index++) {
      const element: any = masterSelectedRowData[index];
      if (element.ok === reqOid) {
        return true;
      }
    }
    return false;
  };

  const onFirstDataRendered = (params: any) => {
    const nodesToSelect: IRowNode[] = [];
    params.api.forEachNode((node: any) => {
      if (node.data && node.data.ok && existsInSelected(node.data.ok)) {
        node.data.Remark = masterSelectedRowData[0].Remark;
        for (let index = 0; index < masterSelectedRowData.length; index++) {
          const element = masterSelectedRowData[index];
          if (element.ok === node.data.ok) {
            node.data.Remark = element.Remark;
            // node.data.oca = element.oca;
          }
        }
        nodesToSelect.push(node);
      }
    });
    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
    params.api.refreshCells();
    toggleCheckBox();
  };

  const onPivotModeChanged = (event: any) => {
    const isPivotOn = event.api.isPivotMode();
    setIsPivot(isPivotOn);
  };

      const detailCellRendererParamsConfig = useMemo(() => {
          const itemNameColumnDef = columnBomDefs.find((a: any) => a.colId === "ItemName");
        
          const config = {
            masterDetail: bomActive?true:false,
            detailCellRendererParams: {
              suppressMenu: true,
              detailGridOptions: {
                rowHeight: 28,
                headerHeight:30,
                // domLayout: "autoHeight",
                autoGroupColumnDef: {
                  headerName:itemNameColumnDef?.headerName,
                  cellRendererParams: {
                    suppressCount: true,
                  },
                },
                columnDefs:columnBomDefs.filter((col: any) => col.colId !== "ItemName"),
                defaultColDef: {
                  flex: 1,
                  suppressMenu: true,
                  cellStyle: {
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                  },
                },
      
                treeData: true,
                getDataPath: (data: any) => {
                  return data.path;
                },
              },
              getDetailRowData: async (params: any) => {
                if (!_.isEmpty(params.data)) {                
                  if (cache.current[`${params.data.oid}-${params.data.lid}`]) {
                    params.successCallback(
                      cache.current[`${params.data.oid}-${params.data.lid}`]
                    );
                    return;
                  }
                  const data = await getBOMExplosionData({
                    orderId: params.data.oid,
                    lineId: params.data.lid,
                  });
                  cache.current[`${params.data.oid}-${params.data.lid}`] = data.data.data;
                  params.successCallback(data?.data?.data);
                  return;
                }
              },
            },    
          };
          return config;
        }, [columnBomDefs, bomHeader]);

  const agGridProps: AgGridReactProps = useMemo(() => {
    return {
      tooltipShowDelay: 0,
      tooltipTrigger: "focus",
      gridOptions: {
        rowHeight: 50,
        getRowStyle: (params: any) => {
          return {
            background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7",
          };
        },
        rowSelection: "multiple",
        suppressRowClickSelection: true,
        enableBrowserTooltips: true,
        enableRangeSelection: true,
        components: customCellRenderers,
        pagination: true,
        // pivotMode: false,
        defaultColDef: {
          enablePivot: true,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          //suppressFiltersToolPanel:true,
          cellStyle: {
            textAlign: "center",
            //'height': '50px',
            //"fontStyle": "Roboto",
            //"fontVariant": "normal",
            fontSize: "18px",
            fontFamily: "Roboto",
            whiteSpace: "nowrap",
            resizable: "true",
            color: "#000",
          },
          // floatingFilterComponentParams: {
          //   // suppressFilterButton: true,
          // },
        },
      },
      sideBar: sideBar,
      masterDetail: true,
      //detailCellRenderer: RowGroupRenderer,
      //detailCellRendererParams:RowGroupRenderer,
      paginationAutoPageSize: true,
      enterNavigatesVertically: true,
      enterNavigatesVerticallyAfterEdit: true,
      groupDefaultExpanded: 0,
      // onSelectionChanged: debounce(getSelectedRow, 1000),
      onSelectionChanged: getSelectedRow,
      onRowDataUpdated: onFirstDataRendered,
      onColumnPivotModeChanged: onPivotModeChanged,
    };
  }, [masterSelectedRowData, gridData]);

  useEffect(() => {
    if (Object.keys(appliedFilters).length) {
      getInitialGridData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (Object.keys(appliedFilters).length && userConfigFetched) {
      if (currentPage != 1) {
        setCurrentPage(1);
      } else {
        getInitialGridData(currentPage);
      }
    }
  }, [appliedFilters, userConfigFetched]);

  const tempGridRef = useRef<any>(null);
  const [tempGridData, setTempGridData] = useState<any>(undefined);
  const [isExcelLoading, setIsExcelLoading] = useState<boolean>(false);

  const getTempGridData = async () => {
    
    setIsExcelLoading(true);
    try {
      const formatedFilters = formatFilterJSON(appliedFilters);
      const gridData = await getOverallBMReportData({
        page: 1,
        appliedFilters: formatedFilters,
        page_size: gridDataCount,
      });
      setTempGridData(gridData?.data?.data?.results || []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsExcelLoading(false);
    }
  };

  const onExcelExport = () => {
    if (isPivot) {
      getTempGridData(); 
    } else {
      if (bomActive) {
        setShowExcelModal(true)
      } else {
        getInitialGridData(1, userPageSize, true, 0);
      }
    }
  };
  
  



  

  useEffect(() => {
    if (tempGridData) {
      const colState = refGraph2.current?.api?.getColumnState();
      tempGridRef.current?.api?.applyColumnState({
        state: colState,
        applyOrder: true,
      });

      const isPivotMode = refGraph2.current?.api?.isPivotMode();
      if (isPivotMode) {
        refGraph2.current?.api?.exportDataAsExcel({
          fileName: "OverallBMReport",
        });
      } else {
        tempGridRef.current?.api?.exportDataAsExcel({
          fileName: "OverallBMReport",
        });
      }
    }
  }, [tempGridData]);

  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdOverallBMReport,
      });

      const newConfig = data?.data?.data?.length ? JSON.parse(data?.data?.data?.[0]?.columns_settings) || [] : [];
      setUserPageSize(newConfig.pageSize ? Number(newConfig.pageSize) : undefined);
      setColumnState(newConfig.cs);
      setIsPivot(newConfig.pivot);
      setUserConfigFetched(true);

      if (!data) {
        console.error("Failed to apply column state");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = async (coldefs?: any,page_size?:any) => {
    try {
      if (coldefs) {
        //reset case
        const fullConfig = { pivot: false, cs: coldefs, pageSize: userPageSize };
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdOverallBMReport,
          cs: JSON.stringify(fullConfig),
        };

        await updateUserUIConfigData([payload]);
        setColumnState([...coldefs]);
        setIsPivot(false);
      } else if (page_size) {
        const config = columnState;
        const fullConfig = { pivot: isPivot, cs: config, pageSize: page_size };

        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdOverallBMReport,
          cs: JSON.stringify(fullConfig),
        };
        await updateUserUIConfigData([payload]);
      } else {
        if (refGraph2?.current?.api) {
          const config = refGraph2.current.api.getColumnState();
          const isPivot = refGraph2.current?.api.isPivotMode();
          const fullConfig = { pivot: isPivot, cs: config, pageSize: userPageSize };

          // setColumnState(config);

          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdOverallBMReport,
            cs: JSON.stringify(fullConfig),
          };
          await updateUserUIConfigData([payload]);
          await getUserColumnConfig();
        }
      }
      notifySuccess("Changes saved successfully");
    } catch (error) {
      console.error(error);
      notifyError("Error saving changes");
    }
  };

  const handleResetClick = () => {
    setIsReset(true);
  };

  useEffect(() => {
    if (isReset) {
      handleSaveClick(masterUIConfig);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (refGraph2?.current?.api) {
      setMasterUIConfig(refGraph2?.current?.api.getColumnState());
      getUserColumnConfig();
    }
  }, [coldefs]);

  useEffect(() => {
    if (refGraph2?.current && columnState?.length) {
      const result = refGraph2.current.api.applyColumnState({
        state: columnState,
        applyOrder: true,
      });
      // refGraph2.current?.api.autoSizeAllColumns()
      const applyPivot = refGraph2.current?.api.setGridOption(
        "pivotMode",
        isPivot
      );
      refGraph2.current.api.autoSizeAllColumns()
      if (!result || !applyPivot) {
        console.error("Failed to apply column state");
      }
    }
  }, [columnState,refGraph2,refGraph2.current]);

  const { data: apiResponseData /*isLoading, refetch*/ } = useGetDate();

  const date = apiResponseData?.data?.data;

  const excelStyles = useMemo(() => 
    excelColorArr.map((color) => ({
      id: color,
      font: { color: color === "White" ? "000000" : "#ffffff" },
      interior: {
        color: color === "White"  ? "#A8A8A8" : ColorsMTO[color as keyof typeof ColorsMTO]?.code,
        pattern: 'Solid'
      }
    }))
  , []);

  const handleExcelConfirm = () => {
    setShowExcelModal(false);   
    getInitialGridData(1, userPageSize, true, 1);
  };

  const handleExcelCancel = () => {
    setShowExcelModal(false);
    getInitialGridData(1, userPageSize, true, 0);
  };
  

  return (
    <BMDepWrapper>
      <BMDepHeaderWraper>
        <MTOActionToolBar
          comp={"OverallBMReport"}
          isAddFilterButton
          isExcelExport
          themeUi={themeUi}
          onExcelExportClick={onExcelExport}
          isFilterOpen={isFilterOpen}
          onAddFilter={onAddFilter}
          toggleFilter={toggleFilter}
          onApplyFilter={onApplyFilter}
          multiFilter={currFilter}
          WIPFilter={orderClosingEnable ? OrderCloseHeader : null}
          setMultiFilter={setCurrFilter}
          onFilterRemove={onFilterRemove}
          isMfgSelected={isMfgSelected}
          handleSaveClick={handleSaveClick}
          handleResetClick={handleResetClick}
        />
      </BMDepHeaderWraper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Roboto",
          marginTop: "10px",
        }}
      >
        <p>{date && date.length ? moment(date).format("D MMM YYYY") : " "}</p>
      </div>
      
        <BomExcelModal
        open={showExcelModal}
        onClose={() => setShowExcelModal(false)}
        onConfirm={handleExcelConfirm}
        onCancel={handleExcelCancel}
        themeUi={themeUi}
        headerText={"Excel Export"}
        messageText={"Do you want to download Excel with BOM Data?"}
                
      />
      
      {(isGridLoading ||
        isExcelLoading ||
        isGetStateLoading ||
        isShortOrderCompleteOrder ||
        isUpdateUserConfig) && <OverlayLoader />}

      <HorizontalViewWrapper style={{ marginTop: "0", paddingLeft:"25px" }}>
        <BTRTableWrapper
          style={{
            height: rowsSelected.current ? "120vh" : "75vh",
            margin: "0",
          }}
        >
          <Allotment vertical={true} separator={true} ref={allotementRef}>
            <Allotment.Pane
              preferredSize={rowsSelected.current ? "45%" : "70%"}
            >
              <BTRAllomentSection>
                <GridView
                  reference={refGraph2}
                  agGridProps={agGridProps}
                  columDef={coldefs}
                  convercolumnDef={gridData}
                  handlePageChange={handlePageChange}
                  saveBtn={false}
                  totalRow={gridDataCount}
                  currentPage={currentPage}
                  customPageSize={true}
                  savePageSize={savePageSize}
                  userPageSize = {userPageSize}
                  detailCellRendererParamsConfig={detailCellRendererParamsConfig}
                />
                {/* This Grid is only for the user to download the excel report */}
                <div style={{ display: "none" }}>
                  <GridView
                    reference={tempGridRef}
                    agGridProps={agGridProps}
                    columDef={tempColdef}
                    convercolumnDef={tempGridData}
                    handlePageChange={handlePageChange}
                    saveBtn={false}
                    totalRow={gridDataCount}
                    currentPage={currentPage}
                    excelStyles={excelStyles}
                    savePageSize={savePageSize}
                    userPageSize = {userPageSize}
                    detailCellRendererParamsConfig={detailCellRendererParamsConfig}
                  />
                </div>
              </BTRAllomentSection>
            </Allotment.Pane>

            <Allotment.Pane
              preferredSize={rowsSelected.current ? "55%" : "30%"}
            >
              <VFWrapper>
                <BTRAllomentSection>
                  <OrderElapsedGrid
                    isTrue={isOrderElapsedGrid}
                    data={deptWiseWipData}
                    deptName={deptName}
                    selectedOrderCount={masterSelectedRowData.length}
                    highAgeingdata={highAgeing}
                  />
                </BTRAllomentSection>
              </VFWrapper>
            </Allotment.Pane>
          </Allotment>
        </BTRTableWrapper>

        <ConfirmationModal
          key={2}
          isOpen={showModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          title={textAction}
          // message="Are you sure?"
          actionText={textAction}
          orderCount={totalOrderCount}
        />
      </HorizontalViewWrapper>

      <BPRRemarkHistoryModal
        data={remarkHistory}
        isOpen={isRemarkHistoryOpen}
        onClose={() => setIsRemarkHistoryOpen(false)}
      />
    </BMDepWrapper>
  );
};

export default OverallBmReport;
