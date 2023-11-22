import {useState, useEffect} from 'react';
import { type Master, type Option, type Field, type Tab, type Filter } from "../../../../types/MDM";
import {generateRandomId, generateOptions } from "../../../../../helpers/utils";
import { useGetMasterUIConfiguration } from "../../../../Services/MTA/MDM";
import { useSelector, useDispatch } from 'react-redux';
import {setOptions,setSelectedMasters, setTabs, setActiveMaster, setFilters} from '../../../../../redux/features/MDM';
import type { RootState } from '../../../../../redux/store/store';

const useViewModify = () => {

    const dispatch = useDispatch();
    const [isSelectMasterOpen,setIsSelectMasterOpen] = useState<boolean>(true);

    const options = useSelector((state: RootState) => state.mdm.options);
    const selectedOptions = useSelector((state: RootState) => state.mdm.selectedOptions);
    const selectedMasters = useSelector((state:RootState) => state.mdm.selectedMasters);
    const tabs = useSelector((state:RootState) => state.mdm.tabs);
    const activeMaster = useSelector((state:RootState) => state.mdm.activeMaster);
    const filters = useSelector((state:RootState) => state.mdm.filters);

    
    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<Master>>([]);

    const {data:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();
   
    const allMasters:Master[] = masterUIConfiguration?.data.data;


    useEffect(()=>{

        if(filterButtonStatus.length !== 0) return;
  
        if(!isLoading){
          const allOptions:Option[] =  allMasters ? generateOptions(allMasters) : [];
          dispatch(setSelectedMasters(allMasters));
          dispatch(setOptions(allOptions));
        }
        const temp:Master[]=[];
        if(selectedOptions?.length === 0 && allMasters) dispatch(setSelectedMasters([...allMasters]));
        if(selectedOptions?.length > 0) dispatch(setSelectedMasters([...getSelectedMasters(temp)]));
      },[selectedOptions,isLoading]);  

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
            name:master.name + ' Master',
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
        setIsSelectMasterOpen(false);

    }
    
    const handleTabClose = (e:React.MouseEvent<HTMLElement>,currTab:Tab) => {
        e.stopPropagation();
        const newTabs = tabs.filter((tab:Tab)=>tab.id !== currTab.id);
        if(newTabs.length === 0){
          setIsSelectMasterOpen(true);
          return;
        }
        if(currTab.id === activeMaster?.id ){
          if(tabs.indexOf(currTab)==0){
            dispatch(setActiveMaster(tabs[1]))
          }
          else {
            const activeMaster = selectedMasters.find((master:Master)=>master.id === tabs[0].id);
            if(activeMaster) dispatch(setActiveMaster(activeMaster));
          }
        }
        dispatch(setTabs([...newTabs]));
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
        dispatch(setFilters(filters.filter((f)=>f.id!==id)))
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
        handleOnAddFilter,
        handleOnDeleteFilter,
        allMasters,
        isLoading
    }
}

export default useViewModify;