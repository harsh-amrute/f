import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { TaskBarContainer, SCContainer, SCFilterContainer, SCFilterControls, SCLegend } from "./styles";
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { useGetMasterUIConfiguration } from "../../../../Services/MTA/MDM";
import { useState,useEffect } from "react";
import { generateOptions } from "../../../../../helpers/utils";
import { type Master, type Option, type Field, type Tab, type Filter } from "../../../../types/MDM";
import VFTab from "../../../../../components/VectorFLOW/commons/VFTab";
import VFFilter from "../../../../../components/VectorFLOW/commons/VFFilter";



  const ViewModify = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    // const disabled=true;
    const [isSelectMasterOpen,setIsSelectMasterOpen] = useState<boolean>(true);
    const [options,setOptions] = useState<Array<Option>>([]);
    const [selectedOptions,setSelectedOptions] = useState<Array<Option>>([]);
    const [selectedMasters,setSelectedMasters] = useState<Array<Master>>([]);

    const [tabs,setTabs] = useState<Array<Tab>>([{
      id:1,
      name:'SKU',
      fields:[{
        displayName:"SKU Ccode",
        key:"sku_code",
        visible:true
      }],
      status:'completed'
    }]);

    const [activeMaster,setActiveMaster] = useState<Master>()

    const [filters,setFilters] = useState<Array<Filter>>([{
        id:'fbaksbfka',
        field:"",
        operator:"",
        text:''
    }]);

    const operators:Option[] = [
      {
        label:'Equals To',
        value:'='
      }
    ]

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<Master>>([]);

    const {data:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();
   
    const allMasters:Master[] = masterUIConfiguration?.data.responseData.data;

    const getSelectedMasters = (temp:Master[]) => {
      selectedOptions.forEach((selectedOption:Option)=>{
        allMasters.forEach((master:Master)=>{
          if(master.fields.find((field:Field)=>field.displayName === selectedOption.label) && !temp.find((selectedMaster:Master)=>selectedMaster.id === master.id)) temp.push(master);
        })
      });
      return temp;
    }
    
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

    const handleSelectMasterSubmit = () => {
      const selectedTabs = selectedMasters.map((master:Master,index:number) => {
        return {
          id:master.id,
          name:master.name + ' Master',
          fields:master.fields,
          status:'',
        }
      })
      setTabs([...selectedTabs]);
      setActiveMaster(allMasters.find((master:Master)=>master.id === selectedTabs[0].id))
      setIsSelectMasterOpen(false);

    }

    const handleTabClose = (e:React.MouseEvent<HTMLElement>,currTab:Tab) => {
      e.stopPropagation();
      const newTabs = tabs.filter((tab:Tab)=>tab.id !== currTab.id);
      if(newTabs.length === 0){
        setIsSelectMasterOpen(true);
        return;
      }
      if(currTab.id === activeMaster?.id ) setActiveMaster(allMasters.find((master:Master)=>master.id === tabs[0].id));
      setTabs([...newTabs]);
    }

    
    return (
      <>
        <SCContainer>
          {isSelectMasterOpen && 
            <SelectMaster 
                data={allMasters} 
                options={options} 
                selectedOptions={selectedOptions} 
                setSelectedOptions={setSelectedOptions}
                selectedMasters={selectedMasters}
                setSelectedMasters={setSelectedMasters}
                filterButtonStatus={filterButtonStatus}
                setFilterButtonStatus={setFilterButtonStatus}
                themeUi={themeUi}
                isLoading={isLoading}
                handleSubmit={()=>{handleSelectMasterSubmit()}}
            />
          }
          {!isSelectMasterOpen && 
            <VFTab 
              allMasters={allMasters}
              activeMaster={activeMaster}
              setActiveMaster={setActiveMaster}
              tabs={tabs}
              setTabs={setTabs}
              themeUi={themeUi}
              onClose={handleTabClose}
              newTabTitle={"Add Master"}
              newTabIcon={"/assets/img/VectorFLOW/NMS/add-circle.svg"}
              newTabHandler={()=>{setIsSelectMasterOpen(true)}}
              >
                <SCFilterContainer>
                  <SCFilterControls>
                    {/* <SCLegend>Filter</SCLegend> */}
                    <VFFilter 
                      onDelete={()=>console.log('deleted')}
                      operators={operators}
                      filters={filters}
                      setFilters={setFilters}
                      fields={activeMaster ? generateOptions([activeMaster]) : []}
                      currFilter={filters[0]}
                    />
                  </SCFilterControls>
                </SCFilterContainer>
            </VFTab>
          }
        </SCContainer>
        {
          !isSelectMasterOpen && 
            <TaskBarContainer>
                <VFButtonOutline onClick={()=>setIsSelectMasterOpen(true)} themeUi={themeUi} width={50}>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={"/assets/img/VectorFLOW/NMS/back-btn.svg"}/>
                  </div>
                </VFButtonOutline>
              {/* <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} disabled={disabled} width={164}>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={disabled ? "/assets/img/VectorFLOW/NMS/edit-online-disabled.svg" : "/assets/img/VectorFLOW/NMS/edit-online.svg"} style={{marginRight:'11px'}}/>
                    <p>Edit Online</p>
                  </div>
              </VFButtonOutline> */}
              <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} width={130}>
                  Reset
              </VFButtonOutline>
              {/* <VFButton onClick={()=>console.log("hello")} themeUi={themeUi} disabled={false} width={164}>
                  Modify Selected Data
              </VFButton> */}
              <VFButton onClick={()=>console.log("hello")} themeUi={themeUi} disabled={false} width={160}>
                  Submit
              </VFButton>
              
            </TaskBarContainer>
        }
      </>
    )
  }
  
  export default ViewModify
  