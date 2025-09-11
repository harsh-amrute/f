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
    
    const [runStatus, setRunStatus] = useState( {
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
            setRunStatus(result.data.data);
        }
        catch(e:any){
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
        if(["SUCCESS", "FAILED", "ABORT", "RUNNING"].includes(runStatus.status)){
            return(
            <VFOverlayModal parentSelector="#main-content" openModal={isModalOpen}  >
            <RunStatusModal runStatus={runStatus} closeModal={()=>setIsModalOpen(false)} goTofinalResult={()=>setStep("Final Result")}/>
            </VFOverlayModal>
            )        
        }
    }

    const StartRun = async()=>{
        const response = postStartSchedulingRun({user_id: "1", user_name: "Admin"});
        console.log("response", response);

        
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