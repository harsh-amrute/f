import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { RemarkModalContentWrapper, RemarkModalTable, RemarkModalTableHeader, RemarkModalTableHeaderContainer, RemarkModalTableRow, RemarkModalTableRowContainer } from "./styles"

interface RemarkModalProps{
    isOpen:boolean
    onClose:()=>void
    data:Array<any>
}

const RemarkModal = (props:RemarkModalProps)=>{

    const {
        isOpen,
        onClose,
        data
    } = props

    return(
        <VFModalCard openModal={isOpen} headerIcon="/assets/img/VectorFLOW/BPR/remark.svg" headerText="Remarks" closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg" closeModal={onClose}>
            <RemarkModalContentWrapper>
                <RemarkModalTable>
                    <RemarkModalTableHeaderContainer>
                        <RemarkModalTableHeader>
                            Name
                        </RemarkModalTableHeader>
                        <RemarkModalTableHeader>
                            Remarks
                        </RemarkModalTableHeader>
                        <RemarkModalTableHeader>
                            ETA
                        </RemarkModalTableHeader>
                        <RemarkModalTableHeader>
                            Current Location
                        </RemarkModalTableHeader>
                    </RemarkModalTableHeaderContainer>
                    <RemarkModalTableRowContainer>
                        <RemarkModalTableRow>

                        </RemarkModalTableRow>
                    </RemarkModalTableRowContainer>
                </RemarkModalTable>
            </RemarkModalContentWrapper>
        </VFModalCard>
    )
}

export default RemarkModal