// import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
// import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
// import { TaskBarContainer } from "./styles";
import { SCContainer } from "./styles"
import { useUserData } from "../../../../../context";
import SelectMaster from "../../../../../components/VectorFLOW/layouts/SelectMaster";
import { useGetMasterUIConfiguration } from "../../../../Services/MTA/MDM";
import { useState,useEffect } from "react";
import { generateOptions } from "../../../../../helpers/utils";
import { type Master, type Option, type Field } from "../../../../types/MDM";

  const ViewModify = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    // const disabled=true;
    const [options,setOptions] = useState<Array<Option>>([]);
    const [selectedOptions,setSelectedOptions] = useState<Array<Option>>([]);
    const [selectedMasters,setSelectedMasters] = useState<Array<Master>>([]);

    const [filterButtonStatus,setFilterButtonStatus] = useState<Array<Master>>([]);

    const {data:masterUIConfiguration,isLoading} = useGetMasterUIConfiguration();
   
    const allMasters:Master[] = masterUIConfiguration?.data.data;

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

    
    return (
      <>
        <SCContainer>
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
          />
        </SCContainer>
        {/* <TaskBarContainer>
          <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} width={130}>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={"/assets/img/VectorFLOW/NMS/back.svg"} style={{marginRight:'11px'}}/>
                <p>Back</p>
              </div>
          </VFButtonOutline>
          <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} disabled={disabled} width={164}>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={disabled ? "/assets/img/VectorFLOW/NMS/edit-online-disabled.svg" : "/assets/img/VectorFLOW/NMS/edit-online.svg"} style={{marginRight:'11px'}}/>
                <p>Edit Online</p>
              </div>
          </VFButtonOutline>
          <VFButtonOutline onClick={()=>console.log("hello")} themeUi={themeUi} width={130}>
              Reset
          </VFButtonOutline>
          <VFButton onClick={()=>console.log("hello")} themeUi={themeUi} disabled={false} width={164}>
              Modify Selected Data
          </VFButton>
          <VFButton onClick={()=>console.log("hello")} themeUi={themeUi} disabled={false} width={160}>
              Submit
          </VFButton>
          
        </TaskBarContainer> */}
      </>
    )
  }
  
  export default ViewModify
  