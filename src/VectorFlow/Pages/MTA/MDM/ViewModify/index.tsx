import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { TaskBarContainer } from "./styles"
import { useUserData } from "../../../../../context";
  
  const ViewModify = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    const disabled=true;

    
    
    return (
      <>
        <TaskBarContainer>
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
          
        </TaskBarContainer>
      </>
    )
  }
  
  export default ViewModify
  