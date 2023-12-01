import {useState, useEffect, useRef} from 'react';
import { type Master, type Option, type Field, type Tab, type Filter, type GetMasterDataPayload, type GridRef, type QueryFilteredDataConfigs } from "../../../../types/MDM";
import {generateRandomId, generateOptions, areMasterFiltersValid, parseExcelData,mapMasterToColumnDefs, mapStateFiltersToPayload } from "../../../../../helpers/utils";
import { useGetMasterData, useGetMasterUIConfiguration } from "../../../../Services/MTA/MDM";
import { useSelector, useDispatch } from 'react-redux';
import {setOptions,setSelectedMasters, setTabs, setActiveMaster, setFilters, setColDefs, setViewModifyProgressState} from '../../../../../redux/features/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError } from '../../../../../helpers/notify';
import ErrorCell from '../../../../../components/VectorFLOW/commons/ErrorCell';
import { AgGridReactProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-enterprise';

const useViewModify = () => {

    const dispatch = useDispatch();
    const [isSelectMasterOpen,setIsSelectMasterOpen] = useState<boolean>(true);

    const options = useSelector((state: RootState) => state.mdm.options);
    const selectedOptions = useSelector((state: RootState) => state.mdm.selectedOptions);
    const selectedMasters = useSelector((state:RootState) => state.mdm.selectedMasters);
    const tabs = useSelector((state:RootState) => state.mdm.tabs);
    const activeMaster = useSelector((state:RootState) => state.mdm.activeMaster);
    const filters = useSelector((state:RootState) => state.mdm.filters);
    const colDefs = useSelector((state:RootState) => state.mdm.colDefs);
    const ViewModifyProgressState = useSelector((state:RootState) => state.mdm.ViewModifyProgressState );

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

    const ref = useRef<GridRef>();
    const tempRef = useRef<GridRef>(); //used for second ag grid instance which is hidden.
    const [tempGridData,setTempGridData] = useState<object[]>([]);

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<Master>>([]);

    const {data:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();
   
    const allMasters:Master[] = masterUIConfiguration?.data.data;

    const {mutateAsync:getMasterData} = useGetMasterData();

    const onColumnChange = ()=>{
      const localColDefs = ref.current?.api.getColumnDefs()
      if (ref.current && localColDefs) {
        dispatch(setColDefs(localColDefs));
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
      columnDefs:colDefs,
      rowData:rowData,
      sideBar:['default','view'].includes(ViewModifyProgressState) ? sideBar : {},
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
      suppressRowClickSelection:true
  
    }
    // console.log(colDefs);

    const tempAgGridProps:AgGridReactProps = {
      columnDefs:mapMasterToColumnDefs(activeMaster.fields,true),
      rowData:tempGridData,
      onRowDataUpdated:(event)=>{
        if(tempDownloadData) event.api.exportDataAsExcel({fileName:downloadFileName ? 'Error-' + downloadFileName : 'Error-'+ activeMaster.name});
      }
    };


    useEffect(()=>{
        if(filterButtonStatus.length !== 0) return;
  
        if(!isLoading){
          const allOptions:Option[] =  generateOptions(allMasters);
          dispatch(setSelectedMasters(allMasters));
          dispatch(setOptions(allOptions));
        }
        const temp:Master[]=[];
        if(selectedOptions?.length === 0 && allMasters) dispatch(setSelectedMasters([...allMasters]));
        if(selectedOptions?.length > 0) dispatch(setSelectedMasters([...getSelectedMasters(temp)]));

        if(isToolPanelOpen) ref.current?.api.openToolPanel('columns');

      },[selectedOptions,isLoading,isToolPanelOpen]);  


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

    const getSelectedMasters = (temp:Master[]) => {
        selectedOptions.forEach((selectedOption:Option)=>{
          allMasters.forEach((master:Master)=>{
            if(master.fields.find((field:Field)=>field.displayName === selectedOption.label) && !temp.find((selectedMaster:Master)=>selectedMaster.id === master.id)) temp.push(master);
          })
        });
        return temp;
      }

    const handleSelectMasterSubmit = () => {
        const selectedTabs = selectedMasters.map((master:Master) => {
            return {
            id:master.id,
            name:master.name,
            fields:master.fields,
            status:'',
            }
        })
        dispatch(setTabs([...selectedTabs]));
        // setActiveMaster(selectedMasters.find((master:Master)=>master.id === selectedTabs[0].id))
        dispatch(setActiveMaster(selectedMasters[0]));
        const filters:Filter[] = selectedMasters.map((master:Master) => {
            const filterObj:Filter =  {
            id:generateRandomId(),
            masterId:master.id,
            field:'',
            operator:'',
            text:''
            }
            return filterObj;
        })
        dispatch(setFilters([...filters]));
        if(ViewModifyProgressState === 'uploaded') dispatch(setColDefs([{field:'checkbox',headerName:'',checkboxSelection:true,headerCheckboxSelection:true},...mapMasterToColumnDefs(selectedMasters[0].fields)]))
        else dispatch(setColDefs(mapMasterToColumnDefs(selectedMasters[0].fields)))
        setIsSelectMasterOpen(false);
        

    }
    
    const handleTabClose = (e:React.MouseEvent<HTMLElement>,currTab:Tab) => {
        e.stopPropagation();
        const newTabs = tabs.filter((tab:Tab)=>tab.id !== currTab.id);
        if(newTabs.length === 0){
          setIsSelectMasterOpen(true);
          dispatch(setSelectedMasters([]))
          setFilterButtonStatus([])
          return;
        }
        if(currTab.id === activeMaster?.id ){
            dispatch(setActiveMaster(tabs[1]))
        }
        dispatch(setTabs([...newTabs]));
        dispatch(setSelectedMasters([...newTabs]))
        dispatch(setColDefs(mapMasterToColumnDefs(newTabs[0].fields)))
        setFilterButtonStatus([...newTabs])
      }
    
    const addNewMaster = ()=>{
      if(allMasters.length === selectedMasters.length) {
        notifyError('All Masters have already been selected. Cannot add more masters');
        return;
      }
      setIsSelectMasterOpen(true);
      setDownloadData(false);
      setTempDownloadData(false);
    }

      const handleOnAddFilter = ()=>{
        dispatch(setFilters([...filters,{
          id:generateRandomId(),
          masterId:activeMaster?.id,
          field:'',
          operator:'',
          text:''
        }]))
      }
  
      const handleOnDeleteFilter = (id:string,masterId:number | undefined)=>{
        const filtersLength = filters.filter((f:Filter) => f.masterId === masterId).length;
        if(filtersLength === 1) return;
        dispatch(setFilters(filters.filter((f:Filter)=>f.id!==id)))
      }

      const handleApplyFilter =async (showAll?:boolean) => {
        const currMasterFilters = filters.filter((f:Filter) =>f.masterId === activeMaster.id)
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
        dispatch(setViewModifyProgressState('view'));
      }

      const onWarningModalClose = ()=>{
        setRowData([])
        toggleWarningModal(false);
        setIsTableDataLoading(false);
      }

      const onWarningModalSuccess = ()=>{
        setRowData(tempRowData)
        toggleWarningModal(false)
      }

      const onUploadMaster = async () => {
        if(!file){
          notifyError('Please select a file to upload.');
          return
        }

        const result = await parseExcelData(file,activeMaster);
        const ifErrorExists = result.find((data:any)=>data.error);
        const ifWarningExists = result.find((data:any)=>data.warning);
        if(ifErrorExists) {
          ref.current?.columnApi.setColumnVisible('error',true);
          dispatch(setViewModifyProgressState('error'));
 
        }
        else{
          ref.current?.columnApi.setColumnVisible('error',false);
        }
        if(ifWarningExists){
          ref.current?.columnApi.setColumnVisible('warning',true);
          dispatch(setViewModifyProgressState('error'));
        }
        else{
          ref.current?.columnApi.setColumnVisible('warning',false);
        }
        setRowData(result);
        toggleUploadModal(false);


      }

      const exportToExcel = async ()=>{
        const currMasterFilters = filters.filter((f:Filter) =>f.masterId === activeMaster.id);
        const payloadFilters = areMasterFiltersValid(currMasterFilters)? mapStateFiltersToPayload(currMasterFilters) : [];
      
        const payloadFields:any = getCurrentVisbileColumns();
        // console.log(getCurrentVisbileColumns());
        const result = await queryFilteredData({filters:payloadFilters,fields:payloadFields,showAll:false,pagination:false}); 
        setRowData(result.data.data);
        setDownloadData(true);
        
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
        console.log(validData);
        setTempGridData(erroneusData);
        setTempDownloadData(true);
        ref.current?.columnApi.setColumnVisible('error',false);
        ref.current?.columnApi.setColumnVisible('warning',false);
        ref.current?.api.setColumnDefs([{field:'checkbox',headerName:'',checkboxSelection:true,headerCheckboxSelection:true},...colDefs])
        setRowData(validData);
        dispatch(setViewModifyProgressState('uploaded'));
        
      }

      

      const onBackButton = () => {
        setRowData([]);
        setIsSelectMasterOpen(true);
        dispatch(setViewModifyProgressState('default'))
        setDownloadData(false);
        setTempDownloadData(false);
      }
    

    return {
        selectedMasters,
        isSelectMasterOpen,
        setIsSelectMasterOpen,
        options,
        selectedOptions,
        tabs,
        activeMaster,
        filters,
        filterButtonStatus,
        setFilterButtonStatus,
        getSelectedMasters,
        handleSelectMasterSubmit,
        handleTabClose,
        addNewMaster,  
        handleOnAddFilter,
        handleOnDeleteFilter,
        allMasters,
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
        colDefs,
        exportToExcel,
        onColumnChange,
        ViewModifyProgressState,
        onBackButton,
        onClearExportError,
        agGridProps,
        ref,
        tempRef,
        tempGridData,
        tempAgGridProps
    }
}

export default useViewModify;