import React, { useEffect, useState } from 'react'
import { useGetFinalRunResult, useGetRunState, usePostStartSchedulingRun } from '../../../../VectorFlow/Services/MTO/Scheduling';
import VFOverlayModal from '../../../../components/VectorFLOW/commons/VFOverlayModal';
import FileUploadSection from './FileUploadSection';
import StatusBarBottom from './components/StatusBarBottom';
import RunStatusModal from './components/RunStatusModal';
import FinalResultSection from './FinalResultSection';
import { notifyError, notifySuccess } from '../../../../helpers/notify';
import OverlayLoader from '../Common/Loader';
import { useSearchParams } from 'react-router-dom';
import { useUserData } from '../../../../context';



const Scheduling = () => {

    const [step, setStep] = useState("Upload");
    
    const [runStatus, setRunStatus] = useState<any>( {
        status: null,
        startTime: null,
        endTime: null,
        message: null,
    });

    const user = useUserData().user

    const [finalResult, setFinalResult] = useState<any>(null);

    const {mutateAsync: getRunState} = useGetRunState();

    const {mutateAsync: postStartSchedulingRun} = usePostStartSchedulingRun();

    const {mutateAsync: getFinalRunResult, isLoading: finalResultLoading} = useGetFinalRunResult();

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
            setRunStatus({status: 'FAILED_TO_FETCH', startTime: null, endTime: null, message: null});
            notifyError("Failed to fetch run status");
            console.log('error', e);
        }
    }

    useEffect(()=>{
        let interval: NodeJS.Timer;
        if(runStatus.status === "RUNNING"){
            interval = setInterval(()=>{
                GetRunStatus();
            }, 5000);
        }
        return () => {
            if(interval) clearInterval(interval);
        }
    },[runStatus.status])

    useEffect(()=>{ 
        GetRunStatus();
    },[])

    const [isRunEnabled, setIsRunEnabled] = useState(false);

    const getStep = ()=>{
        switch (step) {
            case "Upload":
                return <FileUploadSection setIsRunEnabled={setIsRunEnabled}/>
            case "Final Result":
                return <FinalResultSection setStep={setStep} finalResult={finalResult}/>
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
            const response = await postStartSchedulingRun({user_id: user.user.id.toString(), user_name: user.user.name});
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

    const [searchParams, setSearchParams] = useSearchParams();

    const getRunActionBar = () => {
        const onGoToFinalResult = async() => {

            try{
                const result = await getFinalRunResult();
                if(result.status===200){
                    notifySuccess("Fetched Run Result Successfully");
                    console.log("result", result.data.data);
                    setFinalResult(result.data.data);
                    setSearchParams({ page: "ResourceView" });
                    setStep("Final Result");
                }
                else{
                    notifyError("Failed to fetch run result");
                }
            }
            catch(e){
                notifyError("Failed to fetch run result");
                console.error(e);
            }
        }
        switch (step) {
            case "Upload":
                return (
                    <StatusBarBottom isRunEnabled={isRunEnabled} isGoToFinalResult onGoToFinalResult={onGoToFinalResult} StartRun={StartRun}/>
                );
            case "Final Result":
                return null;
            default:
                return null;
    }}

    

    return (
        <div style={{display: 'flex',height: '100%', flexDirection: 'column', justifyContent: 'space-between'}} id='main-content' >
            {
                finalResultLoading &&
                <OverlayLoader message='Fetching Run Result...'/>
            }
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