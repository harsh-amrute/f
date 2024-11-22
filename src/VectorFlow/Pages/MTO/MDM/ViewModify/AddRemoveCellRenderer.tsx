

// const {addRow, handleCancel} = useViewModify('modify');
import { useSelector, useDispatch } from 'react-redux';
import {  UPDATE_COLDEFS, UPDATE_ROW_DATA} from '../../../../../redux/actions/MDM';
import type { RootState } from '../../../../../redux/store/store';
import { notifyError } from '../../../../../helpers/notify';


const AddRemoveCellRenderer = (params: any) => {

    const dispatch = useDispatch();
    const activeMaster = useSelector((state: RootState) => state.mdm.activeMaster);
    const addRow = () => {

        const allRows = [...activeMaster.rowData];
        allRows.shift();
        // Check if the entered Buffer type is unique 
        if(activeMaster.id===501){

          if(params.data.bsz===""){
            notifyError("Buffer size cannot be empty!")
            return;
          }
          
          
          let isValid = true;
          allRows.forEach((e)=>{
    
            if(e.bsz== params.data.bsz && e.bt=== params.data.bt){
            notifyError("Buffer size must be unique!.")
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
    
          dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))
        }
      }
      else if(activeMaster.id === 502){
        // TODO: validations for CCR
        if(params.data.cnm==="" || !params.data.cnm){
          notifyError("CCR name cannot be empty!")
          return;
        }
        if(params.data.cpd==="" || !params.data.cpd){
          notifyError("CCR Capacity Per Day cannot be empty!")
          return;
        }
        if(params.data.whpd==="" || !params.data.whpd){
          notifyError("Working hours Per Day cannot be empty!")
          return;
        }
        if(params.data.sh==="" || !params.data.sh){
          notifyError("Scheduling horizon cannot be empty!")
          return ;
        }
        const newColDefs:any = [];
        activeMaster.colDefs.forEach((ele:any)=>{
          const newColDef = {...ele};
          delete newColDef.editable;   
          newColDefs.push(newColDef);
        })
  
        dispatch(UPDATE_COLDEFS(newColDefs.filter((item: any) => item.field !==  'actions')))


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