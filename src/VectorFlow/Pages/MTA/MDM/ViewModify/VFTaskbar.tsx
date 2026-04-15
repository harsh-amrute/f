import React from "react"
import { useUserData } from "../../../../../context"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { TaskBarContainer, VFTaskBarButtonGroup } from "./styles.css"
import VFStepper,{StepItem} from "../../../../../components/VectorFLOW/commons/VFStepper"
import { ViewModifyProgressState } from "../../../../../VectorFlow/types/MDM"

export interface VFTaskBarProps{
    masterProgress:ViewModifyProgressState
    disableSubmit?:boolean
    disableDeleteSelected?:boolean
    editOnline?:boolean
    deleteOnline?:boolean
    onReset:()=>void
    onBack:()=>void
    onBack1:()=>void
    onExportData:()=>void
    onModifyData:()=>void
    onClearAndExportErrors:(source:string)=>void
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
    onDeleteOnlineSubmit:()=>void
    onDeleteData:()=>void
    disableStopSeasonality:()=>boolean
    disableResumeSeasonality:()=>boolean
    enableEditOnlineReset:boolean
    showSubmittedExportError:boolean
    masterId:number,
    isSavingToDraft:boolean,
    DataCount?:number,
    onDiscardDraftCallback?:()=>void,
    showExportErrors?:boolean
}


const VFTaskBar =(props:VFTaskBarProps)=>{

    const{
        masterProgress,
        isSavingToDraft,
        editOnline ,
        disableSubmit,
        disableDeleteSelected,
        deleteOnline,
        enableEditOnlineReset,
        showSubmittedExportError,
        onBack,
        onBack1,
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
        onDeleteOnlineSubmit,
        onSeasonalityResume,
        onSeasonalityStop,
        onDeleteOnline,
        // onDeleteOnlineReset,
        onDeleteData,
        disableStopSeasonality,
        disableResumeSeasonality,
        onPhaseInPhaseOutStop,
        masterId,
        DataCount,
        onDiscardDraftCallback,
        showExportErrors
    } = props

    const {user,isSideBarOpen} = useUserData()
    const themeUi = user.user.theme_ui

    const width = isSideBarOpen?"77%":'97%'

    

    const getStepperState = ():StepItem[]=>{
        switch(masterProgress){
            case "uploaded" :
                return [
                    {
                        label:'File Uploaded',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Submitted',
                        status:'pending',
                        description:''
                    },
                ]
            case "deleteUploaded":
                return [
                    {
                        label:'File Uploaded',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Submitted',
                        status:'pending',
                        description:''
                    },
                ]
            case 'conflicts':
                return [
                    {
                        label:'File Uploaded',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Submitted',
                        status:'pending',
                        description:''
                    },
                ]
            case 'editOnlineConflicts':
                return [
                    {
                        label:'Edit Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:'Submitted',
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
                        label:'Submitted',
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
                        label:"Submitted",
                        status:"pending",
                        description:""
                    }
                ]
            // case "editOnlineSaved":
            //     return [
            //         {
            //              label:'Edit Online',
            //             status:'completed',
            //             description:''
            //         },
            //         {
            //             label:'Save',
            //             status:'completed',
            //             description:''
            //         },
            //         {
            //             label:"Submit",
            //             status:"pending",
            //             description:""
            //         }
            //     ]
            case "editOnlineSubmitted":
                return [
                    {
                         label:'Edit Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:"Submitted",
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
                        label:"Submitted",
                        status:"pending",
                        description:""
                    }
                ]
            //  case "deleteOnlineSaved":
            //     return [
            //         {
            //              label:'Delete Online',
            //             status:'completed',
            //             description:''
            //         },
            //         {
            //             label:'Save',
            //             status:'completed',
            //             description:''
            //         },
            //         {
            //             label:"Submit",
            //             status:"pending",
            //             description:""
            //         }
            //     ]
            case "deleteOnlineSubmitted":
                return [
                    {
                         label:'Delete Online',
                        status:'completed',
                        description:''
                    },
                    {
                        label:"Submitted",
                        status:"completed",
                        description:""
                    }
                ]
            default:
                return [
    
                ]
        }
    }


    const BackButton =({isAlert=false})=> {

        const {user} = useUserData()
        const themeUi = user.user.theme_ui

        return(
            <VFButtonOutline onClick={isAlert ? onBack1: onBack} themeUi={themeUi} width={50} onHoverChild={
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={"/assets/img/VectorFLOW/NMS/back-btn-white.svg"} data-testid="back-btn"/>
                </div>
                }>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/NMS/back-btn-regal.svg":"/assets/img/VectorFLOW/NMS/back-btn.svg"} data-testid="back-btn"/>
                </div>
            </VFButtonOutline>
        )
    }

    switch(masterProgress){
        case "default": 
        return(
        <div className={TaskBarContainer} data-testid="taskbar" style={{width:width}}>
            <div className={VFTaskBarButtonGroup}>
            <BackButton isAlert={true}/>
            </div>
        </div>
         )

        case "view":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                    <BackButton/>
                        <VFButtonOutline onClick={onExportData} themeUi={themeUi} width={130}>
                            Export Data
                        </VFButtonOutline>
                        {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={false} width={139}>
                       Save as draft
                    </VFButtonOutline> */}
                        {/* <VFButtonOutline onClick={onEditOnline} themeUi={themeUi} disabled={!editOnline} width={164} onHoverChild={
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <img src={"/assets/img/VectorFLOW/NMS/edit-online-disabled.svg"} style={{marginRight:'11px'}}/>
                                <p>Edit Online</p>
                            </div>
                        }>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <img src={editOnline?themeUi==="REGALBLAZE"?"/assets/img/VectorFLOW/NMS/edit-online-regal.svg":"/assets/img/VectorFLOW/NMS/edit-online.svg":"/assets/img/VectorFLOW/NMS/edit-online-disabled.svg"} style={{marginRight:'11px'}}/>
                                <p>Edit Online</p>
                            </div>
                        </VFButtonOutline> */}
                    <VFButtonOutline onClick={onModifyData} themeUi={themeUi} disabled={false} width={164}>
                        Modify Data
                    </VFButtonOutline>
                    </div>
                </div>
            )

        case "error":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>          
                        {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={isSavingToDraft} width={139}>
                        Save as draft
                        </VFButtonOutline>             */}
                        <VFButton onClick={()=>onClearAndExportErrors('Validation ')} themeUi={themeUi} disabled={false} width={183}>
                            Clear & Export Errors
                        </VFButton>
                    </div>
                </div>
                )

        case "uploaded":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                     <div className={VFTaskBarButtonGroup}>
                    <BackButton/>                      
                       {
                        !isSavingToDraft && !disableSubmit && DataCount!==0 && (
                            <VFButtonOutline onClick={onDeleteSelected} themeUi={themeUi} disabled={disableDeleteSelected} width={139}>
                            Remove Selected
                            </VFButtonOutline>
                        )
                       }
                        {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={masterId > 14 || isSavingToDraft || disableSubmit} width={139}>
                        Save as draft
                        </VFButtonOutline> */}
                        <VFButton onClick={onSubmit} themeUi={themeUi} disabled={disableSubmit || isSavingToDraft} width={139}>
                            Submit All
                        </VFButton>
                   </div>
                    <div>
                    <VFStepper
                        items={getStepperState()}
                    />
                    </div>
                </div>
                )

        case "submitted":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width,justifyContent:'space-between'}}>
                    <div style={{display:'flex', gap:'20px'}}>
                    <BackButton/>  
                        {(showExportErrors || showSubmittedExportError) &&
                            <VFButton onClick={() => onClearAndExportErrors('')} themeUi={themeUi} disabled={false} width={183}>
                                Export Errors
                            </VFButton>
                        }
                    </div>
                    <div > 
                    <VFStepper
                        items={getStepperState()}
                    />
                    </div>

                </div>
            )
        case "savedToDraft":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width,justifyContent:'space-between'}}>
                    <div style={{display:'flex', gap:'20px'}}>
                    <BackButton/>
                    </div>
                    <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        case "Discard":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width,justifyContent:'space-between'}}>
                    <div style={{display:'flex', gap:'20px'}}>
                    <BackButton/>
                    </div>
                    <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        case "DiscardDraft":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width,justifyContent:'space-between'}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                        <VFButtonOutline themeUi={themeUi} onClick={()=>{
                            if(onDiscardDraftCallback){
                                onDiscardDraftCallback()
                            }
                        }} >
                            Discard Draft
                        </VFButtonOutline>
                    </div>
                    <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        case "editOnline":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                        <VFButtonOutline themeUi={themeUi} onClick={onReset} disabled={!enableEditOnlineReset || isSavingToDraft || disableSubmit }>
                            Reset
                        </VFButtonOutline>
                        <VFButton themeUi={themeUi} onClick={onEditOnlineSave} disabled={masterId > 14 || isSavingToDraft || disableSubmit}>
                            Save as Draft
                        </VFButton>
                        <VFButtonOutline themeUi={themeUi} onClick={onSubmit} disabled={disableSubmit || isSavingToDraft} >
                            Submit
                        </VFButtonOutline>
                    </div>
                    <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        // case "editOnlineSaved":
        //     return(
        //         <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
        //              <div className={VFTaskBarButtonGroup}>
        //             <BackButton/>
        //                 <VFButtonOutline themeUi={themeUi} onClick={onReset} disabled={!enableEditOnlineReset}>
        //                     Reset
        //                 </VFButtonOutline>
        //                 <VFButton themeUi={themeUi} onClick={onSubmit}>
        //                     Submit
        //                 </VFButton>
        //            </div>
        //             <div>
        //                 <VFStepper
        //                     items={getStepperState()}
        //                 />
        //             </div>
        //         </div>
        //     )
        case "editOnlineSubmitted":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width,justifyContent:'space-between'}}>
                     <div className={VFTaskBarButtonGroup}>
                    <BackButton/>
                   </div>
                    <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        case'seasonality':
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                     <div className={VFTaskBarButtonGroup}>
                    <BackButton/>
                    <VFButtonOutline themeUi={themeUi} onClick={onSeasonalityResume} disabled={disableResumeSeasonality()}>  
                            Resume
                    </VFButtonOutline >
                    {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={masterId > 14 || isSavingToDraft} width={139}>
                        Save as draft
                        </VFButtonOutline>  */}
                    <VFButtonOutline themeUi={themeUi} onClick={onSeasonalityStop} disabled={disableStopSeasonality()}>
                            Stop Selected
                        </VFButtonOutline>
                   </div>
                </div>
            )
        case'phaseInPhaseOut':
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                    <VFButton themeUi={themeUi} onClick={onPhaseInPhaseOutStop}>
                            Stop Selected
                        </VFButton>
                        {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={masterId > 14 || isSavingToDraft} width={139}>
                        Save as draft
                        </VFButtonOutline>  */}
                    </div>
                </div>
            )
        case 'deleteView':
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                    {/* <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnline} disabled={!deleteOnline}>  
                            Delete Online
                    </VFButtonOutline > */}
                    <VFButtonOutline themeUi={themeUi} onClick={onDeleteData} disabled={false}>
                            Delete Data
                        </VFButtonOutline>
                    </div>

                </div>
            )
        case 'deleteOnline':
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                    {/* <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnlineReset} disabled={isSavingToDraft || disableSubmit } >  
                        Reset
                    </VFButtonOutline > */}
                    {
                        !isSavingToDraft && !disableSubmit && DataCount!==0 && (
                            <VFButtonOutline onClick={onDeleteSelected} themeUi={themeUi} disabled={disableDeleteSelected} width={139}>
                              Remove Selected
                            </VFButtonOutline>
                        )
                       }
                    <VFButton themeUi={themeUi} onClick={onSaveToDraft} disabled={masterId > 14 || isSavingToDraft || disableSubmit}>
                            Save as draft
                        </VFButton>
                        <VFButtonOutline themeUi={themeUi} onClick={onSubmit} disabled={isSavingToDraft || disableSubmit } >  
                        Submit
                    </VFButtonOutline >
                    </div>
                    <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        //  case "deleteOnlineSaved":
        //     return(
        //         <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
        //              <div className={VFTaskBarButtonGroup}>
        //             <BackButton/>
        //                 <VFButtonOutline themeUi={themeUi} onClick={onDeleteOnlineReset}>
        //                     Reset
        //                 </VFButtonOutline>
        //                 <VFButton themeUi={themeUi} onClick={onDeleteOnlineSubmit}>
        //                     Submit
        //                 </VFButton>
        //            </div>
        //             <div >
        //                 <VFStepper
        //                     items={getStepperState()}
        //                 />
        //             </div>
        //         </div>
        //     )
         case "deleteOnlineSubmitted":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                    <BackButton/>
                    <VFButton onClick={()=>onClearAndExportErrors('')} themeUi={themeUi} disabled={false} width={183}>
                                Export Errors
                    </VFButton>
                    </div>
                    <div>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
         case 'deleteUploaded':
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                     <div className={VFTaskBarButtonGroup}>
                    <BackButton/>
                    <VFButtonOutline themeUi={themeUi} onClick={onDeleteSelected} width={139}>  
                            Remove Selected
                    </VFButtonOutline >
                    {/* <VFButtonOutline onClick={onSaveToDraft} themeUi={themeUi} disabled={isSavingToDraft || disableSubmit} width={139}>
                        Save as draft
                        </VFButtonOutline> */}
                    <VFButton themeUi={themeUi} onClick={onSubmit} disabled={disableSubmit || isSavingToDraft }>
                            Delete All
                        </VFButton>
                   </div>
                   <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        case "conflicts":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                        {DataCount!==0 && (
                        <VFButtonOutline onClick={onDeleteSelected} themeUi={themeUi} disabled={false} width={139}>
                        Remove Selected
                        </VFButtonOutline>
                        )}
                        <VFButton onClick={onSubmitConflictData} themeUi={themeUi} disabled={disableSubmit} width={139}>
                            Submit All
                        </VFButton>
                    </div>
                    <div>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
         case "editOnlineConflicts":
            return(
                <div className={TaskBarContainer}  data-testid="taskbar" style={{width:width}}>
                      <div className={VFTaskBarButtonGroup}>
                        <BackButton/>
                        {DataCount!==0 && (
                        <VFButtonOutline onClick={onDeleteSelected} themeUi={themeUi} disabled={false} width={139}>
                        Remove Selected
                        </VFButtonOutline>
                        )}
                        <VFButton onClick={onSubmitConflictData} themeUi={themeUi} disabled={disableSubmit} width={139}>
                            Submit All
                        </VFButton>
                    </div>
                    <div>
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </div>
            )
        default:
            return(
                <React.Fragment>
                     <div >
                        <VFStepper
                            items={getStepperState()}
                        />
                    </div>
                </React.Fragment>
            )
    }

    
}

export default VFTaskBar