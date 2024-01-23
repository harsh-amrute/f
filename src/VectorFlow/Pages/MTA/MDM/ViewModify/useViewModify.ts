import {useState, useEffect, useRef, useMemo} from 'react';
import { type Option, type Field,type GetMasterDataPayload, type GridRef, type QueryFilteredDataConfigs, type MDMMasterState } from "../../../../types/MDM";
import {generateOptions, areMasterFiltersValid, parseExcelData, mapStateFiltersToPayload, mapMasterToMasterState, generateSesonalityChartData, checkError,getActionId, mapMasterToColumnDefs } from "../../../../../helpers/utils";
import { useGetMasterData, useGetMasterUIConfiguration, useGetCount, useCreateDraft, useModifyDraft, useGetSeasonalityDetails, useModifyMasterData, useDeleteDraft, useDeleteTask } from "../../../../Services/MTA/MDM";
import { useSelector, useDispatch } from 'react-redux';
import { FILL_MASTERS, FILL_OPTIONS, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_ACTIVE_MASTER, UPDATE_COLDEFS,STORE_ALL_MASTERS, REMOVE_MASTER, ADD_FILTER, REMOVE_FILTER, SYNC_ACTIVE_MASTER_TO_MASTER, UPDATE_ROW_DATA, UPDATE_PROGRESS_STATE, ADD_COLDEFS, REMOVE_ROW_DATA, REMOVE_COLDEFS, SET_DRAFT_ID, TOGGLE_UPLOAD_MODAL, REMOVE_ALL_FILTERS, SET_RECORD_COUNT} from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError, notifyLoader, notifyPromise, notifySuccess } from '../../../../../helpers/notify';
import ErrorCell from '../../../../../components/VectorFLOW/commons/ErrorCell';
import { AgGridReactProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-enterprise';

import WarningCell from '../../../../../components/VectorFLOW/commons/WarningCell';
import { SeasonalityColorCellRenderer, SeasonalityGraphCellRenderer } from '../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers';
import _ from 'lodash';
import { toast } from 'react-toastify';


const useViewModify = (pageType:string) => {

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

    const [allMastersState,setAllMasterState] = useState<MDMMasterState[]>([])
    const [isWarningModalOpen,toggleWarningModal] = useState<boolean>(false)
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

    const [conflictCount,setConflictCount] = useState<number>(0);
    const [errorCount,setErrorCount] = useState<number>(0);
    const [conflictData,setConflictData] = useState<Array<any>>([]);
    const [errorData,setErrorData] = useState<Array<any>>([]);

    const [editOnline,toggleEditOnline] = useState(false);
    const [selectedRowsCount,setSelectedRowsCount] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const rowsPerPage = 50;

    const [seasonalityActiveQuickFilter,setSeasonalityActiveQuickFilter]  = useState<number>(0)
    const ref = useRef<GridRef>();
    const tempRef = useRef<GridRef>(); //used for second ag grid instance which is hidden.
    const [tempGridData,setTempGridData] = useState<object[]>([]);

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<number>>([]);
    const [seasonalityRowData,setSeasonalityRowData] = useState<any>([]);

    const {mutateAsync:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();

   
    // const allMasters:Master[] = masterUIConfiguration?.data.data || [];

    // const allMastersState:MDMMasterState[] = mapMasterToMasterState(allMasters);

    const {mutateAsync:getSeasonalityDetails} = useGetSeasonalityDetails();

    const {mutateAsync:getMasterData} = useGetMasterData();

    const {mutateAsync:getCount} = useGetCount();

    const {mutateAsync:createDraft} = useCreateDraft()

    const {mutateAsync:modifyDraft} = useModifyDraft();

    const {mutateAsync:deleteDraft} = useDeleteDraft()

    const {mutateAsync:modifyMaster} = useModifyMasterData();

    const {mutateAsync:deleteTask} = useDeleteTask();


    // const chunkSize = 100;


    // const colDefs = activeMaster.colDefs

    // const tempRowData = {
    //   sc:"V9I004615P1L001",
    //   wc:"3017",
    //   skd:"T Shirt",
    //   sd:"5/05/2023",
    //   ed:"5/20/2023",
    //   ln:"Bangalore",
    //   tn:"300",
    //   bd:"7",
    //   onm:'50',
    //   r:"10"
    // }

    const invalidDataColdefs:ColDef[] = [
      {
        field:'warning',
        colId:'warning',
        headerName:'Warning',
        floatingFilter:false,
        cellRenderer:'warningCell',
        minWidth:200,
        suppressColumnsToolPanel:true,
        wrapText:true,
        autoHeight:true,
      },
      {
        field:'error',
        colId:'error',
        headerName:'Error',
        floatingFilter:false, 
        cellRenderer:'errorCell',
        suppressColumnsToolPanel:true,
        wrapText:true,
        autoHeight:true,
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
      errorCell: ErrorCell,
      warningCell: WarningCell,
      seasonalityColorCellRenderer:SeasonalityColorCellRenderer,
      seasonalityGraphCellRenderer:SeasonalityGraphCellRenderer
    }), []);

  
  
    useEffect(()=>{

        setColDefs(activeMaster.colDefs);

        if(filterButtonStatus.length !== 0) return;

        if(activeMaster.id === 0){
          if(!isLoading){
            const allOptions:Option[] =  generateOptions(allMastersState);
            dispatch(STORE_ALL_MASTERS(allMastersState));
            dispatch(FILL_OPTIONS(allOptions));
          }
  
          const temp:MDMMasterState[]=[];
          if(selectedOptions.length > 0) dispatch(FILL_MASTERS([...getSelectedMasters(temp)]));
        }
        // if(isToolPanelOpen) ref.current?.api.openToolPanel('columns');

      },[selectedOptions,isLoading,activeMaster,allMastersState]);  

      useEffect(()=>{
        if(masters.length > 0 && filterButtonStatus.length !== 0){
          setFilterButtonStatus(masters.map((master:MDMMasterState)=>master.id));
        }
      },[masters])

      useEffect(()=>{
        if(activeMaster.progress === 'editOnlineSaved'){
          //remove Editable Coldefs
          const updatedColdefs = activeMaster.colDefs.map((col:ColDef)=>{
            return {...col,editable:false}
          })
          dispatch(UPDATE_COLDEFS(updatedColdefs));
          dispatch(REMOVE_COLDEFS(['error','warning']))
        }
        if(activeMaster.progress === 'editOnline'){
          return onEditOnline();
        }
      },[activeMaster.progress]);


      useEffect(()=>{
        const getMasterUIConfigurationData = async()=>{
          const {data} = await masterUIConfiguration(pageType);
          setAllMasterState(mapMasterToMasterState(data.data,onShowChart))
         }
  
         getMasterUIConfigurationData()
      },[])

    const sideBar = {
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
      defaultToolPanel:defaultToolPanel,
    }

    const agGridProps:AgGridReactProps = {

      readOnlyEdit:true,
      sideBar:['default','view'].includes(activeMaster.progress) ? sideBar : {},
      gridOptions:{
        getRowStyle: (params: any) => {
          if (params.node.rowIndex % 2 === 0) {
            return { background: "#EBEBEB" };
          }
          return { background: "#F7F7F7" };
        },
      },
      pagination:true,
      paginationPageSize:rowsPerPage,
      suppressPaginationPanel:true,
      onColumnVisible:onColumnChange,
      overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="/assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
      onRowDataUpdated:(event)=>{
        if(downloadData) event.api.exportDataAsExcel({fileName:downloadFileName ==='' ? activeMaster.name : downloadFileName});
      },
      rowSelection:'multiple',
      suppressRowClickSelection:true,
      components:customCellRenderers,
      onSelectionChanged:()=>{
        if(ref.current?.api){
          setSelectedRowsCount(ref.current?.api.getSelectedRows().length)
        }
      },
      onCellEditingStopped(event) {
        const data = event.data;
        const field = event.colDef.field;
        const newValue = event.newValue;
        // const oldRow = activeMaster.rowData.find((row) => row.RN === data.RN);
        if (!field) {
          return;
        }
        const newRow = { ...data };
        newRow[field] = newValue;
        const newRowData = activeMaster.rowData.map((row:any)=>{
          if(JSON.stringify(row) === JSON.stringify(data)){
              return newRow;
          }
          return row;
        })
        validateEditOnlineData([...newRowData]);
      },
    }

    const tempAgGridProps:AgGridReactProps = {
      columnDefs:[...invalidDataColdefs,...activeMaster.colDefs],
      onRowDataUpdated:(event)=>{
        if(tempDownloadData) event.api.exportDataAsExcel({fileName:downloadFileName ? 'Error-' + downloadFileName : 'Error-'+ activeMaster.name});
      }
    };


    const addCheckBoxColDefs = () => {
      const checkboxColDefs = [
        {
          field:'checkbox',
          colId:'checkbox',
          headerName:'',
          checkboxSelection:true,
          headerCheckboxSelection:true,
          headerCheckboxSelectionCurrentPageOnly:true
        },
        // {
        //   field:'checkbox',
        //   he
        //   headerName:'Select Across All Pages',
        //   // checkboxSelection:true,
        //   headerCheckboxSelection:true
        // },
      ]
      dispatch(ADD_COLDEFS({colDefs:checkboxColDefs}));
      dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
    }

  

    const addInvalidDataColDefs = (columnName:string) => {
      dispatch(ADD_COLDEFS({colDefs:[columnName === 'error' ? invalidDataColdefs[1] : invalidDataColdefs[0]]}));
      // dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
    }

    const getCurrentVisbileColumns = () => {
      const columnData = ref.current?.columnApi.getAllDisplayedColumns();
      return columnData?.map((column:any) => ({key:column.colDef.field}));
    }

    const queryFilteredData = async (configs:QueryFilteredDataConfigs) => {
      const {filters,pagination,fields,count,currentPage,rowsPerPage} = configs;
      const payload:GetMasterDataPayload = {
        id:activeMaster.id,
        name:activeMaster.name,
        filters:filters,
        fields:fields,
      }

      if(pagination && !count) {
        payload.paginationParameter = {
          pageNumber:currentPage,
          recordsPerPage:rowsPerPage
        }
      }
      let resultData;
      if(count){
        resultData =  await getCount(payload);
      }
      else{
        resultData = await getMasterData(payload); 
      }

      return resultData;
    }

    const queryAllData = async (configs:QueryFilteredDataConfigs) => {
      const {pagination,fields,count,currentPage,rowsPerPage} = configs;
      const payload:GetMasterDataPayload = {
        id:activeMaster.id,
        name:activeMaster.name,
        filters:[],
        fields:fields,
      }

      if(pagination && !count) {
        payload.paginationParameter = {
          pageNumber:currentPage,
          recordsPerPage:rowsPerPage
        }
      }
      let resultData;
      if(count){
        resultData =  await getCount(payload);
      }
      else{
        resultData = await getMasterData(payload); 
      }

      return resultData;
    }

    const getSelectedMasters = (temp:MDMMasterState[]) => {
        selectedOptions.forEach((selectedOption:Option)=>{
          allMastersState.forEach((master:MDMMasterState)=>{
            if(master.fields.find((field:Field)=>field.displayName === selectedOption.label) && !temp.find((selectedMaster:MDMMasterState)=>selectedMaster.id === master.id)) temp.push(master);
          })
        });
        return temp;
      }

    const handleSelectMasterSubmit = () => {
      if(activeMaster.id===0){
        dispatch(UPDATE_ACTIVE_MASTER(0));
      }
      dispatch(TOGGLE_SELECT_MASTER_SCREEN(false));
    }

    const handleTabChange = (currMaster: MDMMasterState) => {
      if(currMaster.progress === 'submitted') return notifyError(`The ${currMaster.name} is already submitted`);

      const nextMasterIndex = masters.findIndex((master:MDMMasterState)=>master.progress !== 'submitted');

      if(currMaster.id === masters[nextMasterIndex].id) return dispatch(UPDATE_ACTIVE_MASTER(nextMasterIndex));
      else return notifyError(`Please Complete the ${masters[nextMasterIndex].name}`);  

      
      
    }

    const generateDraftPayload = (rowData:any,draftId?:string)=>{
      const pathName = window.location.pathname.split('/')
      let instanceName = ''
      masters.map((master:MDMMasterState)=>{
        instanceName += ` ${master.name}`
      })
      return{
        instanceName:instanceName,
        searchKey:activeMaster.name,
        actionType:getActionId(pathName[pathName.length-1]).id,
        draftId:draftId,
        draftData:masters.map((master:MDMMasterState)=>{
          return {
            masterId:master.id,
            status:master.progress,
            gridState:master.id===activeMaster.id?JSON.stringify(activeMaster.colDefs):'',
            dataMaster:master.id===activeMaster.id?rowData:[]
          }
        })
      }
    }
    
    const handleTabClose = (e:React.MouseEvent<HTMLElement>,currMaster:MDMMasterState) => {
        e.stopPropagation();
        if(masters.length === 1){
          return notifyError("There Should be atleast one selected Master")
        }
        dispatch(REMOVE_MASTER(currMaster.id));
       
        if(currMaster.id === activeMaster.id){
          const mastersLength = masters.length
          for (let index = 0; index < mastersLength; index++) {
            
            if(masters[index].progress!=='submitted'){
              dispatch(UPDATE_ACTIVE_MASTER(index))
              return
            }
          }
        
        }
      }
    

      
    const addNewMaster = ()=>{
      if(allMastersState.length === masters.length) {
        notifyError('All Masters have already been selected. Cannot add more masters');
        return;
      }
      dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
      setDownloadData(false);
      setTempDownloadData(false);
    }

    const handleOnAddFilter = ()=>{
      dispatch(ADD_FILTER());
      dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
    }
  
    const handleOnDeleteFilter = (id:string)=>{
      if(activeMaster.filters.length === 1) return notifyError("Cannot Delete this Filter Instance")
      dispatch(REMOVE_FILTER(id));
      dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
    }

    const handleApplyFilter =async (showAll?:boolean) => {
      if(downloadData) setDownloadData(false)
      const currMasterFilters = activeMaster.filters;
      if(!areMasterFiltersValid(currMasterFilters) && !showAll){
        return notifyError('Filter cannot be empty')
      }

      const payloadFilters = mapStateFiltersToPayload(currMasterFilters);
      const payloadFields:any = getCurrentVisbileColumns();

      setIsTableDataLoading(true);

      let result;
      if(showAll){
        result = await queryAllData({filters:payloadFilters,fields:payloadFields,pagination:false,count:true,rowsPerPage});
      }
      else{
        result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,pagination:false,count:true,rowsPerPage});
      }

      setIsTableDataLoading(false);
      if(!result.data.recordCount || result.data.recordCount==0)dispatch(SET_RECORD_COUNT(0))
      else dispatch(SET_RECORD_COUNT(result.data.recordCount))
      toggleWarningModal(true);    
    }

    const onWarningModalClose = ()=>{
      toggleWarningModal(false);
      setIsTableDataLoading(false);
    }

    const onWarningModalSuccess = async ()=>{

      const currMasterFilters = activeMaster.filters;

      const payloadFilters = mapStateFiltersToPayload(currMasterFilters);
      const payloadFields:any = getCurrentVisbileColumns();
      
      setIsTableDataLoading(true);
      let result:any;

      if(!areMasterFiltersValid(currMasterFilters) && activeMaster.filters.length === 1){
        result = await notifyPromise(queryAllData({filters:payloadFilters,fields:payloadFields,pagination:true,currentPage:1,rowsPerPage}),{
          success:"Data Fetched Successfully",
          error:"Something Went Wrong",
          pending:"Loading Data"
        }); 
      }
      else{
        result = await notifyPromise(queryFilteredData({filters:payloadFilters,fields:payloadFields,pagination:true,currentPage:1,rowsPerPage}),{
          success:"Data Fetched Successfully",
          error:"Something Went Wrong",
          pending:"Loading Data"
        }); 
      }
      
      if(result.data.recordCount <= rowsPerPage){
        toggleEditOnline(true);
      }
      else{
        toggleEditOnline(false);
      }

      
        setIsTableDataLoading(false);
        if(result.data.recordCount == 0){
          toggleWarningModal(false);
          return;
        }
       
        dispatch(UPDATE_ROW_DATA(result.data.data));
        toggleWarningModal(false);
        if(pageType==='remove'){
           dispatch(UPDATE_PROGRESS_STATE('deleteView'));
        }
        else{
          if(activeMaster.id==10){
            dispatch(UPDATE_PROGRESS_STATE('seasonality'));
            return  dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          }
          if(activeMaster.id==6){
             dispatch(UPDATE_PROGRESS_STATE('phaseInPhaseOut')); 
          }
          else  dispatch(UPDATE_PROGRESS_STATE('view')); 
        }
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
    }

    const onEditOnline = () => {
      const updatedColdefs = activeMaster.colDefs.map((col:ColDef)=>{
        return {...col,editable:true,}
      })
      dispatch(UPDATE_PROGRESS_STATE('editOnline'))
      dispatch(UPDATE_COLDEFS(updatedColdefs))
      // dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());

    }

      const onUploadMaster = async () => {
        try {
          if(!file){
            notifyError('Please select a file to upload.');
            return
          }
          const toasId = notifyLoader("Reading File");
  
          const result = await parseExcelData(file,activeMaster,pageType==='remove');

          const ifErrorExists = result.find((data:any)=>data.error);
          const ifWarningExists = result.find((data:any)=>data.warning);
          if(ifErrorExists) {
            dispatch(UPDATE_PROGRESS_STATE('error'));
            addInvalidDataColDefs('error');
          }
          else if(ifWarningExists){
            dispatch(UPDATE_PROGRESS_STATE('error'));
            addInvalidDataColDefs('warning');
          }
          else{
           if(activeMaster.progress==='deleteView') dispatch(UPDATE_PROGRESS_STATE('deleteUploaded'));
           else  dispatch(UPDATE_PROGRESS_STATE('uploaded'));
            addCheckBoxColDefs();
          }
  
          dispatch(SET_RECORD_COUNT(result.length))
          dispatch(UPDATE_ROW_DATA(result));
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          dispatch(TOGGLE_UPLOAD_MODAL(false));
          toast.dismiss(toasId)
          notifySuccess(`Data Uploaded Successfully`);
          setDownloadData(false);
          setTempDownloadData(false);
          setCurrentPage(1);
        } catch (error:any) {
          toast.dismiss();
          notifyError(error.message);
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
            if(result.data.data === null) throw new Error("Something Went Wrong")
            rows.push(...result.data.data)
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
          if(data.error || data.warning){
            erroneusData.push(data);
          }
          else{
            validData.push(data);
          }
        });
        setTempGridData(erroneusData);
        setTempDownloadData(true);
        
        dispatch(UPDATE_ROW_DATA(validData));
        
        dispatch(REMOVE_COLDEFS(['error','warning']));
        addCheckBoxColDefs();
        if(pageType==='remove') dispatch(UPDATE_PROGRESS_STATE('deleteUploaded'));
        else  dispatch(UPDATE_PROGRESS_STATE('uploaded'));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        
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
            ref.current?.api.paginationGoToPage(pageNo);
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
        
        dispatch(UPDATE_ROW_DATA(result.data.data));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        setIsTableDataLoading(false);

      }

      const postMasterDataChunks = async (rowData:any) => { 

        //CleanUp Row Data
        rowData = rowData.map((row:any)=>_.omit(row,'error','warning'));

        let taskId = '';
        let toastId:any = '';
        let conflictCount = 0;
        let errorCount = 0;
        const conflictData:any = [];
        const errorData:any = [];
        try {
          let submitProgress = 0;
          const payload:any = {
            id:activeMaster.id,
            action:"",
            TaskId:"",
            IsOverWrite:false,
            data:[]
          }

          toastId = notifyLoader(`Submitting Data ${submitProgress}/${activeMaster.rowData.length}`);
        
          for(let i=0; i < rowData.length; i+=chunkSize){
          
              if(i+chunkSize < rowData.length){
                payload.data = activeMaster.rowData.slice(i,i+chunkSize);
                toast.update(toastId,{render:`Submitting Data ${i+chunkSize}/${rowData.length}`})
                submitProgress+=chunkSize;
              }
              else{
                payload.data = rowData.slice(i)
                toast.update(toastId,{render:`Submitting Data ${rowData.length}/${rowData.length}`})
              }
              const data:any = await modifyMaster(payload);

              if(taskId === '' && i!==0) throw new Error("Something Went Wrong");

              payload.taskId = data.data.taskId;
              taskId = data.data.taskId;
           
              conflictCount += parseInt(data.data.conflictErrorCount,10);
              errorCount += parseInt(data.data.errorCount,10);
              const conflictedRows = data.data.conflictError;
              const errorenousRows = data.data.error;
              if(conflictedRows instanceof Array) {
                conflictedRows.forEach((row:any)=>{
                  const userIndex = conflictData.findIndex((data:any)=>data.user === row.user);
                  if(userIndex >= 0){
                    conflictData[userIndex].conflictdetails = [...conflictData[userIndex].conflictdetails,...row.conflictdetails]
                  }
                  else{
                    conflictData.push({
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
            toast.dismiss(toastId);
            setConflictCount(conflictCount);
            setErrorCount(errorCount);
            setConflictData(conflictData);
            setErrorData(errorData);
            return true;  
            
          }
         catch (error) {
          notifyError("Something Went Wrong");
          if(taskId.length > 0){
            await deleteTask(taskId);
          }
          toast.dismiss(toastId)
          return false;
        }
      }
          

      const onSubmit = async() => {

        if(activeMaster.rowData.length === 0) return notifyError("No Data to Submit")

        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
      
        dispatch(REMOVE_COLDEFS(['checkbox']));
        let result;

        if(activeMaster.progress === 'editOnlineSaved'){
          result = await postMasterDataChunks(activeMaster.rowData);
          if(result) dispatch(UPDATE_PROGRESS_STATE('editOnlineSubmitted'));

        }
        else{
          result = await postMasterDataChunks(activeMaster.rowData);
          if(result) dispatch(UPDATE_PROGRESS_STATE('submitted'));
        }
        if(result){
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          notifySuccess(`Modifications Submitted Successfully`);
          setSelectedRowsCount(0);
        }
        
      }

      

      const onBackButton = () => {
       if(confirm("Are you sure you want to go back. All the Progress will be lost!. Please Save to Draft")) 
       {
        dispatch(UPDATE_PROGRESS_STATE('default'));
        dispatch(UPDATE_ROW_DATA([]));
        dispatch(UPDATE_COLDEFS( mapMasterToColumnDefs(activeMaster.fields,activeMaster.id)))
        dispatch(REMOVE_ALL_FILTERS())
       
        dispatch(ADD_FILTER())
        setDownloadData(false);
        setTempDownloadData(false);

        if(pageType==='add')dispatch(TOGGLE_UPLOAD_MODAL(true))

       }
       
       

        
      }

      const postDraftChunks = async (rowData:any) => {
        let draftId = '';
        let chunkProgress = 0;
        let toastId;
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
          const res = await postDraftChunks(activeMaster.rowData)
          if(res){
            if(draftID.length > 0){
              return toast.success("Draft Updated Successfully")
            }
            else{
              return toast.success("Draft Created Successfully")
            }
          }
          return notifyError("Something Went Wrong")
      }

     
      const onReset = () => {
        const currentMasterData = masters.find((master:MDMMasterState)=>master.id === activeMaster.id)
        if(currentMasterData) dispatch(UPDATE_ROW_DATA(currentMasterData.rowData))
        dispatch(REMOVE_COLDEFS(['error','warning']));
        dispatch(UPDATE_PROGRESS_STATE('editOnline'));
      }

      const validateEditOnlineData = (data:any[]) => {
        //Cleanup errors if any and provide clean copy to check again.
        //PS - Worked in tight deadline plz optimize whenever possible.
        dispatch(REMOVE_COLDEFS(['error','warning']));

        const rowData = data.map((row:any)=>{
          if(row.error || row.warning){
            return _.omit(row,'error','warning');
          }
          return row;
        })
      
        const newData = rowData.map((row:any)=>{
          const rowClone = {...row};
          const {error,warning} = checkError(rowClone,activeMaster,pageType==='remove');
          
          if(error){
            rowClone.error = error
          }
          else{
            rowClone.error = '';
          }
          if(warning){
            rowClone.warning = warning;
          }
          else{
            rowClone.warning = '';
          }
          return rowClone;
        });
        
        const isErrorPresent = newData.find((row:any)=>row.error);
        const isWarningPresent = newData.find((row:any)=>row.warning);
        if(isErrorPresent){
          addInvalidDataColDefs('error');
        }
        
        if(isWarningPresent){
          addInvalidDataColDefs('warning');
        }
        dispatch(UPDATE_ROW_DATA(newData));
        // if(isErrorPresent || isWarningPresent){
        //   return notifyError("Invalid Data Found. Please Clear all the errors and warnings before proceeding");
        // } 
        return newData;
      }

      const onEditOnlineSave = ()=>{
        onSaveToDraft();
        const result = validateEditOnlineData(activeMaster.rowData);
        
        const isErrorPresent = result.find((row:any)=>row.error.length > 0);
        const isWarningPresent = result.find((row:any)=>row.warning.length > 0);
      
        if(isErrorPresent || isWarningPresent){
          return notifyError("Please Clear All Errors before submit")
        }
        dispatch(UPDATE_PROGRESS_STATE('editOnlineSaved'))

      }

      const toggleUploadModal = (value:boolean)=>{
        dispatch(TOGGLE_UPLOAD_MODAL(value))
      }
       const onShowChart = async (rowData:any) => {
        try {
          const toastId = notifyLoader('Fetching Chart Details');
          const {data:{data}} = await getSeasonalityDetails(rowData);
          setSeasonalityRowData(rowData);
          setNormChangeData(data.norm);
          const chartData = generateSesonalityChartData(rowData,data);
          setChartData(chartData);
          toggleSeasonalityChartModal(true);
          toast.dismiss(toastId);
          toast.success("Chart Details Fetched Successfully");
          
        } catch (error) {
          toast.dismiss();
          toast.error("Something Went Wrong");

        }
        
      }

    
      const onSeasonalityQuickFilter = (id:number)=>{
        const doesMasterExist = masters.find((master:MDMMasterState)=>master.id===activeMaster.id)
        if(id===seasonalityActiveQuickFilter){
          if(doesMasterExist){
            setSeasonalityActiveQuickFilter(0)
            dispatch(UPDATE_ROW_DATA(doesMasterExist.rowData))
            return
          }

          
        }
        if(doesMasterExist){
          setSeasonalityActiveQuickFilter(id)
          dispatch(UPDATE_ROW_DATA(doesMasterExist.rowData.filter((row:any)=>row.sts==id)))
        }
      }

      const onDeleteOnlineSave = ()=>{
        const selectedRows = ref.current?.api.getSelectedRows()
        if(!selectedRows || selectedRows.length<1)return notifyError('Please select rows to submit')
        dispatch(REMOVE_COLDEFS(['checkbox']))
        dispatch(UPDATE_ROW_DATA(selectedRows))
        dispatch(UPDATE_PROGRESS_STATE('deleteOnlineSaved'))
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
        onDeleteOnlineSave,
        chartData,
        isSeasonalityChartModalOpen,
        normChangeData,
        toggleSeasonalityChartModal,
        seasonalityRowData,
        conflictCount,
        errorCount,
        conflictData,
        errorData
    }
}

export default useViewModify;