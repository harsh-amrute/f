import {useState, useEffect, useRef, useMemo} from 'react';
import { type Master, type Option, type Field,type GetMasterDataPayload, type GridRef, type QueryFilteredDataConfigs, type MDMMasterState } from "../../../../types/MDM";
import {generateOptions, areMasterFiltersValid, parseExcelData, mapStateFiltersToPayload, mapMasterToMasterState, generateSesonalityChartData } from "../../../../../helpers/utils";
import { useGetMasterData, useGetMasterUIConfiguration, useGetCount, useCreateDraft, useModifyDraft, useGetSeasonalityDetails } from "../../../../Services/MTA/MDM";
import { useSelector, useDispatch } from 'react-redux';
import { FILL_MASTERS, FILL_OPTIONS, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_ACTIVE_MASTER, UPDATE_COLDEFS,STORE_ALL_MASTERS, REMOVE_MASTER, ADD_FILTER, REMOVE_FILTER, SYNC_ACTIVE_MASTER_TO_MASTER, UPDATE_ROW_DATA, UPDATE_PROGRESS_STATE, ADD_COLDEFS, REMOVE_ROW_DATA, REMOVE_COLDEFS, SET_DRAFT_ID} from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError, notifyLoader, notifyPromise, notifySuccess } from '../../../../../helpers/notify';
import ErrorCell from '../../../../../components/VectorFLOW/commons/ErrorCell';
import { AgGridReactProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-enterprise';
import { masterIdToSchemaMapper } from '../../../../../helpers/MDMConstants';

import WarningCell from '../../../../../components/VectorFLOW/commons/WarningCell';
import { SeasonalityColorCellRenderer, SeasonalityGraphCellRenderer } from '../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers';
import _ from 'lodash';
import { toast } from 'react-toastify';

const useViewModify = () => {

    const dispatch = useDispatch();

    const options = useSelector((state: RootState) => state.mdm.options);
    const selectedOptions = useSelector((state: RootState) => state.mdm.selectedOptions);
    const activeMaster = useSelector((state:RootState) => state.mdm.activeMaster);
    const masters = useSelector((state:RootState)=>state.mdm.masters);

    const isSelectMasterOpen = useSelector((state:RootState) => state.mdm.isSelectMasterOpen);
    const draftID = useSelector((state:RootState) => state.mdm.draftId);

    const [allMastersState,setAllMasterState] = useState<MDMMasterState[]>([])
    const [rowData,setRowData] = useState<object[]>([]);
    const [isWarningModalOpen,toggleWarningModal] = useState<boolean>(false)
    const [isUploadModalOpen,toggleUploadModal] = useState<boolean>(false) 
    const [recordCount,setRecordCount] = useState<number>(0)
    const [downloadFileName,setDownloadFileName] = useState('');
    const [file,setFile] = useState<File>();
    const [isTableDataLoading,setIsTableDataLoading] = useState<boolean>(false);
    const [defaultToolPanel,setDefaultToolPanel] = useState<string>('');
    const [downloadData,setDownloadData] = useState<boolean>(false);
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    const [colDefs,setColDefs] = useState<ColDef[]>([]); 
    const [isUploadButtonDisabled,setIsUploadButtonDisabled] = useState<boolean>(true);
    const [showAll,setShowAll] = useState(false) //Flag to identify if the query is an show all query as we need that param in WarningModal Succes Handler P.S- Plz Optimize if you get time
    const [chartData,setChartData] = useState<object>();
    const [isSeasonalityChartModalOpen,toggleSeasonalityChartModal] = useState<boolean>(false);
    const [normChangeData,setNormChangeData] = useState<any>([]);
    const [seasonalityRowData,setSeasonalityRowData] = useState<any>([]);

    const [editOnline,toggleEditOnline] = useState(false);
    const [selectedRowsCount,setSelectedRowsCount] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const rowsPerPage = 50;

    const [seasonalityActiveQuickFilter,setSeasonalityActiveQuickFilter]  = useState<number>(0)
    const ref = useRef<GridRef>();
    const tempRef = useRef<GridRef>(); //used for second ag grid instance which is hidden.
    const [tempGridData,setTempGridData] = useState<object[]>([]);

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<number>>([]);

    const {mutateAsync:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();

   
    // const allMasters:Master[] = masterUIConfiguration?.data.data || [];

    // const allMastersState:MDMMasterState[] = mapMasterToMasterState(allMasters);

    const {mutateAsync:getSeasonalityDetails} = useGetSeasonalityDetails();

    const {mutateAsync:getMasterData} = useGetMasterData();

    const {mutateAsync:getCount} = useGetCount();

    const {mutateAsync:createDraft} = useCreateDraft()

    const {mutateAsync:modifyDraft} = useModifyDraft()

    // const colDefs = activeMaster.colDefs

    const tempRowData = {
      sc:"V9I004615P1L001",
      wc:"3017",
      skd:"T Shirt",
      sd:"5/05/2023",
      ed:"5/20/2023",
      ln:"Bangalore",
      tn:"300",
      bd:"7",
      onm:'50',
      r:"10"
    }

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
          const {data} = await masterUIConfiguration('modify');
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
      // defaultColDef:{
      //   valueSetter:(params)=>{
      //     console.log(params);
      //     return true;
      //   },
      //   // onCellValueChanged:(e)=>{
      //   //   console.log(e);
      //   // },
      // },
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
      const {filters,showAll,pagination,fields,count,currentPage} = configs;
      const payload:GetMasterDataPayload = {
        id:activeMaster.id,
        name:activeMaster.name,
        filters:showAll ? [] : filters,
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

    const generateDraftPayload = ()=>{
      let instanceName = ''
      masters.map((master:MDMMasterState)=>{
        instanceName += ` ${master.name}`
      })
      return{
        instanceName:instanceName,
        searchKey:activeMaster.name,
        draftId:draftID,
        draftData:masters.map((master:MDMMasterState)=>{
          return {
            masterId:master.id,
            status:master.progress==='submitted'?1:0,
            gridState:JSON.stringify(master.colDefs),
            dataMaster:master.id===activeMaster.id?activeMaster.rowData:[]
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
          dispatch(UPDATE_ACTIVE_MASTER(0))
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
      if(showAll) setShowAll(showAll);
      else setShowAll(false);
      if(downloadData) setDownloadData(false)
      const currMasterFilters = activeMaster.filters;
      if(!areMasterFiltersValid(currMasterFilters) && !showAll){
        return notifyError('Filter cannot be empty')
      }

      const payloadFilters = mapStateFiltersToPayload(currMasterFilters);
      const payloadFields:any = getCurrentVisbileColumns();

      setIsTableDataLoading(true);

      const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:showAll,pagination:false,count:true});
      
      setIsTableDataLoading(false);
      setRecordCount(result.data.recordCount)
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

      const result:any = await notifyPromise(queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:showAll,pagination:true,currentPage:1}),{
        success:"Data Fetched Successfully",
        error:"Something Went Wrong",
        pending:"Loading Data"
      }); 
      if(result.data.recordCount <= rowsPerPage){
        toggleEditOnline(true);
        setShowAll(false); //setting to false in this if bcz we need this in flag true while handling server side pagination
      }
      else{
        toggleEditOnline(false);
      }

      
        setIsTableDataLoading(false);
        if(result.data.recordCount == 0){
          toggleWarningModal(false);
          setShowAll(false);
          return;
        }
       
        dispatch(UPDATE_ROW_DATA(result.data.data));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        toggleWarningModal(false);
        setShowAll(false);
        if(activeMaster.id==10){
         
          return dispatch(UPDATE_PROGRESS_STATE('seasonality')); 
        }
        if(activeMaster.id==6){
          return dispatch(UPDATE_PROGRESS_STATE('phaseInPhaseOut')); 
        }
        return dispatch(UPDATE_PROGRESS_STATE('view'));  
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
  
          const result = await parseExcelData(file,activeMaster);
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
            dispatch(UPDATE_PROGRESS_STATE('uploaded'));
            addCheckBoxColDefs();
          }
          dispatch(UPDATE_ROW_DATA(result));
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          toggleUploadModal(false);
          notifySuccess(`Data Uploaded Successfully`);
          setDownloadData(false);
          setTempDownloadData(false);
          setCurrentPage(1);
        } catch (error:any) {
          notifyError(error.message);
        }

      }

      const exportToExcel = async (fromUploadModal?:boolean)=>{
        const currMasterFilters = activeMaster.filters;
        const payloadFilters = areMasterFiltersValid(currMasterFilters)? mapStateFiltersToPayload(currMasterFilters) : [];
      
        const payloadFields:any = getCurrentVisbileColumns();
        const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:false,pagination:false}); 
        dispatch(UPDATE_ROW_DATA(result.data.data));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        setDownloadData(true);
        if(fromUploadModal){
          setIsUploadButtonDisabled(false);
          notifySuccess(`Data Downloaded Successfully`);
          return
        }
        notifySuccess(`Data Exported Successfully`);
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
        dispatch(REMOVE_COLDEFS(['error','warning']));
        addCheckBoxColDefs();
        dispatch(UPDATE_PROGRESS_STATE('uploaded'));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        
      }
      
      const deleteSelected = () => {
        const selectedRows = ref.current?.api.getSelectedRows();
        if(selectedRows && selectedRows.length > 0){
          dispatch(REMOVE_ROW_DATA(selectedRows));
          dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
          notifySuccess(`${selectedRows?.length} records deleted successfully`);
          setSelectedRowsCount(0);
          setRecordCount(recordCount-selectedRows.length);
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
        const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:showAll,pagination:true,currentPage:pageNo});
        dispatch(UPDATE_ROW_DATA(result.data.data));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        setIsTableDataLoading(false)



      }

      const onSubmit = () => {
      
        dispatch(REMOVE_COLDEFS(['checkbox']));
        if(activeMaster.progress === 'editOnlineSaved'){
          dispatch(UPDATE_PROGRESS_STATE('editOnlineSubmitted'));
        }
        else{
          dispatch(UPDATE_PROGRESS_STATE('submitted'));
        }
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        notifySuccess(`Modifications Submitted Successfully`);
        setSelectedRowsCount(0);
      }

      

      const onBackButton = () => {
        setRowData([]);
        // dispatch(to(true));
        // dispatch(setViewModifyProgressState('default'))
        setDownloadData(false);
        setTempDownloadData(false);
      }

      const onSaveToDraft = async()=>{
        try {
          const toastId = notifyLoader('Creating Draft');
          if(draftID.length > 0){
            await modifyDraft(generateDraftPayload())
            toast.dismiss(toastId);
            return toast.success("Draft Updated Successfully")
          }

          const data:any =  await createDraft(generateDraftPayload())
          dispatch(SET_DRAFT_ID(data.data.data))
          toast.dismiss(toastId);
          return toast.success("Draft Created Successfully");
        } catch (error) {
          toast.dismiss();
          return toast.error("Something Went Wrong");
        }
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
        const checkError = (row:object) => {
          const {error,warning} = masterSchema.validate(row) ;    
          return {error,warning};
        }

        const masterSchema = masterIdToSchemaMapper[activeMaster.id.toString()];
        const newData = rowData.map((row:any)=>{
          const rowClone = {...row};
          const {error,warning} = checkError(rowClone);
          
          if(error){
            rowClone.error = error.message;
          }
          else{
            rowClone.error = '';
          }
          if(warning){
            rowClone.warning = warning;
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
        if(isErrorPresent || isWarningPresent){
          return notifyError("Invalid Data Found. Please Clear all the errors and warnings before proceeding");
        } 
      }

      const onEditOnlineSave = ()=>{
        onSaveToDraft();
        const isErrorPresent = activeMaster.colDefs.find((col:ColDef)=>col.colId==='error');
        const isWarningPresent = activeMaster.colDefs.find((col:ColDef)=>col.colId==='warning');
        if(isErrorPresent || isWarningPresent){
          // return notifyError("Please Clear All Errors before submit")
          return
        }
        dispatch(UPDATE_PROGRESS_STATE('editOnlineSaved'))

      }

       const onShowChart = async (rowData:any) => {
        try {
          setSeasonalityRowData(rowData);
          const toastId = notifyLoader('Fetching Chart Details');
          const {data:{data}} = await getSeasonalityDetails(rowData);
          setNormChangeData(data.norm);
          const chartData = generateSesonalityChartData(rowData,data);
          console.log(isSeasonalityChartModalOpen);
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
          dispatch(UPDATE_ROW_DATA(doesMasterExist.rowData.filter((row)=>row.sts==id)))
        }
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
        rowData,
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
        chartData,
        isSeasonalityChartModalOpen,
        seasonalityRowData,
        normChangeData,
        onShowChart,
        toggleSeasonalityChartModal,
        tempRowData
    }
}

export default useViewModify;