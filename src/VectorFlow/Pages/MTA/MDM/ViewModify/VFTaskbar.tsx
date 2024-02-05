import React from "react"
import { useUserData } from "../../../../../context"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { TaskBarContainer } from "./styles"
import VFStepper,{StepItem} from "../../../../../components/VectorFLOW/commons/VFStepper"
import { ViewModifyProgressState } from "../../../../../VectorFlow/types/MDM"

export interface VFTaskBarProps{
    masterProgress:ViewModifyProgressState
    disableSubmit?:boolean
    editOnline?:boolean
    deleteOnline?:boolean
    onReset:()=>void
    onBack:()=>void
    onExportData:()=>void
    onModifyData:()=>void
    onClearAndExportErrors:()=>void
    onSubmit:()=>void
    onSubmitConflictData:()=>void
    onEditOnline:()=>void
    onEditOnlineSave:()=>void
    onSaveToDraft:()=>void
    onDeleteSelected:()=>void
    onSeasonalityResume:()=>void
    onSeasonalityStop:()=>void
    onPhaseInPhaseOutStop:()=>void
    onDeleteOnline:()=>void
    onDeleteOnlineReset:()=>void
    onDeleteOnlineSave:()=>void
    onDeleteOnlineSubmit:()=>void
    onDeleteData:()=>void
    disableStopSeasonality:()=>boolean
    disableResumeSeasonality:()=>boolean
}


const VFTaskBar =(props:VFTaskBarProps)=>{

    const{
        masterProgress,
        editOnline ,
        disableSubmit,
        deleteOnline,
        onBack,
        onExportData,
        onModifyData,
        onClearAndExportErrors,
        onSubmit,
        onSubmitConflictData,
        onReset,
        onEditOnline,
        onEditOnlineSave,
        onSaveToDraft,
        onDeleteSelected,
        onSeasonalityResume,
        onSeasonalityStop,
        onDeleteOnline,
        onDeleteOnlineSubmit,
        onDeleteOnlineReset,
        onDeleteOnlineSave,
        onDeleteData,
        disableStopSeasonality,
        disableResumeSeasonality
    } = props

    const {user} = useUserData()
    const themeUi = user.user.theme_ui

    const getStepperState = ():StepItem[]=>{
        switch(masterProgress){
            case "uploaded" || "deleteUploaded || 'conflicts":
                return [
                    {
                        label:'File Uploaded',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Submit',
                        status:'pending',
                        description:''
                    },
                ]
            case "submitted":
                return [
                    {
                         label:'File Uploaded',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Submit',
                        status:'completed',
                        description:''
                    },
                ]
             case "editOnline":
                return [
                    {
                         label:'Edit Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Save',
                        status:'pending',
                        description:''
                    },
                    {
                        label:"Submit",
                        status:"pending",
                        description:""
                    }
                ]
            case "editOnlineSaved":
                return [
                    {
                         label:'Edit Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Save',
                        status:'completed',
                        description:''
                    },
                    {
                        label:"Submit",
                        status:"pending",
                        description:""
                    }
                ]
            case "editOnlineSubmitted":
                return [
                    {
                         label:'Edit Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Save',
                        status:'completed',
                        description:''
                    },
                    {
                        label:"Submit",
                        status:"completed",
                        description:""
                    }
                ]
            case "deleteOnline":
                return [
                    {
                         label:'Delete Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Save',
                        status:'pending',
                        description:''
                    },
                    {
                        label:"Submit",
                        status:"pending",
                        description:""
                    }
                ]
             case "deleteOnlineSaved":
                return [
                    {
                         label:'Delete Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Save',
                        status:'completed',
                        description:''
                    },
                    {
                        label:"Submit",
                        status:"pending",
                        description:""
                    }
                ]
            case "deleteOnlineSubmitted":
                return [
                    {
                         label:'Edit Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Save',
                        status:'completed',
                        description:''
                    },
                    {
                        label:"Submit",
                        status:"completed",
                        description:""
                    }
                ]
            default:
                return [
    
                ]
        }
    }

    const BackButton =()=> {
        return(
            <VFButtonOutline onClick={onBack} themeUi={themeUi} width={50} onHoverChild={
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={"/assets/img/VectorFLOW/NMS/back-btn-white.svg"} data-testid="back-btn"/>
                </div>
                }>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={"/assets/img/VectorFLOW/NMS/back-btn.svg"} data-testid="back-btn"/>
                </div>
            </VFButtonOutline>
        )
    }

    switch(masterProgress){
        case "view":
            return(
                <TaskBarContainer data-testid="taskbar">
                    <BackButton/>
                        <VFButtonOutline onClick={onExportData} themeUi={themeUi} width={130}>
                            Export Data
                        </VFButtonOutline>
                        {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save to draft
                    </VFButtonOutline> */}
                        <VFButtonOutline onClick={onEditOnline} themeUi={themeUi} disabled={!editOnline} width={164} onHoverChild={
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <img src={"/assets/img/VectorFLOW/NMS/edit-online-disabled.svg"} style={{marginRight:'11px'}}/>
                                <p>Edit Online</p>
                            </div>
                        }>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <img src={editOnline?"/assets/img/VectorFLOW/NMS/edit-online.svg":"/assets/img/VectorFLOW/NMS/edit-online-disabled.svg"} style={{marginRight:'11px'}}/>
                                <p>Edit Online</p>
                            </div>
                        </VFButtonOutline>
                    <VFButtonOutline onClick={onModifyData} themeUi={themeUi} disabled={editOnline} width={164}>
                        Modify Data
                    </VFButtonOutline>
                </TaskBarContainer>
            )

        case "error":
            return(
                <TaskBarContainer data-testid="taskbar">
                    <BackButton/>          
                    <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save to draft
                    </VFButtonOutline>            
                    <VFButton onClick={onClearAndExportErrors} themeUi={themeUi} disabled={false} width={183}>
                        Clear & Export Errors
                    </VFButton>
                </TaskBarContainer>
                )

        case "uploaded":
            return(
                <TaskBarContainer data-testid="taskbar">
                    <BackButton/>                      
                    <VFButtonOutline onClick={onDeleteSelected} themeUi={themeUi} disabled={false} width={139}>
                       Delete Selected
                    </VFButtonOutline>
                    <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save to draft
                    </VFButtonOutline>
                    <VFButton onClick={onSubmit} themeUi={themeUi} disabled={disableSubmit} width={139}>
                        Submit All
                    </VFButton>
                    <div style={{
                        flex:7,
                        height:'100%',
                        width:'100%'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                    <VFStepper
                        items={getStepperState()}
                    />
                    </div>
                </TaskBarContainer>
                )

        case "submitted":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <div style={{
                        flex:7,
                        height:'100%',
                        width:'100%'
                    }}/>
                    <div style={{width:'200px',flex:2}}>
                    <VFStepper
                        items={getStepperState()}
                    />
                    </div>

                </TaskBarContainer>
            )
        case "editOnline":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                    <VFButtonOutline themeUi={themeUi} onClick={onReset}>
                        Reset
                    </VFButtonOutline>
                    <VFButton themeUi={themeUi} onClick={onEditOnlineSave}>
                        Save
                    </VFButton>
                    <VFButtonOutline themeUi={themeUi} onClick={onSubmit} disabled>
                        Submit
                    </VFButtonOutline>
                    <div style={{
                        flex:4,
                        height:'100%',
                        width:'100%'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
        case "editOnlineSaved":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                    <VFButtonOutline themeUi={themeUi} onClick={onReset}>
                        Reset
                    </VFButtonOutline>
                    <VFButton themeUi={themeUi} onClick={onSubmit}>
                        Submit
                    </VFButton>
                    <div style={{
                        flex:5,
                        height:'100%',
                        width:'100%'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
        case "editOnlineSubmitted":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                    <div style={{
                        // flex:7,
                        height:'100%',
                        width:'auto'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
        case'seasonality':
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                   <VFButtonOutline themeUi={themeUi} onClick={onSeasonalityResume} disabled={disableResumeSeasonality()}>  
                        Resume
                   </VFButtonOutline >
                   <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save to draft
                    </VFButtonOutline> 
                   <VFButtonOutline themeUi={themeUi} onClick={onSeasonalityStop} disabled={disableStopSeasonality()}>
                        Stop Selected
                    </VFButtonOutline>
                </TaskBarContainer>
            )
        case'phaseInPhaseOut':
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                   <VFButton themeUi={themeUi} onClick={onSeasonalityStop}>
                        Stop Selected
                    </VFButton>
                    <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save to draft
                    </VFButtonOutline> 
                </TaskBarContainer>
            )
        case 'deleteView':
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                   <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnline} disabled={!deleteOnline}>  
                        Delete Online
                   </VFButtonOutline >
                   <VFButtonOutline themeUi={themeUi} onClick={onDeleteData} disabled={deleteOnline}>
                        Delete Data
                    </VFButtonOutline>
                </TaskBarContainer>
            )
        case 'deleteOnline':
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                   <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnlineReset}>  
                       Reset
                   </VFButtonOutline >
                   <VFButton themeUi={themeUi} onClick={onDeleteOnlineSave}>
                        Save
                    </VFButton>
                    <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnlineSubmit} disabled>  
                       Submit
                   </VFButtonOutline >
                   <div style={{
                        flex:4,
                        height:'100%',
                        width:'100%'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
         case "deleteOnlineSaved":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                    <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnlineReset}>
                        Reset
                    </VFButtonOutline>
                    <VFButton themeUi={themeUi} onClick={onDeleteOnlineSubmit}>
                        Submit
                    </VFButton>
                    <div style={{
                        flex:5,
                        height:'100%',
                        width:'100%'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
         case "deleteOnlineSubmitted":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                    <div style={{
                        // flex:7,
                        height:'100%',
                        width:'100%'
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
         case 'deleteUploaded':
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                   <VFButtonOutline themeUi={themeUi} onClick={onDeleteSelected}>  
                        Remove Selected
                   </VFButtonOutline >
                   <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save to draft
                    </VFButtonOutline>
                   <VFButton themeUi={themeUi} onClick={onSubmit}>
                        Delete All
                    </VFButton>
                </TaskBarContainer>
            )
        case "conflicts":
            return(
                <TaskBarContainer data-testid="taskbar" style={{flexDirection:'row'}}>
                    <BackButton/>
                    <VFButtonOutline onClick={onDeleteSelected} themeUi={themeUi} disabled={false} width={139}>
                       Delete Selected
                    </VFButtonOutline>
                    <VFButton onClick={onSubmitConflictData} themeUi={themeUi} disabled={disableSubmit} width={139}>
                        Submit All
                    </VFButton>
                    <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </TaskBarContainer>
            )
        default:
            return(
                <React.Fragment>
                     <div style={{width:'200px',flex:2}}>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </React.Fragment>
            )
    }

    
}

export default VFTaskBar