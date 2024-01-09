import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import {SubmitDataTextContainer, SubmitDataButtonWrapper} from './styles'
import { useUserData } from "../../../../../context";

interface SubmitDataModalProps{
    count:number;
    onFailure:()=>void;
    onSuccess:()=>void;
    onCloseModal:()=>void;
}
const SubmitDataModal=(props:SubmitDataModalProps)=>{

    const{
        count,
        onFailure,
        onSuccess,
        onCloseModal
    } = props

    const {user} = useUserData()

    return (
        <VFModalCard headerText="Submit Data" openModal={true} closeModal={onCloseModal} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <SubmitDataTextContainer>
                Are you sure you want to submit {count} records
            </SubmitDataTextContainer>
            <SubmitDataButtonWrapper>
                <VFButtonOutline themeUi={user.user.theme_ui} color={"gray"} onClick={onFailure} onHoverChild={
                <>
                    <img src="/assets/img/VectorFLOW/NMS/close-white.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    No   
                </>
                }>
                    <img src="/assets/img/VectorFLOW/NMS/close.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    No
                </VFButtonOutline>
                <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>
                    <img src="/assets/img/VectorFLOW/NMS/tick.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    Yes
                </VFButton>
            </SubmitDataButtonWrapper>
        </VFModalCard>
    )
}

export default SubmitDataModal