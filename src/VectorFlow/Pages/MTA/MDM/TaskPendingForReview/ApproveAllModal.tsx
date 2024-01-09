import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { RadioContainer, SubmitButtonWrapper, RadioButtonGroup } from "./styles"
import { useUserData } from "../../../../../context";

interface ApproveAllModalProps{
    onSuccess:()=>void;
}

const ApproveAllModal=(props:ApproveAllModalProps)=>{

    const {
        onSuccess,
    } = props

    const {user} = useUserData()

    return(
        <VFModalCard headerText={'Approve All'} closeModal={()=>(console.log())} openModal={true} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <RadioContainer>
                <RadioButtonGroup> 
                    <input type="radio" value="option1" checked={true} name="Approve" id="ApproveAll"/>
                    <label htmlFor="ApproveAll">Approve all change across the page</label>
                </RadioButtonGroup>  
                <RadioButtonGroup> 
                    <input type="radio" value="option2" name="Approve" id="ApproveCurrent"/>
                    <label htmlFor="ApproveCurrent">Approve all only current page</label>
                </RadioButtonGroup> 
            </RadioContainer>
            <SubmitButtonWrapper>
                <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>Ok</VFButton>
            </SubmitButtonWrapper>
        </VFModalCard>
    )
}

export default ApproveAllModal
