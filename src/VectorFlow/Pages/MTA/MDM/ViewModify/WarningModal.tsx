import React from "react";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";

interface WarningModalProps{
    count:number
    onSuccess:()=>void
    onFailure:()=>void
    onCloseModal:()=>void
    
}


const WarningModal = (props:WarningModalProps) =>{

    const {
        count,
        onFailure,
        onSuccess,
        onCloseModal,
        
    } = props

    const {user} = useUserData()

    return(
       <VFModalCard headerText={"Warning"} openModal={true} closeModal={onCloseModal} headerIcon={'/assets/img/VectorFLOW/NMS/warning.svg'} closeIcon={'/assets/img/VectorFLOW/NMS/close-dark.svg'}>
            <p data-testid="warning-test" style={{textAlign:"center", color: "#313131", paddingTop:"36px", fontStyle:"normal", fontVariant:"normal",fontWeight:300,fontSize:"16px",fontFamily:"Roboto"}}>This filter returns <b>{count}</b> records that will be open across mutiple pages.<br/>Do you want to continue?</p> 
            <div style={{display:"flex",gap:"28px", alignItems:"center", justifyContent:"center", paddingTop:"38px", paddingBottom:"36px"}}>
           <VFButtonOutline color={"gray"} themeUi={user.user.theme_ui} onClick={onFailure}>No</VFButtonOutline>
           <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>Yes</VFButton>
           </div>
       </VFModalCard>
    )
}

export default WarningModal;