import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {useGetAllDrafts, useDeleteMTODraft,useGetDraftById,useGetMasterUIConfiguration, useGetDraftCount, useGetMTODrafts, useGetMTODraftById, useGetMTOMasterUIConfiguration, useGetBufferTypeMaster } from "../../../../../VectorFlow/Services/MTA/MDM"
import { notifyError, notifySuccess, notifyLoader } from "../../../../../helpers/notify"

import { FILL_MASTERS, SET_DRAFT_ID, SET_RECORD_COUNT, STORE_ALL_MASTERS, TOGGLE_SELECT_MASTER_SCREEN, TOGGLE_UPLOAD_MODAL, UPDATE_ACTIVE_MASTER, UPDATE_DATA_AVAILABILITY_STATUS} from "../../../../../redux/actions/MDM"
import { createMastersStateFromDraftData, generateRandomId, getActionName, mapMasterToMasterState } from "../../../../../helpers/utils"
import { MDMMasterState } from "../../../../../VectorFlow/types/MDM"
import type { RootState } from '../../../../../redux/store/store';
import { toast } from 'react-toastify';
import { useUserData } from "../../../../../context"
import MTOErrorWarningCell from "../ViewModify/MTOErrorWarningCell"
import { SET_BUFFER_MODIFY_DATA, SET_CCR_MODIFY_DATA, SET_POOGI_MODIFY_DATA } from "../../../../../redux/actions/MTO"
import { useGetDeptMasterData, useGetPlantMasterData } from "../../../../../VectorFlow/Services/MTO/Common/Masters"
import { useGetCCRGroupMaster } from "../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation"
import { v4 as uuidv4 } from "uuid";


const useSavedDrafts = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mutateAsync:getDraftById} = useGetDraftById()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()
    const {mutateAsync:deleteDraft} = useDeleteMTODraft()
    const [isDeleteModalOpen,toggleDeleteModal] = useState<boolean>(false)
    const [deleteDraftId,setDeleteDraftId] = useState<string>("");
    const {data,isLoading} = useGetAllDrafts();
    const {mutateAsync:getDraftCount} = useGetDraftCount();
    const chunkSize = useSelector((state:RootState) => state.mdm.chunkSize)
    const [allDrafts, setAllDrafts] = useState<any>(data?.data?.data);
    const {mutateAsync: getMtoDrafts} = useGetMTODrafts();
    const {mutateAsync: getDraftByIdMTO} = useGetMTODraftById();
    const {mutateAsync: getMTOMasterUIConfiguration} = useGetMTOMasterUIConfiguration();
    
    const user = useUserData();

    const convertDateFormat = (inputDate: string)=>{
        const [date, ltime] = inputDate.split("T");
        const time = ltime.split(".")[0];
        const [year, month, day] = date.split("-");
        const [hours, minutes, seconds] = time.split(":");
        const isPM = parseInt(hours) >= 12;
        const newHours = (parseInt(hours) % 12 || 12).toString().padStart(2, "0");
        const period = isPM ? "PM" : "AM";
        const newMonth = month.toString();
        const formattedDate = `${year}/${newMonth}/${day} ${newHours}:${minutes}:${seconds} ${period}`;
        return formattedDate;
    }
    
    const getCombinedMTOData = async()=>{
        try{
            // TODO: change the data to userid later now data is available for this
            const response:any = await getMtoDrafts(user.user.user.id);
            let concatedData:any = [];
            if(data && data.data && data.data.data){
                concatedData = [...data.data.data];
            }
            response.data.data.forEach((draft: any)=>{
                // const date = new Date(draft.co);
                const newData = {
                    DraftId: draft.did,
                    ActionType: draft.at,
                    LastModifiedDateTime: convertDateFormat(draft.co.toString()),
                    Masters: draft.at +" - "+ draft.mnm,
                    SearchKeys: draft.sk,
                    userid: draft.uid,
                    isMTO: true,
                    mid: draft.mid,
                    dnm: draft.dnm
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
        // if(data?.data){
            getCombinedMTOData();
        // }
    },[data])
    
    const openDeleteModal = (draftId:string)=>{
        setDeleteDraftId(draftId)
        toggleDeleteModal(true)
    }
    
    const closeDeleteModal =()=>toggleDeleteModal(false)

    // export const createMastersStateFromDraftData = (draftData: any[], fields: any[]): any[] => {

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
    const {mutateAsync: GetBufferTypeMaster} = useGetBufferTypeMaster();
    const {mutateAsync: getPlantMaster} = useGetPlantMasterData();
    const {mutateAsync: getDeptMaster} = useGetDeptMasterData();
    const {mutateAsync: getCCRGroupMaster} = useGetCCRGroupMaster();
    const [plantMaster, setPlantMaster] = useState<any>();
    const [deptMaster, setDeptMaster] = useState<any>();
    const [ccrGroupMaster, setCcrGroupMaster] = useState<any>();
    const [bufferTypeMaster, setBufferTypeMaster] = useState<any>();

    const getInitalData = async()=>{
            try{
                const BufferTypeMaster = await GetBufferTypeMaster();
                setBufferTypeMaster(BufferTypeMaster?.data?.data);
            }
            catch(e){
                console.log(e)
            }
            try{
                const response = await getCCRGroupMaster();
                setCcrGroupMaster(response.data.data);

            }
            catch(e){
                console.log(e)
            }
            try{

                const response = await getDeptMaster();
                setDeptMaster(response.data.data);
            }
            catch(e){
                console.log(e)
            }
            try{
                const response = await getPlantMaster();
                setPlantMaster(response.data.data);
                
            }
            catch(e){
                console.log(e);
            }
       
    }
    useEffect(()=>{
        getInitalData();
    },[])

    const convertToColDefs = (data:any, ActionType: string) => {
        const newColDef =  data
          .sort((a:any, b:any) => (a.col_Position || 0) - (b.col_Position || 0))
          .map((item: any) => ({
            field: item?.key,                    // Use the "key" as the "field"
            colId: item?.key,                    // Also set "colId" from "key"
            headerName: item?.displayName,        // Set "headerName" from "displayName"
            floatingFilter: false,              // Set default values for additional properties
            wrapText: true,
            autoHeight: true,
            editable: (ActionType == "Modify") ? false : true
          }));

        return newColDef.map((col:any)=>{
            if (col.field === 'pl' || col.field === 'plnm') return {
                ...col,
                editable: (ActionType == "Modify") ? false : true,
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                  values: plantMaster?.map((item: any) => item.plant_name),
                },
              };
              
              if (col.field === 'dp') return {
                ...col,
                editable: (ActionType == "Modify") ? false : true,
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                  values: deptMaster?.map((item: any) => item.dept_name),
                },
              };
              
              if (col.field === 'cgid') return {
                ...col,
                editable: (ActionType == "Modify") ? false : true,
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                  values: Object.values(ccrGroupMaster || {}).map((group: any) => group.ccr_group_code),
                },
              };
              if(col.field==='bt')return {...col,  cellEditor: 'agRichSelectCellEditor',
              editable: (ActionType == "Modify") ? false : true,
              cellEditorParams: {
                values: bufferTypeMaster?.map((item: any) =>  item.dsc), 
              }, }
              else return col;
        })
      };

    const convertToPoogiDraftData = (data:any, page:any)=>{
        if(page==="Modify"){
            return data;
        }

        const result: any[] = [];
        
        data.forEach((item: any) => {
            // Push the main object without minData
            const tempMajId = "maj_"+ uuidv4();
            // result.push({
            //     majId: item.majId? item.majId: tempMajId,
            //     majdsc: item.majdsc,
            //     plnm: item.plnm,
            //     trmId: item.trmId? item.trmId: item.mintid,
            //     tid: item.tid,
            //     ti_id: item.ti_id,
            //     ie: item.ie || false,
            //     id: item.id || false,
            //     iu: item.iu || false,
            //     pl: item.pl,
            //     majcd: item.majcd,
            //     aon: item.aon,
            //     aid: item.aid,
            //     anm: item.anm,
            //     st: item.st,
            //     stnm: item.stnm
            // });
    
            // Push each minData object with the corresponding majId and plnm
            if (item.minData && Array.isArray(item.minData)) {
            const tempMinId = "min_"+uuidv4();

                item.minData.forEach((minItem: any) => {
                    result.push({
                        majdsc: item.majdsc,
                        majId: minItem.majId || tempMajId,
                        minId: minItem.minId || tempMinId,
                        mindsc: minItem.mindsc,
                        mintid: minItem.mintid,
                        mincd: minItem.mincd,
                        plnm: item.plnm,
                        ie: minItem.ie || false,
                        id: minItem.id || false,
                        iu: minItem.iu || false,
                        pl: item.pl,
                        aon: minItem.aon,
                        aid: minItem.aid,
                        anm: minItem.anm,
                        st: minItem.st,
                        stnm: minItem.stnm
                    });
                });
            }
        });
    
        return result;

    }
    
    const onEditDraft = async(draftDetails:any)=>{
        let toastId;
        if(draftDetails.isMTO){
            // console.log("draftDetail......", draftDetails);
            
            try{
                const res: any = await getDraftByIdMTO({draftId: draftDetails.DraftId, mid: draftDetails.mid});
                const draftData:any = res.data.data.results;
                dispatch(SET_RECORD_COUNT(res.data.data.results.length));
             
           

            const mastersDataRes= await getMTOMasterUIConfiguration();
            console.log("mastersData res.....",mastersDataRes.data.data)
            const mastersData = mastersDataRes?.data?.data?.find(
                (item: any) => item.id === draftDetails.mid
              );    
            toast.dismiss();
            
            const fields = mastersData.fields;

            // draftData
            // DataMaster gridState MasterId Status
            // const masterState = createMastersStateFromDraftData(draftData,fields)
            // const activeMaster = masterState.find((m:MDMMasterState)=>m.progress!=='submitted');
                // const activeMaster= "dsf";

            if(draftDetails.mid===501){
                dispatch(SET_BUFFER_MODIFY_DATA(draftData));

            }
            if(draftDetails.mid===502){
                dispatch(SET_CCR_MODIFY_DATA(draftData))
            }
            if(draftDetails.mid===503){
                dispatch(SET_POOGI_MODIFY_DATA(draftData))
            }


            const masterState:any = [
                {   isMTO: true,
                    "id": draftDetails.mid,
                    "name": draftDetails.dnm,
                    "colDefs": [...convertToColDefs(fields,draftDetails.ActionType),{colId: 'err',colPosition: 100, field: 'err',cellRenderer: MTOErrorWarningCell, headerName: 'Error' , pinned: 'left' }],
                    "rowData": (draftDetails.mid!==503)?draftData: convertToPoogiDraftData(draftData,draftDetails.ActionType),
                    "isChecked": true,
                    "filters": [{
                        id: generateRandomId(),
                        masterId: draftDetails.mid,
                        field: "",
                        operator: '',
                        text: ''
                    }],
                    "progress": "view",
                    "fields": fields
                }
            ]

            if(draftDetails.isMTO && (draftDetails.ActionType === "Modify")){
                masterState[0].colDefs = [...convertToColDefs(fields, draftDetails.ActionType)];
            }

            dispatch(TOGGLE_UPLOAD_MODAL(false));

            
            dispatch(TOGGLE_SELECT_MASTER_SCREEN(false));
            // dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
            // dispatch(UPDATE_FILTER(masterState.filters))
            dispatch(FILL_MASTERS(masterState))
            dispatch(SET_DRAFT_ID(draftDetails.DraftId))
            dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
            dispatch(UPDATE_ACTIVE_MASTER(0))
            
            // dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster))            // dispatch(UPDATE_ACTIVE_MASTER())
            if(draftDetails.ActionType == "Modify"){
                navigate(`/mto/master-data-management/control-panel/view-modify`);
            }
            else if(draftDetails.ActionType === "Add"){
                navigate(`/mto/master-data-management/control-panel/${draftDetails.ActionType.toLowerCase()}`);
            }
            else{
            navigate(`/mto/master-data-management/control-panel/${draftDetails.ActionType.toLowerCase()}`);

            }
            toast.dismiss();
            notifySuccess("Draft Loaded Successfully");

            if(res.status===200){
                try{
                    const response = await deleteDraft(draftDetails.DraftId);
                    if(response.status===200){
                        toast.dismiss();
                        setAllDrafts(allDrafts.filter((ele:any)=>{return( ele.DraftId!==deleteDraftId)}))
                    }
                }
                catch(e){
                    toast.dismiss()
                }
            }


        }
        catch(error){
            console.log(error);
        }
            
            // console.log('act name..',draftDetails.ActionType)
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
        
        dispatch(TOGGLE_SELECT_MASTER_SCREEN(false))
        dispatch(STORE_ALL_MASTERS(mapMasterToMasterState(fields)))
        dispatch(FILL_MASTERS(masterState))
        dispatch(SET_DRAFT_ID(draftDetails.DraftId))
        if(activeMaster){
            dispatch(UPDATE_ACTIVE_MASTER(masterState.indexOf(activeMaster)))
            dispatch(UPDATE_DATA_AVAILABILITY_STATUS(true))
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

        try{
            const response = await deleteDraft(deleteDraftId);
            if(response.status===200){
                toast.dismiss();
                notifySuccess("Draft deleted!");
                setAllDrafts(allDrafts.filter((ele:any)=>{return( ele.DraftId!==deleteDraftId)}))
                closeDeleteModal();
            }
            else{
                notifyError("Failed to delete draft");
            }
        }
        catch(e){
            toast.dismiss()
            notifyError("Failed to delete draft!");
        }
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
