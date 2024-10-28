

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
            dispatch(UPDATE_COLDEFS(activeMaster.colDefs.filter((item: any) => item.field !==  'actions')));
        }
    }
    
        
              if ((params.node.rowIndex === 0)) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4px' }}>
      
                    <div
                    //   onClick={() => dispatch(UPDATE_ROW_DATA(activeMaster.rowData.filter((item: any) => item.id !== params.data.id))) }
                      onClick={() => addRow() }
                      style={{ cursor: 'pointer' }}>
                      <img
                        src="/assets/img/MTOapprovalBuffer.svg"
                        alt="ApproveMaster"
                      />
                    </div>
      
                    <div
                      onClick={() => {const newData = [...activeMaster.rowData]; newData.shift(); dispatch(UPDATE_ROW_DATA([...newData])); dispatch(UPDATE_COLDEFS(activeMaster.colDefs.filter((item: any) => item.field !==  'actions')))} }
                      style={{ cursor: 'pointer' }}
                    >
                      <img
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