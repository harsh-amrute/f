import { useState, useEffect, useRef, useMemo } from 'react';
import { type Option, type Field, type GetMasterDataPayload, type GridRef, type QueryFilteredDataConfigs, type MDMMasterState } from "../../../../types/MDM";
import { generateOptions, areMasterFiltersValid, mapStateFiltersToPayload, mapMasterToMasterState, generateSesonalityChartData, getActionId, mapMasterToColumnDefs, createConflictRowData, createErrorRowData, parseMTOExcelData } from "../../../../../helpers/utils";
import { useGetMasterData, useGetMasterUIConfiguration, useGetCount, useCreateDraft, useModifyDraft, useGetSeasonalityDetails, useModifyMasterData, useModifyMasterDataRetail, useDeleteDraft, useDeleteTask, useGetMasterDataRetail, useGetMTOMasterUIConfiguration, useGetBufferMasterData, useGetCCRMasterData, useSaveBufferMasterDraft, useSaveBufferMasterTask, useGetBufferTypeMaster, useGetPOOGIMasterData, useSaveCCRMasterDraft, useGetCalendarMasterData, useSaveCCRMasterTask, useSavePOOGIMasterTask, useSavePOOGIMasterDraft } from "../../../../Services/MTA/MDM";
import { useSelector, useDispatch } from 'react-redux';
import { FILL_MASTERS, FILL_OPTIONS, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_ACTIVE_MASTER, UPDATE_COLDEFS, STORE_ALL_MASTERS, REMOVE_MASTER, ADD_FILTER, REMOVE_FILTER, SYNC_ACTIVE_MASTER_TO_MASTER, UPDATE_ROW_DATA, UPDATE_PROGRESS_STATE, ADD_COLDEFS, REMOVE_ROW_DATA, REMOVE_COLDEFS, SET_DRAFT_ID, TOGGLE_UPLOAD_MODAL, REMOVE_ALL_FILTERS, SET_RECORD_COUNT, UPDATE_DATA_AVAILABILITY_STATUS, RESET_FILTERS } from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError, notifyLoader, notifyPromise, notifySuccess } from '../../../../../helpers/notify';
import ErrorCell from '../../../../../components/VectorFLOW/commons/ErrorCell';
import { AgGridReactProps } from 'ag-grid-react';
import { ColDef, SideBarDef } from 'ag-grid-enterprise';

import WarningCell from '../../../../../components/VectorFLOW/commons/WarningCell';
import { SeasonalityColorCellRenderer, SeasonalityGraphCellRenderer } from '../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers';
import _ from 'lodash';
import { toast } from 'react-toastify';
import ConflictErrorCellRenderer from './ConflictErrorCellRenderer';
import { v4 as uuidv4 } from 'uuid';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader';
import AddRemoveCellRenderer from './AddRemoveCellRenderer';
import { useUserData } from '../../../../../context';
import MTOErrorWarningCell from './MTOErrorWarningCell';
import PoogiEditDeleteCell from './PoogiEditDeleteCell';
import { RESET_MTO_STATE, SET_BUFFER_INITIAL_DATA, SET_BUFFER_MODIFY_DATA, SET_CCR_INITIAL_DATA, SET_CCR_MODIFY_DATA, SET_POOGI_INITIAL_DATA, SET_POOGI_MODIFY_DATA } from '../../../../../redux/actions/MTO';
import MTOCalendarEditCellRenderer from './MTOCalendarEditCellRenderer';
import ToggleButton from './ToggleButton';
import { useGetDeptMasterData, useGetPlantMasterData } from '../../../../../VectorFlow/Services/MTO/Common/Masters';
import { useGetCCRGroupMaster } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import MajReasonDescCell from './MajReasonDescCell';
import MinReasonDescCell from './MinReasonDescCell';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces for the parameters
interface mtaField {
  displayName: string;
  key: string;
  col_Position: string;
  visible: boolean;
  isAdd?: boolean;
  isEdit?: boolean;
  isDownload?: boolean;
  isApplicable?: boolean;
  dataType: string;
}

interface Parameter {
  id: string;
  name: string;

  fields: mtaField[];
}

interface ConcatenatedResult {
  id: string;
  name: string;
  fields: mtaField[];
  isMTO?: boolean;
}

    



const useViewModify = (pageType: string) => {
    const dispatch = useDispatch();
    const options = useSelector((state: RootState) => state.mdm.options);
    const selectedOptions = useSelector((state: RootState) => state.mdm.selectedOptions);
    const activeMaster = useSelector((state:RootState) => state.mdm.activeMaster);
    const masters = useSelector((state:RootState)=>state.mdm.masters);

    const isSelectMasterOpen = useSelector((state:RootState) => state.mdm.isSelectMasterOpen);
    const isUploadModalOpen = useSelector((state:RootState)=>state.mdm.isUploadModalOpen)
    const draftID = useSelector((state:RootState) => state.mdm.draftId);
    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize)
    const recordCount = useSelector((state:RootState) => state.mdm.recordCount)
    const isDataAvailableLocally = useSelector((state:RootState) => state.mdm.isDataAvailableLocally)

    const [tempRecordCount,setTempRecordCount] = useState<number>(0)

    const [allMastersState,setAllMasterState] = useState<MDMMasterState[]>([])
    const [isWarningModalOpen,toggleWarningModal] = useState<boolean>(false)
    const [isShowAll,setIsShowAll]=useState<boolean>(true)
    const [isOverlayVisible,setIsOverlayVisible] = useState<boolean>(false)
    // const [isUploadModalOpen,toggleUploadModal] = useState<boolean>(false) 
    // const [recordCount,setRecordCount] = useState<number>(0)
    const [downloadFileName,setDownloadFileName] = useState('');
    const [file,setFile] = useState<File>();
    const [isTableDataLoading,setIsTableDataLoading] = useState<boolean>(false);
    const [defaultToolPanel,setDefaultToolPanel] = useState<string>('');
    const [downloadData,setDownloadData] = useState<boolean>(false);
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    const [colDefs,setColDefs] = useState<ColDef[]>([]); 
    const [isUploadButtonDisabled,setIsUploadButtonDisabled] = useState<boolean>(true);
    const [chartData,setChartData] = useState<object>();
    const [isSeasonalityChartModalOpen,toggleSeasonalityChartModal] = useState<boolean>(false);
    const [normChangeData,setNormChangeData] = useState<any>([]);
    const [enableEditOnlineReset,setEnableEditOnlineReset] = useState<boolean>(false)

    const [conflictCount,setConflictCount] = useState<number>(0);
    const [errorCount,setErrorCount] = useState<number>(0);
    const [conflictData,setConflictData] = useState<Array<any>>([]);
    const [errorData,setErrorData] = useState<Array<any>>([]);
    const [submittedDataCount,setSubmittedDataCount] = useState<number>(0)
    const [isConflictModalOpen,setIsConflictModalOpen] = useState<boolean>(false)

    const [editOnline,toggleEditOnline] = useState(false);
    const [selectedRowsCount,setSelectedRowsCount] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const rowsPerPage = useMemo(()=>{
      if(pageType === 'add') return parseInt(process.env.REACT_APP_ADDRECORD_PAGE || '50')
      else if(pageType === 'remove') return parseInt(process.env.REACT_APP_DELETERECORD_PAGE || '50');
      else return parseInt(process.env.REACT_APP_VIEWRECORD_PAGE || '50');
    },[]);
    const [isSubmitDisabled,setIsSubmitDisabled] = useState(false);

    const [seasonalityActiveQuickFilter,setSeasonalityActiveQuickFilter]  = useState<Array<Array<number>>>([])
    const ref = useRef<GridRef>();
    const tempRef = useRef<GridRef>(); //used for second ag grid instance which is hidden.
    const [tempGridData,setTempGridData] = useState<object[]>([]);

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<number>>([]);
    const [seasonalityRowData,setSeasonalityRowData] = useState<any>([]);

    const {mutateAsync:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();

    const { mutateAsync: MTOMasterUIConfiguration, /*isLoading: MTOBufferLoading*/ } = useGetMTOMasterUIConfiguration();
    const {mutateAsync: saveBufferMasterTask } = useSaveBufferMasterTask();
    const {mutateAsync: saveCCRMasterTask } = useSaveCCRMasterTask();
    const {mutateAsync: saveBufferMasterDraft} = useSaveBufferMasterDraft();
    const {mutateAsync: savePOOGIMasterTask} = useSavePOOGIMasterTask();
    const {mutateAsync: savePOOGIMasterDraft} = useSavePOOGIMasterDraft();
    const [bufferTypeData, setBufferTypeData] = useState<any>(undefined);

    const [TASK_ID,setTaskId] = useState<string>('');

    const [uploadProgress] = useState('');

  /***Add the below line to fetch MTO Buffer */
  const {mutateAsync: saveCCRMasterDraft} = useSaveCCRMasterDraft();
    const [totalProgress] = useState('');

    const { mutateAsync: GetBufferTypeMaster } = useGetBufferTypeMaster();

    // const [isDataAvailableLocally,setIsDataAvailableLocally] = useState(false);
   
    // const allMasters:Master[] = masterUIConfiguration?.data.data || [];

    // const allMastersState:MDMMasterState[] = mapMasterToMasterState(allMasters);

    const {mutateAsync:getSeasonalityDetails} = useGetSeasonalityDetails();

    const {mutateAsync:getMasterData} = useGetMasterData();

    const { mutateAsync: getBufferMasterData } = useGetBufferMasterData();

    const {mutateAsync: getCCRMasterData}  = useGetCCRMasterData();

    const {mutateAsync:getMasterDataRetail} = useGetMasterDataRetail();
    
    const {mutateAsync:getCount} = useGetCount();


    const {mutateAsync:createDraft} = useCreateDraft()

    const {mutateAsync: getPOOGIMasterData} = useGetPOOGIMasterData();
    const {mutateAsync: getCalendarMasterData} = useGetCalendarMasterData();
    const {mutateAsync:modifyDraft} = useModifyDraft();

    const {mutateAsync:deleteDraft} = useDeleteDraft()

    const {mutateAsync:modifyMaster} = useModifyMasterData();

    const {mutateAsync:modifyMasterRetail} = useModifyMasterDataRetail();

    const {mutateAsync:deleteTask} = useDeleteTask();

    // const {mutateAsync:validateMaster} = useValidateMaster();

    // const {mutateAsync:getUploadProgress} = useGetUploadProgress();

    const validStopStatuses = [1,2,3,4,5,6,21];

    const validResumeStatuses = [23];

    const bufferInitialData = useSelector((state: any)=> state.mto.bufferInitialData);
    const ccrInitialData = useSelector((state:any)=> state.mto.ccrInitialData);

    const bufferModifyData = useSelector((state: any)=> state.mto.bufferModifyData);
    const ccrModifyData = useSelector((state: any)=> state.mto.ccrModifyData);

    const [mtoProgress, setMTOProgress] = useState("initial");

    const poogiModifyData = useSelector((state: any)=> state.mto.poogiModifyData);
    const poogiInitialData = useSelector((state:any)=>state.mto.poogiIntialData)
  

  const [selectedMajReason, setSelectedMajReason] = useState<any>('');



  

    
  const invalidDataColdefs: ColDef[] = [
    {
      field: 'warning',
      colId: 'warning',
      headerName: 'Warning',
      floatingFilter: false,
      cellRenderer: 'warningCell',
      minWidth: 200,
      suppressColumnsToolPanel: true,
      wrapText: true,
      autoHeight: true,
    },
    {
      field: 'error',
      colId: 'error',
      headerName: 'Error',
      floatingFilter: false,
      cellRenderer: 'errorCell',
      suppressColumnsToolPanel: true,
      wrapText: true,
      autoHeight: true,
    }
  ];

  const onColumnChange = () => {
    const localColDefs = ref.current?.api.getColumnDefs()
    if (ref.current && localColDefs) {
      dispatch(UPDATE_COLDEFS(localColDefs))
      dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
      setDefaultToolPanel('columns')
    }
  }

  const customCellRenderers = useMemo(() => ({
    loadingOverlay: VFLoader,
    errorCell: ErrorCell,
    warningCell: WarningCell,
    seasonalityColorCellRenderer: SeasonalityColorCellRenderer,
    seasonalityGraphCellRenderer: SeasonalityGraphCellRenderer,
    conflictErrorCellRenderer: ConflictErrorCellRenderer,
    poogiEditDeleteCellRenderer: PoogiEditDeleteCell
  }), []);

  useEffect(() => {

    setColDefs(activeMaster.colDefs);

    if (filterButtonStatus.length !== 0) return;

    if (activeMaster.id === 0) {
      if (!isLoading) {
        const allOptions: Option[] = generateOptions(allMastersState);
        dispatch(STORE_ALL_MASTERS(allMastersState));
        dispatch(FILL_OPTIONS(allOptions));
      }

      const temp: MDMMasterState[] = [];
      if (selectedOptions.length > 0 && pageType === "modify") dispatch(FILL_MASTERS([...getSelectedMasters(temp)]));
    }
    // if(isToolPanelOpen) ref.current?.api.openToolPanel('columns');

  }, [selectedOptions, isLoading, activeMaster, allMastersState]);

  const getInitialData = async()=>{
    if(activeMaster.id===501){
      const result = await getBufferMasterData({});
      dispatch(SET_BUFFER_INITIAL_DATA(result.data.data));
    }
    if(activeMaster.id===502){
      const result = await getCCRMasterData({});
      dispatch(SET_CCR_INITIAL_DATA(result.data.data));
    }
    if(activeMaster.id===503){
      const result = await getPOOGIMasterData({});
      dispatch(SET_POOGI_INITIAL_DATA(result.data.data));
    }
  }

  const {mutateAsync: getPlantMaster} = useGetPlantMasterData();
  const {mutateAsync: getDeptMaster} = useGetDeptMasterData();
  const {mutateAsync: getCCRGroupMaster} = useGetCCRGroupMaster(); 

  const [plantMaster, setPlantMaster] = useState<any>([]);
  const [deptMaster, setDeptMaster] = useState<any>([]);
  const [ccrGroupMaster, setCCRGroupMaster] = useState<any>([]);

  const getPlantMasterData = async()=>{
    const response = await getPlantMaster();
    setPlantMaster(response.data.data);
  }
  const getDeptMasterData = async()=>{
    const response = await getDeptMaster();
    setDeptMaster(response.data.data);

  }
  const getCCRGroupMasterData = async()=>{
    const response = await getCCRGroupMaster();
    setCCRGroupMaster(response.data.data);
  }

  useEffect(()=>{
    if (activeMaster.id === 501 && !bufferTypeData){
      getBufferMasterDataType();
    }
    if(activeMaster.id===503 || activeMaster.id===502 || activeMaster.id===504){
      getPlantMasterData();
    }
    if (activeMaster.id===502){
      getDeptMasterData();
      getCCRGroupMasterData();
    }
    getInitialData();
  },[activeMaster.id])

  useEffect(()=>{
    if(bufferTypeData){

      const newColDef = _.cloneDeep(activeMaster.colDefs);
      // Iterate over the column definitions and update based on colId
      newColDef.forEach((col: any) => {
        if (col.colId === 'bt') {
          col.valueFormatter = myFormatter;
        }
        if (col.colId === 'iv') {
          col.cellRenderer = ToggleButton;
        }
      });
      newColDef.forEach((ele:any)=>{ele.cellStyle = (params:any)=>{
        if(params.data.bid===null || params.data.bid===undefined || params.data.iv===false){
          return {color: "rgb(128, 0, 64)"}
        }
      }})
      dispatch(UPDATE_COLDEFS([...newColDef]));
    }

  },[bufferTypeData])

  useEffect(()=>{
    if((activeMaster.id===502 || activeMaster.id===503) && ccrGroupMaster &&  plantMaster &&  deptMaster && (activeMaster.colDefs.length>0)){

      const newColDef = _.cloneDeep(activeMaster.colDefs);
      // newColDef[newColDef.length-2].valueFormatter =  myCCRFormatter;
      

      // Iterate over the column definitions and update based on colId
      newColDef.forEach((col: any) => {
        if (col.colId === 'iv') {
          col.cellRenderer = ToggleButton;
        }
      });
      newColDef.forEach((ele:any)=>{ele.cellStyle = (params:any)=>{
        if(params.data.cid===null || params.data.cid===undefined || params.data.iv===false){
          return {color: "rgb(128, 0, 64)"}
        }
      }
      ele.valueFormatter = myCCRFormatter
    }
      )
      dispatch(UPDATE_COLDEFS([...newColDef]));
    }

  },[ccrGroupMaster, plantMaster, deptMaster])

  useEffect(() => {
    if (masters.length > 0 && filterButtonStatus.length !== 0) {
      setFilterButtonStatus(masters.map((master: MDMMasterState) => master.id));
    }
  }, [masters])

  useEffect(() => {
    if (activeMaster.progress === 'editOnline') {
      return onEditOnline('editOnline');
    }
    if (activeMaster.progress === 'deleteOnline') {
      return onEditOnline('deleteOnline');
    }
  }, [activeMaster.progress]);

  useEffect(() => {
    
  
    //Effect to Add chart handler when seasonality master
    if (activeMaster.id === 10)
      dispatch(UPDATE_COLDEFS(mapMasterToColumnDefs(activeMaster.fields, activeMaster.id, onShowChart)))

  }, [])

  const concatenateFields = (
    params1: Parameter[],
    params2: Parameter[]
  ): ConcatenatedResult[] => {
    // Prepare a result map to avoid duplicates and merge fields
    const resultMap: { [key: string]: ConcatenatedResult } = {};

    // Process params1
    params1.forEach((param) => {
      resultMap[param.name] = {
        id: param.id,
        name: param.name,
        fields: param.fields,
      };
    });

    // Process params2
    params2.forEach((param) => {
      if (resultMap[param.name]) {
        // Merge fields if the name already exists
        resultMap[param.name].fields = [
          ...resultMap[param.name].fields,
          ...param.fields,
        ];
      } else {
        // Otherwise, add the new entry
        resultMap[param.name] = {
          id: param.id,
          name: param.name,
          fields: param.fields,
          isMTO: true, // Add isMTO property
        };
      }
    });
    // Convert the result map to an array of objects
    return Object.values(resultMap);
  };


  useEffect(()=>{
    const getMasterUIConfigurationData = async()=>{
      try{

        const {data} = await masterUIConfiguration(pageType);
        setAllMasterState(mapMasterToMasterState(data.data,onShowChart))
      }catch(e){
        console.error(e)
      }
      }
      getMasterUIConfigurationData()
  },[])

  useEffect(() => {
    const getMasterUIConfigurationData = async () => {
      let data = undefined;
      let MtoBufferdata = undefined;
      try{

        const { data: myData } = await masterUIConfiguration(pageType);
        data = myData;
      }
      catch(e){
        console.log(e)
      }finally{
        try{
          MtoBufferdata = await MTOMasterUIConfiguration();
        }
        catch(e){
          console.log(e);
        }
      }
      
      if(data){
        
        const concatenatedResult = concatenateFields(data?.data, MtoBufferdata?.data?.data);
        setAllMasterState(mapMasterToMasterState(concatenatedResult, onShowChart))
      }
      else{
        setAllMasterState(mapMasterToMasterState(MtoBufferdata?.data?.data, onShowChart))
      }
    }
    
    getMasterUIConfigurationData()
  }, [])

  useEffect(() => {
    if (activeMaster.progress === 'default' && pageType === 'add') {
      dispatch(TOGGLE_UPLOAD_MODAL(true))
    }
  }, [activeMaster])

// Validatio in process....

  const validateMTOMaster = (masterId: number, newRowData:any) => {
    if (masterId === 501) {
      const allRows = [...newRowData];
      const newData:any = [];
      console.log("validating this data...", newRowData);

      allRows.forEach((e, i) => {
      const newVal = _.cloneDeep(e);

      if (e.bsz === "") {
      newVal.err = { error: "Enter the Buffer Size!", warning: "" };
      } 
      // Validate for empty buffer type
      else if (e.bt === "") {
      newVal.err = { error: "Enter the Buffer Type!", warning: "" };
      }
      else if (Number(e.bsz) <= 0 || Number(e.bsz) >= 365 || e.bsz===null) {
      newVal.err = { error: "Buffer Size must be a number between 1 and 364!", warning: "" };
      } 
      // Validate slt is numeric and within range
      else if ( Number(e.slt) < 0 || Number(e.slt) >= 365 || e.slt===null) {
      newVal.err = { error: "SLT must be a number between 0 and 364!", warning: "" };
      } 
      // Validate slt is not empty
      else if (e.slt === "") {
      newVal.err = { error: "SLT cannot be empty!", warning: "" };
      }
      else if (e.mlt === "") {
      newVal.err = { error: "MLT cannot be empty!", warning: "" };
      }
      // Validate mlt is numeric and within range
      else if ( Number(e.mlt) < 0 || Number(e.mlt) >= 365 || e.mlt===null) {
      newVal.err = { error: "MLT must be a number between 0 and 364!", warning: "" };
      }
      // Validate data types
      else if (isNaN(Number(e.bsz))) {
      newVal.err = { error: "Buffer Size must be a number!", warning: "" };
      }
      else if (isNaN(Number(e.slt))) {
      newVal.err = { error: "SLT must be a number!", warning: "" };
      }
      else if (isNaN(Number(e.mlt))) {
      newVal.err = { error: "MLT must be a number!", warning: "" };
      }
      else if (typeof e.bcd !== 'string') {
      newVal.err = { error: "Enter a valid Buffer Code!", warning: "" };
      }
      else if (typeof e.bd !== 'string') {
      newVal.err = { error: "Enter a valid Buffer Description!", warning: "" };
      }
      else if ((e.ib !== 'true' && e.ib !== 'false')&& (typeof e.ib !== 'boolean')) {
      newVal.err = { error: "Is Blue must be either 'true' or 'false'!", warning: "" };
      }
      // Check against bufferInitialData for duplicates
      else {
      bufferInitialData?.forEach((ele:any) => {
      if (ele.bcd === e.bcd) {
      newVal.err = { error: "Buffer code already exists in master", warning: "" };
      }
      if (ele.bt === e.bt && ele.bsz === e.bsz) {
      newVal.err = { error: "Buffer size for the buffer type already exists in master", warning: "" };
      }
      });
      
      // Check for uniqueness within the current rows
      allRows.forEach((ele, index) => {
      if (index !== i && ele.bsz === e.bsz && e.bt === ele.bt) {
      newVal.err = { error: "Buffer size must be unique!", warning: "" };
      }
      });
      
      const isBufferTypeValid = bufferTypeData?.some((btData:any) =>( (btData.dsc === e.bt || btData.id===e.bt)));
      if (!isBufferTypeValid) {
      newVal.err = { error: "Choose a valid buffer type from the drop down", warning: "" };
      }
      }

      // Additional validations
      if (!e.bt || !e.bsz) {
      newVal.err = { error: "Enter Buffer Type and Buffer Size", warning: "" };
      }
      if (Number(e.bsz) <= 0) {
      newVal.err = { error: "Buffer size must be greater than 0", warning: "" };
      }
      if (Number(e.bsz) > 365) {
      newVal.err = { error: "Buffer size cannot exceed for over a year", warning: "" };
      }
      const isBufferCodeDuplicate = bufferInitialData?.some(
      (master: any) => master.bcd === e.bcd
      );
      const isbufferCodeDuplicateInCurr = allRows.some(
      (row: any, index: any) => index !== i && row.bcd === e.bcd
      );
      if (isbufferCodeDuplicateInCurr) {
      newVal.err = { error: "Buffer code must be unique within the current list!", warning: "" };
      }
      if (isBufferCodeDuplicate) {
      newVal.err = { error: "Buffer code already exists in master", warning: "" };
      }
      const isBufferTypeAndSizeDuplicate = bufferInitialData?.some(
      (master: any) => master.bt === e.bt && master.bsz === e.bsz
      );
      if (isBufferTypeAndSizeDuplicate) {
      newVal.err = { error: "Buffer size for the buffer type already exists in master", warning: "" };
      }
      const isBszUnique = allRows.every((row: any, index: any) => {
      if (index === i) return true;
      return !(row.bt === e.bt && row.bsz === e.bsz);
      });
      if (!isBszUnique) {
      newVal.err = { error: "Buffer size must be unique for a given buffer type", warning: "" };
      }

      if (!newVal.err.error) {
      newVal.err = { error: "", warning: "" };
      }

      newData.push(newVal);
      });
      
      dispatch(UPDATE_ROW_DATA(newData));
    }
    
    if (masterId === 502) { 
      const allRows = [...newRowData];
      console.log("allRows....", allRows)
      const newData: any = [];
    
      allRows.forEach((e: any, index: number) => {
      const newVal = _.cloneDeep(e);

      if (typeof e.cnm !== 'string') {
        newVal.err = { error: "CCR name must be a string!", warning: "" };
      } else if (isNaN(Number(e.cpd))) {
        newVal.err = { error: "CCR Capacity Per Day must be a number!", warning: "" };
      } else if (isNaN(Number(e.whpd))) {
        newVal.err = { error: "Working hours Per Day must be a number!", warning: "" };
      } else if (isNaN(Number(e.sh))) {
        newVal.err = { error: "Scheduling horizon must be a number!", warning: "" };
      } else if (isNaN(Number(e.rb)) || Number(e.rb) < 0 || Number(e.rb) > 1) {
        newVal.err = { error: "Resource buffer (rb) must be a decimal between 0 and 1!", warning: "" };
      } else if (isNaN(Number(e.cwl))) {
        newVal.err = { error: "Cumulative WIP Limit must be a number!", warning: "" };
      }
      else if (plantMaster && !plantMaster?.some((plant: any) => plant.plant_name === e.pl || plant.plant_id === e.pl)) {
        newVal.err = { error: "Please select a valid plant from the dropdown", warning: "" };
      } else if (deptMaster && !deptMaster?.some((dept: any) => ((dept.dept_name === e.dp) || (dept.dept_id === e.dp)))) {
        newVal.err = { error: "Please select a valid department from the dropdown", warning: "" };
      }
      else if (ccrGroupMaster && !(Object?.values(ccrGroupMaster)?.some((group: any) => ((group.ccr_group_code === e.cgid) ||(group.ccr_group_id === e.cgid))))) {
        newVal.err = { error: "Please select a valid CCR Group from the dropdown", warning: "" };
      }
    
      if (e.cnm === "" || !e.cnm) {
        newVal.err = { error: "CCR name cannot be empty!", warning: "" };
      } 
      else if (e.cpd === "" || !e.cpd || e.cpd <= 0) {
        newVal.err = { error: "CCR Capacity Per Day must be greater than 0!", warning: "" };
      } 
      else if (e.whpd === "" || !e.whpd || e.whpd <= 0) {
        newVal.err = { error: "Working hours Per Day must be greater than 0!", warning: "" };
      } 
      else if (e.sh === "" || !e.sh) {
        newVal.err = { error: "Scheduling horizon cannot be empty!", warning: "" };
      } 
      else if (ccrInitialData?.some((ele: any) => ele.ccd === e.ccd)) {
        newVal.err = { error: "CCR code already exists in the master data!", warning: "" };
      } 
      else if (e.rb === undefined || e.rb < 0 || e.rb > 1) {
        newVal.err = { error: "Resource buffer (rb) must be between 0 and 1!", warning: "" };
      } 
      else if (e.cwl === "" || e.cwl === undefined || e.cwl <= 0) {
        newVal.err = { error: "Cumulative WIP Limit must be greater than 0!", warning: "" };
      }

      else {
        const isCcrCodeDuplicate = ccrInitialData?.some(
        (master: any) => master.ccd === e.ccd
        );
        
        const isCcrCodeDuplicateInCurr = allRows.some(
        (row: any, i: any) => ((i < index) && (row.ccd === e.ccd))
        );
        if (isCcrCodeDuplicateInCurr) {
        newVal.err = { error: "CCR code must be unique!", warning: "" };
        }
        if (isCcrCodeDuplicate) {
        newVal.err = { error: "CCR code exists in master data!", warning: "" };
        }
      }
      newData.push(newVal);
      });
    
      // Dispatch the updated row data
      dispatch(UPDATE_ROW_DATA(newData));
    }
    
  }


  const sideBar: SideBarDef = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressPivots: true,
          suppressPivotMode: true,
        },

      },
    ],
    defaultToolPanel: defaultToolPanel,
  }

  const agGridProps: AgGridReactProps = {
    tooltipShowDelay: 0,
    readOnlyEdit: true,
    tooltipTrigger: 'hover',
    sideBar: ['default', 'view'].includes(activeMaster.progress) ? sideBar : {},
    gridOptions: {
      getRowStyle: (params: any) => {
        if (params.node.rowIndex % 2 === 0) {
          return { background: "#EBEBEB" };
        }
        return { background: "#F7F7F7" };
      },
    },
    pagination: true,
    paginationPageSize: rowsPerPage,
    // suppressPaginationPanel:true,
    onColumnVisible: onColumnChange,
    // overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="/assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
    loadingOverlayComponent: 'loadingOverlay',
    onFirstDataRendered: ()=>{

      if(pageType==='add'){
        const newRowData = _.cloneDeep(activeMaster.rowData);
        newRowData.forEach((ele:any)=>{
          if (typeof ele.err === 'string') {
            ele.err = { error: '' };
          } else {
            ele.err.error = '';
          }
        })
        validateMTOMaster(activeMaster.id, newRowData);
        return;
      }


    },
    onCellValueChanged: (event)=>{
      const data = event.data;
      const field:any = event.colDef.field;
      const newValue = event.newValue;
      const newRow = { ...data };
      newRow[field] = newValue;
      // if(activeMaster.id===503){
      //   return;
      // }
      if(pageType==='add'){
        const newRowData = _.cloneDeep(activeMaster.rowData.map((row: any) => {
          if (JSON.stringify(row) === JSON.stringify(data)) {
              return newRow;
            }
            return row;
          }));
        newRowData.forEach((ele:any)=>{
          if (typeof ele.err === 'string') {
            ele.err = { error: '' };
          } else {
            ele.err.error = '';
          }
        })
        validateMTOMaster(activeMaster.id, newRowData);
        return;
      }

      
    },
    onRowDataUpdated: (event: any) => {

      
        if(activeMaster.id===503){
          const nodesToSelect: any= [];

          event.api.forEachNode((node: any) => {

            if((!node.data.minId) && node.data?.majId=== selectedMajReason?.majId){
              nodesToSelect.push(node)
            }
             
          });
          event.api.setNodesSelected({nodes: nodesToSelect, newValue: true});
        }
       
     
        const downloadableColumnKeys: string[] = [];
        activeMaster.fields.forEach((field: Field) => {
        if (field.isDownload) {
          downloadableColumnKeys.push(field.key)
        }
      });
      
      if (downloadData) {
        const currentMaster = masters.find((master: MDMMasterState) => master.id === activeMaster.id);
        const visibleColumns = ref.current?.api.getAllDisplayedColumns();
        const validColumnKeys: string[] = [];
        if (visibleColumns) {
          visibleColumns.forEach((col: any) => {
            if (isUploadModalOpen && !downloadableColumnKeys.includes(col.colId)) {
              return;
            }
            validColumnKeys.push(col.colId)
          })
        }
        if (currentMaster) {
          event.api.exportDataAsExcel({ fileName: downloadFileName === '' ? currentMaster.name : downloadFileName, columnKeys: validColumnKeys });
        }
      }
      
    },
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    components: customCellRenderers,
    onSelectionChanged: () => {
      if (ref.current?.api) {
        setSelectedRowsCount(ref.current?.api.getSelectedRows().length)
      }
    },
    onGridReady: (params: any) => {
      if(activeMaster.id===501){
        params.api.sizeColumnsToFit();
      }
    },
  
    onCellEditingStopped(event) {
      const data = event.data;
      const field:any = event.colDef.field;
      const newValue = event.newValue;
      const newRow = { ...data };
      newRow[field] = newValue;
      // if(activeMaster.id===503){
      //   return;
      // }
      if(pageType==='add'){
        const newRowData = _.cloneDeep(activeMaster.rowData.map((row: any) => {
          if (JSON.stringify(row) === JSON.stringify(data)) {
              return newRow;
            }
            return row;
          }));
        newRowData.forEach((ele:any)=>{
          if (typeof ele.err === 'string') {
            ele.err = { error: '' };
          } else {
            ele.err.error = '';
          }
        })
        validateMTOMaster(activeMaster.id, newRowData);
        return;
      }

     

    if(data.minId===undefined){

        
      const newRowData = activeMaster.rowData.map((row: any) => {
      if (JSON.stringify(row) === JSON.stringify(data)) {
          return newRow;
        }
        return row;
      })
      // setEnableEditOnlineReset(true)
      dispatch(UPDATE_ROW_DATA([...newRowData]))
    }
    else if(activeMaster.id===503){
      const newRowData = activeMaster.rowData.map((row: any) => {
        if (JSON.stringify(row.majId) === JSON.stringify(data.majId)) {
            row.minData.map((ele:any)=>{
              if(ele.minId===data.minId){
                return data;
              }
              return ele;
            })
          }
          return row;
        })
        dispatch(UPDATE_ROW_DATA([...newRowData]));

    }
     
    },
  }

  const getTempGridColDefs = () => {
    //check if it already contains
    let doesInvalidColDefExists = false;
    invalidDataColdefs.forEach((invalidColumn: ColDef) => {
      if (activeMaster.colDefs.find((column: ColDef) => invalidColumn.colId === column.colId)) doesInvalidColDefExists = true;
    })
    if (doesInvalidColDefExists) return [...activeMaster.colDefs]
    return [...invalidDataColdefs, ...activeMaster.colDefs]
  }

  const tempAgGridProps: AgGridReactProps = {
    columnDefs: getTempGridColDefs(),
    onRowDataUpdated: (event) => {
      const Colparams: any = {
        columnKeys: activeMaster.colDefs.filter((col: ColDef) => col.headerName !== "Warning" && col.headerName !== 'Error').map((col: ColDef) => col.field),
      };
      if (tempDownloadData) event.api.exportDataAsExcel({  fileName: downloadFileName ? 'Error-' + downloadFileName : 'Error-' + activeMaster.name, columnKeys: Colparams.columnKeys });
      // if (tempDownloadData) event.api.exportDataAsExcel({  fileName: downloadFileName ? 'Error-' + downloadFileName : 'Error-' + activeMaster.name});
    }
  };


  const addCheckBoxColDefs = () => {
    const checkboxColDefs: ColDef[] = [
      {
        field: 'checkbox',
        colId: 'checkbox',
        headerName: '',
        width: 40,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionCurrentPageOnly: true
      },
      // {
      //   field:'checkbox',
      //   he
      //   headerName:'Select Across All Pages',
      //   // checkboxSelection:true,
      //   headerCheckboxSelection:true
      // },
    ]
    dispatch(ADD_COLDEFS({ colDefs: checkboxColDefs }));
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
  }



  const addInvalidDataColDefs = (columnName: string) => {
    dispatch(ADD_COLDEFS({ colDefs: [columnName === 'error' ? invalidDataColdefs[1] : invalidDataColdefs[0]] }));
    // dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
  }

  const getCurrentVisbileColumns = () => {
    const columnData = ref.current?.api.getAllDisplayedColumns();
    return columnData?.map((column: any) => ({ key: column.colDef.field }));
  }

  function convertArrayToObject(input: { attributeName: string; op: string; value: string }[]) {
    const operatorMap: Record<string, string> = {
        "=": "et",
        "!=": "net",
        ">": "gt",
        "<": "lt",
        ">=": "gte",
        "<=": "lte",
        "contains":"cn",
        "startsWith": "sw",
        "endsWith": "ew",
        "hasValue": "hv",
        "hasNoValue": "dnc"
        // Add more mappings as needed
    };

    // 'lt': 'lt',
    //     'lte': 'lte',
    //     'gt': 'gt',
    //     'gte': 'gte',
    //     'sw': 'istartswith',
    //     'ew': 'iendswith',
    //     'et': 'exact',
    //     'cn': 'icontains',
    //     'dnc': 'donotcontains',
    //     'dsw': 'doesnotstartswith',
    //     'dew' : 'doesnotendswith',
    //     'hv' : 'hv',
    //     'net' : 'notequalto'

    return input.reduce((acc, { attributeName, op, value }) => {
        acc[attributeName] = {
            op: operatorMap[op] || op, // Convert operator or fallback to original
            val: value
        };
        return acc;
    }, {} as Record<string, { op: string; val: string }>);
}
  const queryFilteredData = async (configs: QueryFilteredDataConfigs) => {

    const newColDefs:any = [];
      activeMaster.colDefs.forEach((ele:any)=>{
        const newColDef = {...ele};
        delete newColDef.editable;   
        newColDefs.push(newColDef);
      })

    dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))

    const { filters, pagination, fields, count, currentPage, rowsPerPage } = configs;
    const payload: GetMasterDataPayload = {
      id: activeMaster.id,
      name: activeMaster.name,
      filters: filters,
      fields: fields,
    }

    if (pagination && !count) {
      payload.paginationParameter = {
        pageNumber: currentPage,
        recordsPerPage: rowsPerPage
      }
    }

    const finPayload: any= convertArrayToObject(filters);
    
    let resultData;

    if (finPayload.bt) finPayload.btype = finPayload.bt; delete finPayload.bt;
    if (finPayload.pl) finPayload.plnm = finPayload.pl; delete finPayload.pl;
    if (finPayload.dp) finPayload.dpnm = finPayload.dp; delete finPayload.dp;
    if (finPayload.cgid) finPayload.cg = finPayload.cgid; delete finPayload.cgid;
/******  cb9a1de4-0e9b-4735-8968-a85fa557c44e  *******/
    
    
    if (activeMaster.id===501) {
      const tempResultData = await getBufferMasterData({finPayload});
      const updatedData = _.cloneDeep(tempResultData)
      if(bufferModifyData && bufferModifyData.length){
        const updatedDataBuffer = updatedData.data.data;
        const filteredDataBuffer = updatedDataBuffer.filter(
          (buffer:any) => !bufferModifyData.some((modifiedBuffer:any) => modifiedBuffer.bid === buffer.bid)
        );
        updatedData.data.data = updatedData.data.data = [...bufferModifyData,...filteredDataBuffer];
      }
      resultData = updatedData;
    }
    if(activeMaster.id===502){
      const tempResultData = await getCCRMasterData({finPayload});
      const updatedData = _.cloneDeep(tempResultData)
      if(ccrModifyData && ccrModifyData.length){
        const updatedDataBuffer = updatedData.data.data;
        const filteredDataBuffer = updatedDataBuffer.filter(
          (buffer:any) => !ccrModifyData.some((modifiedBuffer:any) => modifiedBuffer.cid === buffer.cid)
        );
        updatedData.data.data = updatedData.data.data = [...ccrModifyData,...filteredDataBuffer];
      }
      resultData = updatedData;
    }
    if(activeMaster.id===503){
      const tempResultData = await getPOOGIMasterData({finPayload});
      const updatedData = _.cloneDeep(tempResultData)
      if(poogiModifyData && poogiModifyData.length){
        const updatedDataBuffer = updatedData.data.data;
        const filteredDataBuffer = updatedDataBuffer.filter(
          (buffer:any) => !poogiModifyData.some((modifiedBuffer:any) => modifiedBuffer.cid === buffer.cid)
        );
        updatedData.data.data = updatedData.data.data = [...ccrModifyData,...filteredDataBuffer];
      }
      resultData = updatedData;
    }

    return resultData;
  }
  
  const queryAllData = async (configs: QueryFilteredDataConfigs) => {
    const newColDefs:any = [];
      activeMaster.colDefs.forEach((ele:any)=>{
        const newColDef = {...ele};
        delete newColDef.editable;   
        newColDefs.push(newColDef);
      })

    dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))
    
    const { pagination, fields, count, currentPage, rowsPerPage } = configs;
    const payload: GetMasterDataPayload = {
      id: activeMaster.id,
      name: activeMaster.name,
      filters: [],
      fields: fields,
    }
    
    
    if (pagination && !count) {
      payload.paginationParameter = {
        pageNumber: currentPage,
        recordsPerPage: rowsPerPage
      }
    }
    let resultData;
    if ((!activeMaster.isMTO && count) || activeMaster.isMTO) {
      if (activeMaster.id===501) {
        const tempResultData = await getBufferMasterData({});
        const updatedData = _.cloneDeep(tempResultData)
        if(bufferModifyData && bufferModifyData.length){
          const updatedDataBuffer = updatedData.data.data;
          const filteredDataBuffer = updatedDataBuffer.filter(
            (buffer:any) => !bufferModifyData.some((modifiedBuffer:any) => modifiedBuffer.bid === buffer.bid)
          );
          updatedData.data.data = updatedData.data.data = [...bufferModifyData,...filteredDataBuffer];
        }
        resultData = updatedData;
      }
      else if(activeMaster.id===502 && activeMaster.isMTO) {
        const tempResultData = await getCCRMasterData({});
        const updatedData = _.cloneDeep(tempResultData)
        if(ccrModifyData && ccrModifyData.length){
          const updatedDataBuffer = updatedData.data.data;
          const filteredDataBuffer = updatedDataBuffer.filter(
            (buffer:any) => !ccrModifyData.some((modifiedBuffer:any) => modifiedBuffer.cid === buffer.cid)
          );
          updatedData.data.data = updatedData.data.data = [...ccrModifyData,...filteredDataBuffer];
        }
        resultData = updatedData;
      }
      else if(activeMaster.id===503 && activeMaster.isMTO){
        const tempResultData = await getPOOGIMasterData({});
        const updatedData = _.cloneDeep(tempResultData)
        if(poogiModifyData && poogiModifyData.length){
          const updatedDataPoogi = updatedData.data.data;
          const filteredDataPoogi = updatedDataPoogi.filter(
            (poogi:any) => !poogiModifyData.some((modifiedPoogi:any) => modifiedPoogi.majId === poogi.majId)
          );
          updatedData.data.data = updatedData.data.data = [...poogiModifyData,...filteredDataPoogi];
        }
        resultData = updatedData;
      }
      else if(activeMaster.id===504 && activeMaster.isMTO){
        resultData = await getCalendarMasterData();
        if(!activeMaster.colDefs.some((col: ColDef) => col.headerName === 'Action')){
          dispatch(UPDATE_COLDEFS([...activeMaster.colDefs,{headerName: 'Action', cellRenderer: MTOCalendarEditCellRenderer}]))

        }
      }
      else {
        if(!activeMaster.isMTO){
          resultData = await getCount(payload);
        }
      }
    }
    else {

      if (activeMaster.id > 14 && !activeMaster.isMTO) {
        resultData = await getMasterDataRetail(payload);
      }
      else if (activeMaster.id === 501 && activeMaster.isMTO) {
        resultData = await getBufferMasterData({});
      }
      else if(activeMaster.id===502 && activeMaster.isMTO) {
        resultData = await getCCRMasterData({});
      }
      else if(activeMaster.id===503 && activeMaster.isMTO) {
        resultData = await getPOOGIMasterData({});
        dispatch(SET_POOGI_INITIAL_DATA(resultData.data.data))
      }
      else if(activeMaster.id===504 && activeMaster.isMTO){
        resultData = await getCalendarMasterData();
      }
      else {
        resultData = await getMasterData(payload);
      }
    }

    return resultData;
  }

  const getSelectedMasters = (temp: MDMMasterState[]) => {
    selectedOptions.forEach((selectedOption: Option) => {
      allMastersState.forEach((master: MDMMasterState) => {
        if (master.fields.find((field: Field) => field.displayName === selectedOption.label) && !temp.find((selectedMaster: MDMMasterState) => selectedMaster.id === master.id)) temp.push(master);
      })
    });
    return temp;
  }

  const handleSelectMasterSubmit = () => {
    masters.forEach((master: MDMMasterState) => {
      if (!master.isChecked) {
        dispatch(REMOVE_MASTER(master.id));
      }
    })
    if (activeMaster.id === 0) {
      dispatch(UPDATE_ACTIVE_MASTER(0));
    }
    else {
      dispatch(UPDATE_ACTIVE_MASTER(masters[0]))
    }
    dispatch(TOGGLE_SELECT_MASTER_SCREEN(false));
  }

  const handleTabChange = (currMaster: MDMMasterState) => {
    if (currMaster.progress === 'submitted') return notifyError(`The ${currMaster.name} is already submitted`);
    if(activeMaster.isMTO){
      dispatch(UPDATE_ACTIVE_MASTER(currMaster));
      return;
    }
    const nextMasterIndex = masters.findIndex((master: MDMMasterState) => (master.progress !== 'submitted' && master.progress !== 'editOnlineSubmitted'));

    if (currMaster.id === masters[nextMasterIndex].id) return dispatch(UPDATE_ACTIVE_MASTER(nextMasterIndex));
    else  return notifyError(`Please Complete the ${masters[nextMasterIndex].name}`);

  }

  const generateDraftPayload = (rowData: any, draftId?: string) => {
    const pathName = window.location.pathname.split('/')
    let instanceName = ''
    masters.map((master: MDMMasterState) => {
      instanceName += ` ${master.name}`
    })
    return {
      instanceName: instanceName,
      searchKey: activeMaster.name,
      actionType: getActionId(pathName[pathName.length - 1]).id,
      draftId: draftId,
      draftData: masters.map((master: MDMMasterState) => {

        return {
          masterId: master.id,
          status: master.progress,
          gridState: master.id === activeMaster.id ? JSON.stringify(activeMaster.colDefs) : '',
          dataMaster: master.id === activeMaster.id ? rowData : []
        }
      })
    }
  }

  const handleTabClose = (e: React.MouseEvent<HTMLElement>, currMaster: MDMMasterState) => {
    e.stopPropagation();
    if (masters.length === 1) {
      return notifyError("There Should be atleast one selected Master")
    }
    dispatch(REMOVE_MASTER(currMaster.id));
    setDownloadData(false);
    if (currMaster.id === activeMaster.id) {
      const mastersLength = masters.length
      for (let index = 0; index < mastersLength; index++) {

        if (masters[index].progress !== 'submitted') {
          dispatch(UPDATE_ACTIVE_MASTER(index))
          return
        }
      }

    }
  }



  const addNewMaster = () => {
    if (allMastersState.length === masters.length) {
      notifyError('All Masters have already been selected. Cannot add more masters');
      return;
    }
    dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
    setDownloadData(false);
    setTempDownloadData(false);
  }

  const handleOnAddFilter = () => {
    dispatch(ADD_FILTER());
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
  }

  const handleOnDeleteFilter = (id: string) => {
    if (activeMaster.filters.length === 1) {
    // dispatch(REMOVE_FILTER(id));
    // dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
      dispatch(RESET_FILTERS());
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());

      // dispatch(UPDATE_FILTER(emptyFilter))
      return;
      // return notifyError("Cannot Delete this Filter Instance")
    }

    dispatch(REMOVE_FILTER(id));
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
  }

  const handleApplyFilter = async (showAll?: boolean) => {
    if (showAll) setIsShowAll(showAll)
    else setIsShowAll(false)
    if (downloadData) setDownloadData(false)
    const currMasterFilters = activeMaster.filters;
    if (!areMasterFiltersValid(currMasterFilters) && !showAll) {
      return notifyError('Filter cannot be empty')
    }

    const payloadFilters = mapStateFiltersToPayload(currMasterFilters);
    const payloadFields: any = getCurrentVisbileColumns();

    setIsTableDataLoading(true);

    let result;
    try{

      if (showAll) {
        result = await queryAllData({ filters: payloadFilters, fields: payloadFields, pagination: false, count: true, rowsPerPage });
      }
      else {
      result = await queryFilteredData({ filters: payloadFilters, fields: payloadFields, pagination: false, count: true, rowsPerPage });
    }
  }catch(err){
    console.log(err)
  }

    setIsTableDataLoading(false);
    if (activeMaster.isMTO) {
      if (!result?.data?.data?.count || result?.data?.data?.count == 0 || result?.data?.data?.count == '') {
        setTempRecordCount(result?.data.data.length)
      }
      else {
        setTempRecordCount(result?.data?.data?.count)
      }
    } else {
      if (!result?.data.recordCount || result?.data.recordCount == 0 || result.data.recordCount == '') {
        setTempRecordCount(0)
      }
      else {
        setTempRecordCount(result.data.recordCount)
      }
    }

    toggleWarningModal(true);
  }

  const onWarningModalClose = () => {
    toggleWarningModal(false);
    setIsTableDataLoading(false);
    setTempRecordCount(0)
  }

  const onWarningModalSuccess = async (refetch?: boolean) => {
 
    refetch = refetch ? refetch : false
 
    const currMasterFilters = activeMaster.filters;
 
    const payloadFilters = mapStateFiltersToPayload(currMasterFilters);
    let payloadFields: any = getCurrentVisbileColumns();
    payloadFields = payloadFields.filter((field: any) => !['checkbox', 'graph', 'color'].includes(field.key))
 
    setIsTableDataLoading(true);
    let result: any;
 
    if ((!areMasterFiltersValid(currMasterFilters) && activeMaster.filters.length === 1) || isShowAll) {
      if (activeMaster.id == 10 || activeMaster.id == 6) {
        result = await notifyPromise(queryAllData({ filters: payloadFilters, fields: payloadFields, pagination: false }), {
          success: "Data Fetched Successfully",
          error: "Something Went Wrong",
          pending: "Loading Data"
        });
        dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true));
      }
      else if (activeMaster.isMTO) {
        result = await notifyPromise(queryAllData({ filters: payloadFilters, fields: payloadFields, pagination: true, currentPage: 1, rowsPerPage }), {
          success: "Data Fetched Successfully",
          error: "Something Went Wrong",
          pending: "Loading Data"
        });
      }
      else {
        result = await notifyPromise(queryAllData({ filters: payloadFilters, fields: payloadFields, pagination: true, currentPage: 1, rowsPerPage }), {
          success: "Data Fetched Successfully",
          error: "Something Went Wrong",
          pending: "Loading Data"
        });
      }
      dispatch(RESET_FILTERS())
    }
    else {
      if (activeMaster.id == 10 || activeMaster.id == 6) {
        result = await notifyPromise(queryFilteredData({ filters: payloadFilters, fields: payloadFields, pagination: false }), {
          success: "Data Fetched Successfully",
          error: "Something Went Wrong",
          pending: "Loading Data"
        });
        dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true));
      }
      else {
        result = await notifyPromise(queryFilteredData({ filters: payloadFilters, fields: payloadFields, pagination: true, currentPage: 1, rowsPerPage }), {
          success: "Data Fetched Successfully",
          error: "Something Went Wrong",
          pending: "Loading Data"
        });
      }
 
    }
 
 
    if (tempRecordCount <= rowsPerPage) {
      dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
    }
    else {
      dispatch(UPDATE_DATA_AVAILABILITY_STATUS(false))
    }
 
    if (tempRecordCount <= rowsPerPage) {
      toggleEditOnline(true);
    }
    else {
      toggleEditOnline(false);
    }
 
 
    setIsTableDataLoading(false);
    if (tempRecordCount == 0) {
      toggleWarningModal(false);
      return;
    }
 
    let tempRowData: any
    if (activeMaster.isMTO) {
      tempRowData = result?.data?.data?.map((row: any) => {
        const newRow = { ...row };
 
        Object.keys(newRow).map((key) => {
          // console.log('line no 949',key)
          // console.log('isMTO line 951',activeMaster.colDefs)
          const currentColDef = activeMaster.colDefs.find((c) => c.colId === key)
 
          const cellDataType = currentColDef?.cellDataType
          if (cellDataType === 'number' && newRow[key] !== null) {
            newRow[key] = parseFloat(newRow[key])
          }
        })
 
 
        return newRow
      })
    }
    else {
      tempRowData = result.data.data.map((row: any) => {
        const newRow = { ...row };
 
        Object.keys(newRow).map((key) => {
          const currentColDef = activeMaster.colDefs.find((c) => c.colId === key)
          const cellDataType = currentColDef?.cellDataType
          if (cellDataType === 'number' && newRow[key] !== null) {
            newRow[key] = parseFloat(newRow[key])
          }
        })
 
        return newRow
      })
    }
    dispatch(UPDATE_ROW_DATA(tempRowData));
    if (refetch) return
    toggleWarningModal(false);
    if (pageType === 'remove') {
      dispatch(UPDATE_PROGRESS_STATE('deleteView'));
    }
    else {
      if (activeMaster.id == 10) {
        dispatch(UPDATE_PROGRESS_STATE('seasonality'));
        return dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
      }
      if (activeMaster.id == 6) {
        dispatch(UPDATE_PROGRESS_STATE('phaseInPhaseOut'));
      }
      else dispatch(UPDATE_PROGRESS_STATE('view'));
    }
    dispatch(SET_RECORD_COUNT(tempRecordCount))
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
  }

  const onUploadMaster = async () => {
    let intervalID: any;
    try {
      if (!file) {
        notifyError('Please select a file to upload.');
        return
      }
      const selectedColumns = ref.current?.api.getAllDisplayedColumns();
      // const toasId = notifyLoader("Reading File");
      setIsOverlayVisible(true)

      // TODO : MTO check for which all master this needs to be done
      // if (activeMaster.id < 14) {
      const buffData =  await parseMTOExcelData(file,activeMaster, pageType, selectedColumns);
      // }
      getInitialData();

      /////
      const updatedColdefs = activeMaster.colDefs.map((col: ColDef) => {
        // const isEditable = activeMaster.fields.find((field: Field) => field.key === col.colId)?.isEdit;
        if(col.field==='iv')return {...col, cellRenderer: ToggleButton};
        if(col.field==='bt')return {...col, editable: true,  cellEditor: 'agRichSelectCellEditor',
        valueFormatter: myFormatter,
        cellEditorParams: {
          values: bufferTypeData?.map((item: any) =>  item.dsc), 
        }, }
        if (col.field === 'pl' || col.field==='plnm') return {
          ...col,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: plantMaster?.map((item: any) => item.plant_name),
          },
        };
        
        if (col.field === 'dp') return {
          ...col,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: deptMaster?.map((item: any) => item.dept_name),
          },
        };
        
        if (col.field === 'cgid') return {
          ...col,
          editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: Object.values(ccrGroupMaster || {}).map((group: any) => group.ccr_group_code),
          },
        };
        if(col.field==='slt') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='mlt') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='cpd') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='whpd') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='sh') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='rb') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='fh') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        if(col.field==='cwl') return{
          ...col,
          editable: true,
          cellEditor: 'agNumberCellEditor'

        }
        
        else return {  ...col, editable: true, singleClickEdit: true }
        // return { ...col }
      })



      dispatch(UPDATE_COLDEFS([{colId: 'err', field: 'err',cellRenderer: MTOErrorWarningCell, minWidth: 300, headerName: 'Error', pinned: 'left'  },...updatedColdefs]))
      
      ////
      const formData = new FormData();
      formData.append("file", file);
      formData.append("ui_config", JSON.stringify(activeMaster.fields))
      formData.append("screen_type", JSON.stringify({ screenType: pageType }))
      // const processId = uuidv4();


      // TODO: checked for buffer only make it dynamic
    //   if(activeMaster.id!==501 && activeMaster.id!==502 && activeMaster.id!==503 && activeMaster.id!==504){

        
    //     intervalID = setInterval(async () => {
    //       const progress = await getUploadProgress(processId);
    //       setUploadProgress(progress.data.progress);
    //       setTotalProgress(progress.data.totalRows)
    //     }, 1000)
        
    //     const response = await validateMaster({ formData, masterId: activeMaster.id });
    //     clearInterval(intervalID);
    //     let result = JSON.parse(response.data)
    //     const errorAndWarningData = result.filter((data: any) => data.error.length > 0 || data.warning.length > 0)
    //     result = [...errorAndWarningData, ...result.filter((data: any) => data.error.length === 0 && data.warning.length === 0)]
        
    //     setIsOverlayVisible(false);
        
    //   const ifErrorExists = result.find((data: any) => data.error.length > 1);
    //   const ifWarningExists = result.find((data: any) => data.warning.length > 1);

    //   if (ifErrorExists) {
    //     dispatch(UPDATE_PROGRESS_STATE('error'));
    //     addInvalidDataColDefs('error');
    //   }
    //   if (ifWarningExists) {
    //     // dispatch(UPDATE_PROGRESS_STATE('error'));
    //     addInvalidDataColDefs('warning');
    //   }
    //   if (!ifErrorExists) {
    //     if (activeMaster.progress === 'deleteView') dispatch(UPDATE_PROGRESS_STATE('deleteUploaded'));
    //     else dispatch(UPDATE_PROGRESS_STATE('uploaded'));
    //     addCheckBoxColDefs();
    //   }
      
    
    //   dispatch(SET_RECORD_COUNT(result.length));
    //   dispatch(UPDATE_ROW_DATA(result));
    //   dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true));
    // }
    // else{

    dispatch(SET_RECORD_COUNT(buffData.length));
    dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true));

    dispatch(UPDATE_ROW_DATA(buffData));

    // }
      
      dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
      dispatch(TOGGLE_UPLOAD_MODAL(false));
      setIsOverlayVisible(false)
      notifySuccess(`Data Uploaded Successfully`);
      setDownloadData(false);
      setTempDownloadData(false);
      setCurrentPage(1);
    }
    catch (error: any) {
      toast.dismiss();
      notifyError(error.message);
      setIsOverlayVisible(false);
      if (intervalID) clearInterval(intervalID);
    }

  }

      const exportToExcel = async (fromUploadModal?:boolean)=>{
        try {
          const currMasterFilters = activeMaster.filters;
          const payloadFilters = areMasterFiltersValid(currMasterFilters)? mapStateFiltersToPayload(currMasterFilters) : [];
        
          const payloadFields:any = getCurrentVisbileColumns();
          
          const numberOfPages = Math.ceil(recordCount/chunkSize);
          const toastId = notifyLoader(`Downloading Data 0 / ${recordCount}`)
          const rows = [];
          for(let i=1; i<=numberOfPages; i++){
            const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:false,pagination:true,currentPage:i,rowsPerPage:chunkSize});
            if(result?.data.data === null) throw new Error("Something Went Wrong")
            if(result?.data){
              rows.push(...result.data.data)
            }
            if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${recordCount} / ${recordCount}`})
            else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${recordCount}`})
          }

          dispatch(UPDATE_ROW_DATA(rows));
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          setDownloadData(true);
          toast.dismiss(toastId);
          if(fromUploadModal){
            setIsUploadButtonDisabled(false);
            notifySuccess(`Data Downloaded Successfully`);
            return
          }

          notifySuccess(`Data Exported Successfully`);
        } catch (error) {
          toast.dismiss();
          notifyError('Something Went Wrong');
        }
        
      }

      const onClearExportError = () => {
        const erroneusData:any[] = [];
        const validData:any[] = [] 
        activeMaster.rowData.forEach((data:any)=>{
          if(data.err.error.length > 0){
            erroneusData.push(data);
          }
          else{
            validData.push(data);
          }
        });
        setTempGridData(erroneusData);
        setTempDownloadData(true);

        // if(activeMaster.progress!=='submitted'){
          dispatch(UPDATE_ROW_DATA(validData));
        
          // dispatch(REMOVE_COLDEFS(['error','warning']));
          // addCheckBoxColDefs();
          // if(pageType==='remove') dispatch(UPDATE_PROGRESS_STATE('deleteUploaded'));
          // else  dispatch(UPDATE_PROGRESS_STATE('uploaded'));
          dispatch(SET_RECORD_COUNT(validData.length))
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        // }
        
      }
      
      const deleteSelected = () => {
        const selectedRows = ref.current?.api.getSelectedRows();
        if(selectedRows && selectedRows.length > 0){
          dispatch(REMOVE_ROW_DATA(selectedRows));
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          notifySuccess(`${selectedRows?.length} records deleted successfully`);
          setSelectedRowsCount(0);
          dispatch(SET_RECORD_COUNT(recordCount-selectedRows.length));
        }
        else{
          notifyError("Please Select Rows to Delete");
        }
        
      }

      const handleChangePage = async (pageNo:any) => {

        setCurrentPage(pageNo);
        setIsTableDataLoading(true)
        if(activeMaster.rowData.length > rowsPerPage){
            ref.current?.api.paginationGoToPage(pageNo-1);
            setIsTableDataLoading(false);
            return;
        }
        
        const payloadFilters = mapStateFiltersToPayload(activeMaster.filters);
        const payloadFields:any = getCurrentVisbileColumns();
        let result;
        if(!areMasterFiltersValid(activeMaster.filters) && activeMaster.filters.length === 1){
          result = await queryAllData({filters:payloadFilters,fields:payloadFields,pagination:true,currentPage:pageNo,rowsPerPage});
        }
        else{
          result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,pagination:true,currentPage:pageNo,rowsPerPage});
        }
        
        dispatch(UPDATE_ROW_DATA(result?.data.data));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        setIsTableDataLoading(false);

      }

      const postMasterDataChunks = async (rowData:any,isOverWrite?:boolean,actionStatus="") => {
        const columnsToOmit = activeMaster.fields.filter((field:Field)=>!field.isDownload).map((field:Field)=>field.key)
        if(([6].includes(parseInt(String(activeMaster.id),10)) === false)){
          //CleanUp Row Data
          rowData = rowData.map((row:any)=>_.omit(row,'error','warning','users',columnsToOmit));
        }

        // Convert To String
        rowData = rowData.map((row:any)=>{
          const tempRow:any = {};
          Object.keys(row).forEach((key:string)=>{
            if(row[key]===undefined || row[key]===null){
              tempRow[key] = "";
            }
            else{
              tempRow[key] = row[key].toString();
            }
          })
          return tempRow;
        });
        let taskId:any = '';
        let toastId:any = '';
        let conflictCount = 0;
        let errorCount = 0;
        const tempConflictData:any = [];
        const errorData:any = [];
        try {
          let submitProgress = 0;
          const payload:any = {
            id:activeMaster.id,
            action:actionStatus,
            TaskId:'',
            IsOverWrite:isOverWrite===true?true:false,
            data:[],
            uiconfig:activeMaster.fields
          }

          toastId = notifyLoader(`Submitting Data ${submitProgress}/${activeMaster.rowData.length}`);
        
          for(let i=0; i < rowData.length; i+=chunkSize){
          
              if(i+chunkSize < rowData.length){
                payload.data = rowData.slice(i,i+chunkSize);
                toast.update(toastId,{render:`Submitting Data ${i+chunkSize}/${rowData.length}`})
                submitProgress+=chunkSize;
              }
              else{
                payload.data = rowData.slice(i)
                toast.update(toastId,{render:`Submitting Data ${rowData.length}/${rowData.length}`})
              }
              
              let data:any;
              
              if(activeMaster.id > 14){
                data = await modifyMasterRetail(payload);
              }
              else{
                data = await modifyMaster(payload);
              }


              if(taskId === '' && i!==0) throw new Error("Something Went Wrong");

              if(TASK_ID === ''){
                payload.TaskId = data.data.taskId;
                taskId = data.data.taskId;
              }
              else{
                payload.TaskId = TASK_ID;
                taskId = TASK_ID;
              }

              setTaskId(data.data.taskId);
              
              if(data.data.conflictErrorCount){
                conflictCount += parseInt(data.data.conflictErrorCount,10);
              }
              errorCount += parseInt(data.data.errorCount,10);
              const conflictedRows = data.data.conflictError;
              const errorenousRows = data.data.error;
              
              if(conflictedRows instanceof Array) {
                conflictedRows.forEach((row:any)=>{
                  const userIndex = tempConflictData.findIndex((data:any)=>data.user === row.user);
                  if(userIndex >= 0){
                    tempConflictData[userIndex].conflictdetails = [...tempConflictData[userIndex].conflictdetails,...row.conflictdetails]
                  }
                  else{
                    tempConflictData.push({
                      user:row.user,
                      conflictdetails:row.conflictdetails
                    })
                  }
                })
              }
              if(errorenousRows instanceof Array) {
                errorenousRows.forEach((row:any)=>{
                  const userIndex = errorData.findIndex((data:any)=>data.errorType === row.errorType);
                  if(userIndex >= 0){
                    errorData[userIndex].errorData = [...errorData[userIndex].errorData,...row.errorData]
                  }
                  else{
                    errorData.push({
                      errorType:row.errorType,
                      errorData:row.errorData
                    })
                  }
                })
              }
            }

            const intersectionCount = conflictCount + errorCount - activeMaster.rowData.length
            
            const pureErrorCount = activeMaster.rowData.length + intersectionCount - conflictCount
            const pureConflictCount = activeMaster.rowData.length + intersectionCount - errorCount

            toast.dismiss(toastId);
            setConflictCount(pureConflictCount);
            setErrorCount(pureErrorCount);
            setConflictData(tempConflictData);
            setErrorData(errorData)
            // console.log({isConflicts:pureConflictCount>0,errorCount:pureErrorCount,errorData,conflictCount:pureConflictCount,conflictData} )
            return {isConflicts:pureConflictCount>0,errorCount:pureErrorCount,errorData,conflictCount:pureConflictCount,conflictData:tempConflictData} 
            
          }
         catch (error) {
          notifyError("Something Went Wrong");
          if(taskId.length > 0){
            await deleteTask(taskId);
          }
          toast.dismiss(toastId)
          return {isConflicts:true,errorCount,errorData,conflictCount,conflictData} 
        }
      }
          
      const onSubmit = async(isOverWrite?:boolean) => {
        
        if(activeMaster.rowData.length === 0) {
          notifyError("No Data to Submit") ;
          return 
        }

        

        setIsSubmitDisabled(true)

        if(isSubmitDisabled) return;

        if(activeMaster.progress === 'editOnline'){
          //remove Editable Coldefs
          const updatedColdefs = activeMaster.colDefs.map((col:ColDef)=>{
            return {...col,editable:false}
          })
          dispatch(UPDATE_COLDEFS(updatedColdefs));
          // dispatch(REMOVE_COLDEFS(['error','warning']))
        }

        //check if errorneous Data
        const errorData = activeMaster.rowData.find((row:any)=>{
          return (row.error || row.warning) &&( row.error!=='' || row.warning!=='')
        });
        if(errorData){
          notifyError('Please Clear Errors Before Submitting');
          return;
        }
        
 
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
     
        dispatch(REMOVE_COLDEFS(['checkbox']));
        //let result;
 
        if(activeMaster.progress === 'editOnline'){
          const {isConflicts,errorCount:localErrorCount,errorData:localErrorData,conflictData:localConflictData} = await postMasterDataChunks(activeMaster.rowData,isOverWrite);
          //result = !isConflicts
          if(!isConflicts){
            if(localErrorCount>0 || errorCount>0){
              let errorRowData
              if(localErrorCount>0){
                errorRowData = createErrorRowData(localErrorData,activeMaster.id)
              }
              else{
                errorRowData = createErrorRowData(errorData,activeMaster.id)
              }
              if(!activeMaster.colDefs.find((c:ColDef)=>c.colId==='error')){
                addInvalidDataColDefs('error')
              }
              if(errorRowData.length>0){
                dispatch(UPDATE_ROW_DATA(errorRowData))
                dispatch(SET_RECORD_COUNT(errorRowData.length))
              }
            }
            notifySuccess(`Modifications Submitted Successfully`);
            setSelectedRowsCount(0);
            dispatch(UPDATE_PROGRESS_STATE('editOnlineSubmitted'));
            dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
            if(draftID.length > 0 && localErrorCount === 0){
              await deleteDraft(draftID);
            }
          }
          else{
            // console.time('That took ')
            // console.log('Calculating...')
            const tempCon = createConflictRowData(localConflictData,activeMaster.id)
            const tempError = createErrorRowData(localErrorData,activeMaster.id)
            const tempResult:any = []

            tempCon.forEach((t:any)=>{
              const exist = tempError.find((e:any)=>e.sc===t.sc)
              if(exist)tempResult.push(exist)
            })
            
            // console.log("Conflicts Count : ",tempCon.length)
            // console.log("Errors Count : ",tempError.length)
            // console.log("Intersection Count : ",tempResult.length)
            // console.log("Not Submitted Count : ",(tempCon.length -tempResult.length )+(tempError.length -tempResult.length ))
            // console.log("Active master length",activeMaster.rowData.length);
            // console.log("Submitted Count : ",activeMaster.rowData.length - ((tempCon.length -tempResult.length )+(tempError.length -tempResult.length )))
            // console.timeEnd('That took ')
            setConflictData(tempCon)
            setConflictCount(tempCon.length)
            setSubmittedDataCount(activeMaster.rowData.length - ((tempCon.length -tempResult.length )+(tempError.length -tempResult.length )))
            setIsConflictModalOpen(true)
            dispatch(UPDATE_PROGRESS_STATE('editOnlineConflicts'))
          }
 
        }
        else{
          const {isConflicts,errorCount:localErrorCount,errorData:localErrorData,conflictData:localConflictData} = await postMasterDataChunks(activeMaster.rowData,isOverWrite);
          
          if(!isConflicts){
            if(localErrorCount>0 || errorCount>0){
              let errorRowData
              if(localErrorCount>0){
                errorRowData = createErrorRowData(localErrorData,activeMaster.id)
              }
              else{
                errorRowData = createErrorRowData(errorData,activeMaster.id)
              }
              if(!activeMaster.colDefs.find((c:ColDef)=>c.colId==='error')){
                addInvalidDataColDefs('error')
              }
              if(errorRowData.length>0){
                dispatch(UPDATE_ROW_DATA(errorRowData))
                dispatch(SET_RECORD_COUNT(errorRowData.length))
              }
              
            }
           
            notifySuccess(`Modifications Submitted Successfully`);
            setSelectedRowsCount(0);
            dispatch(UPDATE_PROGRESS_STATE('submitted'));
            dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
            if(draftID.length > 0 && localErrorCount === 0){
              await deleteDraft(draftID);
            }
          }
          else{
            // console.time('That took ')
            // console.log('Calculating...')

            const tempCon = createConflictRowData(localConflictData,activeMaster.id)
            const tempError = createErrorRowData(localErrorData,activeMaster.id)

            const tempResult:any = []

            tempCon.forEach((t:any)=>{
              const exist = tempError.find((e:any)=>e.sc===t.sc)
              if(exist)tempResult.push(exist)
            })
            
            // console.log("Conflicts Count : ",tempCon.length)
            // console.log("Errors Count : ",tempError.length)
            // console.log("Intersection Count : ",tempResult.length)
            // console.log("Not Submitted Count : ",(tempCon.length -tempResult.length )+(tempError.length -tempResult.length ))
            // console.log("Active master length",activeMaster.rowData.length);
            // console.log("Submitted Count : ",activeMaster.rowData.length - ((tempCon.length -tempResult.length )+(tempError.length -tempResult.length )))
            // console.timeEnd('That took ')
            setConflictData(tempCon)
            setConflictCount(tempCon.length)
            setSubmittedDataCount(activeMaster.rowData.length - ((tempCon.length -tempResult.length )+(tempError.length -tempResult.length )))
            setIsConflictModalOpen(true)
            dispatch(UPDATE_PROGRESS_STATE('conflicts'))
          }


        }
       setIsSubmitDisabled(false)
      }

      const onSeasonalityStatusUpdate = async (status:string) => {
        const selectedRows = ref.current?.api.getSelectedRows();
        let error = false;

        if(selectedRows){
          if(status === 'stop'){
            for(let i=0; i<selectedRows.length; i++){
              if(selectedRows && !validStopStatuses.includes(selectedRows[i].sts)){
                notifyError('Selected Data Consists some rows that are not eligible for Stopping.')
                error = true;
                break;
              }
            }
          }
          if(status === 'resume'){
            for(let i=0; i<selectedRows.length; i++){
              if(selectedRows && !validResumeStatuses.includes(selectedRows[i].sts)){
                notifyError('Selected Data Consists some rows that are not eligible for Resuming.');
                error = true;
                break;
              }
            }
          }
          if(!error) {
            await postMasterDataChunks(selectedRows,false,status);
            onWarningModalSuccess(true)
            notifySuccess("Status Updated Successfully");
          }
          
        }
       
       

        
      } 

      const onPIPOStatusUpdate = async () => {
        const selectedRows = ref.current?.api.getSelectedRows();
        await postMasterDataChunks(selectedRows,false,'stop');
        onWarningModalSuccess(true)
        notifySuccess("Status Updated Successfully");

      } 

      const resetMtoMasters = ()=>{
          dispatch(UPDATE_PROGRESS_STATE('default'));
        dispatch(UPDATE_ROW_DATA([]));
        dispatch(SET_BUFFER_INITIAL_DATA([]));
        dispatch(SET_BUFFER_MODIFY_DATA([]));
        dispatch(SET_CCR_INITIAL_DATA([]));
        dispatch(SET_CCR_MODIFY_DATA([]));
        dispatch(UPDATE_COLDEFS([]));
        dispatch(REMOVE_ALL_FILTERS());
        // dispatch(UPDATE_ACTIVE_MASTER([]))
       
        dispatch(ADD_FILTER())
        setDownloadData(false);
        setTempDownloadData(false);
        dispatch(FILL_MASTERS([]));
        setFilterButtonStatus([]);
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
        

        if(pageType==='add')dispatch(TOGGLE_UPLOAD_MODAL(true))

       
       
        dispatch(RESET_MTO_STATE())
        dispatch(UPDATE_PROGRESS_STATE('default'));
        dispatch(UPDATE_ROW_DATA([]));
        dispatch(SET_BUFFER_INITIAL_DATA([]));
        dispatch(SET_BUFFER_MODIFY_DATA([]));
        dispatch(UPDATE_COLDEFS([]));
        dispatch(REMOVE_ALL_FILTERS());
        dispatch(SET_CCR_INITIAL_DATA([]));
        dispatch(SET_CCR_MODIFY_DATA([]));
        // dispatch(UPDATE_ACTIVE_MASTER([]))
       
        dispatch(ADD_FILTER())
        setDownloadData(false);
        setTempDownloadData(false);
        dispatch(FILL_MASTERS([]));
        setFilterButtonStatus([]);
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
        

        if(pageType==='add')dispatch(TOGGLE_UPLOAD_MODAL(true))
      }

      const onBackButton = () => {

        if(!bufferModifyData || (bufferModifyData && bufferModifyData.length === 0)){
          dispatch(UPDATE_PROGRESS_STATE('default'));
        dispatch(UPDATE_ROW_DATA([]));
        dispatch(SET_BUFFER_INITIAL_DATA([]));
        dispatch(SET_BUFFER_MODIFY_DATA([]));
        dispatch(SET_CCR_INITIAL_DATA([]));
        dispatch(SET_CCR_MODIFY_DATA([]));
        dispatch(UPDATE_COLDEFS([]));
        dispatch(REMOVE_ALL_FILTERS());
        // dispatch(UPDATE_ACTIVE_MASTER([]))
       
        dispatch(ADD_FILTER())
        setDownloadData(false);
        setTempDownloadData(false);
        dispatch(FILL_MASTERS([]));
        setFilterButtonStatus([]);
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
        

        if(pageType==='add')dispatch(TOGGLE_UPLOAD_MODAL(true))
        }
       
       else if(confirm("Are you sure you want to go back. All the Progress will be lost!. Please Save to Draft")) 
       {
        dispatch(RESET_MTO_STATE())
        dispatch(UPDATE_PROGRESS_STATE('default'));
        dispatch(UPDATE_ROW_DATA([]));
        dispatch(SET_BUFFER_INITIAL_DATA([]));
        dispatch(SET_BUFFER_MODIFY_DATA([]));
        dispatch(UPDATE_COLDEFS([]));
        dispatch(REMOVE_ALL_FILTERS());
        dispatch(SET_CCR_INITIAL_DATA([]));
        dispatch(SET_CCR_MODIFY_DATA([]));
        // dispatch(UPDATE_ACTIVE_MASTER([]))
       
        dispatch(ADD_FILTER())
        setDownloadData(false);
        setTempDownloadData(false);
        dispatch(FILL_MASTERS([]));
        setFilterButtonStatus([]);
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
        

        if(pageType==='add')dispatch(TOGGLE_UPLOAD_MODAL(true))

       }
        
      }

      const postDraftChunks = async (rowData:any) => {
        let draftId = '';
        let chunkProgress = 0;
        let toastId;

        // Convert To String
        rowData = rowData.map((row:any)=>{
          const tempRow:any = {};
          Object.keys(row).forEach((key:string)=>{
            if(row[key]===undefined || row[key]===null){
              tempRow[key] = "";
            }
            else{
              tempRow[key] = row[key].toString();
            }
          })
          return tempRow;
        });

        try {
          toastId = notifyLoader(`Creating Draft ${chunkProgress}/${activeMaster.rowData.length}`);
          for(let i=0; i < rowData.length; i+=chunkSize){
            if(draftId.length > 0){
              if(i+chunkSize < rowData.length){
                await createDraft(generateDraftPayload(rowData.slice(i,i+chunkSize),draftId));
                toast.update(toastId,{render:`Uploading ${i+chunkSize}/${rowData.length}`})
                chunkProgress+=chunkSize;
              }
              else{
                await createDraft(generateDraftPayload(rowData.slice(i),draftId))
                toast.update(toastId,{render:`Uploading ${rowData.length}/${rowData.length}`})
              }
            }
            else{
              let data:any;
              if(draftID){
                data =  await modifyDraft(generateDraftPayload(rowData.slice(0,chunkSize),draftID));
              }
              else{
                data = await createDraft(generateDraftPayload(rowData.slice(0,chunkSize)));
              }  
              draftId = data.data.data;
              dispatch(SET_DRAFT_ID(data.data.data))
            } 
          }
          toast.dismiss(toastId)
          return true; 
        } catch (error) {
          if(draftId.length > 0 && draftID.length === 0){
            await deleteDraft(draftId)
          }
          toast.dismiss(toastId);
          return false
        }

      }

      const onSaveToDraft = async () => {
        let newData:any = []
        const errorOrWarning = activeMaster.rowData.find((row:any)=>(Object.keys(row).includes('error'))||(Object.keys(row).includes('warning')));
        if(errorOrWarning){
          newData = activeMaster.rowData.map((row:any)=>{
            const temp = {...row};
            if(!temp['error']){
              temp['error'] = '';
            }
            if(!temp['warning']){
              temp['warning'] = '';
            }
            return temp;
          });
        }
        else{
          newData = activeMaster.rowData;
        }
       
        const selectedData = ref.current?.api.getSelectedRows();

        if(activeMaster.id==10 || activeMaster.id==6){
          newData = newData.map((row:any)=>{
            const tempRow = {...row}
            if(selectedData?.find((selectedRow:any)=>JSON.stringify(selectedRow)===JSON.stringify(row))){
              tempRow.IsSelected = true
              return tempRow
            }
            tempRow.IsSelected = false
              return tempRow
          })
        }
        
        const res = await postDraftChunks(newData)
        if(res){
          if(draftID.length > 0){
            return notifySuccess("Draft Updated Successfully")
          }
          else{
            return notifySuccess("Draft Created Successfully")
          }
        }
         notifyError("Something Went Wrong")
         return false
      
    }
   

  const onEditOnline = (progress: any) => {
    const updatedColdefs = activeMaster.colDefs.map((col: ColDef) => {
      const isEditable = activeMaster.fields.find((field: Field) => field.key === col.colId)?.isEdit;

      if (isEditable) return { ...col, editable: true }
      return { ...col }
    })

    dispatch(UPDATE_PROGRESS_STATE(progress))
    dispatch(UPDATE_COLDEFS(updatedColdefs))
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());

  }

  const onReset = () => {
    const currentMasterData = masters.find((master: MDMMasterState) => master.id === activeMaster.id)
    if (currentMasterData) dispatch(UPDATE_ROW_DATA(currentMasterData.rowData))
    dispatch(REMOVE_COLDEFS(['error', 'warning']));
    dispatch(UPDATE_PROGRESS_STATE('editOnline'));
    setEnableEditOnlineReset(false)
  }


  const getBufferMasterDataType = async () => {
    const BufferTypeMaster = await GetBufferTypeMaster();
    setBufferTypeData(BufferTypeMaster?.data?.data);
  }

  const onEditOnlineSave = async () => {
    await onSaveToDraft();
  }

  const toggleUploadModal = (value: boolean) => {
    dispatch(TOGGLE_UPLOAD_MODAL(value))
  }
  const onShowChart = async (rowData: any) => {
    try {
      const toastId = notifyLoader('Fetching Chart Details');
      const { data: { data } } = await getSeasonalityDetails(rowData);
      const seasonalityData = data[0];
      setSeasonalityRowData(rowData);
      setNormChangeData(seasonalityData.norm);
      const chartData = generateSesonalityChartData(rowData, seasonalityData);
      setChartData(chartData);
      toggleSeasonalityChartModal(true);
      toast.dismiss(toastId);
      notifySuccess("Chart Details Fetched Successfully");

    } catch (error) {
      toast.dismiss();
      toast.error("Something Went Wrong");

    }

  }


  const onSeasonalityQuickFilter = (statusId: number[]) => {
    const doesMasterExist = masters.find((master: MDMMasterState) => master.id === activeMaster.id)
    let updatedSeasonalityActiveQuickFilter = [...seasonalityActiveQuickFilter];

    if (doesMasterExist) {
      if (seasonalityActiveQuickFilter.find((s) => JSON.stringify(s) === JSON.stringify(statusId))) {
        updatedSeasonalityActiveQuickFilter = seasonalityActiveQuickFilter.filter((s) => {
          return JSON.stringify(s) !== JSON.stringify(statusId)
        })
        setSeasonalityActiveQuickFilter(updatedSeasonalityActiveQuickFilter)
      }
      else {
        updatedSeasonalityActiveQuickFilter = [...updatedSeasonalityActiveQuickFilter, statusId]
        setSeasonalityActiveQuickFilter(updatedSeasonalityActiveQuickFilter)
      }
      let updatedRowData = []


      const flatState = _.flatMap(updatedSeasonalityActiveQuickFilter)
      if (flatState.length == 0) {
        updatedRowData = doesMasterExist.rowData;
      }
      else {
        updatedRowData = doesMasterExist.rowData.filter((row: any) => {
          return flatState.includes(row.sts)
        })
      }

      dispatch(UPDATE_ROW_DATA(updatedRowData))
      dispatch(SET_RECORD_COUNT(updatedRowData.length))

    }
    else {
      return
    }
  }

  const onReviewConflicts = () => {

    const newColDefs: ColDef[] = activeMaster.colDefs.map((colDef: ColDef) => {
      return {
        ...colDef,
        cellRenderer: 'conflictErrorCellRenderer',
        cellStyle: (params) => {
          return {
            ...params.colDef.cellStyle,
            padding: 0
          }
        }
        // tooltipField:colDef.field

      }
    })

    if (newColDefs) dispatch(UPDATE_COLDEFS(newColDefs))
    addCheckBoxColDefs()
    dispatch(UPDATE_ROW_DATA(conflictData))
    setIsConflictModalOpen(false)
    dispatch(SET_RECORD_COUNT(conflictData.length))
  }

  const onIgnoreSubmitErrors = () => {
    const errorRowData = createErrorRowData(errorData, activeMaster.id)
    if (errorRowData.length > 0) {
      addInvalidDataColDefs('error')
      dispatch(UPDATE_ROW_DATA(errorRowData))
      dispatch(SET_RECORD_COUNT(errorRowData.length))
    }
    if (activeMaster.progress === 'editOnlineConflicts') dispatch(UPDATE_PROGRESS_STATE('editOnlineSubmitted'));
    else dispatch(UPDATE_PROGRESS_STATE('submitted'));
    dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());

    setIsConflictModalOpen(false)
  }

  function getCCRGroupKeyById(ccrGroupMaster: any, currBuff: number): string | undefined {
    let val;
  
    // Iterate through the keys of the ccrGroupMaster object
    for (const key in ccrGroupMaster) {
      if (Object.prototype.hasOwnProperty.call(ccrGroupMaster, key)) {
        const group = ccrGroupMaster[key];
  
        // Check if the `ccr_group_id` matches the current buffer
        if (group?.ccr_group_id?.toString() === currBuff?.toString()) {
          val = key; // Assign the key (e.g., "CCR Stitching") to `val`
          break;
        }
      }
    }
  
    return val;
  }
  
  


  function myFormatter(params: any) {
    const currBuff = params.value;

    let val = params.value;
    if(bufferTypeData){

      bufferTypeData.forEach((ele: any) => {
      if (ele.id.toString() === currBuff.toString()) {
        
        val = ele.dsc;
      }
    })
  }
    return val;

  }
  function myCCRFormatter(params: any) {
    const currBuff = params.value;

    let val = params.value;
    if(params.column.colId==='pl' || params.column.colId==="plnm"){

      if(plantMaster){

      plantMaster.forEach((ele: any) => {
      if (ele?.plant_id?.toString() === currBuff?.toString()) {
        
        val = ele.plant_name;
      }
    })
    }
  }
  else if(params.column.colId==='dp'){

      if(deptMaster){

      deptMaster.forEach((ele: any) => {
      if (ele?.dept_id?.toString() === currBuff?.toString()) {
        
        val = ele.dept_name;
      }
    })
    }
  }
  else if(params.column.colId==='cgid'){

      if(ccrGroupMaster){

      val = getCCRGroupKeyById(ccrGroupMaster, currBuff);
    }
  }
    return val;
    
  }

  const getDropDown = (colField: any)=>{
    if(colField==='pl' || colField==='plnm'){
      return plantMaster?.map((item: any) =>  item.plant_name)
    }
  
    if(colField==='dp'){
      return deptMaster?.map((item:any)=> item.dept_name)
    }
    if(colField==='cgid'){
      return Object.keys(ccrGroupMaster);
    }
  }


  const addEditableToLastColumn = async() => {
    const modifiedColDefs = activeMaster.colDefs.map((colDef: any) => {
      const editable = (params: any) => params.node.rowIndex === 0;


      if (colDef.field === 'bt') {
        return {
          ...colDef,
          cellEditor: 'agRichSelectCellEditor',
          valueFormatter: myFormatter,
          cellEditorParams: {
            values: bufferTypeData?.map((item: any) =>  item.dsc), // Dropdown values
          },
          cellStyle: (params:any)=>{
            if(params.data.bid===null || params.data.bid===undefined || params.data.iv===false){
              return {color: "rgb(128, 0, 64)"}
            }
          },
          editable,
        };
      }
      if (colDef.field==="ib"){

        return {
          ...colDef,
          cellRenderer: 'agCheckboxCellRenderer',
          cellEditor: "agCheckboxCellEditor",
          editable,
        };
        
      }
      else if (colDef.field==="bcd" || colDef.field === "bd"){

        return {
          ...colDef,
          cellStyle: (params:any)=>{
            if(params.data.bid===null || params.data.bid===undefined || params.data.iv===false){
              return {color: "rgb(128, 0, 64)"}
            }
          },
          editable,
        };
      }

      if(activeMaster.id===502 ){
        if (colDef.field === 'pl' || colDef.field==='dp' || colDef.field==='cgid') {
          return {
            ...colDef,
            cellEditor: 'agRichSelectCellEditor',
            valueFormatter: myCCRFormatter,
            cellEditorParams: {
              values: getDropDown(colDef.field)
            },
            editable,
          };
        }
        // if(colDef.field==='')
        return {
          ...colDef,
          editable
        }
      }
      if(activeMaster.id===503){
        if(colDef.field==='plnm'){
          return {
            ...colDef,
            cellEditor: 'agRichSelectCellEditor',
            valueFormatter: myCCRFormatter,
            cellEditorParams: {
              values: getDropDown(colDef.field)
            },
            cellStyle: (params:any)=>{
              if (
                (params.data.majId?.toString().startsWith('m') || params.data.minId?.toString().startsWith('m')) ||
                params.data.iu === true ||
                params.data.id === true
              ) {
                return { color: "rgb(128, 0, 64)" };
              }
            },
            editable,
          };
        }
        return {
          ...colDef,
          cellStyle: (params:any)=>{
            if(params.data.majId?.toString().startsWith('m')){
              return {color: "rgb(128, 0, 64)"}
            }
          },
          // editable: (params: any) =>{ (params.data.minId && params.node.rowIndex === useSelector((state: any) => state.mto.editableMinRow)) || ((!params.data.minId) && params.node.rowIndex === useSelector((state: any) => state.mto.editableMajRow))  }
          editable
        }
      }

      else {
        return {
          ...colDef,
          cellEditor: "agNumberCellEditor",
          editable,
          cellStyle: (params:any)=>{
            if(params.data.bid===null || params.data.bid===undefined || params.data.iv===false){
              return {color: "rgb(128, 0, 64)"}
            }
          },
        };
      }

    });


    const actionsCol: any = {
      field: 'actions',
      headerName: 'Actions',
      colId: 'actions',
      pinned: 'left',
      width: 100, 
      cellRenderer: AddRemoveCellRenderer

    }

    // return [actionsCol, ...modifiedColDefs];
    if(modifiedColDefs.find((colDef: any) => colDef.field === 'actions')){
      return;
    }

    dispatch(UPDATE_COLDEFS([actionsCol, ...modifiedColDefs]));

  };

  const addEditableToLastMinColumn = async() => {
    const modifiedColDefs = activeMaster.colDefs.map((colDef: any) => {
      const editable = (params: any) =>{
        return (params.node.rowIndex === 0 && params.colDef.colId==='mindsc') ;
      }


      
      if(activeMaster.id===503){
        return {
          ...colDef,
          // editable: (params: any) =>{ (params.data.minId && params.node.rowIndex === useSelector((state: any) => state.mto.editableMinRow)) || ((!params.data.minId) && params.node.rowIndex === useSelector((state: any) => state.mto.editableMajRow))  }
          editable
        }
      }

      else {
        return {
          ...colDef,
          cellEditor: "agNumberCellEditor",
          editable,
          cellStyle: (params:any)=>{
            if(params.data.bid===null || params.data.bid===undefined || params.data.iv===false){
              return {color: "rgb(128, 0, 64)"}
            }
          },
        };
      }

    });


    const actionsCol: any = {
      field: 'pactions',
      headerName: 'Actions',
      colId: 'pactions',
      pinned: 'left',
      width: 100, 
      cellRenderer: AddRemoveCellRenderer

    }

    // return [actionsCol, ...modifiedColDefs];
    if(modifiedColDefs.find((colDef: any) => colDef.field === 'actions')){
      return;
    }

    dispatch(UPDATE_COLDEFS([actionsCol, ...modifiedColDefs]));

  };

  const addRowToMtoGrid = () => {
    let newRow:any = {};

    if(activeMaster.id===501){

      newRow = {
        bcd: `BUFF-`,
        bd: `BUFF-`,
        bsz: '', // Example value; modify as needed
        slt: 0,
        mlt: 0,
        ib: false,
        bt: 1,
        iv: true,
        editable: true,
      };
    }
    else if(activeMaster.id===502){
      newRow = {
        ccd: `CCR-`,
        cid: null,
        cnm: null,
        cpd: null,
        whpd: null,
        sh: null,
        fh: null,
        rb: null,
        pl: null,
        dp: null,
        a1: null,a2:null, a3:null,a4:null, a5:null, a6:null, a7:null,a8:null,a9:null,a10:null,
        cwl: null,
        cgid: null,
        iv: true
      }
    }
    else if(activeMaster.id===503){
      const newId = 'maj'+uuidv4();
      const newIdMin = 'min'+uuidv4();
      newRow = {
        plnm: '',
        majdsc: '',
        majId: newId,
        minData: [
          {majId:newId,mindsc: '', minId: newIdMin}
        ]
      }
    }
    // addRowToMtoMinGrid();
    dispatch(UPDATE_ROW_DATA([newRow,...activeMaster.rowData]));
    setSelectedMajReason(newRow)
    addEditableToLastColumn();

  }

  const addRowToMtoMinGrid = () => {
    const newMinId = 'min'+uuidv4();
    const newSelectedMajReason = {...selectedMajReason,minData: [{majId: selectedMajReason.majId,minId: newMinId, mindsc: ''},...selectedMajReason.minData]};
    const newRowData:any = [];
    activeMaster.rowData.forEach(element => {
      if(element.majId===selectedMajReason.majId){
        newRowData.push(newSelectedMajReason);
      }
      else{
        newRowData.push(element);
      }
    });
    dispatch(UPDATE_ROW_DATA(newRowData));
    setSelectedMajReason(newSelectedMajReason);
    addEditableToLastMinColumn();
  }

  const user = useUserData();

     
  const navigate = useNavigate();

  const onMTOAddSaveBufferData= async()=>{

    notifyLoader("Saving Task...")
    const BufferPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      buffData: [],
      at: pageType==="add"?"Add":"Modify"
    }

    let isValid = true;

    const selectedRows:any = _.cloneDeep(activeMaster.rowData);
    selectedRows.forEach((e:any)=>{
      const newVal = JSON.parse(JSON.stringify(e));
      bufferTypeData.forEach((ele:any)=>{
        if(ele.dsc===e.bt){
          newVal.bt=ele.id;
        }
      })

      newVal.ib= (e.ib==="false"?0: 1);
      newVal.iv = (e.iv===true|| e.iv===false)? e.iv: true;
      newVal.mlt = parseInt(e.mlt);
      newVal.slt = parseInt(e.slt);
      newVal.bid = null;

      if(newVal.err.error.length>0 || newVal.err.warning.length>0){
        isValid = false;
      }

      BufferPostObj.buffData.push(_.omit(newVal,['editable','err']));
    })

    if(!isValid){
      toast.dismiss();
      notifyError("You cannot save a task with error!")
      return;
    }

    try{
      const response = await saveBufferMasterTask(BufferPostObj);
      if(response.status==200){
        toast.dismiss();
        const allData = [...activeMaster.rowData];
        const indexesToRemove = selectedRows.map((row:any) => allData.indexOf(row));
        indexesToRemove.sort((a:any,b:any) => b - a);
        // indexesToRemove.forEach((index:number) => allData.splice(index,1));
        const newData:any = [];
        allData.forEach((e:any,index: any)=>{
          if(!indexesToRemove.includes(index)) newData.push(e);
        })

        dispatch(UPDATE_ROW_DATA(newData));
        
        navigate(-1);
        resetMtoMasters();
        RESET_MTO_STATE();
        notifySuccess("Buffer task updated!!")
      }
      else{
        toast.dismiss();
        notifyError("Failed to create the task....Please check your validations!")
      }
    }
    catch(error){
      toast.dismiss();
      notifyError("Failed to create task!")
      console.log(error)
    }
    
  }

  const onMTOAddCCRData = async()=>{
    notifyLoader("Saving Task...")


    const CCRPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      ccrData: [],
      at: pageType==="add"?"Add":"Modify"
    }
    const selectedRows:any = _.cloneDeep(activeMaster.rowData);
    let isValid= true;
    selectedRows.forEach((e:any)=>{
      const newVal = _.cloneDeep(e);
      newVal.cid = e.cid? e.cid: null;
      const ccrGid = ccrGroupMaster[e.cgid]?.ccr_group_id? ccrGroupMaster[e.cgid]?.ccr_group_id: e.cgid;
      newVal.cgid = ccrGid;
      newVal.plid = e.pl;
      newVal.dpid = e.dp
      deptMaster.forEach((elm: any)=>{if(elm.dept_name===e.dp)newVal.dpid= elm.dept_id})
      plantMaster.forEach((elm: any)=>{if(elm.plant_name===e.pl)newVal.plid = elm.plant_id})
      if(newVal.err.error!==""){
        isValid = false;
      }
      CCRPostObj.ccrData.push(_.omit(newVal,['editable','err']));
    })
    if(!isValid){
      toast.dismiss();
      notifyError("Make sure you have resolved the error for the selected row!");
      return;
    }

    try{
      const response = await saveCCRMasterTask(CCRPostObj);
      if(response.status==200){
        toast.dismiss();
        const allData = [...activeMaster.rowData];
        const indexesToRemove = selectedRows.map((row:any) => allData.indexOf(row));
        indexesToRemove.sort((a:any,b:any) => b - a);
        // indexesToRemove.forEach((index:number) => allData.splice(index,1));
        const newData:any = [];
        allData.forEach((e:any,index: any)=>{
          if(!indexesToRemove.includes(index)) newData.push(e);
        })

        dispatch(UPDATE_ROW_DATA(newData));
        
        navigate(-1);
        resetMtoMasters();
        RESET_MTO_STATE();
        notifySuccess("CCR task updated!!")

      }
      else{
        toast.dismiss();
        notifyError("Failed to create the task....Please check your validations!")
      }
    }
    catch(error){
      console.log(error)
      toast.dismiss();
      notifyError("Failed to create task!")
    }
  }
  const onMTOAddPoogiData = async()=>{
    notifyLoader("Saving Poogi Task...")


    const PoogiPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      at: pageType==="add"?"Add":"Modify",
      reasonData: [],
    }
    const selectedRows:any = ref?.current?.api?.getSelectedRows();
    let isValid= true;
    selectedRows.forEach((e:any)=>{
      const newVal = _.cloneDeep(e);
      newVal.plid = e.plnm;
      plantMaster.forEach((elm: any)=>{if(elm.plant_name===e.plnm)newVal.plid = elm.plant_id})
      if(newVal.err.error!==""){
        isValid = false;
      }
      PoogiPostObj.reasonData.push(_.omit(newVal,['editable','err']));
    })
    if(!isValid){
      toast.dismiss();
      notifyError("Make sure you have resolved the error for the selected row!");
      return;
    }

    try{
      const response = await savePOOGIMasterTask(PoogiPostObj);
      if(response.status===200){
        const allData = [...activeMaster.rowData];
        const indexesToRemove = selectedRows.map((row:any) => allData.indexOf(row));
        indexesToRemove.sort((a:any,b:any) => b - a);
        const newData:any = [];
        allData.forEach((e:any,index: any)=>{
          if(!indexesToRemove.includes(index)) newData.push(e);
        })
        dispatch(UPDATE_ROW_DATA(newData));
        toast.dismiss();
        notifySuccess("Poogi task updated!!")
      }
      else{
        toast.dismiss();
        notifyError("Failed to create the task....Please check your validations!")
      }
    }
    catch(error){
      toast.dismiss()
      notifyError("Failed to save task")
      console.log(error)
    }
  }

  const onMTOSaveBufferData= async()=>{

    if(pageType==="add")
    {
      if(activeMaster.id===501){
        onMTOAddSaveBufferData();
      }
      else if(activeMaster.id===502){
        onMTOAddCCRData();
      }
      else if(activeMaster.id===503){
        onMTOAddPoogiData();
      }
      return;
    }

    // move this to different function
    if(activeMaster.id===502){
      notifyLoader("Saving CCR Task...");
      const CCRPostObj: any = {
        mid: activeMaster.id,
        uid: user.user.user.id.toString(),
        unm: user.user.user.name,
        at: pageType==="add"?"Add":"Modify",
        ccrData: []
      }

      ccrModifyData.forEach((ele:any)=>{
        const e = _.cloneDeep(ele);
        const ccrGid = ccrGroupMaster[e.cgid]?.ccr_group_id? ccrGroupMaster[e.cgid]?.ccr_group_id: e.cgid;
        e.cgid = ccrGid;
        e.plid = e.pl;
        e.dpid = e.dp
        deptMaster.forEach((elm: any)=>{if(elm.dept_name===ele.dp)e.dpid= elm.dept_id})
        plantMaster.forEach((elm: any)=>{if(elm.plant_name===ele.pl)e.plid = elm.plant_id})
        CCRPostObj.ccrData.push(_.omit(e,['editable','error','warning','pl','dp']));
      })


      try{

        const response = await saveCCRMasterTask(CCRPostObj);
        if(response.status=== 200){
          toast.dismiss();
          notifySuccess("Saved CCR Task Successfully");
          dispatch(UPDATE_ROW_DATA(ccrInitialData));
          dispatch(SET_CCR_MODIFY_DATA([]));
          setMTOProgress("submitted Once");
        }
        else{
          toast.dismiss();
          notifyError("Failed to create the task...")
        }
      }
      catch(error){
        toast.dismiss();
        notifyError("Failed to create task!")
        console.log(error)
      }


      return;
    }

    else if(activeMaster.id===503){

      notifyLoader("Saving POOGI Task...");
      const POOGIPostObj: any = {
        mid: activeMaster.id,
        uid: user.user.user.id.toString(),
        unm: user.user.user.name,
        reasonData: [],
        at: pageType==="add"?"Add":"Modify"
        
      }


      poogiModifyData?.forEach((ele:any)=>{
        const e = _.cloneDeep(ele);
        e.ie = null;
        if (typeof e.majId === "string" && e.majId.startsWith("m")) {
          e.majId = null;
        }
        else{
          e.ie= true;
        }
        e.id = ele.id? ele.id: null;
        e.iu = ele.iu? ele.iu: null;
        e.majid = ele.majId;
      
        // Iterate through minData to check and update minId if it starts with 'm'
        e.minData.forEach((minElement: any) => {
          minElement.id = minElement.id?minElement.id: null;
          if (typeof minElement.minId === "string" && minElement.minId.startsWith("m")) {
            minElement.minId = null;
            minElement.majId = null;
          }
          else{
            minElement.ie = true;
          }
          minElement.minid = minElement.minId;
          minElement.majid = minElement.majId;
          minElement.iu = minElement.iu? minElement.iu: null;
        });


        plantMaster?.forEach((elm: any)=>{if(elm.plant_name===ele.plnm)e.pl = elm.plant_id})
        POOGIPostObj.reasonData.push(_.omit(e,['editable','error','warning', 'plnm']));
      })


      try{
        const response = await savePOOGIMasterTask(POOGIPostObj);
        if(response.status=== 200){
          toast.dismiss();
          notifySuccess("Saved POOGI Task Successfully");
          dispatch(UPDATE_ROW_DATA(poogiInitialData));
          dispatch(SET_POOGI_MODIFY_DATA([]));
          setMTOProgress("submitted Once");
        }
        else{
          toast.dismiss();
          notifyError("Failed to create the task...")
        }
      }
      catch(error){
        toast.dismiss();
        notifyError("Failed to create task!")
        console.log(error)
      }


      return;


    }



    notifyLoader("Saving Task...")

    const BufferPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      at: pageType==="add"?"Add":"Modify",
      buffData: []
    }

    activeMaster.rowData.forEach((ele:any)=>{
      const e = _.cloneDeep(ele);
      bufferTypeData.forEach((elm:any)=>{
        if(elm.dsc===ele.bt){
          e.bt=elm.id;
        }
      })
      e.ib= (e.ib==="false"?0: 1);
      e.mlt = parseInt(e.mlt);
      e.slt = parseInt(e.slt);
      if(!e.bid)e.bid=null;

      if(e.bid===null || e.iv===false){
        BufferPostObj.buffData.push(_.omit(e,['editable','error','warning']));
      }
    })

    try{
      const response = await saveBufferMasterTask(BufferPostObj);
      if(response.status=== 200){
        notifySuccess("Saved Buffer Task Successfully");
        dispatch(UPDATE_ROW_DATA(bufferInitialData));
        dispatch(SET_BUFFER_MODIFY_DATA([]));
        setMTOProgress("submitted Once");
      }
      else{
        toast.dismiss();
        notifyError("Failed to create the task....Please check your validations!")
      }
    }
    catch(error){
      toast.dismiss();
      notifyError("Failed to create task!")
      console.log(error)
    }
  }
  const onMTOSaveAsDraft = async()=>{

    notifyLoader("Saving Draft...")

    if(activeMaster.id===501){

      const BufferPostObj: any = {
        mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      buffData: [],
      at: pageType==="add"?"Add":"Modify"
    }

    
    activeMaster.rowData.forEach((ele:any)=>{
      const e = _.cloneDeep(ele);
      let isBuffChanged = false;
      bufferTypeData?.forEach((elm:any)=>{
        if(elm.dsc===ele.bt){
          isBuffChanged = true;
          e.bt=elm.id;
        }
      })
      if(isBuffChanged===false){
        e.bt=bufferTypeData[0].id;
      }
      e.ib= (e.ib==="false"?0: 1);
      e.mlt = parseInt(e.mlt);
      e.slt = parseInt(e.slt);
      e.err="";
      (!(e.iv===true || e.iv===false))&& (e.iv= false);
      if(!e.bid)e.bid=null;

      if(e.bid===null || e.iv===false){
        BufferPostObj.buffData.push(_.omit(e,['editable','error','warning']));
      }
    })

    console.log("posting this as draft", BufferPostObj);

    try{
      
      const response = await saveBufferMasterDraft([BufferPostObj]);
      if(response.status=== 200){
        toast.dismiss();
        notifySuccess("Saved Draft Successfully");
      }
      else{
        toast.dismiss();
        notifyError("Failed to save draft!")
      }
    }
    catch(error){
      console.log(error)
      toast.dismiss();
      notifyError("Failed to save draft!")
    }
  }

  else if(activeMaster.id===502){
    notifyLoader("Saving CCR Draft...");
    const CCRPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      ccrData: [],
      at: pageType==="add"?"Add":"Modify"
    }
    let tempModifyData = _.cloneDeep(ccrModifyData);
    if(pageType==='add'){
      tempModifyData = _.cloneDeep(activeMaster.rowData)
    }
    tempModifyData.forEach((ele:any)=>{
      const e = _.cloneDeep(ele);
      const ccrGid = ccrGroupMaster[e.cgid]?.ccr_group_id? ccrGroupMaster[e.cgid]?.ccr_group_id: e.cgid;
      e.cid = ele.cid? ele.cid: null;
      e.cgid = ccrGid;
      e.plid = e.pl;
      e.dpid = e.dp
      deptMaster.forEach((elm: any)=>{if(elm.dept_name===ele.dp)e.dpid= elm.dept_id})
      plantMaster.forEach((elm: any)=>{if(elm.plant_name===ele.pl)e.plid = elm.plant_id})
      e.cpd = parseInt(e.cpd);
      e.whpd= parseInt(e.whpd);
      e.fh = parseInt(e.fh);
      e.rb = Number(e.rb);
      e.cwl = parseInt(e.cwl);
      e.sh = parseInt(e.sh);
      e.err="";
      CCRPostObj.ccrData.push(_.omit(e,['editable','error','warning']));
    })


    try{
    
      const response = await saveCCRMasterDraft([CCRPostObj]);
      if(response.status=== 200){
        toast.dismiss();
        notifySuccess("Saved CCR Draft Successfully");
      }
      else{
        toast.dismiss();
        notifyError("Failed to save draft...")
      }
    }
    catch(error){
      console.log(error)
      toast.dismiss();
      notifyError("Failed to save draft!")
    }


    return;
  }
  else if(activeMaster.id===503){

    notifyLoader("Saving POOGI Draft...");
    const POOGIPostObj: any = {
      mid: activeMaster.id,
      uid: user.user.user.id.toString(),
      unm: user.user.user.name,
      reasonData: [],
      at: pageType==="add"?"Add":"Modify"
      
    }


    poogiModifyData?.forEach((ele:any)=>{
      const e = _.cloneDeep(ele);
      e.ie = null;
      if (typeof e.majId === "string" && e.majId.startsWith("m")) {
        e.majId = null;
      }
      else{
        e.ie= true;
      }
      e.id = ele.id? ele.id: null;
      e.iu = ele.iu? ele.iu: null;
      e.majid = ele.majId;
      e.err = "";
    
      // Iterate through minData to check and update minId if it starts with 'm'
      e.minData.forEach((minElement: any) => {
        minElement.id = minElement.id?minElement.id: null;
        if (typeof minElement.minId === "string" && minElement.minId.startsWith("m")) {
          minElement.minId = null;
          minElement.majId = null;
        }
        else{
          minElement.ie = true;
        }
        minElement.err= "";
        minElement.minid = minElement.minId;
        minElement.majid = minElement.majId;
        minElement.iu = minElement.iu? minElement.iu: null;
      });

      plantMaster?.forEach((elm: any)=>{if(elm.plant_name===ele.plnm)e.pl = elm.plant_id})
      POOGIPostObj.reasonData.push(_.omit(e,['editable','error','warning', 'plnm']));
    })

    try{
      const response = await savePOOGIMasterDraft([POOGIPostObj]);
      if(response.status=== 200){
        toast.dismiss();
        notifySuccess("Saved POOGI Task Successfully");
      }
      else{
        toast.dismiss();
        notifyError("Failed to create the task...")
      }
    }
    catch(error){
      toast.dismiss();
      notifyError("Failed to create task!")
      console.log(error)
    }


    return;


  }
  }


  useEffect(()=>{
    if(pageType==='add'){
      if(bufferInitialData || ccrInitialData){
        if((ccrGroupMaster && plantMaster && deptMaster) || bufferTypeData){
          
            const newRowData = _.cloneDeep(activeMaster.rowData);
            newRowData.forEach((ele:any)=>{
              if (typeof ele.err === 'string') {
                ele.err = { error: '' };
              } else {
                ele.err.error = '';
              }
            })
            validateMTOMaster(activeMaster.id, newRowData);
            return;
          
        }
      }
    }

  },[bufferInitialData, ccrInitialData,bufferTypeData, ccrGroupMaster, plantMaster, deptMaster])



  const onMajReasonSelected = ()=>{
    setSelectedMajReason(ref?.current?.api?.getSelectedRows()[0])
  }

  const onMinReasonEditingStopped = (params: any)=>{
     const newData = _.cloneDeep(activeMaster.rowData);
     let majIdIndex = 0;
     activeMaster.rowData.forEach((ele:any,index:number)=>{
       if(ele?.majId===selectedMajReason?.majId){
         majIdIndex = index;
       }
     })

     newData[majIdIndex] &&  (newData[majIdIndex].minData[params.node.rowIndex].mindsc = params.newValue);
     dispatch(UPDATE_ROW_DATA(newData));
     setSelectedMajReason(newData[majIdIndex]);
  }

  return {
    colDefs,
    isSelectMasterOpen,
    options,
    selectedOptions,
    activeMaster,
    filterButtonStatus,
    setFilterButtonStatus,
    getSelectedMasters,
    handleSelectMasterSubmit,
    handleTabChange,
    handleTabClose,
    addNewMaster,
    handleOnAddFilter,
    handleOnDeleteFilter,
    allMastersState,
    handleApplyFilter,
    isLoading,
    isWarningModalOpen,
    toggleWarningModal,
    onWarningModalClose,
    onWarningModalSuccess,
    isUploadModalOpen,
    toggleUploadModal,
    recordCount,
    downloadFileName,
    setDownloadFileName,
    onUploadMaster,
    isOverlayVisible,
    file,
    setFile,
    isTableDataLoading,
    exportToExcel,
    onColumnChange,
    onBackButton,
    onClearExportError,
    agGridProps,
    ref,
    tempRef,
    tempGridData,
    tempAgGridProps,
    deleteSelected,
    onSubmit,
    onSaveToDraft,
    isUploadButtonDisabled,
    editOnline,
    onEditOnline,
    rowsPerPage,
    selectedRowsCount,
    currentPage,
    seasonalityActiveQuickFilter,
    // onSaveToDraft,
    onSeasonalityQuickFilter,
    handleChangePage,
    onReset,
    onEditOnlineSave,
    chartData,
    isSeasonalityChartModalOpen,
    normChangeData,
    toggleSeasonalityChartModal,
    seasonalityRowData,
    isShowAll,
    conflictCount,
    errorCount,
    submittedDataCount,
    conflictData,
    errorData,
    isConflictModalOpen,
    setIsConflictModalOpen,
    onReviewConflicts,
    onIgnoreSubmitErrors,
    isDataAvailableLocally,
    onSeasonalityStatusUpdate,
    validResumeStatuses,
    validStopStatuses,
    onPIPOStatusUpdate,
    enableEditOnlineReset,
    uploadProgress,
    totalProgress,
    tempRecordCount,
    addRowToMtoGrid,
    onMTOSaveBufferData,
    onMTOSaveAsDraft,
    MTOPoogiMinorColdef: [{
      headerName: "Sr No.",
      maxWidth: 90,
      cellStyle: {
        "textAlign": "center"},
      valueGetter: "node.rowIndex + 1"
    },...activeMaster.colDefs.filter((ele: any) =>( ele.field==='pactions'|| ele.colId === 'minId' || ele.colId === 'mindsc'))
    .map((col: any) => {
      if (col.colId === "mindsc") {
        return {
          ...col,
          cellRenderer: MinReasonDescCell,
        };
      }
      return col;
    }), {
      headerName: "",
      cellRenderer: 'poogiEditDeleteCellRenderer',
      maxWidth: 100
    }],
    MTOPoogiMajorColdef:[
      {
        headerName: "Sr No.",
        maxWidth: 90,
        cellStyle: {
          textAlign: "center",
        },
        valueGetter: "node.rowIndex + 1",
      },
      ...activeMaster.colDefs
        .filter(
          (ele: any) =>
            ele.field === "actions" ||
            ele.colId === "majId" ||
            ele.colId === "majdsc" ||
            ele.colId === "plnm"
        )
        .map((col: any) => {
          if (col.colId === "majdsc") {
            return {
              ...col,
              cellRenderer: MajReasonDescCell,
            };
          }
          return col;
        }),
      {
        headerName: "",
        cellRenderer: "poogiEditDeleteCellRenderer",
        maxWidth: 100
      },
    ],
    
    onMajReasonSelected,
    // minReasonRowData: selectedMajReason? (activeMaster.rowData.filter((ele: any) => ele.majId === selectedMajReason?.majId)[0]?.minData):(useSelector((state: any) => state.mto.editableMinRow))? activeMaster.rowData[useSelector((state: any) => state.mto.editableMinRow)]?.minData: [],
    minReasonRowData: selectedMajReason? selectedMajReason.minData: [],
    onMinReasonEditingStopped,
    addRowToMtoMinGrid,
    mtoProgress
  }

}
export default useViewModify;