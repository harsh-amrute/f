import { StepIcon, StepIconWrapper, StepLabel, StepperWrapper, StepSection,StepStroke,StepStrokeWrapper,StepWrapper } from "./styles"

type StepState = "completed" |  "active" | "pending"

interface UserManagementStepperProps{
    list:Array<UserManagementStepperListProps>
    activeStep:number
    themeUi:string
}

interface UserManagementStepperListProps{
    label:string
}

interface StepComponentProps {
    label:string
    currentState:StepState
    isLast:boolean
    themeUi:string
}

const UserManagementStepper = (props:UserManagementStepperProps)=>{

    const {
        list,
        activeStep,
        themeUi
    } = props

    const getCurrentStep = (currIndex:number):StepState=>{


        if(currIndex===activeStep) return "active"
        if(currIndex<activeStep) return "completed"
        return "pending"
    }

    return(
        <StepperWrapper>
            {list.map((s,index)=>{
                return(
                    <UserManagementStepperItem
                        label={s.label}
                        currentState={getCurrentStep(index)}
                        isLast={index===list.length-1}
                        themeUi={themeUi}
                    />
                )
            })}
        </StepperWrapper>
    )
}


const UserManagementStepperItem = (step:StepComponentProps)=>{

    const {
        currentState,
        label,
        isLast,
        themeUi
    } = step

    const getImgSrc = (state:StepState):string=>{
        if(state==='completed') return "/assets/img/step-completed.svg"
        if(state==='active')return themeUi==="REGALBLAZE"?"/assets/img/step-active-regal.svg":"/assets/img/step-active.svg"
        return "/assets/img/step-pending.svg"
    }

    return(
        <StepWrapper style={{width:isLast?"auto":"100%"}}>
            <StepSection>
                <StepIconWrapper>
                    <StepIcon src={getImgSrc(currentState)}/>
                </StepIconWrapper>
            </StepSection>
            <StepSection >
                <StepLabel themeUi={themeUi}>
                    {label}
                </StepLabel>
            </StepSection>
            {!isLast && (
                <StepSection style={{width:'100%'}}>
                   <StepStrokeWrapper>
                        <StepStroke/>
                   </StepStrokeWrapper>
                </StepSection>
            )}
        </StepWrapper>
    )
}

export default UserManagementStepper