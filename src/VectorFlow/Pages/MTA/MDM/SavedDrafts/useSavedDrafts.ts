import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {useGetAllDrafts, useDeleteDraft,useGetDraftById,useGetMasterUIConfiguration, useGetDraftCount, useGetMTODrafts, useGetMTODraftById, useGetMTOMasterUIConfiguration } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyError, notifyPromise, notifySuccess, notifyLoader } from "../../../../../helpers/notify"

import { FILL_MASTERS, SET_DRAFT_ID, SET_RECORD_COUNT, STORE_ALL_MASTERS, TOGGLE_SELECT_MASTER_SCREEN, TOGGLE_UPLOAD_MODAL, UPDATE_ACTIVE_MASTER, UPDATE_DATA_AVAILABILITY_STATUS } from "../../../../../redux/actions/MDM"
import { createMastersStateFromDraftData, getActionName, mapMasterToMasterState } from "../../../../../helpers/utils"
import { MDMMasterState } from "../../../../../VectorFlow/types/MDM"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from 'react-toastify';
import { useUserData } from "../../../../../context"
import MTOErrorWarningCell from "../ViewModify/MTOErrorWarningCell"

const useSavedDrafts = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mutateAsync:getDraftById} = useGetDraftById()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()
    const {mutateAsync:deleteDraft} = useDeleteDraft()
    const [isDeleteModalOpen,toggleDeleteModal] = useState<boolean>(false)
    const [deleteDraftId,setDeleteDraftId] = useState<string>("");
    const {data,isLoading,refetch} = useGetAllDrafts();
    const {mutateAsync:getDraftCount} = useGetDraftCount();
    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize)
    const [allDrafts, setAllDrafts] = useState<any>(data?.data.data);
    const {mutateAsync: getMtoDrafts} = useGetMTODrafts();
    const {mutateAsync: getDraftByIdMTO} = useGetMTODraftById();
    const {mutateAsync: getMTOMasterUIConfiguration} = useGetMTOMasterUIConfiguration();
    
    const user = useUserData();
    
    const getCombinedMTOData = async()=>{
        try{
            // TODO: change the data to userid later now data is available for this
            const response:any = await getMtoDrafts(user.user.user.id);
            let concatedData:any = [];
            if(data){
                concatedData = [...data.data.data];
            }
            response.data.data.results.forEach((draft: any)=>{
                const newData = {
                    DraftId: draft.did,
                    ActionType: draft.at,
                    LastModifiedDateTime:draft.co,
                    Masters: draft.mnm,
                    SearchKeys: draft.sk,
                    userid: draft.uid,
                    isMTO: true
                }
                concatedData.push(newData);
            })
            
            setAllDrafts(concatedData);
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    
    
    useEffect(()=>{
        if(data?.data){
            getCombinedMTOData();
        }
    },[data])
    
    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }
    
    const closeDeleteModal =()=>toggleDeleteModal(false)

    // export const createMastersStateFromDraftData = (draftData: any[], fields: any[]): any[] => {

    //     console.log("mTA draft data and fields", draftData, fields);
    //     const masters: MDMMasterState[] = []
    //     draftData.map((master) => {
    //       const existingMaster = fields.find((m: any) => m.id == master.MasterId)
    //       if (existingMaster) {
    //         masters.push({
    //           id: existingMaster.id,
    //           name: existingMaster.name,
    //           colDefs: master.GridState.length > 0 ? JSON.parse(master.GridState) : mapMasterToColumnDefs(existingMaster.fields, existingMaster.id),
    //           rowData: master.DataMaster || [],
    //           isChecked: true,
    //           filters: [{
    //             id: generateRandomId(),
    //             masterId: existingMaster.id,
    //             field: '',
    //             operator: '',
    //             text: ''
    //           }],
    //           progress: master.Status,
    //           fields: existingMaster.fields
    //         })
    //       }
    //     })
    //     return masters


    //   }

    const convertToColDefs = (data:any) => {
        return data.map((item:any )=> ({
          field: item?.key,                    // Use the "key" as the "field"
          colId: item?.key,                    // Also set "colId" from "key"
          headerName: item?.displayName,        // Set "headerName" from "displayName"
          floatingFilter: false,              // Set default values for additional properties
          wrapText: true,
          autoHeight: true,
          editable: true
        }));
      };
    
    const onEditDraft = async(draftDetails:any)=>{
        let toastId;
        // mto draft .....
        if(draftDetails.isMTO){
            // console.log('dd details...',draftDetails)
            
            try{
                const res: any = await getDraftByIdMTO(draftDetails.DraftId);
                // console.log('res',res);
                dispatch(SET_RECORD_COUNT(res.data.data.count));
                const draftData:any = res.data.data.results;
           

            // const mastersData:any= {data: {data: []}};
            const mastersDataRes= await getMTOMasterUIConfiguration();
            // console.log("masteres dataaa", mastersDataRes);
            const mastersData = mastersDataRes.data.data[1];
            console.log('master Data res...',mastersDataRes)
        
            toast.dismiss();
            
            const fields = mastersData.fields;

            // draftData
            // DataMaster gridState MasterId Status
            // const masterState = createMastersStateFromDraftData(draftData,fields)
            // const activeMaster = masterState.find((m:MDMMasterState)=>m.progress!=='submitted');
                // const activeMaster= "dsf";

            const masterState:any = [
                {   isMTO: true,
                    "id": "501",
                    "name": "SKU",
                    "colDefs": [{checkboxSelection: true},{colId: 'err', field: 'err',cellRenderer: MTOErrorWarningCell, headerName: 'Error'  },...convertToColDefs(fields)],
                    "rowData": draftData,
                    "isChecked": true,
                    "filters": [
                    ],
                    "progress": "something",
                    "fields": [
                        {
                            "displayName": "SKUCode",
                            "key": "sc",
                            "col_Position": "1",
                            "visible": true,
                            "isAdd": true,
                            "isEdit": false,
                            "isDownload": true,
                            "isApplicable": true,
                            "dataType": "String"
                        },
                    ]
                }
            ]

            dispatch(TOGGLE_UPLOAD_MODAL(false));

            
            dispatch(TOGGLE_SELECT_MASTER_SCREEN(false));
            // dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
            dispatch(FILL_MASTERS(masterState))
            dispatch(SET_DRAFT_ID(draftDetails.DraftId))
            dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
            dispatch(UPDATE_ACTIVE_MASTER(0))
            
            // dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster))            // dispatch(UPDATE_ACTIVE_MASTER())
            navigate(`/master-data-management/control-panel/${draftDetails.ActionType.toLowerCase()}`);
            toast.dismiss();
            notifySuccess("Draft Loaded Successfully");

        }
        catch(error){
            console.log(error);
        }
            
            // console.log('act name..',draftDetails.ActionType)
            // navigate(`/master-data-management/control-panel/${draftDetails.ActionType.toLowerCase()}`);
            // toast.dismiss();
            // notifySuccess("Draft Loaded Successfully");



            return;
        }
          
            try{
                
                const res:any = await getDraftCount(draftDetails.DraftId);
                const draftCount = JSON.parse(res.data.recordCount)[0].recordCount;
                dispatch(SET_RECORD_COUNT(draftCount));
                let draftDataRaw = [];
                const payload = {
            pageNumber:1,
            recordsPerPage:chunkSize
        }
        
        toastId = notifyLoader(`Downloading Data 0 / ${draftCount}`)
        
        if(draftCount <= chunkSize){
            const result = await getDraftById({id:draftDetails.DraftId,body:payload});
            draftDataRaw = result.data.data;
        }
        else{
            const numberOfPages = Math.ceil(draftCount/chunkSize);
            for(let i=1; i<=numberOfPages; i++){
                payload.pageNumber = i;
                const result = await getDraftById({id:draftDetails.DraftId,body:payload})
                draftDataRaw.push(...result.data.data);
                if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${draftCount} / ${draftCount}`})
                else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${draftCount}`})
            }
        }
        toast.dismiss(toastId);

        notifyLoader("Getting Draft Ready")
        
        // toast.update(toastId,{render:"Getting Draft Ready"});
        
        const draftData:any = [];
        draftDataRaw.forEach((data:any)=>{
        const masterIndex = draftData.findIndex((draftObj:any) => draftObj.MasterId == data.MasterId);
            if(masterIndex >= 0){
                if(("DataMaster" in data)){
                    draftData[masterIndex].DataMaster = [...draftData[masterIndex].DataMaster,...data.DataMaster];
                }
                return;
            }
            else{
                draftData.push(data);
            }
            
        })
        
        const mastersData= await getMasterUIConfiguration(getActionName(draftDetails.ActionType).value)
        
        toast.dismiss();
        
        const fields = mastersData.data.data
        const masterState = createMastersStateFromDraftData(draftData,fields)
        const activeMaster = masterState.find((m:MDMMasterState)=>m.progress!=='submitted');
        console.log("active master mta", activeMaster);
        console.log("master state mta", masterState);
        
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(false))
        dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
        dispatch(FILL_MASTERS(masterState))
        dispatch(SET_DRAFT_ID(draftDetails.DraftId))
        if(activeMaster){
            dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster)))
            dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
            console.log('index of active master',masterState.indexOf(activeMaster))
        }

        
        
        navigate(`/master-data-management/control-panel/${getActionName(draftDetails.ActionType).label}`);
        toast.dismiss();
        notifySuccess("Draft Loaded Successfully");

    }catch(error:any){
        notifyError(error.message);
        toast.dismiss(toastId)
    }
    }
    
    
    
    const onDeleteDraft = async()=>{
        closeDeleteModal();
        await notifyPromise(
            deleteDraft(deleteDraftId),
            {
                pending:'Deleting Draft',
                success:'Draft has been deleted sucessfully',
                error:'Something went wrong'
            }
        )
        refetch();
    }

    return{
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        onEditDraft,
        onDeleteDraft,
        allDrafts,
        isLoading
    }
}

export default useSavedDrafts
