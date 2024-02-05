import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { RadioButtonGroup, RadioContainer, SubmitButtonWrapper } from "./styles"
import { useUserData } from "../../../../../context";

interface RejectAllModalProps{
    onSuccess:()=>void;
    onClose:()=>void;
    setSelectionType:any;
}

const RejectAllModal=(props:RejectAllModalProps)=>{

    const {
        onSuccess,
        onClose,
        setSelectionType
    } = props

    const {user} = useUserData()

    return(
        <VFModalCard headerText={'Approve All'} closeModal={onClose} openModal={true} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <RadioContainer>
                <RadioButtonGroup> 
                    <input type="radio" value="option1" onChange={()=>setSelectionType('All')} name="Approve" id="ApproveAll"/>
                    <label htmlFor="ApproveAll">Reject across all pages</label>
                </RadioButtonGroup>  
                <RadioButtonGroup> 
                    <input type="radio" value="option2" onChange={()=>setSelectionType('Current')} name="Approve" id="ApproveCurrent"/>
                    <label htmlFor="ApproveCurrent">Reject all only current page</label>
                </RadioButtonGroup> 
            </RadioContainer>
            <SubmitButtonWrapper>
                <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>Ok</VFButton>
            </SubmitButtonWrapper>
        </VFModalCard>
    )
}

export default RejectAllModal
