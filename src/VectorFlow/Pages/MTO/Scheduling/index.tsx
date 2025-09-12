import React, { useEffect, useState } from 'react'
import { useGetRunState, usePostStartSchedulingRun } from '../../../../VectorFlow/Services/MTO/Scheduling';
import VFOverlayModal from '../../../../components/VectorFLOW/commons/VFOverlayModal';
import FileUploadSection from './FileUploadSection';
import StatusBarBottom from './components/StatusBarBottom';
import RunStatusModal from './components/RunStatusModal';
import FinalResultSection from './FinalResultSection';
import { notifyError } from '../../../../helpers/notify';



const Scheduling = () => {

    const [step, setStep] = useState("Upload");
    
    const [runStatus, setRunStatus] = useState<any>( {
        status: null,
        startTime: null,
        endTime: null,
        message: null,
    });

    const {mutateAsync: getRunState} = useGetRunState();

    const {mutateAsync: postStartSchedulingRun} = usePostStartSchedulingRun();

    const GetRunStatus = async()=>{ 
        try{

            const result = await getRunState();
            if(result.status===200){
                setRunStatus(result.data.data);
            }else{
                setRunStatus({status: 'FAILED_TO_FETCH', startTime: null, endTime: null, message: null});
            }
        }
        catch(e:any){
            setRunStatus({status: 'Failed to fetch', startTime: null, endTime: null, message: null});
            notifyError("Failed to fetch run status");
            console.log('error', e);
        }
    }

    useEffect(()=>{ 
        GetRunStatus();
    },[])


    const getStep = ()=>{
        switch (step) {
            case "Upload":
                return <FileUploadSection/>
            case "Final Result":
                return <FinalResultSection setStep={setStep}/>
            default:
                return <div>Upload Step</div>;
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(true);

    const getRunStatusModal = (runStatus:any) => {
        if(["SUCCESS", "FAILED", "ABORT", "RUNNING", 'FAILED_TO_FETCH'].includes(runStatus.status)){
            return(
            <VFOverlayModal parentSelector="#main-content" openModal={isModalOpen}  >
            <RunStatusModal runStatus={runStatus} closeModal={()=>setIsModalOpen(false)} goTofinalResult={()=>setStep("Final Result")}/>
            </VFOverlayModal>
            )        
        }
    }

    const StartRun = async()=>{
        try{

            const response = await postStartSchedulingRun({user_id: "1", user_name: "Admin"});
            if(response.status === 200){
                notifyError("Run started successfully");
                setTimeout(()=>{
                    GetRunStatus();
                },3000)
            }
        }
        catch(e){
            notifyError("Failed to start the run");
            console.log('error', e);
        }
    }

    const getRunActionBar = () => {
        const onGoToFinalResult = () => {
            setStep("Final Result");
        }
        switch (step) {
            case "Upload":
                return (
                    <StatusBarBottom onGoToFinalResult={onGoToFinalResult} StartRun={StartRun}/>
                );
            case "Final Result":
                return null;
            default:
                return null;
    }}

    

    return (
        <div style={{display: 'flex',height: '100%', flexDirection: 'column', justifyContent: 'space-between'}} id='main-content' >
            {
                getRunStatusModal(runStatus)
            }
            {
                getStep()
            }
            {
                getRunActionBar()
            }
        </div>
    )
}

export default Scheduling