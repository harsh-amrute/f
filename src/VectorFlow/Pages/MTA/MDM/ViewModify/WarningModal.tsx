import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";

interface WarningModalProps{
    count:number
}


const WarningModal = ({count}:WarningModalProps) =>{

    const {user} = useUserData()

    return(
       <VFModalCard headerText={"warning"} openModal={true} closeModal={() => {console.log('')}} headerIcon={'/assets/img/VectorFLOW/NMS/warning.svg'}>
        <p style={{textAlign:"center", color: "#313131", paddingTop:"36px", fontStyle:"normal", fontVariant:"normal",fontWeight:300,fontSize:"16px",fontFamily:"Roboto"}}>This filter returns <b>{count}</b> records that will be open across mutiple pages.<br/>Do you want to continue?</p> 
               <div style={{display:"flex",gap:"28px", alignItems:"center", justifyContent:"center", paddingTop:"38px", paddingBottom:"36px"}}>
           <VFButtonOutline color={"gray"} themeUi={user.user.theme_ui} onClick={()=>{console.log("")}}>No</VFButtonOutline>
           <VFButton themeUi={user.user.theme_ui} onClick={()=>{console.log("")}}>Yes</VFButton>
           </div>

       </VFModalCard>
    )
}

export default WarningModal;