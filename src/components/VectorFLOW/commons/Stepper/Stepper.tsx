import { StepperWrapper, StepWrapper,StepLabel,StepProgress, StepLabelWrapper, StepDescription } from "./styles"


interface StepperProps{
    items:StepItem[]
    width?:string
}

export interface StepItem{
    label:string,
    status:'completed' | 'pending' | 'rejected' 
    description:string

}

interface StepProps{
    label:string
    status:'completed' | 'pending' | 'rejected'
    index:number
    isLast:boolean
    description:string
}

interface StepIconProps{
    status:string
}

const Stepper =  (props:StepperProps)=>{

    const {
        items,
        width
    }= props

    return (
        <StepperWrapper style={{width:width}} data-testid='stepper'>
            {items.map((i,index)=>{
                return <Step label={i.label} status={i.status} key={index} index={index} isLast={index==items.length-1} description={i.description}/>
            })}
        </StepperWrapper>
    )
}

const Step = (props:StepProps)=>{

    const {
        label,
        status,
        isLast,
        description
    } = props

    return(
        <StepWrapper isLast={isLast}>
           
            <StepLabelWrapper>
                
                {/*<StepCircle status={status}/>*/}
                <StepIcon status={status}/>
                <StepLabel>{label}</StepLabel>
                <StepDescription>{description}</StepDescription>
            </StepLabelWrapper>
            {!isLast && <StepProgress status={status}/>}
        </StepWrapper>
    )
}   


const StepIcon = (props:StepIconProps)=>{
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

export default Stepper