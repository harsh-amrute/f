

// const {addRow, handleCancel} = useViewModify('modify');
import { useSelector, useDispatch } from 'react-redux';
import {  UPDATE_COLDEFS, UPDATE_ROW_DATA} from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError } from '../../../../../helpers/notify';
import { SET_BUFFER_MODIFY_DATA, SET_CCR_MODIFY_DATA } from '../../../../../redux/actions/MTO';


const AddRemoveCellRenderer = (params: any) => {

  
  

    const dispatch = useDispatch();
    const activeMaster = useSelector((state: RootState) => state.mdm.activeMaster);
    const bufferInitialData = useSelector((state: any)=> state.mto.bufferInitialData);
    const bufferModifyData = useSelector((state: any)=> state.mto.bufferModifyData);
    const ccrModifyData = useSelector((state: any)=> state.mto.ccrModifyData);
    const ccrInitialData = useSelector((state: any)=> state.mto.ccrInitialData);

    const validateCCR = () => {
      if (params.data.cnm === "" || !params.data.cnm) {
        notifyError("CCR name cannot be empty!");
        return false;
      }
      if (params.data.cpd === "" || !params.data.cpd) {
        notifyError("CCR Capacity Per Day cannot be empty!");
        return false;
      }
      if (params.data.cpd <= 0) {
        notifyError("CCR Capacity Per Day should be greater than 0!");
        return false;
      }
      if (params.data.whpd === "" || !params.data.whpd) {
        notifyError("Working hours Per Day cannot be empty!");
        return false;
      }
      if (params.data.whpd <= 0) {
        notifyError("Working hours Per Day should be greater than 0!");
        return false;
      }
      if (params.data.sh === "" || !params.data.sh) {
        notifyError("Scheduling horizon cannot be empty!");
        return false;
      }
      if (ccrInitialData.some((ccr: any) => ccr.ccd === params.data.ccd)) {
        notifyError("CCR Code already exists in the master CCR!");
        return false;
      }
      if (params.data.rb === undefined || params.data.rb < 0 || params.data.rb > 1) {
        notifyError("CCR Resource Buffer (rb) should be a value between 0 and 1!");
        return false;
      }
      if (params.data.cwl === "" || params.data.cwl === undefined || params.data.cwl < 0) {
        notifyError("CCR Capacity Workload (cwl) should be greater than 0!");
        return false;
      }
    
      return true;
    };
    const addRow = () => {

        const allRows = [...activeMaster.rowData];
        allRows.shift();
        // Check if the entered Buffer type is unique 
        if(activeMaster.id===501){

          if(params.data.bsz===0 || params.data.bsz==='0'){
            notifyError("Buffer size cannot be 0!");
            return;
          }

          if(params.data.bsz===""){
            notifyError("Buffer size cannot be empty!")
            return;
          }
          
          
          let isValid = true;
          bufferInitialData?.forEach((e:any)=>{
            console.log("bt for bs", e,"***********************************\n", params.data)
    
            if(e.bsz== params.data.bsz && e.bt=== params.data.bt){
            notifyError("Buffer size must be unique!.")
            isValid = false;
            return;
          }
        })
        bufferInitialData?.forEach((e:any)=>{
          if(e.bcd=== params.data.bcd){
            notifyError("Buffer code must be unique!.")
            isValid = false;
            return;
          }
        })
        
        if(isValid){
          const newColDefs:any = [];
          activeMaster.colDefs.forEach((ele:any)=>{
            const newColDef = {...ele};
            delete newColDef.editable;   
            newColDefs.push(newColDef);
          })


          if(bufferModifyData && bufferModifyData.length) dispatch(SET_BUFFER_MODIFY_DATA([activeMaster.rowData[0], ...bufferModifyData]));
          else dispatch(SET_BUFFER_MODIFY_DATA([activeMaster.rowData[0]]));
          dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))
        }
      }
      else if(activeMaster.id === 502){
        const result = validateCCR();
        if(result){

          const newColDefs:any = [];
          activeMaster.colDefs.forEach((ele:any)=>{
            const newColDef = {...ele};
            delete newColDef.editable;   
            newColDefs.push(newColDef);
          })
          if(ccrModifyData && ccrModifyData.length) dispatch(SET_CCR_MODIFY_DATA([activeMaster.rowData[0], ...ccrModifyData]));
          else dispatch(SET_CCR_MODIFY_DATA([activeMaster.rowData[0]]));
          dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))
        }


      }
      else if(activeMaster.id=== 503){
        // TODO: validations for CCR
        const newColDefs:any = [];
        activeMaster.colDefs.forEach((ele:any)=>{
          const newColDef = {...ele};
          delete newColDef.editable;   
          newColDefs.push(newColDef);
        })
  
        dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))
      }
    }

    const onRemoveRow = ()=>{
      const newData = [...activeMaster.rowData]; newData.shift();dispatch(UPDATE_ROW_DATA([...newData])) ;
      const newColDefs:any = [];
      activeMaster.colDefs.forEach((ele:any)=>{
        const newColDef = {...ele};
        delete newColDef.editable;   
        newColDefs.push(newColDef);
      })

      dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))
    }
    
        
              if ((params?.node?.rowIndex === 0)) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4px' , gap: '8px'}}>
      
                    <div
                    //   onClick={() => dispatch(UPDATE_ROW_DATA(activeMaster.rowData.filter((item: any) => item.id !== params.data.id))) }
                      onClick={() => addRow() }
                      style={{ cursor: 'pointer' }}>
                      <img
                      height={17}
                      width={17}
                        src="/assets/img/MTOapprovalBuffer.svg"
                        alt="ApproveMaster"
                      />
                    </div>
      
                    <div
                      onClick={() => onRemoveRow()}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                      height={17}
                      width={17}
                        src="/assets/img/MTOcancelBuffer.svg"
                        alt="CancelMaster"
                      />
                    </div>
      
                  </div>
                );
              }
              return null; // No buttons for other rows
}

export default AddRemoveCellRenderer