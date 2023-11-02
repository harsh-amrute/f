import {useState, useEffect} from 'react';
import { type Master, type Option, type Field, type Tab, type Filter } from "../../../../types/MDM";
import {generateRandomId, generateOptions } from "../../../../../helpers/utils";
import { useGetMasterUIConfiguration } from "../../../../Services/MTA/MDM";

const useViewModify = () => {


    const [isSelectMasterOpen,setIsSelectMasterOpen] = useState<boolean>(true);
    const [options,setOptions] = useState<Array<Option>>([]);
    const [selectedOptions,setSelectedOptions] = useState<Array<Option>>([]);
    const [selectedMasters,setSelectedMasters] = useState<Array<Master>>([]);
    const [tabs,setTabs] = useState<Array<Tab>>([]);
    const [activeMaster,setActiveMaster] = useState<Master>()
    const [filters,setFilters] = useState<Array<Filter>>([]);

    const operators:Option[] = [
        {
          label:'Equals To',
          value:'='
        }
      ]
    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<Master>>([]);

    const {data:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();
   
    const allMasters:Master[] = masterUIConfiguration?.data.responseData.data;

    useEffect(()=>{

        if(filterButtonStatus.length !== 0) return;
  
        if(!isLoading){
          const allOptions:Option[] =  allMasters ? generateOptions(allMasters) : [];
          setSelectedMasters(allMasters)
          setOptions(allOptions);
        }
        const temp:Master[]=[];
        if(selectedOptions?.length === 0 && allMasters) setSelectedMasters([...allMasters])
        if(selectedOptions?.length > 0) setSelectedMasters([...getSelectedMasters(temp)])
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
        setTabs([...selectedTabs]);
        // setActiveMaster(selectedMasters.find((master:Master)=>master.id === selectedTabs[0].id))
        setActiveMaster(selectedMasters[0]);
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
        setFilters([...filters]);
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
            setActiveMaster(tabs[1])
          }
          else setActiveMaster(selectedMasters.find((master:Master)=>master.id === tabs[0].id))
        }
        setTabs([...newTabs]);
      }

      const handleOnAddFilter = ()=>{
        setFilters([...filters,{
          id:generateRandomId(),
          masterId:activeMaster?.id,
          field:'',
          operator:'',
          text:''
        }])
      }
  
      const handleOnDeleteFilter = (id:string,masterId:number | undefined)=>{
        const filtersLength = filters.filter((f:Filter) => f.masterId === masterId).length;
        if(filtersLength === 1) return;
        setFilters(filters.filter((f)=>f.id!==id))
      }

    return {
        selectedMasters,
        setSelectedMasters,
        isSelectMasterOpen,
        setIsSelectMasterOpen,
        options,
        setOptions,
        selectedOptions,
        setSelectedOptions,
        tabs,
        setTabs,
        activeMaster,
        setActiveMaster,
        filters,
        setFilters,
        operators,
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