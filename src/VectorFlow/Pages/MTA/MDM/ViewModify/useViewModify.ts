import {useState, useEffect, useRef} from 'react';
import { type Master, type Option, type Field, type Tab, type Filter, type GetMasterDataPayload, type GridRef, type QueryFilteredDataConfigs, ViewModifyProgressState, MDMMasterState } from "../../../../types/MDM";
import {generateRandomId, generateOptions, areMasterFiltersValid, parseExcelData,mapMasterToColumnDefs, mapStateFiltersToPayload, mapMasterToMasterState } from "../../../../../helpers/utils";
import { useGetMasterData, useGetMasterUIConfiguration } from "../../../../Services/MTA/MDM";
import { useSelector, useDispatch } from 'react-redux';
import { FILL_MASTERS, FILL_OPTIONS, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_ACTIVE_MASTER, UPDATE_COLDEFS,ADD_MASTER, STORE_ALL_MASTERS, REMOVE_MASTER, ADD_FILTER, REMOVE_FILTER, SYNC_ACTIVE_MASTER_TO_MASTER, UPDATE_ROW_DATA, UPDATE_PROGRESS_STATE } from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import ErrorCell from '../../../../../components/VectorFLOW/commons/ErrorCell';
import { AgGridReactProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-enterprise';
import WarningCell from '../../../../../components/VectorFLOW/commons/WarningCell';

const useViewModify = () => {

    const dispatch = useDispatch();

    const options = useSelector((state: RootState) => state.mdm.options);
    const selectedOptions = useSelector((state: RootState) => state.mdm.selectedOptions);
    const activeMaster = useSelector((state:RootState) => state.mdm.activeMaster);
    const masters = useSelector((state:RootState)=>state.mdm.masters);

    const isSelectMasterOpen = useSelector((state:RootState) => state.mdm.isSelectMasterOpen);

    const [rowData,setRowData] = useState<object[]>([]);
    const [tempRowData,setTempRowData] = useState([]) // Used for dealying the row data for warning modal
    const [isWarningModalOpen,toggleWarningModal] = useState<boolean>(false)
    const [isUploadModalOpen,toggleUploadModal] = useState<boolean>(false) 
    const [recordCount,setRecordCount] = useState<number>(0)
    const [downloadFileName,setDownloadFileName] = useState('');
    const [file,setFile] = useState<File>();
    const [isTableDataLoading,setIsTableDataLoading] = useState<boolean>(false);
    const [isToolPanelOpen,toggleToolPanel] = useState<boolean>(false);
    const [defaultToolPanel,setDefaultToolPanel] = useState<string>('');
    const [downloadData,setDownloadData] = useState<boolean>(false);
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    const [colDefs,setColDefs] = useState<ColDef[]>([]); 

  

    const ref = useRef<GridRef>();
    const tempRef = useRef<GridRef>(); //used for second ag grid instance which is hidden.
    const [tempGridData,setTempGridData] = useState<object[]>([]);

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<number>>([]);

    const {data:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();
   
    const allMasters:Master[] = masterUIConfiguration?.data.data || [];

    const allMastersState:MDMMasterState[] = mapMasterToMasterState(allMasters);

    const {mutateAsync:getMasterData} = useGetMasterData();

    const updateMasterProperty=(id:number,property:string,propertyValue:any)=>{
      const data =  masters.map((master:MDMMasterState)=>{
        const updatedMaster:any = {...master};
        if(master.id===id){
          updatedMaster[property] =propertyValue
        }
        return updatedMaster;
      })
      return data
    }

    // const colDefs = activeMaster.colDefs

    const onColumnChange = () => {
      const localColDefs = ref.current?.api.getColumnDefs()
      if (ref.current && localColDefs) {

        dispatch(UPDATE_COLDEFS({id:activeMaster.id,colDefs:localColDefs}))
        // setColDefs(localColDefs)
        toggleToolPanel(true);
        setDefaultToolPanel('columns')
      }

    }

  


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
      // rowData:rowData,
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
      onColumnVisible:onColumnChange,
      overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="../assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
      onRowDataUpdated:(event)=>{
        if(downloadData) event.api.exportDataAsExcel({fileName:downloadFileName ==='' ? activeMaster.name : downloadFileName});
      },
      rowSelection:'multiple',
      suppressRowClickSelection:true,
      // rowModelType:'serverSide',
      // serverSideDatasource:createServerSideDatasource(),
      // paginationPageSize:10
  
    }

    const tempAgGridProps:AgGridReactProps = {
      columnDefs:activeMaster.colDefs,
      rowData:tempGridData,
      onRowDataUpdated:(event)=>{
        if(tempDownloadData) event.api.exportDataAsExcel({fileName:downloadFileName ? 'Error-' + downloadFileName : 'Error-'+ activeMaster.name});
      }
    };

    const addCheckBoxColDefs = () => {
      const updatedColDefs = [
        {
          field:'checkbox',
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
        ...activeMaster.colDefs
      ]
      ref.current?.api.setColumnDefs(updatedColDefs);
    }

    const addErrorColDefs = () => {
        const customColDefs:ColDef[] = [
          {
            field:'warning',
            headerName:'Warning',
            floatingFilter:false,
            initialHide:false,
            cellRenderer:WarningCell,
            minWidth:200,
            suppressColumnsToolPanel:true,
            wrapText:true,
            autoHeight:true,
          },
          {
            field:'error',
            headerName:'Error',
            floatingFilter:false,
            initialHide:false,
            cellRenderer:ErrorCell,
            // initialHide:error ? false : true,
            suppressColumnsToolPanel:true,
            wrapText:true,
            autoHeight:true,
            flex:1
          }
      ];
      // ref.current?.api.setColumnDefs([...customColDefs,...colDefs]);
      const updatedColDefs = [...customColDefs,...activeMaster.colDefs]
      dispatch(UPDATE_COLDEFS({id:activeMaster.id,colDefs:updatedColDefs}))
      console.log(updatedColDefs);

    }

    useEffect(()=>{

        setColDefs(activeMaster.colDefs);

        if(filterButtonStatus.length !== 0) return;

        if(activeMaster.id === 0){
          if(!isLoading){
            const allOptions:Option[] =  generateOptions(allMasters);
            dispatch(FILL_MASTERS(allMastersState));
            dispatch(STORE_ALL_MASTERS(allMastersState));
            dispatch(FILL_OPTIONS(allOptions));
          }
  
          const temp:MDMMasterState[]=[];
          if(selectedOptions?.length === 0 && allMasters) dispatch(FILL_MASTERS(mapMasterToMasterState(allMasters)));
          if(selectedOptions?.length > 0) dispatch(FILL_MASTERS([...getSelectedMasters(temp)]));
        }


        // if(isToolPanelOpen) ref.current?.api.openToolPanel('columns');

      },[selectedOptions,isLoading,activeMaster]);  

      useEffect(()=>{
        if(masters.length > 0 && filterButtonStatus.length !== 0){
          setFilterButtonStatus(masters.map((master:MDMMasterState)=>master.id));
        }
      },[masters])

      useEffect(() => {
        if(tempDownloadData){
          setDownloadData(false);
        }
        if(downloadData){
          setDownloadData(false)
        }
      },[tempDownloadData,downloadData]);


    const getCurrentVisbileColumns = () => {
      const columnData = ref.current?.columnApi.getAllDisplayedColumns();
      return columnData?.map((column:any) => ({key:column.colDef.field}));
    }
    const queryFilteredData = async (configs:QueryFilteredDataConfigs) => {
      const {filters,showAll,pagination,fields} = configs;
      const payload:GetMasterDataPayload = {
        id:activeMaster.id,
        name:activeMaster.name,
        filters:showAll ? [] : filters,
        fields:fields,
      }

      if(pagination) {
        payload.paginationParameter = {
          pageNumber:1,
          recordsPerPage:10
        }
      }

      const resultData =  await getMasterData(payload);

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
        dispatch(UPDATE_ACTIVE_MASTER());
        setColDefs(mapMasterToColumnDefs(masters[0].fields));
      }
      dispatch(TOGGLE_SELECT_MASTER_SCREEN(false));
      
      

    }


    const handleTabChange = (currMaster: MDMMasterState) => {
      if(currMaster.progress === 'submitted') return;

      return notifyError(`Please Complete the ${activeMaster.name} Master`);  
      
    }
    
    const handleTabClose = (e:React.MouseEvent<HTMLElement>,currMaster:MDMMasterState) => {
        e.stopPropagation();
        dispatch(REMOVE_MASTER(currMaster.id));
        if(currMaster.id === activeMaster.id){
          dispatch(UPDATE_ACTIVE_MASTER())
        }
      }
    
    const addNewMaster = ()=>{
      if(allMasters.length === masters.length) {
        notifyError('All Masters have already been selected. Cannot add more masters');
        return;
      }
      dispatch(TOGGLE_SELECT_MASTER_SCREEN(true));
      setDownloadData(false);
      setTempDownloadData(false);
    }

      const handleOnAddFilter = ()=>{
        // dispatch(setFilters([...filters,]))
        dispatch(ADD_FILTER());
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER())
      }
  
      const handleOnDeleteFilter = (id:string)=>{
        if(activeMaster.filters.length === 1) notifyError("Cannot Delete this Filter Instance")
        dispatch(REMOVE_FILTER(id));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
      }

      const handleApplyFilter =async (showAll?:boolean) => {
        const currMasterFilters = activeMaster.filters;
        if(!areMasterFiltersValid(currMasterFilters) && !showAll){
          return notifyError('Filter cannot be empty')
        }

        const payloadFilters = mapStateFiltersToPayload(currMasterFilters);
        const payloadFields:any = getCurrentVisbileColumns();
        
        setIsTableDataLoading(true);
        const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:showAll,pagination:true}); 
        setIsTableDataLoading(false);
        setRecordCount(result.data.recordCount)
        toggleWarningModal(true)
        setTempRowData(result.data.data)
        
        dispatch(UPDATE_PROGRESS_STATE('view')); 
       
      }

      const onWarningModalClose = ()=>{
        setRowData([])
        toggleWarningModal(false);
        setIsTableDataLoading(false);
      }

      const onWarningModalSuccess = ()=>{
        setRowData(tempRowData)
        dispatch(UPDATE_ROW_DATA(tempRowData));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        
        toggleWarningModal(false)
      }

      

      const removeCheckboxColDefs = () => {
        const newColDefs:any = ref.current?.api.getColumnDefs()?.filter((column:any)=>column.field !== 'checkbox');
        dispatch(UPDATE_COLDEFS({id:activeMaster.id,colDefs:newColDefs}));
        
      }

      const onUploadMaster = async () => {

        const handleErrorAndWarning = (errorExists?:object,warningExists?:object) => {
          if(errorExists){
            // ref.current?.columnApi.setColumnVisible('error',true);
            dispatch(UPDATE_PROGRESS_STATE('error'));
          }
          if(warningExists){
            // ref.current?.columnApi.setColumnVisible('warning',true);
            dispatch(UPDATE_PROGRESS_STATE('error'));
          }
        }

        if(!file){
          notifyError('Please select a file to upload.');
          return
        }

        const result = await parseExcelData(file,activeMaster);
        const ifErrorExists = result.find((data:any)=>data.error);
        const ifWarningExists = result.find((data:any)=>data.warning);
        handleErrorAndWarning(ifErrorExists,ifWarningExists);
        if(!ifErrorExists && !ifWarningExists){
          dispatch(UPDATE_PROGRESS_STATE('uploaded'));
          addCheckBoxColDefs();
        }
        else{
          addErrorColDefs();
        }
        setRowData(result);
        toggleUploadModal(false);
        notifySuccess(`Data Uploaded Successfully`);

      }

      const exportToExcel = async ()=>{
        const currMasterFilters = activeMaster.filters;
        const payloadFilters = areMasterFiltersValid(currMasterFilters)? mapStateFiltersToPayload(currMasterFilters) : [];
      
        const payloadFields:any = getCurrentVisbileColumns();
        const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:false,pagination:false}); 
        dispatch(UPDATE_ROW_DATA(result.data.data));
        dispatch(SYNC_ACTIVE_MASTER_TO_MASTER());
        setDownloadData(true);
        notifySuccess(`Data Exported Successfully`);
        
      }

      const onClearExportError = () => {
        const erroneusData:any[] = [];
        const validData:any[] = [] 
        rowData.forEach((data:any)=>{
          if(data.error || data.warning){
            erroneusData.push(data);
          }
          else{
            validData.push(data);
          }
        });
        setTempGridData(erroneusData);
        setTempDownloadData(true);
        ref.current?.columnApi.setColumnVisible('error',false);
        ref.current?.columnApi.setColumnVisible('warning',false);
        addCheckBoxColDefs();
        setRowData(validData);
        dispatch(UPDATE_PROGRESS_STATE('uploaded'));
        
      }
      
      const deleteSelected = () => {
        const selectedRows = ref.current?.api.getSelectedRows().map((row)=>JSON.stringify(row));
        const updatedRows = rowData.filter((row)=>!selectedRows?.includes(JSON.stringify(row)));
        setRowData(updatedRows);
        notifySuccess(`${selectedRows?.length} records deleted successfully`);
      }

      const onSubmit = () => {
        // const nextMasterIndex = selectedMasters.findIndex((master:Master)=>master.id === activeMaster.id) + 1;
        // if(nextMasterIndex < selectedMasters.length) {
        //   const newTabs = [...tabs].map((tab:Tab)=>{
        //     const temp = {...tab}
        //     if(temp.id === activeMaster.id){
        //       temp.status = 'completed'
        //     }
        //     return temp;
        //   });
        //   dispatch(setTabs(newTabs));
        // }
        // removeCheckboxColDefs();
        // dispatch(setViewModifyProgressState('submitted'));
        // notifySuccess(`Modifications Submitted Successfully`);
      }

      

      const onBackButton = () => {
        setRowData([]);
        // dispatch(to(true));
        // dispatch(setViewModifyProgressState('default'))
        setDownloadData(false);
        setTempDownloadData(false);
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
        allMasters,
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
        onSubmit
    }
}

export default useViewModify;