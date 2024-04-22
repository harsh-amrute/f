import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import {SubmitDataTextContainer, SubmitDataButtonWrapper} from './styles'
import { useUserData } from "../../../../../context";

interface SubmitConflictModalProps{
    totalCount:number;
    recordCount:number;
    modificationCount:number;
    errorCount:number
    onFailure:()=>void;
    onSuccess:()=>void;
    onCloseModal:()=>void;
}
const SubmitConflictModal=(props:SubmitConflictModalProps)=>{

    const{
        totalCount,
        recordCount,
        modificationCount,
        onFailure,
        onSuccess,
    } = props

    const {user} = useUserData()
    console.log(modificationCount)

    return (
        <VFModalCard headerText="Submit Data" openModal={true} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <SubmitDataTextContainer>
                {recordCount>0 && <>{recordCount} {recordCount>1?"Records":"Record"} submitted successfully!<br/><br/></>}
                {modificationCount>0 && <>{modificationCount} out of {totalCount} records are under modification already</>}
            </SubmitDataTextContainer>
            <SubmitDataButtonWrapper>
                <VFButtonOutline themeUi={user.user.theme_ui}  onClick={onFailure} width={173} onHoverChild={
                <>
                    <img src="/assets/img/VectorFLOW/NMS/close-white.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    Ignore  
                </>
                }>
                    <img src="/assets/img/VectorFLOW/NMS/close.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    Ignore 
                </VFButtonOutline>
                <VFButton themeUi={user.user.theme_ui} onClick={onSuccess} width={173}>
                    <img src="/assets/img/VectorFLOW/NMS/feather-eye.svg" style={{width:'13px', height:'13px',marginRight:'13px'}}></img>
                    Review
                </VFButton>
            </SubmitDataButtonWrapper>
        </VFModalCard>
    )
}

export default SubmitConflictModal