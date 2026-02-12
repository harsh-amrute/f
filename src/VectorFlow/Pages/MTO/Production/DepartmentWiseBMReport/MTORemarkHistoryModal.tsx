import { useUserData } from "../../../../../context"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { ButtonWrapper, RemarkDate, RemarkModalContentWrapper, RemarkModalRemarkCelLRenderer, RemarkModalTableCell, RemarkModalTableHeader, RemarkText } from "../../../MTA/Logistics/InTransitWhereAbouts/styles.css"
import { RemarkModalTable, RemarkModalTableHeaderContainer, RemarkModalTableRow, RemarkModalTableRowContainer } from "./styles.css";
import UserIcon from "../../../MTA/Logistics/InTransitWhereAbouts/UserIcon";
import { memo } from "react";

interface RemarkModalProps{
    isOpen:boolean
    onClose:()=>void
    data:Array<any>
}

const MTORemarkHistoryModal = (props:RemarkModalProps)=>{

    const {
        isOpen,
        onClose,
        data
    } = props

    const {user} = useUserData()
    const theme_ui = user.user.theme_ui
    
    return(

        <VFModalCard openModal={isOpen} headerIcon="/assets/img/VectorFLOW/BPR/remark.svg" headerText="Remark History" closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg" closeModal={onClose}>
            <div className={RemarkModalContentWrapper}>
                <div className={`${RemarkModalTable} custom-scrollbar`}>
                    <div className={RemarkModalTableHeaderContainer}>
                        <p className={RemarkModalTableHeader} style={{textAlign:'center', paddingLeft:'10px'}}>
                            Name
                        </p>
                        <p className={RemarkModalTableHeader}>
                            Remarks
                        </p>
                    </div>
                    <div className={RemarkModalTableRowContainer}>
                        {(!data || data.length===0)?(
                            <p style={{textAlign:'center',height:200}}>No data to show</p>
                        ):(
                            data.map((d:any,index:number)=>{
                                return(
                                <div className={RemarkModalTableRow} key={index} style={{borderTop:index===0?'none':'dashed 1px gray'}}>
                                    <UserIcon data={d.added_by}/>
                                    <div className={RemarkModalTableCell}>
                                        <div className={RemarkModalRemarkCelLRenderer}>
                                            <p className={RemarkText}>
                                               {d.remark}
                                            </p>
                                            <p className={RemarkDate}>
                                               {d.added_on}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        )}
                    </div>
                </div>
                <div className={ButtonWrapper}>
                    <VFButton
                        onClick={onClose}
                        themeUi={theme_ui}
                    >
                        Go Back!
                    </VFButton>
                </div>
            </div>
        </VFModalCard>
    )
}

export default memo(MTORemarkHistoryModal)
 