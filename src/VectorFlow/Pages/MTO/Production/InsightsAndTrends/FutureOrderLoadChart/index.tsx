import React, { useEffect, useRef, useState } from 'react';
import VFFloatingTab from '../../../../../../components/VectorFLOW/commons/VFFloatingTab';
import { ApplyZoomOut } from '../../OrderRescheduling/styles';
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { DateColumn, DateFieldContainer, DatePickersRow, FilterColumn, FilterLabel, FilterWrapper, MyFutureOrderTabsFix, TabsSection, TabsToolbarRow, ToolbarAbsolute } from './styles';
import { SelectGroup } from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/styles';
import VFSelect from "../../../../../../components/VectorFLOW/commons/MTO/VFSelect";
import VFDatePicker from '../../../Common/VFDatePicker';
import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import { useUserData } from "../../../../../../context";
import GraphView from './GraphView/GraphView';
import GridView from './GridView/GridView';
import { useGetCCRMasterData } from '../../../../../../VectorFlow/Services/MTA/MDM';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { UIGridCode } from '../../../Common/Enum';
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import useColDef from '../../../../../../hooks/useColDef';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from "../../../../../../helpers/utils";
import useFilter from '../../../../../../hooks/useFilter';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig';
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import OverlayLoader from '../../../Common/Loader';
import LoadTagCellRenderer from './LoadTagCellRenderer/LoadTagCellRenderer';
import { useGetFutureOrderFOLHorizonDate, useGetFutureOrderLoadChartData, useGetFutureOrderLoadChartExcelData } from '../../../../../../VectorFlow/Services/MTO/Production/FutureOrderLoadChart';

const FutureOrderLoadChart = () => {
  const [filterData, setFilterData] = useState({});
  const APIFilterConfig = {
    filSecVisConfig: {
      "Future_Order_Load_Chart" : {
        mjr : false,
        or: true,
        res: false,
        cus: true
      },
    }
  };
  
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
} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Future_Order_Load_Chart);
  const [currTab, setCurrTab] = useState("Pending CCR Quantity");
  const [isGridView, setIsGridView] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>({ value: "BFH", label: "Not Scheduled beyond FOL Horizon" });
  const [selectedCCR, setSelectedCCR] = useState<any>(null);
  const [ccrOptions, setCcrOptions] = useState<any>();
  const { colDefMap, getColDef } = useColDef();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const [userConfigFetched, setUserConfigFetched] = useState<any>(false);
  const [userPageSize, setUserPageSize] = useState<any>();
  const [masterUIConfig, setMasterUIConfig] = useState<any>([]);
  const [gridData, setGridData] = useState<any>([]);
  const [totalRow, setTotalRow] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currView, setCurrView] = useState("daily");
  const [currGridView, setCurrGridView] = useState('daily')
  const [graphData, setGraphData] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [colDef, setColDef] = useState([{}]);
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [isReset, setIsReset] = useState<any>(undefined);
  const [ccrHorizonData, setCcrHorizonData] = useState<any[]>([]);
  const [filterPayload, setFilterPayload]=useState<any>()
  const [columnState, setColumnState] = useState<any>([]);
  const { mutateAsync: getCCRMasterData } = useGetCCRMasterData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const {data}=useGetFutureOrderFOLHorizonDate() //folhorizon
  const {mutateAsync: geFutureOrderLoadChart, isLoading}=useGetFutureOrderLoadChartData()
  const isDateDisabled = !(selectedCCR && selectedAction);
  const [uiConfig, setUiConfig] = useState([]);
  

  const [selectedCCRHorizon, setSelectedCCRHorizon] = useState('')

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const fromDateRef = useRef(fromDate);
  const toDateRef = useRef(toDate);

  useEffect(() => {
    fromDateRef.current = fromDate;
  }, [fromDate]);

  useEffect(() => {
    toDateRef.current = toDate;
  }, [toDate]);
  
  const colDefCustomizations = {
    Tag: {
      tooltipValueGetter: (params: any) => params.value,
      cellRenderer: LoadTagCellRenderer,
     
      minWidth:100,
    },
  
  }

  const tabs = [
    {
      label: "Pending CCR Quantity",
      value: "Pending CCR Quantity",
      id: "Pending CCR Quantity",
    },
    {
      label: "Load Wise",
      value: "Load Wise",
      id: "Load Wise",
    },
  ];

  const OrderOptions = [
    { value: "BFH", label: "Not Scheduled beyond FOL Horizon" },
    { value: "ANS", label: "All Not Scheduled" },
  ]


  const formattedFilters = formatFilterJSON(appliedFilters);

  const payload = { loadwise: currTab === "Load Wise" ? 2 : 1,
    view: currView,
    ...formattedFilters,
    filters: {
      ccr: selectedCCR?.value,
      orderOption: selectedAction?.value,
      from: formatDateToYMD(fromDate),
      to: formatDateToYMD(toDate),
      horizon_date:selectedCCRHorizon,
    }
  }
  
  const handleActionChange = (option: any) =>{
    setSelectedAction(option);
  }
  


  const setColumnDef = async () => {
    try {
      let columnDefs = getColumnDefinations(uiConfig, colDefCustomizations, []);
      
      const isLoadWise = currTab === 'Load Wise';
      const isANS = selectedAction?.value === 'ANS';
      
      const allowedHeaders = isLoadWise
        ? isANS 
          ? ['Date', 'CCR', 'Load in Days', 'Tags']
          : ['Date', 'CCR', 'Load in Days']
        : isANS
          ? ['Date', 'Pending CCR Quantity', 'Tags', 'CCR']
          : ['Date', 'Pending CCR Quantity', 'CCR'];
      
      columnDefs = columnDefs.filter((col: any) => 
        allowedHeaders.includes(col.headerName || col.header)
      );
      
      setColDef(columnDefs);
    }
    catch (e) {
      console.log(e);
    }
  }

  const getUIReportData = async () => {
    
    try {
      const response = await getUIConfigData('FutureOrderLoadChart');
      getColDef(response);
      setUiConfig(response.data.data)
    }
    catch (e) {
      console.error(e);
    }
  }
  
  useEffect(() => {
    getUIReportData();
  },[])

  useEffect(() => {
    setCcrHorizonData(data?.data?.data);
  },[data])


  const getCCROptions = async () => {
    try {
      const CCRMasterData = await getCCRMasterData({});
      const CCRMaster = CCRMasterData?.data?.data;
      
      if (CCRMaster) {
        const allCCR = CCRMaster.map((item: any) => ({
          label: item.ccd, 
          value: item.cid,
          cwl: item.cwl,
        }));
        setCcrOptions(allCCR);
      } else {
        setCcrOptions([]);
        notifyError("No CCR data available");
      }
    } catch (error) {
      setCcrOptions([]);
      notifyError("Failed to load CCR options. Please try again.");
    }
  };
  
  useEffect(() => {
    getCCROptions() 
  }, [])

  useEffect(() => {
    if (uiConfig && currTab && selectedAction && isGridView ) { 
      setColumnDef();
      setMasterUIConfig(createMasterConfig());
      getUserColumnConfig()
    }
  }, [currTab,selectedAction,uiConfig, isGridView])
  
  useEffect(() => {
    if (isReset) {
      handleSaveClick(masterUIConfig);
      setIsReset(false);
    }
  }, [isReset]);

  function formatDateToYMD(dateObj:any) {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }

  const onSubmit = async () => {
    if (selectedCCR == undefined || selectedAction == undefined || !fromDate || !toDate) {
      notifyError("Please select all filters")
      return;
    }
    
    
    setIsSubmitLoading(true);
    setFilterPayload(payload);
  
    try {
      const response = await geFutureOrderLoadChart(payload);

      if (isGridView) {
        let transformedData = response?.data?.data?.data || [];
        const pastOrderLoad = response?.data?.data?.pastorder_load
        
        if (currView === 'weekly') {
          transformedData = transformedData.map((item: any, index: number) => {
          
            const a = item?.tag?.map((e: any) => e);

            return {
              ccr: item.ccr,
              load: index === 0 ? pastOrderLoad : item.load,
              tag:a,
            date:item.date
            };
          });
        }

        else if (currView === 'monthly') {
        
          transformedData = transformedData.map((item: any, index: number) => {
            const a = item?.tag?.map((e: any) => e);
            return {
    
              ccr: item.ccr,
              load: index === 0 ? pastOrderLoad : item.load,
              tag: a,
              date: item.date,
            }
          });
          
        } else {
          // Daily view
          transformedData = transformedData.map((item: any, index: number) => ({
            ccr: item.ccr,
            load: index===0 ? pastOrderLoad: item.load,
            tag: index === 0 ? 'Past Scheduling' : item.tag , 
            date: item.date || new Date().toLocaleDateString("en-US")
          }));
        }
        setGridData(transformedData);
        setTotalRow(response?.data?.data?.count || transformedData.length);
      } else {
        // notifySuccess('Graph updated successfully')
        console.log(response)
        setGraphData(response?.data?.data || [])

        if (response.status != 200) {
          notifyError('No Data found for the selected filters')
        }
        else {
          notifySuccess('Graph Updated Successfully')
        }
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to fetch data!");
      }
    finally {
      setIsSubmitLoading(false);
      }
  };

  useEffect(() => {
    if (isGridView) {
      setColumnDef(); 
    }
  }, [isGridView]);
  
  const handleChartViewChange = (newView: string) => {
    setCurrView(newView);
  };

// auto call API when tab changes (only if filters are selected)
  useEffect(() => {
    if (selectedCCR && selectedAction && fromDate && toDate) {
      onSubmit();
    }
  }, [currView, currTab]);
  
  
    useEffect(() => {
      if (isGridView && selectedCCR && selectedAction && fromDate && toDate) {
        onSubmit();
      }
    }, [isGridView]);
 
const getFilterData = async () => {
    try {
        const response = await getPageWiseFilterData({page_name: 'Prod_STPL_And_FullKits'});
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    getGraphData({ graphflag: 1 });
    getFilterData();
  }, [])


  const { mutateAsync: getFutureOrderLoadChartExcelData } = useGetFutureOrderLoadChartExcelData();

  const getGraphData = async (params: any) => {

  
  const { isExcelExport, graphflag } = params;
  const currentPayload = {
    loadwise: currTab === "Load Wise" ? 2 : 1,
    view: currView,
    filters: {
      ccr: selectedCCR?.value,
      orderOption: selectedAction?.value,
      from: formatDateToYMD(fromDate),
      to: formatDateToYMD(toDate),
      horizon_date: selectedCCRHorizon
    }
  };
  if(isExcelExport) {
    const headersdata = currentGridRef?.current?.api?.getColumnState();
    const formattedFilters = formatFilterJSON(appliedFilters);
    const body = getBodyForExcelExport({ headersdata, appliedFilters: formattedFilters, colDefMap });
    try {
      const response = await getFutureOrderLoadChartExcelData({
        body,
        payload: currentPayload,
        isExcelExport: 1,
        report_name: "FutureOrderLoadChart",
        graphflag:0,
      });
      DownloadExcel(response, 'FutureOrderLoadChart');
    }
    catch(e) {
      console.log(e);
    }
  }
  else {
    const payload = {
      loadwise: currTab === "Load Wise" ? 2 : 1,
      view: currView,
      graphflag,
      filters: {
        ccr: selectedCCR?.value,
        orderOption: selectedAction?.value,
        from: formatDateToYMD(fromDate),
        to: formatDateToYMD(toDate),
        horizon_date:selectedCCRHorizon
      },
      // page_size: pageSize || userPageSize
    };

    try {
      const response = await geFutureOrderLoadChart(payload);
      // setGraphData(response.data.data); // Add this if you need to set graph data
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Graph data!');
    }
  }
  };
  
  
  const GetExcelData = async () => {
    getGraphData({graphflag : 0 , isExcelExport : true , appliedFilters})
  }

  const handleResetClick = () => {
    setIsReset(true);
  }

   const getUserColumnConfig = async () => {
      try {
        const data = await getUserUIReportConfigData({
          un: user.user.name,
          rn_id: UIGridCode.ProdStplAndFullKit
        });
        setUserConfigFetched(true)
        const newConfig = JSON.parse(data?.data?.data[0]?.columns_settings) || [];
        setUserPageSize(newConfig.pageSize ? Number(newConfig.pageSize) : undefined);
        setColumnState(newConfig.cs);
  
        if (!data) {
          console.error('Failed to apply column state');
        }
      } catch (error) {
        console.error(error);
      }
    }

  const handleSaveClick = async (coldefs?: any, page_size?: any) => {

    try {
      if (coldefs) {
        // const isLoadWise = currTab === 'Load Wise';
        // const isANS = selectedAction?.value === 'ANS';
        const fullConfig = {cs: coldefs, pageSize: page_size || userPageSize };
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdStplAndFullKit,
          cs: JSON.stringify(fullConfig),
        };
        await updateUserUIReportConfigData([payload]);
        setColumnState([...coldefs]);

      }
      else if(page_size){
        const config = columnState;
        const fullConfig = { cs: config,  pageSize: page_size};        
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdStplAndFullKit,
          cs: JSON.stringify(fullConfig),
        };
        await updateUserUIReportConfigData([payload]);
      }
      else {

        
        if (currentGridRef?.current?.api) {
          const config = currentGridRef.current.api.getColumnState();
          const updatedColState = [...columnState];
          const isLoadWise = currTab === 'Load Wise';
          const isANS = selectedAction?.value === 'ANS';
          const currentGridIndex =  isLoadWise
          ? isANS 
            ? 0
            : 1
          : isANS
            ? 2
              : 3;
          updatedColState[currentGridIndex] = config;

          const fullConfig = {  cs: updatedColState,  pageSize: userPageSize };
          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdStplAndFullKit,
            cs: JSON.stringify(fullConfig)
          }
          await updateUserUIReportConfigData([payload]);
          // await getUserColumnConfig();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const createMasterConfig = () => {
    

    const columnDefs = getColumnDefinations(uiConfig, colDefCustomizations, []);
      
      const isLoadWise = currTab === 'Load Wise';
      const isANS = selectedAction?.value === 'ANS';
      
      const allowedHeaders = isLoadWise
        ? isANS 
          ? ['Date', 'CCR', 'Load in Days', 'Tags']
          : ['Date', 'CCR', 'Load in Days']
        : isANS
          ? ['Date', 'Pending CCR Quantity', 'Tags', 'CCR']
        : ['Date', 'Pending CCR Quantity', 'CCR'];
    
    const header1 = ['Date', 'CCR', 'Load in Days', 'Tags']
    const header2 = ['Date', 'CCR', 'Load in Days']
    const header3 = ['Date', 'Pending CCR Quantity', 'Tags', 'CCR']
    const header4 = ['Date', 'Pending CCR Quantity', 'CCR']

    const colDef1 = columnDefs.filter((col: any) =>
      header1.includes(col.headerName || col.header)
    )
    const colDef2 = columnDefs.filter((col: any) =>
      header2.includes(col.headerName || col.header)
    ) 
    const colDef3 = columnDefs.filter((col: any) =>
      header3.includes(col.headerName || col.header)
    )
    const colDef4 = columnDefs.filter((col: any) =>
      header4.includes(col.headerName || col.header)
    )


    return [colDef1, colDef2, colDef3, colDef4];
  }
  


  const getGridData = async (params: any, pageSize?: any) => {
  try {
    const formatedFilters = formatFilterJSON(appliedFilters);
    const GridPayload = {
      ...payload,
      ...formatedFilters,
      page_size: pageSize || userPageSize 
    };

    const response = await geFutureOrderLoadChart(GridPayload);
    const results = response?.data?.data?.data || [];
   
    
    setGridData(results)
  } catch (e) {
    console.log(e);
    notifyError("Failed to fetch Grid data!");
  }
  };
  
  
  useEffect(() => {
      if (Object.entries(appliedFilters).length && userConfigFetched) {
        setCurrentPage(1);
        getGridData({ graphflag: 0, page: 1 });
      }
     }, [appliedFilters, userConfigFetched])//currTab
  
    const handlePageChange = async (currPage: number) => {
      setCurrentPage(currPage);
      getGridData({ graphflag: 0, page: currPage });
    }
  
    const savePageSize = (pageSize: any) => {
      if (pageSize) {
        setUserPageSize(pageSize);
        setCurrentPage(1)
        handleSaveClick(undefined, pageSize);
        getGridData({ graphflag: 0, page: 1 }, pageSize);
        } else {
          notifyError("Invalide page size");
      }
      
  }

  
  /* Logic for disabling date from aaj ka din to FOL Horizon Date */
  useEffect(() => {
    if (ccrHorizonData && selectedCCR) {
      const a = ccrHorizonData.find((item:any) => item.ccr === selectedCCR.value)?.horizon_date;

      setSelectedCCRHorizon(a)
    }
  },[ccrHorizonData, selectedCCR])



  const getSelectedCCRDate = () => {
    if (!selectedCCR) return;
    const a = ccrHorizonData.find((item) => item.ccr === selectedCCR.value)?.horizon_date || null;
    return a;

  };
  const today = new Date();


  const disabledFOLHorizonDateFrom = (current: Date) => {
    if (selectedAction?.value !== "BFH") return false;

    const horizonDateStr = getSelectedCCRDate();
    if (!horizonDateStr) return false;

    const horizonDate = new Date(horizonDateStr);
    
    // Set time to start of day for accurate comparison
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const currentStart = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    const horizonStart = new Date(horizonDate.getFullYear(), horizonDate.getMonth(), horizonDate.getDate());

    // Disable dates from today (inclusive) to horizon date (inclusive)
    return currentStart >= todayStart && currentStart <= horizonStart;
  };

  const disabledFOLHorizonDateTo = (current: Date) => {
    if (selectedAction?.value !== "BFH") return false;

    const horizonDateStr = getSelectedCCRDate();
    if (!horizonDateStr) return false;

    const horizonDate = new Date(horizonDateStr);
    
    // Set time to start of day for accurate comparison
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const currentStart = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    const horizonStart = new Date(horizonDate.getFullYear(), horizonDate.getMonth(), horizonDate.getDate());

    // If fromDate is selected, disable dates before fromDate
    if (fromDate) {
      const fromDateObj = new Date(fromDate);
      const fromDateStart = new Date(fromDateObj.getFullYear(), fromDateObj.getMonth(), fromDateObj.getDate());
      // Disable dates from today to horizon date OR dates before fromDate
      return (currentStart >= todayStart && currentStart <= horizonStart) || currentStart < fromDateStart;
    }

    // Otherwise, just disable dates from today to horizon date
    return currentStart >= todayStart && currentStart <= horizonStart;
  };
  return (
    <>
    {(isLoading|| isUpdateUserConfig || isGetUserConfig || isSubmitLoading) && <OverlayLoader />}
      <TabsToolbarRow >
        {!isGridView ? 
          (
            <>
              <TabsSection style={{paddingTop:'10px'}}>
                <ApplyZoomOut>
                  <VFFloatingTab
                  handleClick={(e) => setCurrTab(e.value)}
                  tabs={tabs}
                  defaultTab={tabs.findIndex(tab => tab.value === currTab) || 0}
                  />              
              </ApplyZoomOut>
              </TabsSection>
            </>
          )
          :
          <>
          </>
        }

          <MTOActionToolBar
            comp={"orderReschedule"}
            isChartGridToggle
            themeUi={themeUi}
            isAddFilterButton
            // isAddFilterButton={isGridView ? true : false}
            isExcelExport={isGridView?true:false}
            onExcelExportClick={GetExcelData}
            handleSaveClick={handleSaveClick}
            handleResetClick={handleResetClick}
            isGridView={isGridView} 
            setIsGridView={setIsGridView}
            isFilterOpen={isFilterOpen}
            onAddFilter={onAddFilter}
            toggleFilter={toggleFilter}
            onApplyFilter={onApplyFilter}
            multiFilter={currFilter}
            setMultiFilter={setCurrFilter}
            onFilterRemove={onFilterRemove}
            isMfgSelected={isMfgSelected}
          />
      </TabsToolbarRow>

      {!isGridView ?
        <>
          <FilterWrapper>
          <FilterColumn minWidth="140px">
            <FilterLabel>Select CCR</FilterLabel>
            <SelectGroup style={{ width: "120px !important" }}>
              <VFSelect options={ccrOptions} themeUi={themeUi} value={selectedCCR} onChange={setSelectedCCR}/>
            </SelectGroup>
          </FilterColumn>

          <FilterColumn minWidth="160px">
            <FilterLabel>Order Option</FilterLabel>
            <SelectGroup style={{ width: "120px !important" }}>
              <VFSelect  options={OrderOptions} onChange={handleActionChange} value={selectedAction} themeUi={themeUi} />
            </SelectGroup>
          </FilterColumn>

        <DatePickersRow>
          <DateColumn>
            <span style={{
              fontWeight: 300,
              color: 'rgb(67, 67, 67)',
              fontSize: '10px',
            }}>From</span>
            <DateFieldContainer>
              <VFDatePicker
                  date={fromDate}
                  onDateChange={setFromDate}
                    minDate={new Date()} 
                    disabled={isDateDisabled}
                    // disabledFOLHorizonDate={disabledFOLHorizonDate} 
                    disabledFOLHorizonDate={disabledFOLHorizonDateFrom}
                  dateInputStyle={{
                    fontSize: "10px",
                    fontWeight: 300,
                    border: "none",
                    outline: "none",
                    color: "#434343",
                    background: "transparent",
                    width: "70px",
                    paddingTop: '5px',
                    opacity: isDateDisabled ?'0.5':'1'

                }}
                imgStyle={{ height: '18px', width: '18px', paddingTop:'3px', opacity: isDateDisabled ?'0.5':'1'
                }}
                showCalendarIcon={true}
              />

            </DateFieldContainer>
          </DateColumn>
          <DateColumn>
            <span style={{
              fontWeight: 300,
              fontSize: '10px',
              color: 'rgb(67, 67, 67)'
            }}>To</span>
            <DateFieldContainer>
              <VFDatePicker
                date={toDate}
                onDateChange={setToDate}
                disabled={isDateDisabled}
                    // disabledFOLHorizonDate={disabledFOLHorizonDate} 
                    disabledFOLHorizonDate={disabledFOLHorizonDateTo}

                minDate={new Date()} 
                dateInputStyle={{
                  fontSize: "10px",
                  fontWeight: 300,
                  border: "none",
                  outline: "none",
                  color: "#434343",
                  background: "transparent",
                  width: "70px",
                  paddingTop: '5px',
                  opacity: isDateDisabled ?'0.5':'1'
                }}
                imgStyle={{ height: '18px', width: '18px', paddingTop:'3px',opacity: isDateDisabled ?'0.5':'1' }}
                showCalendarIcon={true}
              />
            </DateFieldContainer>
          </DateColumn>
          <VFButton
            data-testid={"Group 627"}
           onClick={onSubmit}
            themeUi={themeUi}
            disabled={false}
            style={{
              height: "28px",
              width: "34px",
              borderRadius: "3px",
              marginTop: 16,
            }}
          >
            <img
              src="/assets/img/rightArrowHorizontal.svg"
              height={13}
              width={7}
            />
          </VFButton>
        </DatePickersRow>
      </FilterWrapper>
        </>
       : ''
      }      
      {isGridView ? (
      <GridView
        setCurrentGridRef={setCurrentGridRef}
        currentGridRef={currentGridRef}
        columnState={columnState}
        colDef={colDef}
        // key={"grid1"}
        handlePageChange={handlePageChange}
        savePageSize={savePageSize}
        currentPage={currentPage}
        totalRows={totalRow}
        rowData={gridData}
        appliedFilters={appliedFilters}
        userPageSize={userPageSize}
        currView={currView}
        setCurrView={setCurrView}
          key={currTab}
          currTab={currTab}
          selectedAction={selectedAction}
          isGridView={isGridView}
        />
       
    ) : (
      <>
        {graphData ? (
          <GraphView
            currView={currView}
            setCurrView={setCurrView}
            currTab={currTab}
            graphData={graphData} 
            onChartViewChange={handleChartViewChange}
            cwl={ccrOptions}
            selectedCCR ={selectedCCR}
            horizonData={ccrHorizonData}
            selectedAction={selectedAction?.value}
          />
        ) : (
          <div style={{ textAlign: "center",marginTop:'10px', color: "#888" }}>
                  <img src='/assets/img/Nodata.svg' height={500} width={900} />
          </div>
        )}
      </>
    )}

  </>
  );
};

export default FutureOrderLoadChart;


