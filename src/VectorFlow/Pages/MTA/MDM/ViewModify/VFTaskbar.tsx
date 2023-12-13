import React from "react"
import { useUserData } from "../../../../../context"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { TaskBarContainer } from "./styles"
import VFStepper,{StepItem} from "../../../../../components/VectorFLOW/commons/VFStepper"
import { ViewModifyProgressState } from "../../../../../VectorFlow/types/MDM";

export interface VFTaskBarProps{
    masterProgress:ViewModifyProgressState
    editOnline?:boolean
    onBack:()=>void
    onExportData:()=>void
    onModifyData:()=>void
    onClearAndExportErrors:()=>void
    onSubmit:()=>void
    onEditOnline:()=>void
    onDeleteSelected:()=>void
}


const VFTaskBar =(props:VFTaskBarProps)=>{

    const{
        masterProgress,
        editOnline ,
        onBack,
        onExportData,
        onModifyData,
        onClearAndExportErrors,
        onSubmit,
        onEditOnline,
        onDeleteSelected
    } = props

    const {user} = useUserData()
    const themeUi = user.user.theme_ui

    const getStepperState = ():StepItem[]=>{
        switch(masterProgress){
            case "uploaded":
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
            default:
                return [
                    {
                        label:'File Uploaded',
                        status:'pending',
                        description:''
                    },
                    {
                        label:'Submit',
                        status:'pending',
                        description:''
                    },
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
                    <VFButton onClick={onSubmit} themeUi={themeUi} disabled={false} width={139}>
                        Submit
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
                    }}>
                    </div>
                    <div style={{width:'200px',flex:2}}>
                    <VFStepper
                        items={getStepperState()}
                    />
                    </div>

                </TaskBarContainer>
                )
        default:
            return(
                <React.Fragment />
            )
    }

    
}

export default VFTaskBar