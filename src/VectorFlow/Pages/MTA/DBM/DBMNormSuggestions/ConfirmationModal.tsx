import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import {ConfirmationDataTextContainer, ConfirmationDataButtonWrapper} from './styles'
import { useUserData } from "../../../../../context";
 
interface ConfirmationDataModalProps{
    SKUCode?:any;
    WHCode?:any;
    onFailure:()=>void;
    onSuccess:()=>void;
    onCloseModal:()=>void;
}
const ConfirmationDataModal=(props:ConfirmationDataModalProps)=>{
 
    const{
        onFailure,
        onSuccess,
        onCloseModal,
        SKUCode,
        WHCode
    } = props
 
    const {user} = useUserData()
 
    return (
        <VFModalCard headerText="Confirmation!" openModal={true} closeModal={onCloseModal} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
            <ConfirmationDataTextContainer>
            {SKUCode && WHCode 
                    ? `Entry with SKU Code: ${SKUCode} and Location Code: ${WHCode} will be in sleep, Are you sure?`
                    : "Selected rows will be go to sleep, Are you sure?"}
            </ConfirmationDataTextContainer>
            <ConfirmationDataButtonWrapper>
                <VFButtonOutline themeUi={user.user.theme_ui} onClick={onFailure} onHoverChild={
                <>
                    No  
                </>
                }>
                    No
                </VFButtonOutline>
                <VFButton themeUi={user.user.theme_ui} onClick={onSuccess}>
                    Yes
                </VFButton>
            </ConfirmationDataButtonWrapper>
        </VFModalCard>
    )
}
 
export default ConfirmationDataModal