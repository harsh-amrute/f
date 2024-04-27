import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { RadioContainer, SubmitButtonWrapper, RadioButtonGroup } from "./styles"
import { useUserData } from "../../../../../context";

interface ApproveAllModalProps{
    onSuccess:(status:string)=>void;
    onClose:()=>void;
    setSelectionType:any;
}

const ApproveAllModal=(props:ApproveAllModalProps)=>{

    const {
        onSuccess,
        onClose,
        setSelectionType
    } = props

    const {user} = useUserData()

    return(
        <VFModalCard headerText={'Approve All'} closeModal={onClose} openModal={true} headerIcon={"/assets/img/VectorFLOW/NMS/approveall.svg"} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <RadioContainer>
                <RadioButtonGroup> 
                    <input type="radio" value="option1" onChange={()=>setSelectionType('All')} name="Approve" id="ApproveAll"/>
                    <label htmlFor="ApproveAll">Approve all across the pages</label>
                </RadioButtonGroup>  
                <RadioButtonGroup> 
                    <input type="radio" value="option2" onChange={()=>setSelectionType('Current')} name="Approve" id="ApproveCurrent"/>
                    <label htmlFor="ApproveCurrent">Approve all only current page</label>
                </RadioButtonGroup> 
            </RadioContainer>
            <SubmitButtonWrapper>
                <VFButton themeUi={user.user.theme_ui} onClick={() => onSuccess('Approved')}>Ok</VFButton>
            </SubmitButtonWrapper>
        </VFModalCard>
    )
}

export default ApproveAllModal
