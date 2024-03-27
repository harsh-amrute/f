import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import {SubmitDataTextContainer, SubmitDataButtonWrapper} from './styles'
import { useUserData } from "../../../../../context";

interface SubmitErrorModalProps{
    totalCount:number;
    recordCount:number;
    errorCount:number;
    onSuccess:()=>void;
    onCloseModal:()=>void;
}
const SubmitErrorModal=(props:SubmitErrorModalProps)=>{

    const{
        totalCount,
        recordCount,
        errorCount,
        onSuccess,
        onCloseModal
    } = props

    const {user} = useUserData()

    return (
        <VFModalCard headerText="Submit Data" openModal={true} closeModal={onCloseModal} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            {
                recordCount!==errorCount
                ?
                <SubmitDataTextContainer>
                    No data was submiited
                    {errorCount} out of {totalCount} records are have errors
                </SubmitDataTextContainer>
                :
                <SubmitDataTextContainer>
                    {recordCount} Records submitted successfully!<br/><br/>
                    {errorCount} out of {totalCount} records are have errors
                </SubmitDataTextContainer>
            }
            <SubmitDataButtonWrapper>
                <VFButtonOutline themeUi={user.user.theme_ui} color={"gray"} onClick={onSuccess} width={173} onHoverChild={
                <>
                    <img src="/assets/img/VectorFLOW/NMS/close-white.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    OK  
                </>
                }>
                    <img src="/assets/img/VectorFLOW/NMS/close.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    OK 
                </VFButtonOutline>
            </SubmitDataButtonWrapper>
        </VFModalCard>
    )
}

export default SubmitErrorModal