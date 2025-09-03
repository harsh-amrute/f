import React, { useEffect, useState } from 'react'
import { useGetRunState } from '../../../../VectorFlow/Services/MTO/Scheduling';
import VFOverlayModal from '../../../../components/VectorFLOW/commons/VFOverlayModal';
import FileUploadSection from './FileUploadSection';
import styled from 'styled-components';
import StatusBarBottom from './components/StatusBarBottom';
import RunStatusModal from './components/RunStatusModal';
import FinalResultSection from './FinalResultSection';



const Scheduling = () => {

    const [step, setStep] = useState("Upload");
    
    const [runStatus, setRunStatus] = useState( {
        status: "Progress",
        startTime: "2023-10-01T10:00:00Z",
        endTime: null,
        message: "Uploading data",
    });

    const {mutateAsync: getRunState} = useGetRunState();

    const GetRunStatus = async()=>{ 
         const result = await getRunState();
         console.log('result', result);
         setRunStatus(result.data.data);
    }

    

    useEffect(()=>{ 
        GetRunStatus();
    },[])


    const getRunProgressStatus = async()=>{
        try{
            const response = await getRunState();
            setRunStatus(response.data.data);
        }
        catch{
            console.error("Error fetching run progress status");
        }
    }

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

    const getRunActionBar = () => {
        const onGoToFinalResult = () => {
            setStep("Final Result");
        }
        switch (step) {
            case "Upload":
                return (
                    <StatusBarBottom onGoToFinalResult={onGoToFinalResult}/>
                );
            case "Final Result":
                return null;
            case "Failed":
                return (
                    <div className='run-action-bar'>
                        <button onClick={() => getRunProgressStatus()}>Retry Run</button>
                        <button onClick={() => setStep("Upload")}>Upload New Data</button>
                    </div>
                );
            default:
                return (
                    <div className='run-action-bar'>
                        <button onClick={() => setStep("Upload")}>Start New Run</button>
                    </div>
                );
    }}

    return (
        <div style={{position: 'relative'}} id='main-content' >
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