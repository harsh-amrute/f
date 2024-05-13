import { useUserData } from "../../../../../context"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { ButtonWrapper, RemarkDate, RemarkModalContentWrapper, RemarkModalRemarkCelLRenderer, RemarkModalTable, RemarkModalTableCell, RemarkModalTableHeader, RemarkModalTableHeaderContainer, RemarkModalTableRow, RemarkModalTableRowContainer, RemarkModalUserIcon, RemarkText } from "./styles"

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

    const {user} = useUserData()
    const theme_ui = user.user.theme_ui

    return(
        <VFModalCard openModal={isOpen} headerIcon="/assets/img/VectorFLOW/BPR/remark.svg" headerText="Remarks" closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg" closeModal={onClose}>
            <RemarkModalContentWrapper>
                <RemarkModalTable>
                    <RemarkModalTableHeaderContainer>
                        <RemarkModalTableHeader style={{textAlign:'center'}}>
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
                        {data.map((d:any,index:number)=>{
                            return(
                            <RemarkModalTableRow key={index} style={{borderTop:index===0?'none':'dashed 1px gray'}}>
                                <RemarkModalTableCell>
                                    <RemarkModalUserIcon>
                                        {d.name}
                                    </RemarkModalUserIcon>
                                </RemarkModalTableCell>
                                <RemarkModalTableCell>
                                    <RemarkModalRemarkCelLRenderer>
                                        <RemarkText>
                                           {d.remark}
                                        </RemarkText>
                                        <RemarkDate>
                                           {d.date}
                                        </RemarkDate>
                                    </RemarkModalRemarkCelLRenderer>
                                </RemarkModalTableCell>
                                <RemarkModalTableCell>
                                   {d.eta}
                                </RemarkModalTableCell>
                                <RemarkModalTableCell>
                                   {d.currentLocation}
                                </RemarkModalTableCell>
                            </RemarkModalTableRow>
                            )
                        })}
                    </RemarkModalTableRowContainer>
                </RemarkModalTable>
                <ButtonWrapper>
                    <VFButtonOutline
                        onClick={onClose}
                        themeUi={theme_ui}
                    >
                        Go Back!
                    </VFButtonOutline>
                </ButtonWrapper>
            </RemarkModalContentWrapper>
        </VFModalCard>
    )
}

export default RemarkModal