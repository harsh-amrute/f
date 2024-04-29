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

    return (
        <VFModalCard headerText="Submit Data" openModal={true} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <SubmitDataTextContainer>
                {recordCount>0 && <>{recordCount} {recordCount>1?"Records":"Record"} submitted successfully!<br/><br/></>}
                {modificationCount>0 && <>{modificationCount} out of {totalCount} records are under modification already</>}
            </SubmitDataTextContainer>
            <SubmitDataButtonWrapper>
                {
                    modificationCount>0
                    ?
                    <>
                    <VFButtonOutline themeUi={user.user.theme_ui}  onClick={onFailure} width={173} onHoverChild={
                        <>
                            Ignore  
                        </>
                        }>
                            Ignore 
                        </VFButtonOutline>
                        <VFButton themeUi={user.user.theme_ui} onClick={onSuccess} width={173}>
                            Review
                        </VFButton>
                    </>
                        :
                        <VFButtonOutline themeUi={user.user.theme_ui}  onClick={onFailure} width={173} onHoverChild={
                            <>
                                Ok  
                            </>
                            }>
                                Ok 
                            </VFButtonOutline>

                }
            </SubmitDataButtonWrapper>
        </VFModalCard>
    )
}

export default SubmitConflictModal