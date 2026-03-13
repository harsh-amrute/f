import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard"
import { ContactModalContentHeader, ContactModalContentValue, ContactModalContentWrapper } from "./styles.css"


interface ContactDetailsModalProps{
    isOpen:boolean
    onClose:()=>void
    data:any
}

const ContactDetailsModal =(props:ContactDetailsModalProps)=>{

    const {
        isOpen,
        onClose,data
    } = props

    return(
        <VFModalCard openModal={isOpen} headerIcon="/assets/img/VectorFLOW/BPR/user.svg" headerText="Contact Details" closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg" closeModal={onClose}>
            <div className={ContactModalContentWrapper}>
                <p className={ContactModalContentHeader}>
                    Name
                </p>
                <p className={ContactModalContentValue}>
                    {data.TransporterName}
                </p>
                <p className={ContactModalContentHeader}>
                    Phone No
                </p>
                <p className={ContactModalContentValue}>
                    {data.TransporterContact}
                </p>
                <p className={ContactModalContentHeader}>
                    Email ID
                </p>
                <p className={ContactModalContentValue}>
                    {data.TransporterEmail}
                </p>
            </div>
        </VFModalCard>
    )
}

export default ContactDetailsModal