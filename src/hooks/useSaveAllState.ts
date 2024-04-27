import { useContext, useEffect } from "react";
import {
  useResetState,
  useSaveState,
} from "../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { GridStateContext } from "../context/GridStateContext";
import { notifyError, notifyLoader, notifySuccess } from "../helpers/notify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { UPDATE_GRID_STATE } from "../redux/actions/MTA";

import {toast} from 'react-toastify'

interface exportToExcelParameters {
  pagination:{
    recordCount:number
    chunkSize:number
  }
  callBack:any
}

const useSaveAllState = () => {
  const { ref,tempDownloadData,setTempDownloadData,exportExcelColumns,setExportExcelColumns,setExportExcelRowData } = useContext(GridStateContext);
  const { currentGridState } = useSelector((state: RootState) => state.mta);
  

  const dispatch = useDispatch();

  const { mutateAsync: saveState } = useSaveState();
  const { mutateAsync: resetState } = useResetState();

  useEffect(()=>{
    if(tempDownloadData){
      setTempDownloadData(false)
    }
  },[tempDownloadData])


  const onExportToExcel = async (params:exportToExcelParameters)=>{
   
    const {pagination,callBack} = params
    const {recordCount,chunkSize} = pagination

    try {
      
      const numberOfPages = Math.ceil(recordCount/chunkSize);
      const toastId = notifyLoader(`Downloading Data 0 / ${recordCount}`)
      const rows = [];
      for(let i=1; i<=numberOfPages; i++){
      
        const result = await callBack(i);
        if(result === null) {
          // throw new Error("Something Went Wrong")
          break
        }
        rows.push(...result)
        if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${recordCount} / ${recordCount}`})
        else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${recordCount}`})
      }
      setExportExcelColumns(exportExcelColumns)
      setExportExcelRowData(rows)
      setTempDownloadData(true);
      toast.dismiss(toastId);
      

      notifySuccess(`Data Exported Successfully`);
    } catch (error) {
      toast.dismiss();
      notifyError('Something Went Wrong');
    }
    
  }

  const onSaveState = async (name: string) => {
    try {
      const columnState = ref.current.columnApi.getColumnState();
      await saveState({
        reportname: name,
        state: JSON.stringify(columnState),
      });
      notifySuccess("State has been saved");
      ref.columnApi.applyColumnState({ state: columnState });
    } catch (err: any) {
        console.log(err)
      notifyError(err);
    }
  };

  const onResetAllState = async (name: string) => {
    notifyLoader("Reseting Data");
    try {
      await resetState(name);
      let tempCurrentGridState = [...currentGridState];
      tempCurrentGridState = tempCurrentGridState.map((t) => {
        return {
          ...t,
          hide: false,
        };
      });
      dispatch(UPDATE_GRID_STATE(tempCurrentGridState));
      notifySuccess("State has been resetted");
    } catch (err: any) {
      notifyError(err);
    }
  };

  return {
    onSaveState,
    onResetAllState,
    onExportToExcel
  };
};

export default useSaveAllState;
