import { VFStepperWrapper, VFStepWrapper,VFStepLabel,VFStepProgress, VFStepLabelWrapper, VFStepDescription } from "./styles"


interface VFStepperProps{
    items:StepItem[]
    width?:string
    zoom?:number
    dashWidth?:string
}

export interface StepItem{
    label:string,
    status:'completed' | 'pending' | 'rejected' 
    description:string

}

interface VFStepProps{
    label:string
    status:'completed' | 'pending' | 'rejected'
    index:number
    isLast:boolean
    description:string
    dashWidth?:string
}

interface VFStepIconProps{
    status:string
}

const VFStepper =  (props:VFStepperProps)=>{

    const {
        items,
        width,
        zoom=1,
        dashWidth="100px"
    }= props

    return (
        <VFStepperWrapper style={{width:width,zoom:zoom}} data-testid='stepper'>
            {items.map((i,index)=>{
                return <Step dashWidth={dashWidth} label={i.label} status={i.status} key={index} index={index} isLast={index==items.length-1} description={i.description}/>
            })}
        </VFStepperWrapper>
    )
}

const Step = (props:VFStepProps)=>{

    const {
        label,
        status,
        isLast,
        description,
        dashWidth
    } = props


    return(
        <VFStepWrapper isLast={isLast}>        
            <VFStepLabelWrapper>             
                <VFStepIcon status={status}/>
                <VFStepLabel>{label}</VFStepLabel>
                <VFStepDescription>{description}</VFStepDescription>
            </VFStepLabelWrapper>
            {!isLast && <VFStepProgress status={status} style={{width:dashWidth}}/>}
        </VFStepWrapper>
    )
}   


const VFStepIcon = (props:VFStepIconProps)=>{
    const {
        status
    } = props

    const getImgSrc = ()=>{
        switch(status){
            case 'completed':
                return '/assets/img/VectorFLOW/NMS/successful.svg'
            case 'rejected':
                return '/assets/img/VectorFLOW/NMS/rejected.svg'
            default:
                return '/assets/img/VectorFLOW/NMS/pending.svg'
        }
    }

    return(
        <img src={getImgSrc()} height={28} width={28} alt={status}/>
    )
}

export default VFStepper